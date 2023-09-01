import { defineStore } from 'pinia';
import { Global } from 'src/config/Global';
import axios from 'axios';
import { ref } from 'vue';
import { Notify } from 'quasar';

export const useUnitStore = defineStore('unit', {
  state: () => {
    return {
      modalAdd: false,
      modalEdit: false,
      editUnitID: {},
      unitId: {},
      unit: ref([]),
    };
  },
  getters: {},
  actions: {
    manageModal(param = true, edit = false, row = {}) {
      if (edit) {
        this.modalEdit = edit;
        this.editUnitID = row;
        this.modalAdd = param;
      } else {
        this.modalAdd = param;
      }
      if (param === false) {
        this.modalEdit = false;
        this.editUnitID = {};
      }
    },
    async unitAdd(params = {}) {
      try {
        const token = localStorage.getItem('token') || '';
        const newToken = token.replace('"', ' ');
        const add = await axios.post(Global.url + 'unidad/add', params, {
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-type': 'Application/json',
            Authorization: 'Bearer ' + newToken,
          },
        });
        if (add.status === 200) {
          Notify.create({
            type: 'positive',
            message: 'Unidad de medida agregada',
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

    async unitAll() {
      try {
        const token = localStorage.getItem('token') || '';
        const newToken = token.replace('"', ' ');
        const getAll = await axios.get(Global.url + 'unidad/list', {
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-type': 'Application/json',
            Authorization: 'Bearer ' + newToken,
          },
        });
        const resp = (this.unit = getAll.data);
      } catch (error) {
        console.log(error);
      }
    },

    async unitDelete(id = 1) {
      try {
        const token = localStorage.getItem('token') || '';
        const newToken = token.replace('"', ' ');
        const lista = await axios.delete(
          Global.url + 'unidad/delete/' + `${id}`,
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

    async unitUpdate(params = 1, id = 1) {
      try {
        const token = localStorage.getItem('token') || '';
        const newToken = token.replace('"', ' ');
        const updateP = await axios.put(
          Global.url + 'unidad/update/' + `${id}`,
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
            message: 'Unidad de medida actualizada',
            color: 'positive',
            position: 'bottom-right',
          });
        }
      } catch (error) {
        console.log(error);
        Notify.create({
          type: 'warning',
          message: 'Error al intentar actualizar la unidad de medida',
          color: 'warning',
          position: 'center',
        });
      }
    },

    async unitById(id = 1) {
      try {
        console.log(id);

        const token = localStorage.getItem('token') || '';
        const newToken = token.replace('"', ' ');
        const list = await axios.get(Global.url + 'unidad/show/' + `${id}`, {
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-type': 'Application/json',
            Authorization: 'Bearer ' + newToken,
          },
        });
        const respu = (this.unitId = list.data);
      } catch (error) {
        console.log(error);
      }
    },
  },
});
