import { defineStore } from 'pinia'
import axios from 'axios'
import { nextTick } from 'vue'
import VueCookies from "vue-cookies";
import { add, format } from "date-fns";

export const useMainStore = defineStore('mainStore', {
    state: () => ({
        api: 'http://localhost:8888/.netlify/functions/app/api/',
        user: JSON.parse(localStorage.getItem('user')) || []
    }),
    actions: {
        async getApi(address) {
            try {
                const response = await axios.get(`${this.api}${address}`)
                return response.data
            } catch (error) {
                console.log(error);
            }
        },
        getCemetery(address, data) {
            console.log(address, data);
            return address.filter((cemetery) => {
                return cemetery.name == data
            })
        },

    }
})