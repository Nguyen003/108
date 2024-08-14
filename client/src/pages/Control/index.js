import classNames from "classnames/bind"
import { NavLink } from 'react-router-dom';
import React, { useState, useCallback } from 'react';

import styles from "./Control.module.scss"
import config from '~/router/config-router'
import { cam1, cam2, cam3, cam4, sodo } from '~/assets/images';
import CameraPopup from '~/component/Popup/Camera';

const cx = classNames.bind(styles);

const devices = [
    { name: 'Tủ điện 1', status: 'signal-lost' },
    { name: 'Tủ điện 2', status: 'threshold-exceeded' },
    { name: 'Tủ điện 3', status: 'threshold-warning' },
    { name: 'Tủ điện 1', status: 'signal-lost' },
    { name: 'Tủ điện 2', status: 'threshold-exceeded' },
    { name: 'Tủ điện 3', status: 'signal-lost' },
    { name: 'Tủ điện 1', status: 'within-threshold' },
    { name: 'Tủ điện 2', status: 'signal-lost' },
    { name: 'Tủ điện 3', status: 'threshold-exceeded' },
    { name: 'Tủ điện 2', status: 'within-threshold' }
];

const cameras = [
    { label: 'Cam 1', imageSrc: cam1, altText: 'Camera 1' },
    { label: 'Cam 2', imageSrc: cam2, altText: 'Camera 2' },
    { label: 'Cam 3', imageSrc: cam3, altText: 'Camera 3' },
    { label: 'Cam 4', imageSrc: cam4, altText: 'Camera 4' }
];

function Control() {
    const [imgModal, setImgModal] = useState(null);
    const handleOpenModal = useCallback((img) => {
        setImgModal(img);
    }, []);

    return (
        <div>
            <div className="mt-2 p-2 rounded-2">
                <div className="">
                    <div className="">
                        <div className="d-flex align-items-center">
                            <div className={`d-flex col-10 fw-bold ${cx('device-info')}`}>
                                {/* <span className={cx('device-index')}>{idx + 1}</span> */}
                                <select className="form-select ms-2 fs-5">
                                    <option>Tên Trạm</option>
                                </select>
                                {/* <span className="ms-2"> - 17/07/2024 - 03:52</span> */}
                            </div>
                            <div className='col-2 d-flex justify-content-evenly'>
                                <button className="btn btn-light p-2 border rounded">
                                    <NavLink to={{
                                        pathname: config.location,
                                        search: `?lat=16.047079&lon=108.206230`
                                    }} className={cx("nav-link")}>
                                        Bản đồ <i className="fa-solid fa-map-location-dot"></i>
                                    </NavLink>
                                </button>
                                <div className="btn-group">
                                    <button type="button" className="btn btn-light p-2 border rounded dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                                        Camera <i className="fa-solid fa-video"></i>
                                    </button>
                                    <ul className="dropdown-menu" style={{ cursor: 'pointer' }}>
                                        {cameras.map((camera, index) => (
                                            <li key={index} className="dropdown-item" data-bs-toggle="modal" data-bs-target="#cameraModal" onClick={() => handleOpenModal(camera.imageSrc)}>
                                                {camera.label}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className={`d-flex align-items-center ${cx("status-bar")}`}>
                            <div className={`d-flex align-items-center signal-lost ps-4 pe-4 ${cx("status-item")}`}>
                                <div className="col-4 fs-1">
                                    <i className="fa-regular fa-circle-xmark"></i>
                                </div>
                                <div className="col-8 d-flex flex-column-reverse justify-content-evenly">
                                    <span>TB Mất tín hiệu</span>
                                    <span>8</span>
                                </div>
                            </div>
                            <div className={`d-flex align-items-center threshold-exceeded ps-4 pe-4 ${cx("status-item")}`}>
                                <div className="col-4 fs-1">
                                    <i className="fa-solid fa-triangle-exclamation"></i>
                                </div>
                                <div className="col-8 d-flex flex-column-reverse justify-content-evenly">
                                    <span>TB Lỗi</span>
                                    <span>2</span>
                                </div>
                            </div>
                            <div className={`d-flex align-items-center threshold-warning ps-4 pe-4 ${cx("status-item")}`}>
                                <div className="col-4 fs-1">
                                    <i className="fa-solid fa-circle-pause"></i>
                                </div>
                                <div className="col-8 d-flex flex-column-reverse justify-content-evenly">
                                    <span>TB Dừng hoạt động</span>
                                    <span>3</span>
                                </div>
                            </div>
                            <div className={`d-flex align-items-center within-threshold ps-4 pe-4 ${cx("status-item")}`}>
                                <div className="col-4 fs-1">
                                    <i className="fa-solid fa-circle-check"></i>
                                </div>
                                <div className="col-8 d-flex flex-column-reverse justify-content-evenly">
                                    <span>TB Đang hoạt động</span>
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
                            <div className="d-flex pe-2">
                                <button className="btn btn-primary ms-2">
                                    Bật
                                </button>
                                <button className="btn btn-primary ms-2">
                                    Tắt
                                </button>
                            </div>
                            <div className={cx("img-diagram")}>
                                <img src={sodo} alt="Sơ đồ" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <CameraPopup imageSrc={imgModal} />
        </div>
    )
}
export default Control;