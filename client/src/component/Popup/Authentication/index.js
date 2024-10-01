import classNames from "classnames/bind";
import React, { useState } from 'react';

import styles from "./PopupAuthentication.module.scss";

const cx = classNames.bind(styles);

function PopupAuthentication({ handleClick, light }) {
    const [password, setPassword] = useState('');
    const [numberPhone, setNumberPhone] = useState('');
    const [otp, setOtp] = useState('');
    const [errors, setErrors] = useState({});

    const validateForm = () => {
        const newErrors = {};

        if (password !== '12345') {
            newErrors.password = 'Mật khẩu không hợp lệ';
        }

        const phonePattern = /^[0-9]$/;
        if (phonePattern.test(numberPhone) || numberPhone !== '0991235678') {
            newErrors.numberPhone = 'Số điện thoại không hợp lệ';
        }

        if (otp !== '121212') {
            newErrors.otp = 'Mã OTP không hợp lệ';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleConfirm = () => {
        setErrors({});

        if (validateForm()) {
            handleClick(light);
            const btnClose = document.getElementById('btnClose');
            btnClose.click();
            setPassword('');
            setOtp('');
        }

        console.log(errors);
    };

    return (
        <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="exampleModalLabel">Xác nhận thao tác</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <form className="m-3">
                            <div data-mdb-input-init className="form-outline position-relative mb-4 mt-4">
                                <input
                                    type="password"
                                    id="password"
                                    className={`form-control pt-2 pb-2 ${cx("form-input__focus")}`}
                                    placeholder="Nhập mật khẩu"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)} />
                                <label className={`form-label position-absolute ${cx("form-label")}`} htmlFor="password">Mật khẩu</label>
                                {errors.password && <div className="invalid-feedback d-block text-start ms-2">{errors.password}</div>}
                            </div>
                            <div className="input-group mb-3">
                                <input
                                    type="text"
                                    id="numberPhone"
                                    className={`form-control pt-2 pb-2 ${cx("form-input__focus")}`}
                                    placeholder="Nhập số điện thoại" aria-describedby="button-addon2"
                                    maxLength="10"
                                    value={numberPhone}
                                    onChange={(e) => setNumberPhone(e.target.value)}
                                />
                                <label className={`form-label position-absolute ${cx("form-label")}`} htmlFor="numberPhone">Số điện thoại nhận OTP</label>
                                <button className="btn btn-outline-primary" type="button" id="button-addon2" style={{ zIndex: 3 }}>Gửi OTP</button>
                                {errors.numberPhone && <div className="invalid-feedback d-block text-start ms-2">{errors.numberPhone}</div>}
                            </div>
                            <div data-mdb-input-init className="form-outline position-relative mb-4">
                                <input
                                    type="text"
                                    id="otp"
                                    className={`form-control pt-2 pb-2 ${cx("form-input__focus")}`}
                                    placeholder="Nhập mã OTP"
                                    maxLength="6"
                                    value={otp}
                                    onChange={(e) => setOtp(e.target.value)} />
                                <label className={`form-label position-absolute ${cx("form-label")}`} htmlFor="otp">Mã OTP</label>
                                {errors.otp && <div className="invalid-feedback d-block text-start ms-2">{errors.otp}</div>}
                            </div>
                        </form>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-primary" onClick={handleConfirm}>Xác nhận</button>
                        <button id="btnClose" type="button" className="btn btn-danger" data-bs-dismiss="modal">Đóng</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PopupAuthentication;

