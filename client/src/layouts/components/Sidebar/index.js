import { NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import axios from 'axios';
import { useSelector } from 'react-redux';

import styles from './Sidebar.module.scss'
import config from '~/router/config-router'
import logo from '~/assets/images/logo.png'
import { setSelectValueUnit, setSelectValueField } from '~/store';

const cx = classNames.bind(styles);

function Sidebar() {
    const dispatch = useDispatch();
    const [units, setUnits] = useState([]);
    const [fields, setFields] = useState([]);
    const unitValue = useSelector((state) => state.select.selectValueUnit);
    const isAdmin = useSelector((state) => state.select.isAdmin);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [unitResponse, fieldResponse] = await Promise.all([
                    axios.get('/api/common/unitAll', { params: { unitCode: unitValue } }),
                    axios.get('/api/common/fieldAll')
                ]);

                setUnits(unitResponse.data);
                setFields(fieldResponse.data);

                if (unitResponse.data.length > 0) {
                    dispatch(setSelectValueUnit(unitResponse.data[0].ID));
                }
                if (fieldResponse.data.length > 0) {
                    dispatch(setSelectValueField(fieldResponse.data[0].FieldCode));
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    return (
        <div className={cx('sidebar-menu')}>
            <div className={cx('logo')}>
                <img src={logo} alt="Logo" />
            </div>
            <div className="d-flex flex-column">
                <aside className={cx('sidebar-nav', 'select')}>
                    <div className='mb-2 text-start'>
                        <label className='fw-bold fs-6 text-light'>Đơn vị</label>
                        <select className={`form-select ${cx("select")}`} aria-label="Default select example" onChange={(e) => dispatch(setSelectValueUnit(e.target.value))}>
                            {units.map((item, index) => (
                                <option key={index} value={item.ID}>{item.UnitName}</option>
                            ))}
                        </select>
                    </div>
                    <div className='mb-2 text-start'>
                        <label className='fw-bold fs-6 text-light'>Lĩnh vực</label>
                        <select className={`form-select ${cx("select")}`} aria-label="Default select example" onChange={(e) => dispatch(setSelectValueField(e.target.value))}>
                            {fields.map((item, index) => (
                                <option key={index} value={item.FieldCode}>{item.Name}</option>
                            ))}
                        </select>
                    </div>
                </aside>
                <aside className={`mb-3 pt-2 pb-1 ${cx('sidebar-nav', 'menu')}`}>
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
                        {isAdmin && (
                            <nav>
                                <NavLink
                                    to={config.control}
                                    className={(nav) => cx('sidebar-nav-link', { active: nav.isActive })}
                                >
                                    <i className="fas fa-user"></i>
                                    <span className={cx('title')}>Điều khiển</span>
                                </NavLink>
                            </nav>
                        )}
                    </div>
                </aside>

            </div>
        </div>
    )
}

export default Sidebar;