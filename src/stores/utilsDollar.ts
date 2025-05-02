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
      dollarFindOne: ref({}),
    };
  },
  getters: {
    getterCambio(state) {
      return state.dataDollar;
    },
    getterDollarFindOne(state) {
      return state.dollarFindOne;
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
    async saveDollarAll(params = {}) {
      const payload = {
        precio_bcv: params.bcv,
        precio_promedio: params.promedio,
        precio_paralelo: params.paralelo,
        fecha_actualizacion: new Date(),
        usuario_actualizacion: localStorage.getItem('usuario'),
        activo: true,
      };
      try {
        const token = localStorage.getItem('token') || '';
        const newToken = token.replace('"', ' ');
        const add = await axios.post(Global.url + 'tasaCambio/add', payload, {
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-type': 'Application/json',
            Authorization: 'Bearer ' + newToken,
          },
        });
        if (add.status === 200) {
          Notify.create({
            type: 'positive',
            message: 'Tasa de cambio guardada',
            color: 'positive',
            position: 'bottom-right',
          });
        }
      } catch (error) {
        Notify.create({
          type: 'warning',
          message: 'Error con el Servidor',
          color: 'warning',
          position: 'bottom-right',
        });
        throw error;
      }
    },
    async getDollarFindOne() {
      try {
        const token = localStorage.getItem('token') || '';
        const newToken = token.replace('"', ' ');
        const resp = await axios.get(Global.url + 'tasaCambio/findOne', {
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-type': 'Application/json',
            Authorization: 'Bearer ' + newToken,
          },
        });
        this.dollarFindOne = resp.data;
      } catch (error) {
        console.log(error);
      }
    },
  },
});
