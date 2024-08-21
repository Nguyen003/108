import db from '../Dbcontext.js'
import { GET_USER_BY_USERNAME } from '../query/authQuery.js';

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

        // // So sánh mật khẩu đã nhập với mật khẩu lưu trữ trong cơ sở dữ liệu
        if (password !== user.Password) {
            return res.status(401).json({ message: 'Mật khẩu không đúng!' });
        }

        // So sánh mật khẩu đã nhập với mật khẩu đã mã hóa trong cơ sở dữ liệu
        // const isPasswordValid = await bcrypt.compare(password, user.password);

        // if (!isPasswordValid) {
        //     return res.status(401).json({ message: 'Invalid password' });
        // }

        // Nếu mật khẩu hợp lệ, trả về thông tin người dùng hoặc JWT token
        res.status(200).json({ message: 'Đăng nhập thành công!' });
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}