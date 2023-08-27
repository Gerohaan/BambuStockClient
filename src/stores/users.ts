import { defineStore } from 'pinia';
import { Global, Headers } from 'src/config/Global';
import axios from 'axios';
import { ref } from 'vue';
import { Notify } from 'quasar';
import { useQuasar, QSpinnerFacebook } from 'quasar';

export const useUsersStore = defineStore('users', {
  state: () => {
    return {
      userId: ref({}),
      user: ref([]),
      token: ref(''),
      userToken: ref(''),
    };
  },
  getters: {},
  actions: {
    async userAll() {
      try {
        const token = localStorage.getItem('token') || '';
        const newToken = token.replace('"', ' ');
        const getAll = await axios.get(Global.url + 'usuario/list', {
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-type': 'Application/json',
            Authorization: 'Bearer ' + newToken,
          },
        });
        const resp = (this.user = getAll.data);
      } catch (error) {
        console.log(error);
      }
    },

    async userAdd(params = {}) {
      try {
        const token = localStorage.getItem('token') || '';
        const newToken = token.replace('"', ' ');
        const add = await axios.post(Global.url + 'usuario/add', params, {
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-type': 'Application/json',
            Authorization: 'Bearer ' + newToken,
          },
        });
        if (add.status === 200) {
          Notify.create({
            type: 'positive',
            message: 'Usuario agregado',
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
    async userLogin(params = {}) {
      try {
        const add = await axios.post(Global.url + 'auth/auth', params, Headers);
        if (add.status === 200) {
          localStorage.setItem('token', add.data.accesToken);
          this.token = localStorage.getItem('token');
          localStorage.setItem('usuario', add.data.userToken);
          this.userToken = localStorage.getItem('usuario');

          Notify.create({
            type: 'positive',
            message: 'Inicio de sesión exitoso',
            color: 'positive',
            position: 'top-right',
          });
        }
      } catch (error) {
        throw 'Error al iniciar sesión';
      }
    },

    async userById(id = 1) {
      try {
        var token = localStorage.getItem('token') || '';
        const newToken = token.replace('"', ' ');
        let list = await axios.get(Global.url + 'usuario/show/' + `${id}`, {
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-type': 'Application/json',
            Authorization: 'Bearer ' + newToken,
          },
        });
        const respu = (this.userId = list.data);
      } catch (error) {
        console.log(error);
      }
    },

    async userDelete(id = 1) {
      try {
        const token = localStorage.getItem('token') || '';
        const newToken = token.replace('"', ' ');
        const lista = await axios.delete(
          Global.url + 'usuario/delete/' + `${id}`,
          {
            headers: {
              'Access-Control-Allow-Origin': '*',
              'Content-type': 'Application/json',
              Authorization: 'Bearer ' + newToken,
            },
          }
        );
        if (lista.status === 200) {
          Notify.create({
            type: 'positive',
            message: 'Usuario Eliminado',
            color: 'positive',
            position: 'center',
          });
        }
      } catch (error) {
        console.log(error);
        Notify.create({
          type: 'warning',
          message: 'Error al intentar eliminar el usuario',
          color: 'warning',
          position: 'center',
        });
      }
    },

    async roleUpdate(params = {}, id = 1) {
      try {
        var token = localStorage.getItem('token') || '';
        const newToken = token.replace('"', ' ');
        let updateP = await axios.put(
          Global.url + 'rol/update/' + `${id}`,
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
            message: 'Rol actualizado',
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
  },
});
