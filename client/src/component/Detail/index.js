/* eslint-disable jsx-a11y/anchor-is-valid */
import { NavLink } from 'react-router-dom';
import React, { useState, useCallback, useEffect } from 'react';
import axios from 'axios';

import classNames from 'classnames/bind';
import styles from './Detail.module.scss';
import config from '~/router/config-router'
import { ChartBar, ChartLine, ChartBarLuuLuongNuoc } from '~/component/Chart';
import { cam1, cam2, cam3, cam4 } from '~/assets/images';
import CameraPopup from '~/component/Popup/Camera';
import { statusClasses } from "~/common/statusClasses";
import TabsContainer from '../Tabs/TabsContainer';

const cx = classNames.bind(styles);

const cameras = [
    { label: 'Cam 1', imageSrc: cam1, altText: 'Camera 1' },
    { label: 'Cam 2', imageSrc: cam2, altText: 'Camera 2' },
    { label: 'Cam 3', imageSrc: cam3, altText: 'Camera 3' },
    { label: 'Cam 4', imageSrc: cam4, altText: 'Camera 4' }
];
function Detail({ data }) {
    const [imgModal, setImgModal] = useState(null);
    const [dataMucNuoc, setDataMucNuoc] = useState(null);
    const [dataLuuLuongNuoc, setDataLuuLuongNuoc] = useState(null);
    const [dataTrangThai, setDataTrangThai] = useState({ device1: [], device2: [], totaltime: [] });
    const tabs = ['Thời gian bơm hoạt động', 'Lưu lượng nước', 'Mực nước'];
    const panels = [
        <ChartBar key="bar" data={dataTrangThai} type={data[0]?.NameStation === 'e66/Sư đoàn 10' ? 2 : 1}/>,
        <ChartBarLuuLuongNuoc key="bar" data={dataLuuLuongNuoc} />,
        <ChartLine data={dataMucNuoc} />
    ];

    const handleOpenModal = useCallback((img) => {
        setImgModal(img);
    }, []);
    const getCurrentDate = () => {
        const today = new Date();
        const day = String(today.getDate()).padStart(2, '0');
        const month = String(today.getMonth() + 1).padStart(2, '0'); // Tháng bắt đầu từ 0 nên cần +1
        const year = today.getFullYear();
        return `${year}-${month}-${day}`;
    };

    const fetchData = async (date) => {

        try {
            // Sử dụng Promise.all để đợi cả hai API cùng lúc
            const [mucNuocResponse, luuLuongNuocResponse, trangThaiResponse] = await Promise.all([
                axios.get('/api/home/mucnuoc', { params: { date: date } }),
                axios.get('/api/home/luuluongnuoc', { params: { date: date } }),
                axios.get('/api/home/trangthai', { params: { date: date } })
            ]);

            // Gán dữ liệu vào state sau khi cả hai API đã hoàn thành
            const mucNuocData = mucNuocResponse.data.map(item => item.AverageFlow);
            const luuLuongNuocData = luuLuongNuocResponse.data.map(item => item.AverageFlow);
            const trangThaiDevice1 = trangThaiResponse.data.map(item => item.device1);
            const trangThaiDevice2 = trangThaiResponse.data.map(item => item.device2);
            const totaltime = trangThaiResponse.data.map(item => item.totaltime);

            setDataMucNuoc(mucNuocData);
            setDataLuuLuongNuoc(luuLuongNuocData);
            setDataTrangThai({ device1: trangThaiDevice1, device2: trangThaiDevice2, totaltime: totaltime });

        } catch (err) {
            console.error('Lỗi khi fetch dữ liệu:', err);
        }
    };
    useEffect(() => {
        const currentDate = getCurrentDate();
        fetchData(currentDate);
        // Thiết lập interval để gọi API mỗi 10 phút
        const intervalId = setInterval(() => {
            fetchData(currentDate);
        }, 600000);

        // Cleanup function khi component unmount
        return () => clearInterval(intervalId);
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
                    </div>
                    <div className={`d-flex mt-2 ${cx("container")}`}>
                        <div className={`col-3 ${cx("container-table")}`}>
                            <table className="table table-bordered table-hover">
                                <thead>
                                    <tr>
                                        <th scope="col">Tên thiết bị</th>
                                        {/* <th scope="col">Camera</th> */}
                                        <th scope="col">Trạng thái</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data.map((device, index) => (
                                        <tr key={index}>
                                            <td>{device.NameDevice}</td>
                                            {/* <td className='fs-5'>
                                                <i className={`bx ${index % 2 === 0 ? 'bxs-video-off' : 'bxs-video'}`}></i>
                                            </td> */}
                                            <td>
                                                <span className={cx("status", statusClasses[device.StatusStation === 'NS' ? 'NS' : device.Status])}></span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div className="col-9 ps-1">
                            <TabsContainer tabs={tabs} panels={panels} />
                        </div>
                    </div>
                </div>
            </div>
            <CameraPopup imageSrc={imgModal} />
        </>
    )
}

export default Detail;