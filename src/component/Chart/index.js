import React from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const labels = ['2h', '5h', '8h', '11h', '14h', '17h', '20h', '23h'];

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
    return <Bar options={options} data={data}/>;
}
export { ChartBar };