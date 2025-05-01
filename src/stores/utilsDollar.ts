import { defineStore } from 'pinia';
import { Global, Headers } from 'src/config/Global';
import axios from 'axios';
import { ref } from 'vue';
import { Notify } from 'quasar';
import { useQuasar, QSpinnerFacebook } from 'quasar';
const apiDolar = 'https://pydolarve.org/api/v1';
export const useUtilsDollarStore = defineStore('utilsDollar', {
  state: () => {
    return {
      dataDollar: ref({}),
    };
  },
  getters: {
    getterCambio(state) {
      return state.dataDollar;
    },
  },
  actions: {
    async getCambio() {
      try {
        const getAll = await axios.get(apiDolar + '/dollar?page=alcambio');
        const resp = (this.dataDollar = getAll.data);
      } catch (error) {
        console.log(error);
      }
    },
  },
});
