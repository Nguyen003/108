import classNames from "classnames/bind"
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"
import { ToastContainer, toast } from 'react-toastify';
import axios from "axios"

import styles from "./Register.module.scss"
import config from "~/router/config-router"

const cx = classNames.bind(styles)

function Register() {
    const [units, setUnits] = useState();
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        username: '',
        fullname: '',
        password: '',
        confirmPassword: '',
        unitcode: ''
    });
    const [confirmPassword, setConfirmPassword] = useState({
        message: '',
        className: ''
    });

    const handleBackLogin = () => {
        navigate(config.login);
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
console.log(formData.userunit);
        // Kiểm tra các trường có bị bỏ trống không
        if (!formData.username || !formData.fullname || !formData.password || !formData.confirmPassword || !formData.userunit) {
            toast.error("Vui lòng nhập đầy đủ thông tin các trường bắt buộc!", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
            return;
        }

        try {
            const response = await axios.post('/api/register', {
                username: formData.username,
                fullname: formData.fullname,
                password: formData.password,
                unitcode: formData.userunit
            });
            if (response.status === 400) {
                toast.warning(response.message)
            }

            if (response.status === 200) {
                toast.success(response.data.message)

                setTimeout(() => {
                    navigate(config.login);
                }, 1500)
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
    }

    useEffect(() => {
        if (formData.password && formData.confirmPassword) {
            let isComfirm = formData.confirmPassword === formData.password;

            if (isComfirm) {
                setConfirmPassword({
                    message: 'Xác nhận mật khẩu chính xác!',
                    className: 'text-success'
                });
            } else {
                setConfirmPassword({
                    message: 'Xác nhận mật khẩu không chính xác!',
                    className: 'text-danger'
                });
            }
        }
    }, [formData.password, formData.confirmPassword]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const unitResponse = await axios.get('/api/common/unitAll', {params: {unitCode: ''}});

                setUnits(unitResponse.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className={cx('register')}>
            <div className={cx('register_form')}>
                <div className={`logo mx-auto text-center ${cx('register_form-label')}`}>
                    <h2>Đăng ký tài khoản</h2>
                </div>
                <div className="row justify-content-center">
                    <div className="col">
                        <form id="registerForm" method="post">
                            <div className="form-floating mb-3">
                                <input name="fullname" asp-for="Input.FirstName" className="form-control" required onChange={handleChange} />
                                <label asp-for="Input.FirstName">Tên người dùng <i className="text-danger">*</i></label>
                            </div>
                            <div className="form-floating mb-3">
                                <input name="username" asp-for="Input.FirstName" className="form-control" required onChange={handleChange} />
                                <label asp-for="Input.FirstName">Tên đăng nhập <i className="text-danger">*</i></label>
                            </div>
                            <div className="form-floating mb-3">
                                <input type="password" name="password" asp-for="Input.LastName" className="form-control" required onChange={handleChange} />
                                <label asp-for="Input.LastName">Mật khẩu <i className="text-danger">*</i></label>
                            </div>
                            <div className="form-floating mb-3">
                                <input type="password" name="confirmPassword" asp-for="Input.LastName" className="form-control" required onChange={handleChange} />
                                <label asp-for="Input.LastName">Xác nhận mật khẩu <i className="text-danger">*</i></label>
                                <p className={`text-start p-1 ${confirmPassword.className}`} style={{ fontSize: '12px' }}>{confirmPassword.message}</p>
                            </div>
                            <div className="form-floating mb-3">
                                <select name="userunit" asp-for="Input.UserName" className="form-control" required onChange={handleChange}>
                                    <optgroup label="Chọn đơn vị">
                                        <option hidden>--- Chọn đơn vị ---</option>
                                        {units?.map((item, index) => (
                                            <option key={index} value={item.ID}>{item.UnitName}</option>
                                        ))}
                                    </optgroup>
                                </select>
                                <label asp-for="Input.UserName">Đơn vị <i className="text-danger">*</i></label>
                            </div>
                        </form>
                    </div>
                </div>
                <div className="row justify-content-center mt-2">
                    <div className="col-3">
                        <button type="button" className="btn btn-outline-warning w-100 fs-5 fw-bold" onClick={handleBackLogin}>Quay Lại</button>
                    </div>
                    <div className="col-9">
                        <button type="submit" className="btn btn-success w-100 fs-5 fw-bold" onClick={handleSubmit}>Đăng ký</button>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </div>
    )
}

export default Register;
