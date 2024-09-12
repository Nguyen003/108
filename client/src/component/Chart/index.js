import React from 'react';
import { Pie, Bar, Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    LineElement,
    PointElement,
    BarElement,
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
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
    ChartDataLabels
);

const labelsTest = ['2h', '4h', '6h', '8h', '10h', '12h', '14h', '16h', '18h', '20h', '22h', '24h'];
const labelsTrangThai = ['0h', '1h', '2h', '3h', '4h', '5h', '6h', '7h', '8h', '9h', '10h', '11h', '12h', '13h', '14h', '15h', '16h', '17h', '18h', '19h', '20h', '21h', '22h', '23h']

function ChartBar({ data, labels = labelsTrangThai, type }) {
    const options = {
        responsive: true,
        maintainAspectRatio: false, // Vô hiệu hóa duy trì tỷ lệ khung hình
        plugins: {
            legend: {
                position: 'top',
                // display: false,
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
                        return context.raw + ' phút'
                    }
                }
            }
        },
        scales: {
            y: {
                beginAtZero: true,
                min: 0, // Mốc tối thiểu của trục y
                max: 60, // Mốc tối đa của trục y
                title: {
                    display: false,
                    text: 'Trạng thái bơm',
                },
                ticks: {
                    stepSize: 10, // Các mốc giá trị trên trục y: 0, 10, 20, 40, 60
                    callback: function (value) {
                        return value; // Hiển thị giá trị đúng trên trục y
                    }
                },
            },
            x: {
                title: {
                    display: false,
                    text: 'Thời điểm',
                },
            },
        },
    };
    const commonDatasets = [
        {
            label: 'Bơm lọc áp lực 1',
            data: data.device1, 
            backgroundColor: 'rgba(153, 102, 255, 0.7)',
        },
        {
            label: 'Bơm lọc áp lực 2',
            data: data.device2, 
            backgroundColor: 'rgba(255, 99, 132, 0.7)',
        }
    ];

    const additionalDatasets = type === 2 ? [
        {
            label: 'Hệ lọc màng UF 1',
            data: data.totaltime, 
            backgroundColor: 'rgba(75, 192, 192, 0.7)',
        },
        {
            label: 'Hệ lọc màng UF 2',
            data: data.totaltime, 
            backgroundColor: 'rgba(54, 162, 235, 0.7)',
        }
    ] : [
        {
            label: 'Hệ thống lọc màng UF',
            data: data.totaltime, 
            backgroundColor: 'rgba(75, 192, 192, 0.7)',
        }
    ];
    const datasets = {
        labels,
        datasets: [...commonDatasets, ...additionalDatasets]

    };
    
    return <Bar options={options} data={datasets} />;
}

function ChartBarLuuLuongNuoc({ data, labels = labelsTest }) {
    const options = {
        responsive: true,
        maintainAspectRatio: false, // Vô hiệu hóa duy trì tỷ lệ khung hình
        plugins: {
            legend: {
                position: 'top',
                display: false,
            },
            title: {
                display: true,
                text: 'Lưu Lượng Nước (m³/h)',
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
                        return context.raw + '(m³/h)';
                    }
                }
            }
        },
        scales: {
            y: {
                beginAtZero: true,
                title: {
                    display: false,
                    text: '',
                }
            },
            x: {
                title: {
                    display: false,
                    text: '',
                },
            },
        },
    };
    const datasets = {
        labels,
        datasets: [
            {
                label: 'Lưu Lượng Nước (m³/h)',
                data: data, // Dữ liệu mẫu: 1 là đang chạy, 0 là dừng
                backgroundColor: 'rgba(54, 162, 235, 0.5)',
            }
        ],
    };
    return <Bar options={options} data={datasets} />;
}

function PieChart({ data }) {
    let datasets;

    // Kiểm tra nếu data.status là 'NS'
    if (data.Status === 'NS') {
        // Nếu status là 'NS', tất cả sẽ là màu xám và hiển thị số liệu tổng thiết bị
        datasets = {
            labels: ['Tổng số thiết bị'],
            datasets: [
                {
                    label: 'data',
                    data: [data.TotalDevices],
                    backgroundColor: ['#9294a3'],
                },
            ],
        };
    } else {
        // Nếu không phải 'NS', hiển thị biểu đồ với các trạng thái khác
        datasets = {
            labels: ['Lỗi', 'Dừng hoạt động', 'Đang hoạt động'],
            datasets: [
                {
                    label: 'data',
                    data: [data.TotalActive, data.TotalStopped, data.TotalError],
                    backgroundColor: ['#39c35c', '#e6b701', '#db302f'],
                },
            ],
        };
    }

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

function ChartLine({ data, labels = labelsTest }) {
    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false,
            },
            title: {
                display: true,
                text: 'Mực Nước (m)'.toUpperCase(),
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
                        return ` ${context.raw} m`;
                    }
                }
            },
            datalabels: {
                display: false,
            },
        },
        scales: {
            y: {
                beginAtZero: true,
                title: {
                    display: true,
                },
            },
            x: {
                title: {
                    display: true,
                },
            },
        },
    };

    const datasets = {
        labels: labels,
        datasets: [
            {
                label: 'Mực Nước (m)',
                data: data,
                backgroundColor: 'rgba(75, 192, 192, 1)',  // Màu nền dưới đường line
                borderColor: 'rgba(75, 192, 192, 1)',        // Màu đường line
                borderWidth: 2,
                fill: true,  // Kích hoạt fill
                tension: 0.4 // Smooth curve
            }
        ],
    };

    return <Line options={options} data={datasets} />;
}

export { ChartBar, PieChart, ChartLine, ChartBarLuuLuongNuoc };