import classNames from 'classnames/bind';
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

import styles from './Home.module.scss'
import { listLocations } from '~/services/LocationsServices';
import { PieChart } from '~/component/Chart';
import Detail from '~/component/Detail';
import { DataTestStatiton } from '~/DataTest';

const cx = classNames.bind(styles);

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

    const [selectedBoxId, setSelectedBoxId] = useState(DataTestStatiton[0]?.id || null);
    const [selectedBoxData, setSelectedBoxData] = useState(DataTestStatiton[0] || null);
    const handleBoxClick = (id) => {
        setSelectedBoxId(id);
    };

    useEffect(() => {
        const dataById = DataTestStatiton.find(item => item.id === selectedBoxId);
        setSelectedBoxData(dataById);
        console.log('Clicked box with id:', dataById);
    }, [selectedBoxId]);

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
                <aside className="row align-items-center mb-2">
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
                </aside>
                <div className='row mb-2'>
                    {DataTestStatiton.map((item) => (
                        <div key={item.id} className='col-2 cursor-pointer mb-3' onClick={() => handleBoxClick(item.id)}>
                            <div className={`w-100 bg-body-tertiary rounded-3 p-2 ${cx("box-item")}`}>
                                <PieChart className="w-100" data={item.dataset} />
                                <label className={`fw-bold fs-5 lh-base mt-3 ps-1 pe-1 ${cx("label-text")}`}>{item.name} ({item.deviceCount})</label>
                            </div>
                        </div>
                    ))}
                </div>
                {selectedBoxData && (
                    <motion.div
                        initial={{ y: 100, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.5 }}
                    >
                        <Detail data={selectedBoxData} />
                    </motion.div>)}
            </div>
        </>
    )
}

export default Home;