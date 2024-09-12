const GET_LIST_STATION = `
    SELECT *
    FROM Stations
    WHERE FieldCode = ? and UnitCode = ? and Status not like 'NS'
`;

const GET_DEVICES_BY_STATION = `
    SELECT 
        s.Name as NameStation, 
        s.Status AS StatusStation,
        d.Name as NameDevice, 
        d.Status,
        COUNT(d.ID) OVER (PARTITION BY s.StationCode) AS TotalDevices,
        SUM(CASE WHEN d.Status = 'A' THEN 1 ELSE 0 END) OVER (PARTITION BY s.StationCode) AS TotalActive,
        SUM(CASE WHEN d.Status = 'S' THEN 1 ELSE 0 END) OVER (PARTITION BY s.StationCode) AS TotalStopped,
        SUM(CASE WHEN d.Status = 'E' THEN 1 ELSE 0 END) OVER (PARTITION BY s.StationCode) AS TotalError
    FROM 
        Devices d 
    INNER JOIN 
        Stations s ON d.StationCode = s.StationCode
    WHERE 
        s.StationCode = ?
`;

export { GET_LIST_STATION, GET_DEVICES_BY_STATION }