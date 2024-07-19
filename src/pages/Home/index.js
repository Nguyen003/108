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
        name: "Nước sạch (2)",
        stations: [
            { name: "Cấp nước Gia Định", numDevices: '10/13' },
            { name: "Cấp nước quân khu", numDevices: '9/13' }
        ]
    },
    {
        id: "thai",
        name: "Nước thải (1)",
        stations: [
            { name: "Cấp nước Gia Định", numDevices: '13/13' }
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
        <div className={`ps-4 pe-4 d-flex flex-column ${cx('content-right')}`}>
            <div className="pt-2 mb-2">
                <div className="d-flex justify-content-around">
                    {button.map((item, index) => (
                        <a key={index} href={`#${item.id}`} className="col-4">
                            <button className={`w-100 ${cx("btn-custom")}`}>
                                {index === 1 ? <i className="fa-solid fa-water"></i> : <i className="fa-solid fa-droplet"></i>}
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
                        <label className={cx("title")}>
                            {index === 1 ? <i className="fa-solid fa-water me-2"></i> : <i className="fa-solid fa-droplet me-2"></i>}
                            {water.name}
                        </label>
                    </div>
                    <div className="mt-2">
                        {water.stations.map((device, idx) => (
                            <div key={idx} className="mb-3">
                                <div className="">
                                    <div className="d-flex align-items-center">
                                        <div className={`d-flex col-10 fw-bold ${cx('device-info')}`}>
                                            <span className={cx('device-index')}>{idx + 1}</span>
                                            <span className="ms-2">{device.name}</span>
                                            <span className="ms-2">{device.numDevices} - 17/07/2024 - 03:52</span>
                                        </div>
                                        <div className="col-2 text-end">
                                            <button className="btn btn-light p-2 border rounded">
                                                <NavLink to={{
                                                    pathname: config.location,
                                                    search: `?lat=${machines[idx]?.latitude ?? null}&lon=${machines[idx]?.longitude ?? null}`
                                                }} className={cx("nav-link")}>
                                                    Bản đồ <i className="fa-solid fa-map-location-dot"></i>
                                                </NavLink>
                                            </button>
                                        </div>
                                    </div>
                                    <div className={`d-flex align-items-center ${cx("status-bar")}`}>
                                        <div className={`d-flex align-items-center signal-lost ps-4 pe-4 ${cx("status-item")}`}>
                                            <div className="col-4 fs-1">
                                                <i className="fa-regular fa-circle-xmark"></i>
                                            </div>
                                            <div className="col-8 d-flex flex-column-reverse justify-content-evenly">
                                                <span>Mất tín hiệu</span>
                                                <span>8</span>
                                            </div>
                                        </div>
                                        <div className={`d-flex align-items-center threshold-exceeded ps-4 pe-4 ${cx("status-item")}`}>
                                            <div className="col-4 fs-1">
                                                <i className="fa-solid fa-triangle-exclamation"></i>
                                            </div>
                                            <div className="col-8 d-flex flex-column-reverse justify-content-evenly">
                                                <span>Lỗi</span>
                                                <span>2</span>
                                            </div>
                                        </div>
                                        <div className={`d-flex align-items-center threshold-warning ps-4 pe-4 ${cx("status-item")}`}>
                                            <div className="col-4 fs-1">
                                                <i className="fa-solid fa-triangle-exclamation"></i>
                                            </div>
                                            <div className="col-8 d-flex flex-column-reverse justify-content-evenly">
                                                <span>Dừng hoạt động</span>
                                                <span>3</span>
                                            </div>
                                        </div>
                                        <div className={`d-flex align-items-center within-threshold ps-4 pe-4 ${cx("status-item")}`}>
                                            <div className="col-4 fs-1">
                                                <i className="fa-solid fa-circle-check"></i>
                                            </div>
                                            <div className="col-8 d-flex flex-column-reverse justify-content-evenly">
                                                <span>Đang hoạt động</span>
                                                <span>4</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className={`d-flex mt-2 ${cx("container")}`}>
                                    <div className={`col-4 ${cx("container-table")}`}>
                                        <table className="table table-bordered table-hover">
                                            <thead>
                                                <tr>
                                                    <th scope="col">Tên thiết bị</th>
                                                    <th scope="col">Camera</th>
                                                    <th scope="col">Trạng thái</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {devices.map((device, index) => (
                                                    <tr key={index}>
                                                        <td>{device.name}</td>
                                                        <td>0</td>
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