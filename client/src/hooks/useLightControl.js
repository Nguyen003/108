import { useEffect, useState, useRef } from 'react';
import { io } from 'socket.io-client';

const socket = io('http://localhost:3000', { transports: ['websocket'] });

const EVENTS_OF_EACH_LIGHT = {
    LIGHT_1: {
        TURN_ON: '10',
        TURN_OFF: '01',
        // TURN_ON: '#00000010',
        // TURN_OFF: '#00000000',
    },
    LIGHT_2: {
        TURN_ON: '01',
        TURN_OFF: '10',
    },
};

const VALUES_OF_EACH_LIGHT = {
    LIGHT_1: {
        ON: '#10010010',
        OFF: '01',
        // ON: '#00000010',
        // OFF: '#00000000',
    },
    LIGHT_2: {
        ON: '#10010001',
        OFF: '10',
    },
};

const STATUS_WHEN_COMPARE_WITH_INNER_HTML = {
    ON: 'Bật',
    OFF: 'Tắt',
};

export const useLightControl = () => {
    const [light1Status, setLight1Status] = useState('');
    const [light2Status, setLight2Status] = useState('');

    useEffect(() => {

        getInitValueFromLight();

        socket.on('GET_INIT_VALUE_FROM_LIGHT', (value) => {
            console.log('GET_INIT_VALUE_FROM_LIGHT received:', value);

            const statusOfLight1 = getCurrentStatusFromLight('LIGHT_1', value.LIGHT_1);
            setLight1Status(statusOfLight1 === 'ON' ? 'Bật' : 'Tắt');

            const statusOfLight2 = getCurrentStatusFromLight('LIGHT_2', value.LIGHT_2);
            setLight2Status(statusOfLight2 === 'ON' ? 'Bật' : 'Tắt');
        });

        socket.on('ON_OFF_LIGHT', (value) => {
            console.log('ON_OFF_LIGHT received:', value);

            const statusOfLight1 = getCurrentStatusFromLight('LIGHT_1', value.currentValue);
            setLight1Status(statusOfLight1 === 'ON' ? 'Bật' : 'Tắt');

            const statusOfLight2 = getCurrentStatusFromLight('LIGHT_2', value.currentValue);
            setLight2Status(statusOfLight2 === 'ON' ? 'Bật' : 'Tắt');
        });

        return () => {
            // socket.off('connect', getInitValueFromLight);
            socket.off('GET_INIT_VALUE_FROM_LIGHT');
            socket.off('ON_OFF_LIGHT');
        };
    }, []);

    const getInitValueFromLight = () => {
        socket.emit('GET_INIT_VALUE_FROM_LIGHT');
    };

    const getCurrentStatusFromLight = (key, currentValue) => {
        if (VALUES_OF_EACH_LIGHT[key].ON === currentValue) {
            return 'ON';
        }
        if (VALUES_OF_EACH_LIGHT[key].OFF === currentValue) {
            return 'OFF';
        }
    };

    const handleOnOffLight = (light) => {
        // console.log('light: ' + light);
        // console.log('light1Status: ' + light1Status);

        if (light === 'LIGHT_1') {
            if (light1Status === STATUS_WHEN_COMPARE_WITH_INNER_HTML.ON) {
                socket.emit('ON_OFF_LIGHT', EVENTS_OF_EACH_LIGHT.LIGHT_1.TURN_OFF);
            } else if (light1Status === STATUS_WHEN_COMPARE_WITH_INNER_HTML.OFF) {
                socket.emit('ON_OFF_LIGHT', EVENTS_OF_EACH_LIGHT.LIGHT_1.TURN_ON);
            }
        } else if (light === 'LIGHT_2') {
            if (light2Status === STATUS_WHEN_COMPARE_WITH_INNER_HTML.ON) {
                socket.emit('ON_OFF_LIGHT', EVENTS_OF_EACH_LIGHT.LIGHT_2.TURN_OFF);
            } else if (light2Status === STATUS_WHEN_COMPARE_WITH_INNER_HTML.OFF) {
                socket.emit('ON_OFF_LIGHT', EVENTS_OF_EACH_LIGHT.LIGHT_2.TURN_ON);
            }
        }
    };

    return { light1Status, light2Status, handleOnOffLight };
};
