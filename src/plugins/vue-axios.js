import Vue from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
import { HOST } from '../constants'

// --------------------------------------------------------------------
// vue-axios CONFIGURATION
// --------------------------------------------------------------------
export const instance = axios.create({
    baseURL: HOST,
    timeout: 15000,
    headers: {
        'Accept': 'application/json',
        'Content-type': 'application/json',
    },
});

Vue.use(VueAxios, instance);