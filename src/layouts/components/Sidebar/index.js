import 'bootstrap/dist/css/bootstrap.min.css';
import { NavLink } from 'react-router-dom';

import classNames from 'classnames/bind';
import styles from './Sidebar.module.scss'

const cx = classNames.bind(styles);

function Sidebar() {
    return (
        <div className={cx('sidebar-menu')}>
            <div className={cx('logo')}>
                {/* <img src={logo} alt="Logo" /> */}
                <h1>Logo</h1>
            </div>
            <aside className={cx('sidebar-nav')}>
                <nav>
                    <NavLink
                        to="#"
                        className={(nav) => cx('sidebar-nav-link', { active: nav.isActive })}
                    >
                        <i className="fas fa-tachometer-alt"></i>
                        <span className={cx('title')}>Giám sát tổng quan</span>
                    </NavLink>
                </nav>
                <nav>
                    <NavLink
                        to="/tesst"
                        className={(nav) => cx('sidebar-nav-link', { active: nav.isActive })}
                    >
                        <i className="fas fa-user"></i>
                        <span className={cx('title')}>Giám sát hệ thống</span>
                    </NavLink>
                </nav>
            </aside>
        </div>
    )
}

export default Sidebar;