import classNames from 'classnames/bind';
import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';

import styles from './Home.module.scss'
// import { listLocations } from '~/services/LocationsServices';
import { PieChart } from '~/component/Chart';
import Detail from '~/component/Detail';

const cx = classNames.bind(styles);

function Home() {
    // const [machines, setMachines] = useState([]);
    // useEffect(() => {
    //     const getMachines = async () => {
    //         try {
    //             const data = await listLocations();
    //             setMachines(data);
    //         } catch (error) {
    //             console.error('Error fetching machines:', error);
    //         }
    //     };

    //     getMachines();
    // }, []);

    const [stations, setStations] = useState([]);
    const [devices, setDevices] = useState([]);

    const fetchStations = async () => {
        try {
            const response = await axios.get('/api/home/station', {
                params: { unit: '001', field: 'NS' }
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
    };

    useEffect(() => {
        fetchStations();
    }, []);

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
                {/* <aside className="row align-items-center mb-2">
                    <div className='col-6 text-start mb-1 mt-1 pe-2'>
                        <label className='fw-bold fs-6'>Đơn vị</label>
                        <select className={`form-select ${cx("select")}`} aria-label="Default select example">
                            <option value="">Chọn đơn vị</option>
                            <option value="1">Đơn vị 1</option>
                            <option value="2">Đơn vị 2</option>
                            <option value="3">Đơn vị 3</option>
                        </select>
                    </div>
                    <div className='col-6 text-start mb-1 mt-1 ps-2'>
                        <label className='fw-bold fs-6'>Lĩnh vực</label>
                        <select className={`form-select ${cx("select")}`} aria-label="Default select example">
                            <option value="">Chọn lĩnh vực</option>
                            <option value="1">Nước thải</option>
                            <option value="2">Nước sạch</option>
                        </select>
                    </div>
                </aside> */}
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
}

export default Home;