import classNames from "classnames/bind";
// import { useLocation } from 'react-router-dom';
import React, { useEffect, useState, useCallback } from 'react';
import axios from "axios";
import { useSelector } from 'react-redux';

import styles from "./Location.module.scss";
// import Map from "~/component/Map";
// import { listLocations } from '~/services/LocationsServices';
import Accordion from 'react-bootstrap/Accordion';
import imageMapping from '~/common/imgMapping'

const cx = classNames.bind(styles);

function Location() {
    const [imgLocation, setImgLocation] = useState();
    const [stations, setStations] = useState();
    const [dataDevice, setDataDevice] = useState();
    const [deviceTotal, setDeviceTotal] = useState();
    const unitValue = useSelector((state) => state.select.selectValueUnit);
    const fieldValue = useSelector((state) => state.select.selectValueField);

    const fetchData = async () => {
        try {
            const stationsResponse = await axios.get('/api/home/station', {
                params: { unit: unitValue, field: fieldValue }
            });
            const dataDeviceResponse = await axios.get('/api/common/location');
            console.log(stationsResponse.data.filter(x => x.StationCode === '03')[0])
            setStations(stationsResponse.data);
            setDeviceTotal(stationsResponse.data[0]);
            setDataDevice(dataDeviceResponse.data);

            if (stationsResponse.data.length > 0) {
                const firstStation = stationsResponse.data[0];
                setActiveButton(firstStation.StationName);
                setImgLocation(firstStation.Location);
            }
        } catch (err) {
            console.error('Error fetching stations:', err);
        }
    };

    const [activeButton, setActiveButton] = useState(null);
    const handleButtonClick = useCallback((data) => {
        setDeviceTotal(stations.filter(x => x.StationCode === data.StationCode)[0]);
        setActiveButton(data.StationName);
        setImgLocation(data.Location)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [stations]); // Chỉ tạo lại hàm khi component mount

    useEffect(() => {
        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [unitValue, fieldValue])

    return (
        <div className='d-flex'>
            <div className="position-relative flex-grow-1">
                {/* <Map lat={lat} lon={lon} zoom={10} data={machines} mapEvent={updateVisibleMachines} setMap={setMap} /> */}
                <img className="w-100 object-fit-cover" src={imageMapping[imgLocation]} alt='bản đồ' style={{ height: '100vh', }} />
                {/* <div className='d-flex align-items-center position-absolute status-bar top-0 right-0'>
                    <span className="status-item signal-lost">Mất tín hiệu</span>
                    <span className="status-item threshold-exceeded">Lỗi</span>
                    <span className="status-item threshold-warning">Dừng hoạt động</span>
                    <span className="status-item within-threshold">Đang hoạt động</span>
                </div> */}
            </div>
            <div className="col-3 pt-2 ps-2 pe-2">
                <div>
                    <div className={cx('title')}>
                        <span className="d-block">Trạng thái</span>
                    </div>
                    <div className={`d-flex flex-wrap align-items-center ${cx("status-bar")}`}>
                        <div className={`within-threshold position-relative ${cx("status-item")}`}>
                            {/* <input className="form-check-input position-absolute" type="checkbox" value="" id="signalLost" defaultChecked={true} /> */}
                            <label className="form-check-label d-flex flex-column justify-content-end h-100" htmlFor="withinThreshold">
                                <span className="mb-3">Đang hoạt động</span>
                                <span className="mb-2">{deviceTotal?.Status === 'NS' ?? 0 ? 0 : deviceTotal?.TotalActive ?? 0}</span>
                            </label>
                        </div>
                        <div className={`threshold-warning position-relative ${cx("status-item")}`}>
                            {/* <input className="form-check-input position-absolute" type="checkbox" value="" id="thresholdExceeded" defaultChecked={true} /> */}
                            <label className="form-check-label d-flex flex-column justify-content-end h-100" htmlFor="thresholdWarning">
                                <span className="mb-3">Dừng hoạt động</span>
                                <span className="mb-2">{deviceTotal?.Status === 'NS' ?? 0 ? 0 : deviceTotal?.TotalStopped ?? 0}</span>
                            </label>
                        </div>
                        <div className={`border position-relative ${cx("status-item")}`}>
                            {/* <input className="form-check-input position-absolute" type="checkbox" value="" id="thresholdWarning" defaultChecked={true} /> */}
                            <label className="form-check-label d-flex flex-column justify-content-end h-100" htmlFor="thresholdWarning">
                                <span className="mb-3 text-black">Mực nước</span>
                                <span className="mb-2 text-black">{dataDevice ? dataDevice[0]?.MucNuoc : 0} m</span>
                            </label>
                        </div>
                        <div className={`border position-relative ${cx("status-item")}`}>
                            {/* <input className="form-check-input position-absolute" type="checkbox" value="" id="withinThreshold" defaultChecked={true} /> */}
                            <label className="form-check-label d-flex flex-column justify-content-end h-100" htmlFor="thresholdWarning">
                                <span className="mb-3 text-black">Lưu lượng nước</span>
                                <span className="mb-2 text-black">{dataDevice ? dataDevice[0]?.LuuLuongNuoc : 0} m³/h</span>
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
                                            {stations?.map((item, index) => (
                                                <button
                                                    key={index}
                                                    onClick={() => handleButtonClick(item)}
                                                    type="button"
                                                    className={classNames(
                                                        'list-group-item list-group-item-action',
                                                        { 'active': item.StationName === activeButton }
                                                    )}
                                                >
                                                    {item.StationName}
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