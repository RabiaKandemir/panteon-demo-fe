import axios from 'axios';

const API_BASE_URL = 'https://localhost:7295/api';

const api = axios.create({
    baseURL: API_BASE_URL,
});

export const getBuildingConfigurations = () => api.get('/BuildingConfiguration/GetList');
export const getBuildingConfiguration = (id) => api.get(`/BuildingConfiguration/GetById/${id}`);
export const createBuildingConfiguration = (data) => api.post('/BuildingConfiguration/Add', data);
export const updateBuildingConfiguration = (id, data) => api.put(`/BuildingConfiguration/Update`, data);
export const deleteBuildingConfiguration = (id) => api.delete('/BuildingConfiguration/Delete', { data: { id } });


export default api;
