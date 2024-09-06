const GET_USER_BY_USERNAME = 'SELECT * FROM Users WHERE username = ?';
const INSERT_USER = 'INSERT INTO Users (UserName, FullName, Password, UnitCode) VALUES (?, ?, ?, ?)'

export { GET_USER_BY_USERNAME, INSERT_USER };