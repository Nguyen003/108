import React from 'react';
import { Line, Pie } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    LineElement,
    PointElement,
    Title,
    Tooltip,
    Legend,
    ArcElement
} from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

ChartJS.register(
    CategoryScale,
    LinearScale,
    LineElement,
    PointElement,
    ArcElement,
    Title,
    Tooltip,
    Legend,
    ChartDataLabels
);

const labelsTest = ['2h', '4h', '6h', '8h', '10h', '12h', '14h', '16h', '18h', '20h', '22h', '24h'];

function ChartBar({ data, labels = labelsTest }) {
    const options = {
        responsive: true,
        maintainAspectRatio: false, // Vô hiệu hóa duy trì tỷ lệ khung hình
        plugins: {
            legend: {
                // position: 'top',
                display: false,
            },
            title: {
                display: false,
                text: 'Bơm lọc UF 01'.toUpperCase(),
            },
            datalabels: {
                display: false,
            },
            tooltip: {
                // Cấu hình tooltip tùy chỉnh
                enabled: true,
                backgroundColor: 'rgba(0, 0, 0, 0.7)', // Màu nền của tooltip
                titleColor: '#fff', // Màu chữ tiêu đề
                bodyColor: '#fff', // Màu chữ nội dung
                borderColor: '#fff', // Màu viền
                borderWidth: 1, // Độ dày viền
                callbacks: {
                    title: function () {
                        return ''; // Ẩn tiêu đề bằng cách trả về chuỗi rỗng
                    },
                    label: function (context) {
                        return context.raw;
                    }
                }
            }
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
    const datasets = {
        labels,
        datasets: [
            {
                label: 'Dataset1',
                data: ['10', '20', '60', '40', '55', '23', '13', '43', '50', '10', '5', '28'],
                backgroundColor: '#5A9CD6',
            }
        ],
    };
    return <Line options={options} data={datasets} />;
}

function PieChart({ data }) {
    const datasets = {
        labels: ['Mất tín hiệu', 'Lỗi', 'Dừng hoạt động', 'Đang hoạt động'],
        datasets: [
            {
                label: 'data',
                data: data,
                backgroundColor: [
                    '#9294a3',
                    '#db302f',
                    '#e6b701',
                    '#39c35c',
                ]
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                display: false,
                position: 'top', // chú thích
                labels: {
                    usePointStyle: true, // Sử dụng hình thay vì hình vuông mặc định
                    pointStyle: 'circle', // đổi thành 'circle'
                    font: {
                        size: 12 // Thay đổi kích cỡ văn bản
                    },
                    boxWidth: 10 // Thay đổi kích cỡ điểm
                }
            },
            tooltip: {
                // Cấu hình tooltip tùy chỉnh
                enabled: true,
                backgroundColor: 'rgba(0, 0, 0, 0.7)', // Màu nền của tooltip
                titleColor: '#fff', // Màu chữ tiêu đề
                bodyColor: '#fff', // Màu chữ nội dung
                borderColor: '#fff', // Màu viền
                borderWidth: 1, // Độ dày viền
                callbacks: {
                    title: function () {
                        return ''; // Ẩn tiêu đề bằng cách trả về chuỗi rỗng
                    },
                    label: function (context) {
                        return ` ${context.raw} thiết bị`;
                    }
                }
            },
            datalabels: {
                color: '#fff',
                font: {
                    size: 14
                },
                formatter: (value) => {
                    return value > 0 ? `${value} TB` : '';
                }
            },
        },
    };

    return <Pie data={datasets} options={options} />;
}

export { ChartBar, PieChart };