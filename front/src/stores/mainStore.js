import { defineStore } from 'pinia'
import axios from 'axios'
import { nextTick } from 'vue'
import VueCookies from "vue-cookies";
import { format } from "date-fns";

export const useMainStore = defineStore('mainStore', {
    state: () => ({
        api: 'https://qabristonserver.netlify.app/.netlify/functions/app/api/',

    }),
    actions: {
        async getApi(address) {
            try {
                const response = await axios.get(`${this.api}${address}`)
                return response.data
            } catch (error) {
                console.log(error);
            }
        }
    }
})