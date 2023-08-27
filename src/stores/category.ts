import { defineStore } from 'pinia';
import { Global } from 'src/config/Global';
import axios from 'axios';
import { ref } from 'vue';
import { Notify } from 'quasar';

export const useCategoryStore = defineStore('category', {
  state: () => {
    return {
      modalAdd: false,
    };
  },
  getters: {},
  actions: {
    manageModal(param = true) {
      this.modalAdd = param;
    },
    async CategoryAdd(params = {}) {
      try {
        let token = localStorage.getItem('token') || '';
        const newToken = token.replace('"', ' ');
        let add = await axios.post(Global.url + 'categoria/add', params, {
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-type': 'Application/json',
            Authorization: 'Bearer ' + newToken,
          },
        });
        if (add.status === 200) {
          Notify.create({
            type: 'positive',
            message: 'Categoria Agregada',
            color: 'positive',
          });
        }
      } catch (error) {
        console.log(params);
        Notify.create({
          type: 'warning',
          message: 'Error con el Servidor',
          color: 'warning',
          position: 'center',
        });
      }
    },
  },
});
