import axios from "axios";

const api = axios.create({
    baseURL: process.env.REACT_APP_API_BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

api.interceptors.request.use(
    (config) => {
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

api.interceptors.response.use(
    (response) => {
        return response.data;
    },
    (error) => {
        return Promise.reject(error.response ? error.response.data : error.message);
    }
);

export const postFormData = async (url, formData, config = {}) => {
    const response = await axios.post(url, formData, {
        baseURL: process.env.REACT_APP_API_BASE_URL,
        headers: {},
    });
    return response.data;
}

export const imageUpload = {
    upload: (image) => {
        const formData = new FormData();
        formData.append("image", image);
    
        return postFormData("api/books/save-and-extract", formData);
    },
}