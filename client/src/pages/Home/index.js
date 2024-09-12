import classNames from 'classnames/bind';
import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import { useSelector } from 'react-redux';

import styles from './Home.module.scss'
import { PieChart } from '~/component/Chart';
import Detail from '~/component/Detail';

const cx = classNames.bind(styles);

function Home() {
    const [stations, setStations] = useState([]);
    const [devices, setDevices] = useState([]);
    const selectedStationIdRef = useRef(null);
    const unitValue = useSelector((state) => state.select.selectValueUnit);
    const fieldValue = useSelector((state) => state.select.selectValueField);

    const fetchStations = async () => {
        try {
            const response = await axios.get('/api/home/station', {
                params: { unit: unitValue, field: fieldValue }
            });

            const stationsData = response.data;
            setStations(stationsData);
            if(selectedStationIdRef.current === null) {
                console.log('Lần đâu: ', selectedStationIdRef.current);
                const firstStationId = stationsData?.[0]?.StationCode ?? null;
                fetchDevices(firstStationId); // Lấy thiết bị cho trạm đầu tiên
            }

            if(selectedStationIdRef.current != null) {
                console.log('cập nhật: ', stationsData.some(station => station.StationCode === selectedStationIdRef.current));
                fetchDevices(selectedStationIdRef.current); // Lấy thiết bị cho trạm đầu tiên
            }
        } catch (err) {
            console.error('Error fetching stations:', err);
        }
    };
    const fetchDevices = async (id) => {
        try {
            const response = await axios.get('/api/home/device', {
                params: { stationCode: id }
            });
            const devicesData = response.data;
            setDevices(devicesData);
        } catch (err) {
            console.error('Error fetching devices:', err);
        }
    };

    const handleBoxClick = (id) => {
        fetchDevices(id);
        selectedStationIdRef.current = id;
    };

    useEffect(() => {
        selectedStationIdRef.current = null;
        fetchStations();

        // Tạo interval để gọi fetchStations mỗi 2 phút (120000 milliseconds)
        const interval = setInterval(() => {
            fetchStations();
        }, 5000); // 120000 ms = 2 phút

        // Cleanup interval khi component unmount hoặc khi unitValue, fieldValue thay đổi
        return () => clearInterval(interval);
        
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [unitValue, fieldValue]);

    if (stations && stations.length > 0) {
        return (
            <>
                <div className='w-100 d-flex'>
                    <div className='w-100 d-flex align-items-center'>
                        <span className="status-item within-threshold">Đang hoạt động</span>
                        <span className="status-item threshold-warning">Dừng hoạt động</span>
                        <span className="status-item threshold-exceeded">Lỗi</span>
                        <span className="status-item signal-lost">Mất tín hiệu</span>
                    </div>
                </div>
                <div className={`ps-4 pe-4 pt-2 pb-2 d-flex flex-column ${cx('content-right')}`}>
                    <div className='row mb-2'>
                        {stations.map((item) => (
                            <div key={item.StationCode} className='col-2 cursor-pointer mb-3' onClick={() => handleBoxClick(item.StationCode)}>
                                <div className={`w-100 bg-body-tertiary rounded-3 p-2 ${cx("box-item")}`}>
                                    <PieChart className="w-100" data={item} />
                                    <label className={`fw-bold fs-5 lh-base mt-3 ps-1 pe-1 ${cx("label-text")}`}>{item.StationName} ({item.TotalDevices})</label>
                                </div>
                            </div>
                        ))}
                    </div>
                    <motion.div
                        initial={{ y: 100, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.5 }}
                    >
                        <Detail data={devices} />
                    </motion.div>

                </div>
            </>
        )
    } else {
        return (
            <>
                <div className='w-100 d-flex'>
                    <div className='w-100 d-flex align-items-center'>
                        <span className="status-item within-threshold">Đang hoạt động</span>
                        <span className="status-item threshold-warning">Dừng hoạt động</span>
                        <span className="status-item threshold-exceeded">Lỗi</span>
                        <span className="status-item signal-lost">Mất tín hiệu</span>
                    </div>
                </div>
                <div className={`ps-4 pe-4 pt-2 pb-2 d-flex flex-column ${cx('content-right')}`}>
                    <h4 className="w-100 text-center">Không có dữ liệu</h4>
                </div>
            </>
        )
    }
}

export default Home;