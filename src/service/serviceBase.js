import axios from 'axios'
import Cookies from "js-cookie";
import { API_URL, Errors } from './config'

export default class ServiceBase {
    constructor(mainPath) {
        this.api = axios.create({
            baseURL: `${API_URL}${mainPath}`
        });
    }

    getToken() {
        let logged = Cookies.get('user-logged');
        if (logged) {
            let cookie = JSON.parse(logged);
            return cookie.token;
        } else {
            return '';
        }
    }

    async get(path) {
        try {
            let r = await this.api.get(path, {
                headers: {
                    'Authorization': `Bearer ${this.getToken()}`
                }
            });
            return this.handleResponse(r);
        } catch (e) {
            return this.handleError(e);
        }
    }

    async post(path, body) {
        try {
            let r = await this.api.post(path, body, {
                headers: {
                    'Authorization': `Bearer ${this.getToken()}`
                }
            });
            return this.handleResponse(r);
        } catch (e) {
            return this.handleError(e);
        }
    }

    async put(path, body) {
        try {
            let r = await this.api.put(path, body, {
                headers: {
                    'Authorization': `Bearer ${this.getToken()}`
                }
            });
            return this.handleResponse(r);
        } catch (e) {
            return this.handleError(e);
        }
    }

    async delete(path, body) {
        try {
            let r = await this.api.delete(path, body, {
                headers: {
                    'Authorization': `Bearer ${this.getToken()}`
                }
            });
            return this.handleResponse(r);
        } catch (e) {
            return this.handleError(e);
        }
    }

    handleResponse(response) {
        return response.data || {};
    }


    handleError(e) {
        return this.getError(e);
    }


    getError(e) {
        if (e.response?.data?.error) {
            return {
                error: e.response.data.error,
                errorName: e.response.data.errorName ?? Errors.General,
                message: e.message,
                status: e.status
            }
        } else {
            return {
                error: 'Ocorreu um erro. Já estamos tentando resolver!',
                errorName: Errors.Unknown,
                message: e.message,
                status: e.status
            }      
        }
    }
}