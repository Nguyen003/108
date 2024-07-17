import React from 'react';
import { Bar, Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    LineElement,
    PointElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    LineElement,
    PointElement,
    Title,
    Tooltip,
    Legend
);

const labels = ['2h', '4h', '6h', '8h', '10h', '12h', '14h', '16h', '18h', '20h', '22h', '24h'];

function ChartBar() {
    const options = {
        responsive: true,
        maintainAspectRatio: false, // Vô hiệu hóa duy trì tỷ lệ khung hình
        plugins: {
            legend: {
                // position: 'top',
                display: false,
            },
            title: {
                display: true,
                text: 'Bơm lọc UF 01'.toUpperCase(),
            },
        },
        scales: {
            y: {
                beginAtZero: true,
                title: {
                    display: true,
                    // text: 'Thời gian chạy'.toUpperCase(),
                },
            },
            x: {
                title: {
                    display: true,
                    // text: 'Thời điểm'.toUpperCase(),
                },
            },
        },
    };
    const data = {
        labels,
        datasets: [
            {
                label: 'Dataset1',
                // data: randomValue(labels.length, 0, 1),
                data: ['10', '20', '60', '40', '55', '23', '13', '43', '50', '10', '5', '28'],
                backgroundColor: '#5A9CD6',
            }
        ],
    };
    return <Line options={options} data={data}/>;
}
export { ChartBar };