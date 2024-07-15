import 'leaflet/dist/leaflet.css';
import classNames from "classnames/bind";
import React, { useEffect, useState, useCallback } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents, Tooltip, Popup, Circle } from 'react-leaflet';
import L from 'leaflet';

import styles from "./Map.module.scss";
import locationIcon from '~/assets/images/location-icon.png';
// import Tooltip from '~/assets/bootstrap/js/tooltip';

const cx = classNames.bind(styles);

function MapEvents({ onBoundsChange }) {
    useMapEvents({
        moveend: (event) => {
            const bounds = event.target.getBounds();
            onBoundsChange(bounds);
        },
        zoomend: (event) => {
            const bounds = event.target.getBounds();
            onBoundsChange(bounds);
        }
    });

    return null;
}

const Map = ({ onClickBtn, activeIndex }) => {
    const [machines, setMachines] = useState([]);
    const [visibleMachines, setVisibleMachines] = useState([]);

    useEffect(() => {
        fetch('https://api.maptiler.com/data/090afe88-bf4a-4c74-99f4-ac1b676c7944/features.json?key=VkLDjfAmKsJZt6TIJ6DG')
            .then(response => response.json())
            .then(data => {
                // Trích xuất thông tin cần thiết từ dữ liệu JSON
                const extractedMarkers = data.features.map(feature => ({
                    id: feature.id, // Lấy id
                    name: feature.properties.text,
                    latitude: feature.geometry.coordinates[1], // Lấy latitude
                    longitude: feature.geometry.coordinates[0], // Lấy longitude
                }));
                setMachines(extractedMarkers);
            })
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    const updateVisibleMachines = (bounds) => {
        const visible = machines.filter(machine =>
            bounds.contains([machine.latitude, machine.longitude])
        );
        setVisibleMachines(visible);
    };

    // di chuyển đến vị trí khi click vào listBtn
    const [map, setMap] = useState(null);
    const handleButtonClick = useCallback((machine) => {
        const { latitude, longitude } = machine;
        map.setView([latitude, longitude], 8);
        onClickBtn(machine);
    }, [map, onClickBtn])

    return (
        <div className={cx("map-container")} >
            <MapContainer
                center={[16.047079, 108.206230]}
                zoom={6}
                className={cx('map')}
                ref={setMap}
            >
                <TileLayer
                    url={`https://api.maptiler.com/maps/outdoor-v2/256/{z}/{x}/{y}@2x.png?key=VkLDjfAmKsJZt6TIJ6DG`}
                />
                {machines.map(machine => (
                    <React.Fragment key={machine.id}>
                        <Marker
                            key={machine.id}
                            position={[machine.latitude, machine.longitude]}
                            icon={L.icon({ iconUrl: locationIcon, iconSize: [41, 41], iconAnchor: [20.5, 40] })}
                        >
                            <Tooltip>
                                {machine.name}
                            </Tooltip>
                            <Popup className={cx('popup__margin')}>
                                <div className={cx("popup-container")}>
                                    <div className={cx("popup-content")}>
                                        <div className={cx("popup-title")}>{machine.name}</div>
                                        <div className={`d-flex ${cx("popup-content-item")}`}>
                                            <div className={cx("popup-content-item-title")}>Tung độ: </div>
                                            <div className={cx("popup-content-item-value")}>{machine.latitude}</div>
                                        </div>
                                        <div className={`d-flex ${cx("popup-content-item")}`}>
                                            <div className={cx("popup-content-item-title")}>Hoành độ:</div>
                                            <div className={cx("popup-content-item-value")}>{machine.longitude}</div>
                                        </div>
                                        <div className={cx("popup-content-item")}>
                                            <div className={cx("popup-content-item-title")}>Humidity</div>
                                        </div>
                                    </div>
                                </div>
                            </Popup>
                        </Marker>
                        <Circle
                            center={[machine.latitude, machine.longitude]} // Tọa độ trung tâm của vòng tròn
                            pathOptions={{ fillColor: 'blue', fillOpacity: 0.4 }} // Tuỳ chọn cho vòng tròn
                            radius={200} // Bán kính của vòng tròn tính bằng mét
                        />
                    </React.Fragment>
                ))}
                <MapEvents onBoundsChange={updateVisibleMachines} />
            </MapContainer>
            {/* <div className={cx("box-container")}>
                <div className={cx("box-container_input")}>
                    <div className="input-group">
                        <label className="input-group-text" htmlFor="inputGroupSelect01">Status</label>
                        <select className="custom-select" id="inputGroupSelect01">
                            <option value="">All</option>
                            <option value="1">test 1</option>
                            <option value="2">test 2</option>
                            <option value="3">test 3</option>
                        </select>
                    </div>
                    <div className="input-group mb-3">
                        <span className="input-group-text" id="inputGroup-sizing-default"><i className={`${cx('search-icon')} fa fa-search`} aria-hidden="true"></i> Name</span>
                        <input type="text" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" />
                    </div>
                </div>
                <div className={cx("box-container_content")}>
                    <ul className={cx('list-container')}>
                        {visibleMachines.map((machine) => (
                            <li key={machine.id} className={cx('list-item')}>
                                <button
                                    type="button"
                                    className={`${cx('list-item_btn')} ${activeIndex?.id === machine.id ? cx('active') : ''}`}
                                    onClick={() => handleButtonClick(machine)}
                                >
                                    {machine.name}
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            </div> */}
        </div>
    );
};

export default Map;
