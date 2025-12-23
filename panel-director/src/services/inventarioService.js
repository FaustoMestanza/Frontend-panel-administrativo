import axios from "axios";

const API_URL =
    "https://microservicio-gestioninventario-e7byadgfgdhpfyen.brazilsouth-01.azurewebsites.net/api/equipos/";

const getAuthHeaders = () => {
    const token = localStorage.getItem("token");
    return {
        Authorization: `Bearer ${token}`,
    };
};

export const listarInventario = async () => {
    const response = await axios.get(API_URL, {
        headers: getAuthHeaders(),
    });
    return response.data;
};

export const actualizarEquipo = async (id, data) => {
    return axios.put(`${API_URL}${id}/`, data, {
        headers: getAuthHeaders(),
    });
};

export const eliminarEquipo = async (id) => {
    return axios.delete(`${API_URL}${id}/`, {
        headers: getAuthHeaders(),
    });
};
