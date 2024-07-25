import 'leaflet/dist/leaflet.css';
import classNames from "classnames/bind";
import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents, Tooltip, Popup, Circle } from 'react-leaflet';
import L from 'leaflet';

import styles from "./Map.module.scss";
import locationIcon from '~/assets/images/location-icon.png';

const cx = classNames.bind(styles);

function MapEvents({ onBoundsChange }) {
    const map = useMapEvents({
        moveend: (event) => {
            const bounds = event.target.getBounds();
            onBoundsChange(bounds);
        },
        zoomend: (event) => {
            const bounds = event.target.getBounds();
            onBoundsChange(bounds);
        }
    });

    useEffect(() => {
        if (map) {
            const bounds = map.getBounds();
            onBoundsChange(bounds);
        }
    }, [map, onBoundsChange]);

    return null;
}

const Map = ({ lat, lon, zoom, ...props }) => {

    if (!lat && !lon) {
        lat = 16.047079;
        lon = 108.206230;
        zoom = 6;
    }

    return (
        <div className={cx("map-container")} >
            <MapContainer
                center={[lat, lon]}
                zoom={zoom}
                className={cx('map')}
                ref={props.setMap}
            >
                <TileLayer
                    url={`https://api.maptiler.com/maps/outdoor-v2/256/{z}/{x}/{y}@2x.png?key=VkLDjfAmKsJZt6TIJ6DG`}
                />
                {props.data.map(machine => (
                    <React.Fragment key={machine.id}>
                        <Marker
                            key={machine.id}
                            position={[machine.latitude, machine.longitude]}
                            icon={L.icon({ iconUrl: locationIcon, iconSize: [41, 41], iconAnchor: [20.5, 40] })}
                        >
                            <Tooltip>
                                {machine.name}
                            </Tooltip>
                            {/* <Popup className={cx('popup__margin')}>
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
                            </Popup> */}
                            <Popup>
                                <div>
                                    <h2 className="card-title text-primary">NM Hồ Hoàn Kiếm</h2>
                                    <p className="text-muted mt-2 mb-2">Kinh độ: 105.852153 - Vĩ độ: 21.030555</p>
                                    <p className="text-muted mt-2 mb-2">Địa chỉ: Hoàn Kiếm, Hà Nội, Việt Nam</p>
                                    <p className="text-muted mt-2 mb-2">Thời gian: 15/12/2021 13:10</p>
                                    <table className="table mt-2 table-bordered">
                                        <thead>
                                            <tr>
                                                <th scope="col">#</th>
                                                <th scope="col">Thông số</th>
                                                <th scope="col">Giá trị</th>
                                                <th scope="col">Đơn vị</th>
                                                <th scope="col">Trạng thái thiết bị</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>1</td>
                                                <td>pH</td>
                                                <td>7.34</td>
                                                <td>-</td>
                                                <td><span className="text-success">●</span></td>
                                            </tr>
                                            <tr>
                                                <td>2</td>
                                                <td>Temp</td>
                                                <td>23.66</td>
                                                <td>°C</td>
                                                <td><span className="text-success">●</span></td>
                                            </tr>
                                            <tr>
                                                <td>3</td>
                                                <td>BOD</td>
                                                <td>4.48</td>
                                                <td>mg/l</td>
                                                <td><span className="text-success">●</span></td>
                                            </tr>
                                            <tr>
                                                <td>4</td>
                                                <td>COD</td>
                                                <td>10.90</td>
                                                <td>mg/l</td>
                                                <td><span className="text-success">●</span></td>
                                            </tr>
                                        </tbody>
                                    </table>
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
                <MapEvents onBoundsChange={props.mapEvent} />
            </MapContainer>
        </div>
    );
};

export default Map;
