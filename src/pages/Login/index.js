import '~/assets/css/util.css';
import 'react-toastify/dist/ReactToastify.css';
import classNames from 'classnames/bind';
import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

import styles from './Login.module.scss'
import image from '~/assets/images/img-01.png'
import config from '~/router/config-router'

const cx = classNames.bind(styles)

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = () => {

        if (username === "admin" && password === "12345") {
            navigate(config.home);
        } else {
            toast.error('Tên đăng nhập hoặc mật khẩu không đúng', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
        }
    }

    return(
        <div className={cx('limiter')}>
            <div className={cx('container-login100')}>
                <div className={cx('wrap-login100')}>
                    <div className={`${cx('login100-pic')} js-tilt`} data-tilt>
                        <img src={image} alt="IMG" />
                    </div>

                    <div className={`${cx('login100-form')} validate-form`}>
                        <span className={cx('login100-form-title')}>
                            Đăng nhập
                        </span>

                        <div className={cx('wrap-input100', 'validate-input')} >
                            <input className={cx('input100')} type="text" value={username} onChange={(e) => setUsername(e.target.value)} name="user" placeholder="Tên đăng nhập" />
                            <span className={cx('focus-input100')}></span>
                            <span className={cx('symbol-input100')}>
                                <i className="fa-solid fa-user"></i>
                            </span>
                        </div>

                        <div className={cx('wrap-input100', 'validate-input')} data-validate="Password is required">
                            <input className={cx('input100')} type="password" value={password} onChange={(e) => setPassword(e.target.value)} name="pass" placeholder="Mật khẩu" />
                            <span className={cx('focus-input100')}></span>
                            <span className={cx('symbol-input100')}>
                                <i className="fa fa-lock" aria-hidden="true"></i>
                            </span>
                        </div>

                        <div className={cx('container-login100-form-btn')}>
                            <button className={cx('login100-form-btn')} onClick={handleLogin}>
                                Đăng nhập
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
}

export default Login;