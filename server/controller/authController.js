import bcrypt from "bcrypt"

import db from '../Dbcontext.js'
import { GET_USER_BY_USERNAME, INSERT_USER } from '../query/authQuery.js';

const salt = bcrypt.genSaltSync(10) //  Tạo salt với 10 vòng lặp

export const login = async (req, res) => {
    const { username, password } = req.body;

    try {

        // Thực thi truy vấn để lấy dữ liệu người dùng theo username
        const user = await new Promise((resolve, reject) => {
            db.get(GET_USER_BY_USERNAME, [username], (err, rows) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(rows);
            });
        });

        // Kiểm tra xem người dùng có tồn tại không
        if (!user) {
            return res.status(404).json({ message: 'Tài khoản không tồn tại!' });
        }

        // So sánh mật khẩu đã nhập với mật khẩu đã mã hóa trong cơ sở dữ liệu
        const isPasswordValid = await bcrypt.compareSync(password, user.Password);

        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Mật khẩu không đúng!' });
        }

        // Nếu mật khẩu hợp lệ, trả về thông tin người dùng hoặc JWT token
        res.status(200).json({ message: 'Đăng nhập thành công!', data: user.UnitCode });
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

export const register = async (req, res) => {
    const { username, fullname, password, unitcode } = req.body;
    const hashUserPassword = bcrypt.hashSync(password, salt)
    console.log(hashUserPassword);

    try {

        // Kiểm tra xem tên đăng nhập đã tồn tại chưa
        const isUserExists  = await new Promise((resolve, reject) => {
            db.get(GET_USER_BY_USERNAME, [username], (err, row) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(row === undefined);
            });
        });

        if (!isUserExists) {
            return res.status(409).json({ message: 'Tên đăng nhập đã tồn tại!' });
        }

        // Lưu đăng ký mới
        const isSucces = await new Promise((resolve, reject) => {
            db.run(INSERT_USER, [username, fullname, hashUserPassword, unitcode], (err) => {
                if (err) {
                    reject(false);
                    return;
                }
                resolve(true);
            });
        });

        if (!isSucces) return res.status(400).json({ message: 'Đăng ký tài khoản không thành công!' });

        res.status(200).json({ message: 'Đăng ký tài khoản thành công!' });
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}