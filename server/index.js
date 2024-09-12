import express from 'express';
import morgan from 'morgan';
import cors from "cors";
import { createServer } from 'http';
import { Server } from 'socket.io';
import net from 'net';

// import configCors from "./config/fixCORS.js"
import commonRouter from './routes/commonRoutes.js';
import userRouter from './routes/userRoutes.js';
import homeRouter from './routes/homeRoutes.js';
import controlRouter from './routes/controlRoutes.js';
import { handleWhenDeviceOutConnection, sendDataToAllClients } from './DemoDevice/tcp-v2.js';
import { EVENTS_FROM_WEB } from './DemoDevice/events.js';
import { insertDeviceData } from './controller/commonController.js';

const app = express();
const PORT_TCP = process.env.PORT_TCP || 100;
const PORT_APP = process.env.PORT_APP || 3000;
const PORT_SERVER = process.env.PORT_SERVER || 5000;
app.listen(PORT_SERVER, () => {
    console.log(`Server running on port ${PORT_SERVER}`);
});

// Fix CORS
// configCors(app)
app.use(cors("*"))

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Routes
// app.use(morgan('combined'))
app.use('/api', userRouter)
app.use('/api', homeRouter)
app.use('/api', controlRouter)
app.use('/api', commonRouter)

//Test TCP////////////////
//open cors for FE connect socket
app.use(
    cors({
        origin: '*',
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
        preflightContinue: false,
        optionsSuccessStatus: 204,
    })
);

app.use('/control', function (req, res) {
    const { type } = req.body;
    res.status(200).json({ msg: msg || 'hello world' });
});

const server = createServer(app);

server.listen(PORT_APP, () => console.log(`Lisening Server on port-app `, PORT_APP));

const VALUE_OF_LIGHT_1 = {
    ON: '#00000010',
    OFF: '01',
};

const VALUE_OF_LIGHT_2 = {
    ON: '#00000001',
    OFF: '10',
};

const ValueOfAllLights = {
    LIGHT_1: {
        allValues: [VALUE_OF_LIGHT_1.ON, VALUE_OF_LIGHT_1.OFF],
        currentValue: null,
    },
    LIGHT_2: {
        allValues: [VALUE_OF_LIGHT_2.ON, VALUE_OF_LIGHT_2.OFF],
        currentValue: null,
    },
};

let TcpConnections = [];
// Socket
const io = new Server(server);
io.on('connection', (socket) => {
    console.log('a user connected from socket.io');
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });

    socket.on('ON_OFF_LIGHT', (value) => {
        console.log('ON_OFF_LIGHT: ', value);
        sendDataToAllClients(value, TcpConnections);
    });

    socket.on(EVENTS_FROM_WEB.GET_INIT_VALUE_FROM_LIGHT, () => {
        console.log('GET_INIT_VALUE_FROM_LIGHT: ');
        const valueToEmit = {
            LIGHT_1: ValueOfAllLights.LIGHT_1.currentValue,
            LIGHT_2: ValueOfAllLights.LIGHT_2.currentValue,
        };
        console.log('gia tri tu web', valueToEmit);
        io.emit(EVENTS_FROM_WEB.GET_INIT_VALUE_FROM_LIGHT, valueToEmit);
    });
});

// TCP
let latestParseData = null;
const serverTCP = net.createServer((socket) => {
    TcpConnections.push(socket);

    socket.on('data', (data) => {
        const parseData = data.toString().substring(0, 20).match(/#.*?(?=#|$)/g);
        parseData[1] = parseData[1].substring(1, 5);
        parseData[2] = parseData[2].substring(1);
        latestParseData = parseData;
        console.log(parseData);

        if (ValueOfAllLights.LIGHT_1.allValues.includes(parseData[0])) {
            console.log('den 1')
            ValueOfAllLights.LIGHT_1.currentValue = parseData[0];
            const valueToEmit = {
                type: 'LIGHT_1',
                currentValue: parseData[0],
            };
            io.emit(EVENTS_FROM_WEB.ON_OFF_LIGHT, valueToEmit);
        }
        if (ValueOfAllLights.LIGHT_2.allValues.includes(parseData[0])) {
            console.log('den 2')

            ValueOfAllLights.LIGHT_2.currentValue = parseData[0];
            const valueToEmit = {
                type: 'LIGHT_2',
                currentValue: parseData[0],
            };
            io.emit(EVENTS_FROM_WEB.ON_OFF_LIGHT, valueToEmit);
        }

        console.log('received data from device:', data.toString());
    });

    socket.on('error', function (error) {
        console.log('error:', error);
    });

    socket.on('end', handleWhenDeviceOutConnection);
});

serverTCP.on('connection', function () {
    console.log('A device connected to server...');
});

serverTCP.listen(PORT_TCP, () => {
    console.log('listening TCP on port', PORT_APP);
});

setInterval(async() => {
    try {
        await insertDeviceData(latestParseData);
        console.log('Save data successfully every 60s.')
    } catch (err) {
        console.error('Save data error every 60s:', err)
    }
}, 60000)