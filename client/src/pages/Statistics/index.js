import classNames from "classnames/bind";
// import { useLocation } from 'react-router-dom';
import React, { useEffect, useState, useCallback } from 'react';
import axios from "axios";
import { useSelector } from 'react-redux';
import moment from 'moment';
import 'moment/locale/vi';
import { DateRangePicker } from 'rsuite';

import styles from "./Statistics.module.scss";
import { ChartBarThongKe } from '~/component/Chart';
import Accordion from 'react-bootstrap/Accordion';

const cx = classNames.bind(styles);

function Location() {
    const [stations, setStations] = useState();
    const [dataDevice, setDataDevice] = useState();
    const [deviceTotal, setDeviceTotal] = useState();
    const [dataByDay, setDataByDay] = useState({ label: [], device1: [], device2: [], totaltime: [] });
    const unitValue = useSelector((state) => state.select.selectValueUnit);
    const fieldValue = useSelector((state) => state.select.selectValueField);
    const startOfWeek = moment().startOf('isoWeek').toDate(); // Thứ Hai
    const endOfWeek = new Date(); // Ngày hiện tại

    const fetchData = async () => {
        try {
            const stationsResponse = await axios.get('/api/home/station', {
                params: { unit: unitValue, field: fieldValue }
            });
            const dataDeviceResponse = await axios.get('/api/common/location');
            // console.log(stationsResponse.data.filter(x => x.StationCode === '03')[0])

            setStations(stationsResponse.data);
            setDeviceTotal(stationsResponse.data[0]);
            setDataDevice(dataDeviceResponse.data);

            if (stationsResponse.data.length > 0) {
                const firstStation = stationsResponse.data[0];
                setActiveButton(firstStation.StationName);
            }
        } catch (err) {
            console.error('Error fetching stations:', err);
        }
    };

    const fetchDataBieuDo = async (dateStart, dateEnd) => {
        try {
            const dataDeviceByDay = await axios.get('/api/common/statistics', {
                params: { dateStart: dateStart, dateEnd: dateEnd }
            });

            const device1 = dataDeviceByDay.data.map(x => x.device1);
            const device2 = dataDeviceByDay.data.map(x => x.device2);
            const totaltime = dataDeviceByDay.data.map(x => x.totaltime);
            const lable = dataDeviceByDay.data.map(x => x.TimeDay);

            setDataByDay({ label: lable, device1: device1, device2: device2, totaltime: totaltime });
        } catch (err) {
            console.error('Error fetching stations:', err);
        }
    }

    const [activeButton, setActiveButton] = useState(null);
    const handleButtonClick = useCallback((data) => {
        setDeviceTotal(stations.filter(x => x.StationCode === data.StationCode)[0]);
        setActiveButton(data.StationName);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [stations]); // Chỉ tạo lại hàm khi component mount

    useEffect(() => {
        console.log("start: " + startOfWeek + "; End:" + endOfWeek)
        fetchData();
        fetchDataBieuDo(moment(startOfWeek).format('YYYY-MM-DD'), moment(endOfWeek).format('YYYY-MM-DD'));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [unitValue, fieldValue])

    /// DateRangePicker 
    const handleDateChange = (date) => {
        if(date){
            fetchDataBieuDo(moment(date[0]).format('YYYY-MM-DD'), moment(date[1]).format('YYYY-MM-DD'));
        }
    };

    return (
        <div className='d-flex' style={{ height: '100vh' }}>
            <div className="d-flex flex-column w-100">
                <div className="d-flex justify-content-end pt-2">
                    <DateRangePicker format="dd/MM/yyyy" character=" – " onChange={handleDateChange} defaultValue={[startOfWeek, endOfWeek]} />
                </div>
                <div className="position-relative flex-grow-1">
                    <ChartBarThongKe data={dataByDay} type={activeButton === 'e66/Sư đoàn 10' ? 2 : 1} />
                </div>
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
                                    <Accordion.Header className={cx('header-list')}>Nước sạch</Accordion.Header>
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