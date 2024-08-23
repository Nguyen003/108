import classNames from "classnames/bind"
import { motion } from 'framer-motion';
import { NavLink } from 'react-router-dom';
import React, { useState, useCallback, useEffect } from 'react';
import axios from "axios";
import { useSelector } from 'react-redux';

import styles from "./Control.module.scss"
import config from '~/router/config-router'
import { cam1, cam2, cam3, cam4, sodo } from '~/assets/images';
import CameraPopup from '~/component/Popup/Camera';
import { useLightControl } from "~/hooks/useLightControl";
import { statusClasses } from "~/common/statusClasses";

const cx = classNames.bind(styles);

const cameras = [
    { label: 'Cam 1', imageSrc: cam1, altText: 'Camera 1' },
    { label: 'Cam 2', imageSrc: cam2, altText: 'Camera 2' },
    { label: 'Cam 3', imageSrc: cam3, altText: 'Camera 3' },
    { label: 'Cam 4', imageSrc: cam4, altText: 'Camera 4' }
];

function Control() {
    const { light1Status, light2Status, handleOnOffLight } = useLightControl();
    const [imgModal, setImgModal] = useState(null);
    const [stations, setStations] = useState(null);
    const [devices, setDevices] = useState(null);
    const unitValue = useSelector((state) => state.select.selectValueUnit);
    const fieldValue = useSelector((state) => state.select.selectValueField);

    const handleOpenModal = useCallback((img) => {
        setImgModal(img);
    }, []);

    const handleSelectChange = (code) => {
        fetchDevices(code);
    };

    const fetchStations = async () => {
        try {
            const response = await axios.get('/api/control/station', {
                params: { unit: unitValue, field: fieldValue }
            });

            const stationsData = response.data;
            setStations(stationsData);
            if (stationsData.length > 0) {
                const firstStationId = stationsData[0].StationCode;
                fetchDevices(firstStationId); // Lấy thiết bị cho trạm đầu tiên
            }
        } catch (err) {
            console.error('Error fetching stations:', err);
        }
    };

    const fetchDevices = async (id) => {
        try {
            const response = await axios.get('/api/control/device', {
                params: { stationCode: id }
            });
            const devicesData = response.data;
            setDevices(devicesData);
        } catch (err) {
            console.error('Error fetching devices:', err);
        }
    };

    useEffect(() => {
        fetchStations();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [unitValue, fieldValue]);

    if (stations && stations.length > 0) {
        return (
            <div>
                <motion.div
                    initial={{ y: -100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    <div className="mt-2 p-2 rounded-2">
                        <div className="">
                            <div className="">
                                <div className="d-flex align-items-center">
                                    <div className={`d-flex col-10 fw-bold ${cx('device-info')}`}>
                                        <select className="form-select ms-2 fs-5" onChange={(e) => handleSelectChange(e.target.value)}>
                                            {stations && stations.length > 0 ? (
                                                stations.map((device, index) => (
                                                    <option key={index} value={device.StationCode}>{device.Name}</option>
                                                ))
                                            ) : (
                                                <option value="">Không có dữ liệu</option>
                                            )}
                                        </select>
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
                                            <span>TB Đang hoạt động</span>
                                            <span>{devices?.[0]?.TotalActive ?? '0'}</span>
                                        </div>
                                    </div>
                                    <div className={`d-flex align-items-center threshold-exceeded ps-4 pe-4 ${cx("status-item")}`}>
                                        <div className="col-4 fs-1">
                                            <i className="fa-solid fa-triangle-exclamation"></i>
                                        </div>
                                        <div className="col-8 d-flex flex-column-reverse justify-content-evenly">
                                            <span>TB Dừng hoạt động</span>
                                            <span>{devices?.[0]?.TotalStopped ?? '0'}</span>
                                        </div>
                                    </div>
                                    <div className={`d-flex align-items-center threshold-warning ps-4 pe-4 ${cx("status-item")}`}>
                                        <div className="col-4 fs-1">
                                            <i className="fa-solid fa-circle-pause"></i>
                                        </div>
                                        <div className="col-8 d-flex flex-column-reverse justify-content-evenly">
                                            <span>TB Lỗi</span>
                                            <span>{devices?.[0]?.TotalError ?? '0'}</span>
                                        </div>
                                    </div>
                                    <div className={`d-flex align-items-center within-threshold ps-4 pe-4 ${cx("status-item")}`}>
                                        <div className="col-4 fs-1">
                                            <i className="fa-solid fa-circle-check"></i>
                                        </div>
                                        <div className="col-8 d-flex flex-column-reverse justify-content-evenly">
                                            <span>TB Mất tín hiệu</span>
                                            <span>{devices?.[0]?.TotalNoSignal ?? '0'}</span>
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
                                            {devices && devices.length > 0 ? (
                                                devices.map((device, index) => (
                                                    <tr key={index}>
                                                        <td>{device.NameDevice}</td>
                                                        <td className='fs-5'>
                                                            <i className={`bx ${index % 2 === 0 ? 'bxs-video-off' : 'bxs-video'}`}></i>
                                                        </td>
                                                        <td>
                                                            <span className={cx("status", statusClasses[device.Status])}></span>
                                                        </td>
                                                    </tr>
                                                ))
                                            ) : (
                                                <tr>
                                                    <td>Không có dữ liệu</td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                                <div className="col-8">
                                    <div className="d-flex pe-2">
                                        <button className="btn btn-primary ms-2" onClick={() => handleOnOffLight('LIGHT_1')}>
                                            {light1Status === 'Tắt' ? 'Bật' : 'Tắt'} bơm 1
                                        </button>
                                        <button className="btn btn-primary ms-2" onClick={() => handleOnOffLight('LIGHT_2')}>
                                            {light2Status === 'Tắt' ? 'Bật' : 'Tắt'} bơm 2
                                        </button>
                                    </div>
                                    <div className={cx("img-diagram")}>
                                        <img src={sodo} alt="Sơ đồ" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
                <CameraPopup imageSrc={imgModal} />
            </div>
        )
    } else {
        return (
            <div>
                <h4 className="w-100 text-center">Không có dữ liệu</h4>
            </div>
        )
    }
}
export default Control;