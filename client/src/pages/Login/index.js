import 'react-toastify/dist/ReactToastify.css';
// import classNames from 'classnames/bind';
import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from 'react-redux';

import '~/assets/css/util.css';
import './Login.scss'
import { logoAme } from '~/assets/images'
import config from '~/router/config-router'
import { setSelectValueUnit } from '~/store';

// const cx = classNames.bind(styles)

function Login() {
    const dispatch = useDispatch();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const response = await axios.post('/api/login', { username, password });

            if (response.status === 200) {
                localStorage.setItem('isAdmin', response.data.data === null);
                // dispatch(setIsAdmin(response.data.data === null)); // Cập nhật trạng thái người dùng đăng nhập là admin hay không
                dispatch(setSelectValueUnit(response.data.data));
                navigate(config.home); // Điều hướng đến trang chính sau khi đăng nhập thành công
            }
        } catch (error) {
            toast.error(error.response?.data?.message,
                {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                }
            );
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleLogin();
        }
    };

    return (
        <main className="main-login">
            <div className="login-box">
                <div className="row">
                    <div className="col-12 col-md-6 align-self-center">
                        <div className="d-flex flex-column align-items-center logo mx-auto text-center">
                            <img src={logoAme} alt="" />
                            <label className="mt-2"><span style={{ fontSize: '22px', color: '#0008A0' }}></span></label>
                        </div>
                    </div>

                    <div className="col-12 col-md-6">
                        <div className="content-box">
                            <div className="sub-text">
                                <img src="~/images/text_login.svg" alt="" />
                            </div>
                            <form id="account" method="post">
                                <div className="form">
                                    <div className="row">
                                        <div className="col-12">
                                            <div className="input-group">
                                                <div className="input-group-prepend">
                                                    <div className="input-group-text h-100">
                                                        <i className="fa-solid fa-user"></i>
                                                    </div>
                                                </div>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    aria-required="true"
                                                    placeholder="Tên đăng nhập"
                                                    value={username}
                                                    onChange={(e) => setUsername(e.target.value)}
                                                    onKeyDown={handleKeyDown}
                                                />
                                                <span asp-validation-for="Input.UserName" className="text-danger"></span>
                                            </div>
                                        </div>

                                        <div className="col-12">
                                            <div className="input-group">
                                                <div className="input-group-prepend">
                                                    <div className="input-group-text h-100">
                                                        <i className="fa-solid fa-lock"></i>
                                                    </div>
                                                </div>
                                                <input
                                                    type="password"
                                                    className="form-control"
                                                    aria-required="true"
                                                    placeholder="Mật khẩu"
                                                    value={password}
                                                    onChange={(e) => setPassword(e.target.value)}
                                                    onKeyDown={handleKeyDown}
                                                />
                                                <span asp-validation-for="Input.Password" className="text-danger"></span>
                                            </div>
                                        </div>
                                        <div className="col-12 text-end" style={{ marginTop: '-10px' }}>
                                            <Link className='fst-italic text-decoration-underline fs-6' to={config.register}>Đăng ký!</Link>
                                        </div>

                                        <div className="col-12">
                                            <button type="button" className="btn-login" onClick={handleLogin}>ĐĂNG NHẬP</button>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

                <div className="text-end">
                    <p className="text-uppercase text-center fw-bold m-0">PHẦN MỀM QUẢN LÝ, GIÁM SÁT VÀ ĐIỀU KHIỂN TỪ XA</p>
                </div>
            </div>
            <ToastContainer />
        </main>
        // <div classNameName={cx('limiter')}>
        //     <div classNameName={cx('container-login100')}>
        //         <div classNameName={cx('wrap-login100')}>
        //             <div classNameName={`${cx('login100-pic')} js-tilt`} data-tilt>
        //                 <img src={image} alt="IMG" />
        //             </div>

        //             <div classNameName={`${cx('login100-form')} validate-form`}>
        //                 <span classNameName={cx('login100-form-title')}>
        //                     Đăng nhập
        //                 </span>

        //                 <div classNameName={cx('wrap-input100', 'validate-input')} >
        //                     <input classNameName={cx('input100')} type="text" value={username} onChange={(e) => setUsername(e.target.value)} name="user" placeholder="Tên đăng nhập" />
        //                     <span classNameName={cx('focus-input100')}></span>
        //                     <span classNameName={cx('symbol-input100')}>
        //                         <i classNameName="fa-solid fa-user"></i>
        //                     </span>
        //                 </div>

        //                 <div classNameName={cx('wrap-input100', 'validate-input')} data-validate="Password is required">
        //                     <input classNameName={cx('input100')} type="password" value={password} onChange={(e) => setPassword(e.target.value)} name="pass" placeholder="Mật khẩu" />
        //                     <span classNameName={cx('focus-input100')}></span>
        //                     <span classNameName={cx('symbol-input100')}>
        //                         <i classNameName="fa fa-lock" aria-hidden="true"></i>
        //                     </span>
        //                 </div>

        //                 <div classNameName={cx('container-login100-form-btn')}>
        //                     <button classNameName={cx('login100-form-btn')} onClick={handleLogin}>
        //                         Đăng nhập
        //                     </button>
        //                 </div>
        //             </div>
        //         </div>
        //     </div>
        //     <ToastContainer />
        // </div>
    );
}

export default Login;