import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:8080",
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

export const postFormData = (url, formData, config = {}) => {
    return axios.post(url, formData, {
        baseURL: "http://localhost:8080",
        headers: {
        },
    }).then(response => response.data);
}

export const imageUpload = {
    upload: (image) => {
        const formData = new FormData();
        formData.append("image", image);
    
        return postFormData("/api/books/extract-and-save", formData);
    },
}