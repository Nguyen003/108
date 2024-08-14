import db from '../Dbcontext.js'
import { GET_USER_BY_USERNAME } from '../query/authQuery.js';

export const login = async (req, res) => {
    const { username, password } = req.body;
    try {
        const result = await db.query(GET_USER_BY_USERNAME, [username, password]);
        if (result.rowCount > 0) {
            res.status(200).json({ message: 'Đăng nhập thành công' });
        } else {
            res.status(401).json({ message: 'Mật khẩu hoặc tên người dùng không chính xác' });
        }
    } catch (err) {
        res.status(500).json({ message: 'Error:' + err.message });
    }
}