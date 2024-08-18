import axios from 'axios';

const API_URL = 'https://backend.rabiakandemir.org.tr/api/';

const api = axios.create({
    baseURL: API_URL,
});

export const getBuildingConfigurations = () => api.get('BuildingConfiguration/GetList');
export const getBuildingConfiguration = (id) => api.get(`BuildingConfiguration/GetById/${id}`);
export const createBuildingConfiguration = (data) => api.post('BuildingConfiguration/Add', data);
export const updateBuildingConfiguration = (id, data) => api.put(`BuildingConfiguration/Update`, data);
export const deleteBuildingConfiguration = (id) => api.delete(`BuildingConfiguration/Delete/${id}`);


export default api;
