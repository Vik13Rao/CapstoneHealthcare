import axios, { AxiosResponse } from "axios";
import { PaginatedResponse } from "../models/pagination";
import { store } from "../store/configureStore";
import { User } from "../models/user";

const sleep = () => new Promise(resolve => setTimeout(resolve, 500));
axios.defaults.baseURL = 'http://localhost:5000/api/';
axios.defaults.withCredentials = true;

const responseBody = (response: AxiosResponse) => response.data;

axios.interceptors.request.use((config) => {
    const user: User = JSON.parse(localStorage.getItem('user')!);
    const token = user?.token;
    if (token) config.headers!.Authorization = `Bearer ${token}`;
    return config;
})

axios.interceptors.response.use(async response => {
    await sleep();
   
    const pagination = response.headers['pagination'];
    if (pagination) {
        response.data = new PaginatedResponse(response.data, JSON.parse(pagination));
        return response;
    }
    return response

})

const requests = {
    get: (url: string, params?: URLSearchParams) => axios.get(url, {params}).then(responseBody),
    post: (url: string, body: {}) => axios.post(url, body).then(responseBody),
    put: (url: string, body: {}) => axios.put(url, body).then(responseBody),
    delete: (url: string) => axios.delete(url).then(responseBody),
    
}

const Catalog = {
    list: (params: URLSearchParams  ) => requests.get('medicines', params),
    details: (id: number) => requests.get(`medicines/${id}`),
    fetchFilters: () => requests.get('medicines/filters')
}

const Cart = {
    get: () => requests.get('cart'),
    addItem: (medicineId: number, quantity = 1) => requests.post(`cart?medicineId=${medicineId}&quantity=${quantity}`, {}),
    removeItem: (medicineId: number, quantity = 1) => requests.delete(`cart?medicineId=${medicineId}&quantity=${quantity}`)
}

const Account = {
    login: (values: any) => requests.post('account/login', values),
    register: (values: any) => requests.post('account/register', values),
    currentUser: () => requests.get('account/currentUser'),
    fetchAddress: () => requests.get('account/savedAddress')
}

const Orders = {
    list: () => requests.get('orders'),
    fetch: (id: number) => requests.get(`orders/${id}`),
    create: (values: any) => requests.post('orders', values)
}

const axiosagent = {
    Catalog,
    Cart,
    Account,
    Orders
}

export default axiosagent;