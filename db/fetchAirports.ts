import axios from 'axios';

const API_URL = 'https://api.core.openaip.net/api/airports';
const CLIENT_ID = '02db4c804ca1463a76db3df80aa0c8a4';  // Replace with your actual client ID

export const fetchAirportsFromAPI = async (page: number) => {
    try {
        const response = await axios.get(API_URL, {
            headers: {
                'x-openaip-client-id': CLIENT_ID,
            },
            params: {
                page,
                limit: 1000,
            },
        });
        return response.data.items;
    } catch (error) {
        console.error('Error fetching airports data:', error);
        return [];
    }
};
