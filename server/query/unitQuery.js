const GET_ALL_UNIT = `
    SELECT * 
    FROM UNITS 
    WHERE ParentCode IS NULL 
    AND (ID = ? OR ? IS NULL OR ? = '');
`;

export { GET_ALL_UNIT };