import { useLocation } from 'react-router-dom';

import Map from "~/component/Map";

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

function Location() {
    const query = useQuery();
    const lat = parseFloat(query.get('lat'));
    const lon = parseFloat(query.get('lon'));

    return (
        <Map lat={lat} lon={lon} zoom={10} />
    )
}

export default Location;