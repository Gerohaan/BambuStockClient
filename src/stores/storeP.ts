import { defineStore } from 'pinia';
import { Global } from 'src/config/Global';
import axios from 'axios';
import { ref } from 'vue';
import { Notify } from 'quasar';

export const useStorePStore = defineStore('storeP', {
  state: () => {
    return {
      modalAdd: false,
      modalEdit: false,
      editStoreID: {},
      storeId: {},
      store: ref([]),
    };
  },
  getters: {},
  actions: {
    manageModal(param = true, edit = false, row = {}) {
      if (edit) {
        this.modalEdit = edit;
        this.editStoreID = row;
        this.modalAdd = param;
      } else {
        this.modalAdd = param;
      }
      if (param === false) {
        this.modalEdit = false;
        this.editStoreID = {};
      }
    },
    async storeAdd(params = {}) {
      try {
        const token = localStorage.getItem('token') || '';
        const newToken = token.replace('"', ' ');
        const add = await axios.post(Global.url + 'bodega/add', params, {
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-type': 'Application/json',
            Authorization: 'Bearer ' + newToken,
          },
        });
        if (add.status === 200) {
          Notify.create({
            type: 'positive',
            message: 'Almacen agregado',
            color: 'positive',
            position: 'bottom-right',
          });
        }
      } catch (error) {
        console.log(params);
        Notify.create({
          type: 'danger',
          message: 'Error con el Servidor',
          color: 'warning',
          position: 'bottom-right',
        });
      }
    },

    async storeAll() {
      try {
        const token = localStorage.getItem('token') || '';
        const newToken = token.replace('"', ' ');
        const getAll = await axios.get(Global.url + 'bodega/list', {
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-type': 'Application/json',
            Authorization: 'Bearer ' + newToken,
          },
        });
        const resp = (this.store = getAll.data);
      } catch (error) {
        console.log(error);
      }
    },

    async storeDelete(id = 1) {
      try {
        const token = localStorage.getItem('token') || '';
        const newToken = token.replace('"', ' ');
        const lista = await axios.delete(
          Global.url + 'bodega/delete/' + `${id}`,
          {
            headers: {
              'Access-Control-Allow-Origin': '*',
              'Content-type': 'Application/json',
              Authorization: 'Bearer ' + newToken,
            },
          }
        );
      } catch (error) {
        console.log(error);
        throw error;
      }
    },

    async storeUpdate(params = 1, id = 1) {
      try {
        const token = localStorage.getItem('token') || '';
        const newToken = token.replace('"', ' ');
        const updateP = await axios.put(
          Global.url + 'bodega/update/' + `${id}`,
          params,
          {
            headers: {
              'Access-Control-Allow-Origin': '*',
              'Content-type': 'Application/json',
              Authorization: 'Bearer ' + newToken,
            },
          }
        );

        if (updateP.status === 200) {
          Notify.create({
            type: 'positive',
            message: 'Almacen Actualizado',
            color: 'positive',
            position: 'bottom-right',
          });
        }
      } catch (error) {
        console.log(error);
        Notify.create({
          type: 'warning',
          message: 'Error al intentar actualizar el Almacen',
          color: 'warning',
          position: 'center',
        });
      }
    },

    async storeById(id = 1) {
      try {
        console.log(id);

        const token = localStorage.getItem('token') || '';
        const newToken = token.replace('"', ' ');
        const list = await axios.get(Global.url + 'bodega/show/' + `${id}`, {
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-type': 'Application/json',
            Authorization: 'Bearer ' + newToken,
          },
        });
        const respu = (this.editStoreID = list.data);
        console.log(respu);
      } catch (error) {
        console.log(error);
      }
    },
  },
});
