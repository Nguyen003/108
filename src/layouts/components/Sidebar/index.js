import 'bootstrap/dist/css/bootstrap.min.css';
import { NavLink } from 'react-router-dom';

import classNames from 'classnames/bind';
import styles from './Sidebar.module.scss'
import config from '~/router/config-router'
import logo from '~/assets/images/logo.png'

const cx = classNames.bind(styles);

function Sidebar() {
    return (
        <div className={cx('sidebar-menu')}>
            <div className={cx('logo')}>
                <img src={logo} alt="Logo" />
            </div>
            <div className="d-flex flex-column">
                <aside className={`mb-3 pb-2 ${cx('sidebar-nav', 'menu')}`}>
                    <div className={`h-100 mb-2 ${cx('menu-content')}`}>
                        <nav>
                            <NavLink
                                to={config.home}
                                className={(nav) => cx('sidebar-nav-link', { active: nav.isActive })}
                            >
                                <i className="fas fa-tachometer-alt"></i>
                                <span className={cx('title')}>Giám sát tổng quan</span>
                            </NavLink>
                        </nav>
                        <nav>
                            <NavLink
                                to={config.location}
                                className={(nav) => cx('sidebar-nav-link', { active: nav.isActive })}
                            >
                                <i className="fas fa-user"></i>
                                <span className={cx('title')}>Bản đồ</span>
                            </NavLink>
                        </nav>
                    </div>
                </aside>
                {/* <aside className={cx('sidebar-nav', 'select')}>
                    <div className='mb-2'>
                        <select className={`form-select ${cx("select")}`} aria-label="Default select example">
                            <option value="">Chọn đơn vị</option>
                            <option value="1">Đơn vị 1</option>
                            <option value="2">Đơn vị 2</option>
                            <option value="3">Đơn vị 3</option>
                        </select>
                    </div>
                    <div className='mb-2'>
                        <select className={`form-select ${cx("select")}`} aria-label="Default select example">
                            <option value="">Chọn lĩnh vực</option>
                            <option value="1">Nước thải</option>
                            <option value="2">Nước sạch</option>
                        </select>
                    </div>
                </aside> */}
            </div>
        </div>
    )
}

export default Sidebar;