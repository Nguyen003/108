import React from 'react';
import { Pie, Bar } from 'react-chartjs-2';
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
                        return context.dataset.label + ': ' + (context.raw === 1 ? 'Đang chạy' : 'Dừng');
                    }
                }
            }
        },
        scales: {
			y: {
				beginAtZero: true,
				max: 1, // Giới hạn tối đa của trục y là 1
				title: {
					display: false,
					text: 'Trạng thái bơm',
				},
				ticks: {
					// stepSize: 1, // Chỉ hiển thị 0 và 1 trên trục y
					callback: function(value) {
						if (value === 0) return 'Dừng';
						if (value === 1) return 'Chạy';
						return ''; // Không hiển thị các giá trị khác
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
    const datasets = {
        labels,
        datasets: [
            {
                label: 'Bơm 1',
                data: [1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0], // Dữ liệu mẫu: 1 là đang chạy, 0 là dừng
                backgroundColor: '#5A9CD6',
            },
            {
                label: 'Bơm 2',
                data: [0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 1, 1], // Dữ liệu mẫu: 0 là dừng, 1 là đang chạy
                backgroundColor: '#FF6384',
            }
        ],
    };
    return <Bar options={options} data={datasets} />;
}

function PieChart({ data }) {
    const datasets = {
        labels: ['Mất tín hiệu', 'Lỗi', 'Dừng hoạt động', 'Đang hoạt động'],
        datasets: [
            {
                label: 'data',
                data: [data.TotalActive, data.TotalStopped, data.TotalError, data.TotalNoSignal],
                backgroundColor: [
                    '#39c35c',
                    '#e6b701',
                    '#db302f',
                    '#9294a3',
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