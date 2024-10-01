const GET_DATA_DEVICE_USAGE_BY_DAY = `
    WITH RECURSIVE Days AS (
        -- Tạo danh sách ngày từ startDate đến endDate
        SELECT DATE(?) AS TimeDay  -- Ngày bắt đầu (startDate)
        UNION ALL
        SELECT DATE(TimeDay, '+1 day')
        FROM Days
        WHERE TimeDay < DATE(?)  -- Ngày kết thúc (endDate)
    ),
    DeviceDataFiltered AS (
        SELECT 
            TrangThai, 
            DATE(Time) AS TimeDay
        FROM DeviceData
        WHERE DATE(Time) BETWEEN DATE(?) AND DATE(?)
    ),
    Device1Data AS (
        SELECT TimeDay, COUNT(*) AS device1_count  -- Đếm số bản ghi (1 bản ghi = 1 phút)
        FROM DeviceDataFiltered
        WHERE TrangThai = '#00000010'
        GROUP BY TimeDay
    ),
    Device2Data AS (
        SELECT TimeDay, COUNT(*) AS device2_count  -- Đếm số bản ghi (1 bản ghi = 1 phút)
        FROM DeviceDataFiltered
        WHERE TrangThai = '#00000001'
        GROUP BY TimeDay
    )
    SELECT
        D.TimeDay,
        ROUND(COALESCE(D1.device1_count / 60.0, 0), 2) AS device1,  -- Chia cho 60 và làm tròn
        ROUND(COALESCE(D2.device2_count / 60.0, 0), 2) AS device2,  -- Chia cho 60 và làm tròn
        ROUND(COALESCE((D1.device1_count + D2.device2_count) / 60.0, 0), 2) AS totaltime  -- Tổng thời gian cũng chia cho 60 và làm tròn
    FROM Days D
    LEFT JOIN Device1Data D1 ON D.TimeDay = D1.TimeDay
    LEFT JOIN Device2Data D2 ON D.TimeDay = D2.TimeDay
    ORDER BY D.TimeDay;
`;

export { GET_DATA_DEVICE_USAGE_BY_DAY }