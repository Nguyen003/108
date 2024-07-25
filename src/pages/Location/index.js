import classNames from "classnames/bind";
import { useLocation } from 'react-router-dom';
import React, { useEffect, useState, useCallback, useRef } from 'react';

import styles from "./Location.module.scss";
import Map from "~/component/Map";
import { listLocations } from '~/services/LocationsServices';
import Accordion from 'react-bootstrap/Accordion';

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
            <div className="col-3 pt-2 ps-2 pe-2">
                <div>
                    <div className={cx('title')}>
                        <span className="d-block">Trạng thái dữ liệu</span>
                    </div>
                    <div className={`d-flex flex-wrap align-items-center ${cx("status-bar")}`}>
                        <div className={`signal-lost position-relative ${cx("status-item")}`}>
                            <input className="form-check-input position-absolute" type="checkbox" value="" id="signalLost" defaultChecked={true} />
                            <label className="form-check-label d-flex flex-column justify-content-end h-100" htmlFor="signalLost">
                                <span className="mb-3">TB Mất tín hiệu</span>
                                <span className="mb-2">{selectedMachineData ? selectedMachineData.signalLostCount : 0}</span>
                            </label>
                        </div>
                        <div className={`threshold-exceeded position-relative ${cx("status-item")}`}>
                            <input className="form-check-input position-absolute" type="checkbox" value="" id="thresholdExceeded" defaultChecked={true} />
                            <label className="form-check-label d-flex flex-column justify-content-end h-100" htmlFor="thresholdExceeded">
                                <span className="mb-3">TB Lỗi</span>
                                <span className="mb-2">{selectedMachineData ? selectedMachineData.thresholdExceededCount : 0}</span>
                            </label>
                        </div>
                        <div className={`threshold-warning position-relative ${cx("status-item")}`}>
                            <input className="form-check-input position-absolute" type="checkbox" value="" id="thresholdWarning" defaultChecked={true} />
                            <label className="form-check-label d-flex flex-column justify-content-end h-100" htmlFor="thresholdWarning">
                                <span className="mb-3">TB Dừng hoạt động</span>
                                <span className="mb-2">{selectedMachineData ? selectedMachineData.thresholdWarningCount : 0}</span>
                            </label>
                        </div>
                        <div className={`within-threshold position-relative ${cx("status-item")}`}>
                            <input className="form-check-input position-absolute" type="checkbox" value="" id="withinThreshold" defaultChecked={true} />
                            <label className="form-check-label d-flex flex-column justify-content-end h-100" htmlFor="withinThreshold">
                                <span className="mb-3">TB Đang hoạt động</span>
                                <span className="mb-2">{selectedMachineData ? selectedMachineData.withinThresholdCount : 0}</span>
                            </label>
                        </div>
                    </div>
                    <div>
                        <div className={cx('title')}>
                            <span className="d-block">Tất cả</span>
                        </div>
                        <div className={cx('list-container')}>
                            <div className="input-group rounded mt-2 mb-2 position-relative pe-1">
                                <input type="search" className="form-control rounded bg-transparent ps-5" placeholder="Search" aria-label="Search" aria-describedby="search-addon" />
                                <span className="input-group-text h-100 border-0 bg-transparent position-absolute" id="search-addon">
                                    <i className="fas fa-search"></i>
                                </span>
                            </div>
                            <Accordion defaultActiveKey="0" className={cx("accordion-container")}>
                                <Accordion.Item eventKey="0">
                                    <Accordion.Header>Nước sạch</Accordion.Header>
                                    <Accordion.Body>
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
                                    </Accordion.Body>
                                </Accordion.Item>
                            </Accordion>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Location;