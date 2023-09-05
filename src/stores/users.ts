import { defineStore } from 'pinia';
import { Global, Headers } from 'src/config/Global';
import axios from 'axios';
import { ref } from 'vue';
import { Notify } from 'quasar';
import { useQuasar, QSpinnerFacebook } from 'quasar';
import { useRouter } from 'vue-router';

export const useUsersStore = defineStore('users', {
  state: () => {
    return {
      userId: ref({}),
      user: ref(null),
      token: ref(''),
      userToken: ref(''),
      router: useRouter(),

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
        if (error.response.status === 403) {
          Notify.create({
            type: 'danger',
            message: error.response.data,
            color: 'negative',
            position: 'bottom-right',
          });
          this.router.push('/');
        }
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
        const add = await axios.post(Global.url + 'auth/auth', params);
        if (add.status === 200) {
          localStorage.setItem('token', add.data.accesToken);
          localStorage.setItem('usuario', add.data.usuarioToken);
        }
      } catch (error) {
        throw error;
      }
    },

    async userById(id = 1) {
      try {
        const token = localStorage.getItem('token') || '';
        const newToken = token.replace('"', ' ');
        const list = await axios.get(Global.url + 'usuario/show/' + `${id}`, {
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
        const token = localStorage.getItem('token') || '';
        const newToken = token.replace('"', ' ');
        const updateP = await axios.put(
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

    async logOut() {
      try {
        const token = localStorage.getItem('token') || '';
        const newToken = token.replace('"', ' ');
        await axios.get(Global.url + 'auth/logout', {
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-type': 'Application/json',
            Authorization: 'Bearer ' + newToken,
          },
        });
        localStorage.removeItem('token');
        localStorage.removeItem('usuario');
        localStorage.removeItem('darkMode');
      } catch (error) {
        throw error;
      }
    },
  },
});
