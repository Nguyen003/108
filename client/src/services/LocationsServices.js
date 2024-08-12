import axios from 'axios';

const listLocations = () => {
    return axios.get('https://api.maptiler.com/data/090afe88-bf4a-4c74-99f4-ac1b676c7944/features.json?key=VkLDjfAmKsJZt6TIJ6DG')
        .then(response => {
            const data = response.data;

            // Trích xuất thông tin cần thiết từ dữ liệu JSON
            const extractedMarkers = data.features.map(feature => ({
                id: feature.id, // Lấy id
                name: feature.properties.text,
                latitude: feature.geometry.coordinates[1], // Lấy latitude
                longitude: feature.geometry.coordinates[0], // Lấy longitude
            }));

            return extractedMarkers;
        })
        .catch(e => {
            console.error('Error fetching data:', e);
            throw e;
        });
}

export { listLocations }