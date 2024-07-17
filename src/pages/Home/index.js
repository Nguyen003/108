import { NavLink } from 'react-router-dom';
import classNames from 'classnames/bind';
import React, { useEffect, useState } from 'react';

import styles from './Home.module.scss'
import config from '~/router/config-router'
import { ChartBar } from '~/component/Chart';
import { listLocations } from '~/services/LocationsServices';

const cx = classNames.bind(styles);

const waterData = [
    {
        id: "sach",
        name: "Nước sạch",
        stations: [
            { name: "Cấp nước Gia Định" },
            { name: "Cấp nước quân khu" }
        ]
    },
    {
        id: "thai",
        name: "Nước thải",
        stations: [
            { name: "Cấp nước Gia Định" }
        ]
    }
];

const devices = [
    { name: 'Thiết bị 1', status: 'signal-lost' },
    { name: 'Thiết bị 2', status: 'threshold-exceeded' },
    { name: 'Thiết bị 3', status: 'threshold-warning' },
    { name: 'Thiết bị 1', status: 'signal-lost' },
    { name: 'Thiết bị 2', status: 'threshold-exceeded' },
    { name: 'Thiết bị 3', status: 'signal-lost' },
    { name: 'Thiết bị 1', status: 'within-threshold' },
    { name: 'Thiết bị 2', status: 'signal-lost' },
    { name: 'Thiết bị 3', status: 'threshold-exceeded' },
    { name: 'Thiết bị 2', status: 'within-threshold' },
    { name: 'Thiết bị 3', status: 'within-threshold' },
    { name: 'Thiết bị 2', status: 'within-threshold' },
    { name: 'Thiết bị 3', status: 'within-threshold' },
];

const button = [
    { id: "sach", label: 'Nước sạch' },
    { id: "thai", label: 'Nước thải' }
]

function Home() {
    const [machines, setMachines] = useState([]);
    useEffect(() => {
        const getMachines = async () => {
            try {
                const data = await listLocations();
                setMachines(data);
            } catch (error) {
                console.error('Error fetching machines:', error);
            }
        };

        getMachines();
    }, []);

    return (
        <div className="w-100 ps-4 pe-4 d-flex flex-column">
            <div className="pt-2 mb-2">
                <div className={`w-100 d-flex justify-content-between p-2 ${cx("header-top")}`}>
                    <div className="d-flex align-items-center">
                        <select className={`form-select ${cx("select")}`} aria-label="Default select example">
                            <option value="">Chọn đơn vị</option>
                            <option value="1">One</option>
                            <option value="2">Two</option>
                            <option value="3">Three</option>
                        </select>
                        <span className={cx("title")}>Tình trạng kết nối (15/15)</span>
                    </div>
                    <div className={`d-flex align-items-center ${cx("status-bar")}`}>
                        <span className={cx("status-item", "signal-lost")}>Mất tín hiệu</span>
                        <span className={cx("status-item", "threshold-exceeded")}>Vượt ngưỡng</span>
                        <span className={cx("status-item", "threshold-warning")}>Chuẩn bị vượt</span>
                        <span className={cx("status-item", "within-threshold")}>Trong ngưỡng</span>
                    </div>
                </div>
                <div className="d-flex justify-content-around mt-3">
                    {button.map((item, index) => (
                        <a key={index} href={`#${item.id}`} className="col-5">
                            <button className={`w-100 ${cx("btn-custom")}`}>
                                <i className="fa-solid fa-water"></i>
                                <label>{item.label}</label>
                            </button>
                        </a>
                    ))}
                </div>
            </div>

            {/* Chi tiết nước sạch và nước thải */}
            {waterData.map((water, index) => (
                <div key={index} id={water.id} className="w-100 mt-3 mb-2">
                    <div className="text-start">
                        <label className={cx("title")}>{water.name} (10/10)</label>
                    </div>
                    <div className="mt-2">
                        {water.stations.map((device, idx) => (
                            <div key={idx} className="mb-3">
                                <div className="d-flex">
                                    <div className="d-flex col-10">
                                        <span>{idx + 1}.</span>
                                        <span className="ms-2">{device.name}</span>
                                        <span className="ms-2">(10/10)</span>
                                    </div>
                                    <div className="col-2">
                                        <button className="w-100 text-end">
                                            <NavLink to={{
                                                pathname: config.location,
                                                search: `?lat=${machines[idx]?.latitude ?? null}&lon=${machines[idx]?.longitude ?? null}`
                                            }} className={cx("nav-link")}>
                                                Bản đồ <i className="fa-solid fa-arrow-right-long fa-beat"></i>
                                            </NavLink>
                                        </button>
                                    </div>
                                </div>
                                <div className={`d-flex mt-2 ${cx("container")}`}>
                                    <div className={`col-4 ${cx("container-table")}`}>
                                        <table className="table table-bordered table-hover">
                                            <thead>
                                                <tr>
                                                    <th scope="col">Tên thiết bị</th>
                                                    <th scope="col">Trạng thái</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {devices.map((device, index) => (
                                                    <tr key={index}>
                                                        <td>{device.name}</td>
                                                        <td>
                                                            <span className={cx("status", device.status)}></span>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                    <div className="col-8">
                                        <ChartBar />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    )
}

export default Home;