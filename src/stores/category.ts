import { defineStore } from 'pinia';
import { Global } from 'src/config/Global';
import axios from 'axios';
import { ref } from 'vue';
import { Notify } from 'quasar';

export const useCategoryStore = defineStore('category', {
  state: () => {
    return {
      modalAdd: false,
      modalEdit: false,
      editCategID: {},
      CategoriaId: {},
      Categoria: ref([]),
    };
  },
  getters: {},
  actions: {
    manageModal(param = true, edit = false, row = {}) {
      if (edit) {
        this.modalEdit = edit;
        this.editCategID = row;
        this.modalAdd = param;
      } else {
        this.modalAdd = param;
      }
      if (param === false) {
        this.modalEdit = false;
        this.editCategID = {};
      }
    },
    async CategoryAdd(params = {}) {
      try {
        const token = localStorage.getItem('token') || '';
        const newToken = token.replace('"', ' ');
        const add = await axios.post(Global.url + 'categoria/add', params, {
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-type': 'Application/json',
            Authorization: 'Bearer ' + newToken,
          },
        });
        if (add.status === 200) {
          Notify.create({
            type: 'positive',
            message: 'Categoria agregada',
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

    async CategoriaAll() {
      try {
        const token = localStorage.getItem('token') || '';
        const newToken = token.replace('"', ' ');
        const getAll = await axios.get(Global.url + 'categoria/list', {
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-type': 'Application/json',
            Authorization: 'Bearer ' + newToken,
          },
        });
        const resp = (this.Categoria = getAll.data);
      } catch (error) {
        console.log(error);
      }
    },

    async CategoriaDelete(id = 1) {
      try {
        const token = localStorage.getItem('token') || '';
        const newToken = token.replace('"', ' ');
        const lista = await axios.delete(
          Global.url + 'categoria/delete/' + `${id}`,
          {
            headers: {
              'Access-Control-Allow-Origin': '*',
              'Content-type': 'Application/json',
              Authorization: 'Bearer ' + newToken,
            },
          }
        );
        /* if (lista.status === 200) {
          Notify.create({
            type: 'positive',
            message: 'Categoria Eliminada',
            color: 'positive',
            position: 'bottom-right',
          });
        } */
      } catch (error) {
        console.log(error);
        throw error;
        /* Notify.create({
          type: 'warning',
          message: 'Error al intentar eliminar la categoria',
          color: 'warning',
          position: 'bottom-right',
        }); */
      }
    },

    async CategoriaUpdate(params = 1, id = 1) {
      try {
        const token = localStorage.getItem('token') || '';
        const newToken = token.replace('"', ' ');
        const updateP = await axios.put(
          Global.url + 'categoria/update/' + `${id}`,
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
            message: 'Categoria Actualizada',
            color: 'positive',
            position: 'bottom-right',
          });
        }
      } catch (error) {
        console.log(error);
        Notify.create({
          type: 'warning',
          message: 'Error al intentar actualizar la categoria',
          color: 'warning',
          position: 'center',
        });
      }
    },

    async CategoriaById(id = 1) {
      try {
        console.log(id);

        const token = localStorage.getItem('token') || '';
        const newToken = token.replace('"', ' ');
        const list = await axios.get(Global.url + 'categoria/show/' + `${id}`, {
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-type': 'Application/json',
            Authorization: 'Bearer ' + newToken,
          },
        });
        const respu = (this.CategoriaId = list.data);
        console.log(respu);
      } catch (error) {
        console.log(error);
      }
    },
  },
});
