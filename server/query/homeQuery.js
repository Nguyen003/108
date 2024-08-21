const GET_STATUS_BY_UNIT_AND_FIELD = `
    SELECT 
        s.StationCode,
        s.Name AS StationName,
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
        d.Name as NameDevice, 
        d.Status
    FROM 
        Devices d inner join Stations s on d.StationCode = s.StationCode
    WHERE 
        d.StationCode = ?
`;

export { GET_STATUS_BY_UNIT_AND_FIELD, GET_DEVICES_BY_STATION }