import { defineStore } from 'pinia';
import { Global, Headers } from 'src/config/Global';
import axios from 'axios';
import { ref } from 'vue';
import { Notify } from 'quasar';
import { useQuasar, QSpinnerFacebook } from 'quasar';

export const useProductStore = defineStore('products', {
  state: () => {
    return {
      newProduct: ref({}),
      listProduct: ref([]),
    };
  },
  getters: {
    getProductAll(state) {
      return state.listProduct;
    },
  },
  actions: {
    async productAdd(params = {}) {
      try {
        const token = localStorage.getItem('token') || '';
        const newToken = token.replace('"', ' ');
        const add = await axios.post(Global.url + 'producto/add', params, {
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-type': 'Application/json',
            Authorization: 'Bearer ' + newToken,
          },
        });
        if (add.status === 200) {
          Notify.create({
            type: 'positive',
            message: 'Producto agregado',
            color: 'positive',
          });
        }
      } catch (error) {
        console.log(params);
        Notify.create({
          type: 'warning',
          message: 'Error con el Servidor',
          color: 'warning',
          position: 'bottom-right',
        });
      }
    },
    async productsGet() {
      try {
        const token = localStorage.getItem('token') || '';
        const newToken = token.replace('"', ' ');
        const getAll = await axios.get(Global.url + 'producto/list', {
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-type': 'Application/json',
            Authorization: 'Bearer ' + newToken,
          },
        });
        this.listProduct = getAll.data;
      } catch (error) {
        console.log(error);
      }
    },
  },
});
