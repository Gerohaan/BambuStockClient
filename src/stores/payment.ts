import { defineStore } from 'pinia';
import { Global } from 'src/config/Global';
import axios from 'axios';
import { ref } from 'vue';
import { Notify } from 'quasar';

export const usePaymentStore = defineStore('payment', {
  state: () => {
    return {
      modalAdd: false,
      modalEdit: false,
      ediPaymentID: {},
      paymentId: {},
      payment: ref([]),
    };
  },
  getters: {},
  actions: {
    manageModal(param = true, edit = false, row = {}) {
      if (edit) {
        this.modalEdit = edit;
        this.ediPaymentID = row;
        this.modalAdd = param;
      } else {
        this.modalAdd = param;
      }
      if (param === false) {
        this.modalEdit = false;
        this.ediPaymentID = {};
      }
    },
    async paymentAdd(params = {}) {
      try {
        const token = localStorage.getItem('token') || '';
        const newToken = token.replace('"', ' ');
        const add = await axios.post(Global.url + 'formapago/add', params, {
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-type': 'Application/json',
            Authorization: 'Bearer ' + newToken,
          },
        });
        if (add.status === 200) {
          Notify.create({
            type: 'positive',
            message: 'Forma de pago agregada',
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

    async paymentAll() {
      try {
        const token = localStorage.getItem('token') || '';
        const newToken = token.replace('"', ' ');
        const getAll = await axios.get(Global.url + 'formapago/list', {
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-type': 'Application/json',
            Authorization: 'Bearer ' + newToken,
          },
        });
        const resp = (this.payment = getAll.data);
      } catch (error) {
        console.log(error);
      }
    },

    async paymentDelete(id = 1) {
      try {
        const token = localStorage.getItem('token') || '';
        const newToken = token.replace('"', ' ');
        const lista = await axios.delete(
          Global.url + 'formapago/delete/' + `${id}`,
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

    async paymentUpdate(params = 1, id = 1) {
      try {
        const token = localStorage.getItem('token') || '';
        const newToken = token.replace('"', ' ');
        const updateP = await axios.put(
          Global.url + 'formapago/update/' + `${id}`,
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
            message: 'Forma de pago actualizada',
            color: 'positive',
            position: 'bottom-right',
          });
        }
      } catch (error) {
        console.log(error);
        Notify.create({
          type: 'warning',
          message: 'Error al intentar actualizar la forma de pago',
          color: 'warning',
          position: 'center',
        });
      }
    },

    async paymentById(id = 1) {
      try {
        console.log(id);

        const token = localStorage.getItem('token') || '';
        const newToken = token.replace('"', ' ');
        const list = await axios.get(Global.url + 'formapago/show/' + `${id}`, {
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-type': 'Application/json',
            Authorization: 'Bearer ' + newToken,
          },
        });
        const respu = (this.paymentId = list.data);
      } catch (error) {
        console.log(error);
      }
    },
  },
});
