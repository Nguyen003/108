import classNames from "classnames/bind";
import { useLocation } from 'react-router-dom';
import React, { useEffect, useState, useCallback, useRef } from 'react';

import styles from "./Location.module.scss";
import Map from "~/component/Map";
import { listLocations } from '~/services/LocationsServices';

const cx = classNames.bind(styles);

const machineStatistics = [
    {
        id: 1,
        signalLostCount: 4,
        thresholdExceededCount: 3,
        thresholdWarningCount: 2,
        withinThresholdCount: 1,
    },
    {
        id: 2,
        signalLostCount: 4,
        thresholdExceededCount: 2,
        thresholdWarningCount: 1,
        withinThresholdCount: 5,
    },
    // Thêm các số liệu khác nếu cần
];

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

function Location() {
    const query = useQuery();
    const lat = parseFloat(query.get('lat'));
    const lon = parseFloat(query.get('lon'));
    //
    const [machines, setMachines] = useState([]);
    useEffect(() => {
        const getMachines = async () => {
            try {
                listLocations().then(data => {
                    setMachines(data)
                })
            } catch (error) {
                console.error('Component Map:', error);
            }
        };

        getMachines();
    }, []);
    // get địa điểm trong khung hình lên list
    const [visibleMachines, setVisibleMachines] = useState([]);
    const updateVisibleMachines = useCallback((bounds) => {
        const visible = machines.filter(machine =>
            bounds.contains([machine.latitude, machine.longitude])
        );
        setVisibleMachines(visible);
    }, [machines]);
    // di chuyển đến vị trí, get trạng thái khi click vào listBtn
    const activeButtonRef = useRef(null);
    const [map, setMap] = useState(null);
    const [selectedMachineData, setSelectedMachineData] = useState(null);
    const handleButtonClick = useCallback((machine, index) => {
        const { latitude, longitude } = machine;
        map.setView([latitude, longitude], 10);
        //
        const machineData = machineStatistics.find(data => data.id === index + 1);
        setSelectedMachineData(machineData);
        console.log(index)
        //
        activeButtonRef.current = machine.id;
    }, [map])

    return (
        <div className='d-flex'>
            <div className="position-relative flex-grow-1">
                <Map lat={lat} lon={lon} zoom={10} data={machines} mapEvent={updateVisibleMachines} setMap={setMap} />
                <div className='d-flex align-items-center position-absolute status-bar top-0 right-0'>
                    <span className="status-item signal-lost">Mất tín hiệu</span>
                    <span className="status-item threshold-exceeded">Lỗi</span>
                    <span className="status-item threshold-warning">Dừng hoạt động</span>
                    <span className="status-item within-threshold">Đang hoạt động</span>
                </div>
            </div>
            <div className="col-3 p-2">
                <div>
                    <div className={cx('title')}>
                        <span className="d-block">Trạng thái dữ liệu</span>
                    </div>
                    <div className={`d-flex flex-wrap align-items-center ${cx("status-bar")}`}>
                        <div className={`signal-lost_border ${cx("status-item")}`}>
                            <span>Mất tín hiệu</span>
                            <span>{selectedMachineData ? selectedMachineData.signalLostCount : 0}</span>
                        </div>
                        <div className={`threshold-exceeded_border ${cx("status-item")}`}>
                            <span>Lỗi</span>
                            <span>{selectedMachineData ? selectedMachineData.thresholdExceededCount : 0}</span>
                        </div>
                        <div className={`threshold-warning_border ${cx("status-item")}`}>
                            <span>Dừng hoạt động</span>
                            <span>{selectedMachineData ? selectedMachineData.thresholdWarningCount : 0}</span>
                        </div>
                        <div className={`within-threshold_border ${cx("status-item")}`}>
                            <span>Đang hoạt động</span>
                            <span>{selectedMachineData ? selectedMachineData.withinThresholdCount : 0}</span>
                        </div>
                    </div>
                    <div>
                        <div className={cx('title')}>
                            <span className="d-block">Tất cả</span>
                        </div>
                        <div className={cx('list-container')}>
                            <div className={`list-group list-group-flush ${cx('button-group')}`}>
                                {visibleMachines.map((item, index) => (
                                    <button
                                        key={index}
                                        onClick={() => handleButtonClick(item, index)}
                                        type="button"
                                        className={classNames(
                                            'list-group-item list-group-item-action',
                                            { 'active': item.id === activeButtonRef.current }
                                        )}
                                    >
                                        {item.name}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Location;