/* eslint-disable jsx-a11y/anchor-is-valid */
import { NavLink } from 'react-router-dom';
import React, { useState, useCallback } from 'react';

import classNames from 'classnames/bind';
import styles from './Detail.module.scss';
import config from '~/router/config-router'
import { ChartBar } from '~/component/Chart';
import { cam1, cam2, cam3, cam4 } from '~/assets/images';
import CameraPopup from '~/component/Popup/Camera';
import { statusClasses } from "~/common/statusClasses";

const cx = classNames.bind(styles);

const cameras = [
    { label: 'Cam 1', imageSrc: cam1, altText: 'Camera 1' },
    { label: 'Cam 2', imageSrc: cam2, altText: 'Camera 2' },
    { label: 'Cam 3', imageSrc: cam3, altText: 'Camera 3' },
    { label: 'Cam 4', imageSrc: cam4, altText: 'Camera 4' }
];
function Detail({ data }) {
    const [imgModal, setImgModal] = useState(null);
    const handleOpenModal = useCallback((img) => {
        setImgModal(img);
    }, []);
    return (
        <>
            <div className="mt-2 p-2 rounded-2" style={{ boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px' }}>
                <div className="mb-3">
                    <div className="">
                        <div className="d-flex align-items-center">
                            <div className={`d-flex col-10 fw-bold ${cx('device-info')}`}>
                                {/* <span className={cx('device-index')}>{idx + 1}</span> */}
                                <span className="ms-2 fs-5">{data[0]?.NameStation}</span>
                                {/* <span className="ms-2"> - 17/07/2024 - 03:52</span> */}
                            </div>
                            <div className='col-2 d-flex justify-content-between'>
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
                        {/* <div className={`d-flex align-items-center ${cx("status-bar")}`}>
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
                        </div> */}
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
                                    {data.map((device, index) => (
                                        <tr key={index}>
                                            <td>{device.NameDevice}</td>
                                            <td className='fs-5'>
                                                <i className={`bx ${index % 2 === 0 ? 'bxs-video-off' : 'bxs-video'}`}></i>
                                            </td>
                                            <td>
                                                <span className={cx("status", statusClasses[device.Status])}></span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div className="col-8">
                            <div className={cx("chart")}>
                                <ChartBar />
                            </div>
                            <div className={cx("nav-page")}>
                                <ul className="nav nav-underline">
                                    <li className="nav-item">
                                        <a className="nav-link active" href="#">Công suất</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" href="#">Áp lực</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link">Thời gian hoạt động</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <CameraPopup imageSrc={imgModal} />
        </>
    )
}

export default Detail;