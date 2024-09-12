const GET_STATUS_BY_UNIT_AND_FIELD = `
    SELECT 
        s.StationCode,
        s.Name AS StationName,
        s.Location,
        s.Status AS Status,
        COUNT(d.ID) AS TotalDevices,
        SUM(CASE WHEN d.Status = 'A' THEN 1 ELSE 0 END) AS TotalActive,
        SUM(CASE WHEN d.Status = 'S' THEN 1 ELSE 0 END) AS TotalStopped,
        SUM(CASE WHEN d.Status = 'E' THEN 1 ELSE 0 END) AS TotalError,
        SUM(CASE WHEN d.Status = 'NS' THEN 1 ELSE 0 END) AS TotalNoSignal
    FROM 
        Stations s
    LEFT JOIN 
        Devices d ON s.StationCode = d.StationCode
    WHERE 
        s.FieldCode = ? AND 
        s.UnitCode = ?
    GROUP BY 
        s.StationCode, s.Name;
`;

const GET_DEVICES_BY_STATION = `
    SELECT 
        s.Name as NameStation, 
        s.Status AS StatusStation,
        d.Name as NameDevice, 
        d.Status
    FROM 
        Devices d inner join Stations s on d.StationCode = s.StationCode
    WHERE 
        d.StationCode = ?
`;

const GET_DATA_MUC_NUOC = `
    WITH TimePeriods AS (
        SELECT '0h - 2h' AS TimePeriod, 0 AS StartHour, 2 AS EndHour
        UNION ALL
        SELECT '2h - 4h', 2, 4
        UNION ALL
        SELECT '4h - 6h', 4, 6
        UNION ALL
        SELECT '6h - 8h', 6, 8
        UNION ALL
        SELECT '8h - 10h', 8, 10
        UNION ALL
        SELECT '10h - 12h', 10, 12
        UNION ALL
        SELECT '12h - 14h', 12, 14
        UNION ALL
        SELECT '14h - 16h', 14, 16
        UNION ALL
        SELECT '16h - 18h', 16, 18
        UNION ALL
        SELECT '18h - 20h', 18, 20
        UNION ALL
        SELECT '20h - 22h', 20, 22
        UNION ALL
        SELECT '22h - 0h', 22, 24
    )
    SELECT
        TP.TimePeriod,
        COALESCE(ROUND(AVG(D.MucNuoc), 2), 0) AS AverageFlow
    FROM
        TimePeriods TP
    LEFT JOIN
        DeviceData D
        ON CAST(strftime('%H', D.Time) AS INTEGER) >= TP.StartHour
        AND CAST(strftime('%H', D.Time) AS INTEGER) < TP.EndHour
        AND strftime('%Y-%m-%d', D.Time) = ? 
    GROUP BY
        TP.TimePeriod
    ORDER BY
        TP.StartHour
`;

const GET_DATA_LUU_LUONG_NUOC = `
    WITH TimePeriods AS (
        SELECT '0h - 2h' AS TimePeriod, 0 AS StartHour, 2 AS EndHour
        UNION ALL
        SELECT '2h - 4h', 2, 4
        UNION ALL
        SELECT '4h - 6h', 4, 6
        UNION ALL
        SELECT '6h - 8h', 6, 8
        UNION ALL
        SELECT '8h - 10h', 8, 10
        UNION ALL
        SELECT '10h - 12h', 10, 12
        UNION ALL
        SELECT '12h - 14h', 12, 14
        UNION ALL
        SELECT '14h - 16h', 14, 16
        UNION ALL
        SELECT '16h - 18h', 16, 18
        UNION ALL
        SELECT '18h - 20h', 18, 20
        UNION ALL
        SELECT '20h - 22h', 20, 22
        UNION ALL
        SELECT '22h - 0h', 22, 24
    )
    SELECT
        TP.TimePeriod,
        COALESCE(ROUND(AVG(D.LuuLuongNuoc), 2), 0) AS AverageFlow
    FROM
        TimePeriods TP
    LEFT JOIN
        DeviceData D
        ON CAST(strftime('%H', D.Time) AS INTEGER) >= TP.StartHour
        AND CAST(strftime('%H', D.Time) AS INTEGER) < TP.EndHour
        AND strftime('%Y-%m-%d', D.Time) = ?
    GROUP BY
        TP.TimePeriod
    ORDER BY
        TP.StartHour
`;

const GET_DATA_TRANG_THAI = `
    WITH Hours AS (
        SELECT strftime('%H:00', ? , '+' || (H.Hour - 1) || ' hours') AS TimeHour
        FROM (
            SELECT 1 AS Hour UNION ALL
            SELECT 2 UNION ALL
            SELECT 3 UNION ALL
            SELECT 4 UNION ALL
            SELECT 5 UNION ALL
            SELECT 6 UNION ALL
            SELECT 7 UNION ALL
            SELECT 8 UNION ALL
            SELECT 9 UNION ALL
            SELECT 10 UNION ALL
            SELECT 11 UNION ALL
            SELECT 12 UNION ALL
            SELECT 13 UNION ALL
            SELECT 14 UNION ALL
            SELECT 15 UNION ALL
            SELECT 16 UNION ALL
            SELECT 17 UNION ALL
            SELECT 18 UNION ALL
            SELECT 19 UNION ALL
            SELECT 20 UNION ALL
            SELECT 21 UNION ALL
            SELECT 22 UNION ALL
            SELECT 23 UNION ALL
            SELECT 24
        ) AS H
    ),
    DeviceDataFiltered AS (
        SELECT 
            TrangThai, 
            strftime('%H:00', Time) AS TimeHour, 
            strftime('%M', Time) AS Minutes,
            Time
        FROM DeviceData
        WHERE Time BETWEEN ? AND ? 
    ),
    Device1Data AS (
        SELECT TimeHour, COUNT(Minutes) AS device1_minutes
        FROM DeviceDataFiltered
        WHERE TrangThai = '#00000010'
        GROUP BY TimeHour
    ),
    Device2Data AS (
        SELECT TimeHour, COUNT(Minutes) AS device2_minutes
        FROM DeviceDataFiltered
        WHERE TrangThai = '#00000001'
        GROUP BY TimeHour
    )
    SELECT
        H.TimeHour,
        COALESCE(D2.device2_minutes, '0') AS device2,
        COALESCE(D1.device1_minutes, '0') AS device1,
        (COALESCE(D1.device1_minutes, '0') + COALESCE(D2.device2_minutes, '0')) AS totaltime
    FROM Hours H
    LEFT JOIN Device1Data D1 ON H.TimeHour = D1.TimeHour
    LEFT JOIN Device2Data D2 ON H.TimeHour = D2.TimeHour
    ORDER BY H.TimeHour;
`;

export {
    GET_STATUS_BY_UNIT_AND_FIELD,
    GET_DEVICES_BY_STATION,
    GET_DATA_MUC_NUOC,
    GET_DATA_LUU_LUONG_NUOC,
    GET_DATA_TRANG_THAI
}