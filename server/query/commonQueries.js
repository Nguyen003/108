const INSERT_TABLE_DEVICEDATA = "INSERT INTO DeviceData (TrangThai, MucNuoc, LuuLuongNuoc, Time) values (?, ?, ?, ?)"
const GET_MUCNC_LUULUONG = `
    SELECT MucNuoc, LuuLuongNuoc
    FROM DeviceData
    WHERE Time = (
        SELECT MAX(Time)
        FROM DeviceData
        WHERE DATE(Time) = ?
    )
`;

export { INSERT_TABLE_DEVICEDATA, GET_MUCNC_LUULUONG }