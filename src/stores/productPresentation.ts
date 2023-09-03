import { defineStore } from 'pinia';
import { Global } from 'src/config/Global';
import axios from 'axios';
import { ref } from 'vue';
import { Notify } from 'quasar';

export const useProductPresentationStore = defineStore('presentation', {
  state: () => {
    return {
      modalAdd: false,
      modalEdit: false,
      editPresentationID: {},
      presentationId: {},
      presentation: ref([]),
    };
  },
  getters: {},
  actions: {
    manageModal(param = true, edit = false, row = {}) {
      if (edit) {
        this.modalEdit = edit;
        this.editPresentationID = row;
        this.modalAdd = param;
      } else {
        this.modalAdd = param;
      }
      if (param === false) {
        this.modalEdit = false;
        this.editPresentationID = {};
      }
    },
    async presentationAdd(params = {}) {
      try {
        const token = localStorage.getItem('token') || '';
        const newToken = token.replace('"', ' ');
        const add = await axios.post(Global.url + 'presentacion/add', params, {
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-type': 'Application/json',
            Authorization: 'Bearer ' + newToken,
          },
        });
        if (add.status === 200) {
          Notify.create({
            type: 'positive',
            message: 'Presentación del producto agregada',
            color: 'positive',
            position: 'bottom-right',
          });
        }
      } catch (error) {
        console.log(error);
        Notify.create({
          type: 'danger',
          message: 'Error con el Servidor',
          color: 'warning',
          position: 'bottom-right',
        });
      }
    },

    async presentationAll() {
      try {
        const token = localStorage.getItem('token') || '';
        const newToken = token.replace('"', ' ');
        const getAll = await axios.get(Global.url + 'presentacion/list', {
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-type': 'Application/json',
            Authorization: 'Bearer ' + newToken,
          },
        });
        const resp = (this.presentation = getAll.data);
      } catch (error) {
        console.log(error);
      }
    },

    async presentationDelete(id = 1) {
      try {
        const token = localStorage.getItem('token') || '';
        const newToken = token.replace('"', ' ');
        const lista = await axios.delete(
          Global.url + 'presentacion/delete/' + `${id}`,
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

    async presentationUpdate(params = 1, id = 1) {
      try {
        const token = localStorage.getItem('token') || '';
        const newToken = token.replace('"', ' ');
        const updateP = await axios.put(
          Global.url + 'presentacion/update/' + `${id}`,
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
            message: 'Presentación del producto actualizada',
            color: 'positive',
            position: 'bottom-right',
          });
        }
      } catch (error) {
        console.log(error);
        Notify.create({
          type: 'warning',
          message: 'Error al intentar actualizar la presentación del producto',
          color: 'warning',
          position: 'center',
        });
      }
    },

    async presentationById(id = 1) {
      try {
        console.log(id);

        const token = localStorage.getItem('token') || '';
        const newToken = token.replace('"', ' ');
        const list = await axios.get(Global.url + 'presentacion/show/' + `${id}`, {
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-type': 'Application/json',
            Authorization: 'Bearer ' + newToken,
          },
        });
        const respu = (this.presentationId = list.data);
      } catch (error) {
        console.log(error);
      }
    },
  },
});
