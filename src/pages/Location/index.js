import classNames from "classnames/bind";
import { useLocation } from 'react-router-dom';

import styles from "./Location.module.scss";
import Map from "~/component/Map";

const cx = classNames.bind(styles);

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

function Location() {
    const query = useQuery();
    const lat = parseFloat(query.get('lat'));
    const lon = parseFloat(query.get('lon'));

    return (
        <div className='d-flex'>
            <div className="position-relative flex-grow-1">
                <Map lat={lat} lon={lon} zoom={10} />
                <div className='d-flex align-items-center position-absolute status-bar top-0 right-0'>
                    <span className="status-item signal-lost">Mất tín hiệu</span>
                    <span className="status-item threshold-exceeded">Vượt ngưỡng</span>
                    <span className="status-item threshold-warning">Chuẩn bị vượt</span>
                    <span className="status-item within-threshold">Trong ngưỡng</span>
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
                            <span>8</span>
                        </div>
                        <div className={`threshold-exceeded_border ${cx("status-item")}`}>
                            <span>Vượt ngưỡng</span>
                            <span>2</span>
                        </div>
                        <div className={`threshold-warning_border ${cx("status-item")}`}>
                            <span>Chuẩn bị vượt</span>
                            <span>3</span>
                        </div>
                        <div className={`within-threshold_border ${cx("status-item")}`}>
                            <span>Trong ngưỡng</span>
                            <span>4</span>
                        </div>
                    </div>
                    <div>
                        <div className={cx('title')}>
                            <span className="d-block">Tất cả</span>
                        </div>
                        <div className={cx('list-container')}>
                            <div className={`list-group list-group-flush ${cx('button-group')}`}>
                                <button type="button" className="list-group-item list-group-item-action">The current button</button>
                                <button type="button" className="list-group-item list-group-item-action">A second button item</button>
                                <button type="button" className="list-group-item list-group-item-action">A third button item</button>
                                <button type="button" className="list-group-item list-group-item-action">A fourth button item</button>
                                <button type="button" className="list-group-item list-group-item-action">A disabled button item</button>
                                <button type="button" className="list-group-item list-group-item-action">A disabled button item</button>
                                <button type="button" className="list-group-item list-group-item-action">A disabled button item</button>
                                <button type="button" className="list-group-item list-group-item-action">A disabled button item</button>
                                <button type="button" className="list-group-item list-group-item-action">A disabled button item</button>
                                <button type="button" className="list-group-item list-group-item-action">A disabled button item</button>
                                <button type="button" className="list-group-item list-group-item-action">A disabled button item</button>
                                <button type="button" className="list-group-item list-group-item-action">A disabled button item</button>
                                <button type="button" className="list-group-item list-group-item-action">A disabled button item</button>
                                <button type="button" className="list-group-item list-group-item-action">A disabled button item</button>
                                <button type="button" className="list-group-item list-group-item-action">A disabled button item</button>
                                <button type="button" className="list-group-item list-group-item-action">A disabled button item</button>
                                <button type="button" className="list-group-item list-group-item-action">A disabled button item</button>
                                <button type="button" className="list-group-item list-group-item-action">A disabled button item</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Location;