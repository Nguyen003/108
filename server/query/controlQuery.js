const GET_LIST_STATION = `
    SELECT *
    FROM Stations
    WHERE FieldCode = ? and UnitCode = ?
`;

const GET_DEVICES_BY_STATION = `
    SELECT 
        s.Name as NameStation, 
        d.Name as NameDevice, 
        d.Status,
        SUM(CASE WHEN d.Status = 'A' THEN 1 ELSE 0 END) OVER() AS TotalActive,
        SUM(CASE WHEN d.Status = 'S' THEN 1 ELSE 0 END) OVER() AS TotalStopped,
        SUM(CASE WHEN d.Status = 'E' THEN 1 ELSE 0 END) OVER() AS TotalError,
        SUM(CASE WHEN d.Status = 'NS' THEN 1 ELSE 0 END) OVER() AS TotalNoSignal
    FROM 
        Devices d 
    INNER JOIN 
        Stations s ON d.StationCode = s.StationCode
    WHERE 
        s.StationCode = ?
`;

export { GET_LIST_STATION, GET_DEVICES_BY_STATION }