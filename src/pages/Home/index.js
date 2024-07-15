import { NavLink } from 'react-router-dom';
import classNames from 'classnames/bind';

import styles from './Home.module.scss'
import config from '~/router/config-router'
import { ChartBar } from '~/component/Chart';

const cx = classNames.bind(styles);

function Home() {
    return (
        <div className="w-100 ps-4 pe-4">
            <div className="pt-2">
                <div className={`w-100 d-flex justify-content-between p-2 ${cx("header-top")}`}>
                    <div className="d-flex align-items-center">
                        <select className={`form-select ${cx("select")}`} aria-label="Default select example">
                            <option value="">Chọn đơn vị</option>
                            <option value="1">One</option>
                            <option value="2">Two</option>
                            <option value="3">Three</option>
                        </select>
                        <span className={cx("title")}>Tình trạng kết nối (15/15)</span>
                    </div>
                    <div className={`d-flex align-items-center ${cx("status-bar")}`}>
                        <span className={cx("status-item", "signal-lost")}>Mất tín hiệu</span>
                        <span className={cx("status-item", "threshold-exceeded")}>Vượt ngưỡng</span>
                        <span className={cx("status-item", "threshold-warning")}>Chuẩn bị vượt</span>
                        <span className={cx("status-item", "within-threshold")}>Trong ngưỡng</span>
                    </div>
                </div>
                <div className="d-flex justify-content-around mt-3">
                    <button className={`col-5 ${cx("btn-custom")}`}>
                        <i className="fa-solid fa-water"></i>
                        <label>Nước sạch</label>
                    </button>
                    <button className={`col-5 ${cx("btn-custom")}`}>
                        <i className="fa-solid fa-water"></i>
                        <label>Nước thải</label>
                    </button>
                </div>
            </div>
            {/* Nước sạch */}
            <div className="w-100 mt-4">
                <div className="text-start">
                    <label className={cx("title")}>Nước Sạch (10/10)</label>
                </div>
                <div className="mt-2">
                    <div className="mb-3">
                        <div className="d-flex">
                            <div className="d-flex col-10">
                                <span>1.</span>
                                <span className="ms-2">Cấp nước Gia Định</span>
                                <span className="ms-2">(10/10)</span>
                            </div>
                            <div className="col-2">
                                <button className="w-100 text-end">
                                    <NavLink to={config.location} className={cx("nav-link")}>
                                        Bản đồ <i className="fa-solid fa-arrow-right-long fa-beat"></i>
                                    </NavLink>
                                </button>
                            </div>
                        </div>
                        <div className={`d-flex mt-2 ${cx("container")}`}>
                            <div className={`col-4 ${cx("container-table")}`}>
                                <table className="table table-bordered table-hover">
                                    <thead>
                                        <tr>
                                            <th scope="col">Tên thiết bị</th>
                                            <th scope="col">Trạng thái</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>Thiết bị 1</td>
                                            <td>
                                                <span className={cx("status")}></span>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Thiết bị 2</td>
                                            <td>
                                                <span className={cx("status")}></span>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Thiết bị 3</td>
                                            <td>
                                                <span className={cx("status")}></span>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Thiết bị 1</td>
                                            <td>
                                                <span className={cx("status")}></span>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Thiết bị 2</td>
                                            <td>
                                                <span className={cx("status")}></span>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Thiết bị 3</td>
                                            <td>
                                                <span className={cx("status")}></span>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Thiết bị 1</td>
                                            <td>
                                                <span className={cx("status")}></span>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Thiết bị 2</td>
                                            <td>
                                                <span className={cx("status")}></span>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Thiết bị 3</td>
                                            <td>
                                                <span className={cx("status")}></span>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div className="col-8">
                                <ChartBar />
                            </div>
                        </div>
                    </div>
                    <div className="mb-3">
                        <div className="d-flex">
                            <div className="d-flex col-10">
                                <span>2.</span>
                                <span className="ms-2">Nhà máy xử lý nước trung đoàn...</span>
                                <span className="ms-2">(10/10)</span>
                            </div>
                            <div className="col-2">
                                <button className="w-100 text-end">
                                    <NavLink to={config.location} className={cx("nav-link")}>
                                        Bản đồ <i className="fa-solid fa-arrow-right-long fa-beat"></i>
                                    </NavLink>
                                </button>
                            </div>
                        </div>
                        <div className={`d-flex ${cx("container")}`}>
                            <div className="col-4">
                                <table className="table table-bordered table-hover">
                                    <thead>
                                        <tr>
                                            <th scope="col">Tên thiết bị</th>
                                            <th scope="col">Trạng thái</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>Thiết bị 1</td>
                                            <td>
                                                <span className={cx("status")}></span>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Thiết bị 2</td>
                                            <td>
                                                <span className={cx("status")}></span>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Thiết bị 3</td>
                                            <td>
                                                <span className={cx("status")}></span>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div className="col-8">
                                <ChartBar />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Nước thải */}
            <div className="w-100 mt-4">
                <div className="text-start">
                    <label className={cx("title")}>Nước Thải (10/10)</label>
                </div>
                <div className="mt-2">
                    <div className="d-flex">
                        <div className="d-flex col-10">
                            <span>1.</span>
                            <span className="ms-2">Cấp nước Gia Định</span>
                            <span className="ms-2">(10/10)</span>
                        </div>
                        <div className="col-2">
                            <button className="w-100 text-end">
                                <NavLink to={config.location} className={cx("nav-link")}>
                                    Bản đồ <i className="fa-solid fa-arrow-right-long fa-beat"></i>
                                </NavLink>
                            </button>
                        </div>
                    </div>
                    <div className={`d-flex ${cx("container")}`}>
                        <div className="col-4">
                            <table className="table table-bordered table-hover">
                                <thead>
                                    <tr>
                                        <th scope="col">Tên thiết bị</th>
                                        <th scope="col">Trạng thái</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>Thiết bị 1</td>
                                        <td>
                                            <span className={cx("status")}></span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Thiết bị 2</td>
                                        <td>
                                            <span className={cx("status")}></span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Thiết bị 3</td>
                                        <td>
                                            <span className={cx("status")}></span>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className="col-8">
                            <ChartBar />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home;