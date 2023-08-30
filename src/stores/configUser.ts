import { defineStore } from 'pinia';
import { Global } from 'src/config/Global';
import axios from 'axios';
import { ref } from 'vue';
import { Notify } from 'quasar';

export const useConfigUserStore = defineStore('configUser', {
  state: () => {
    return {
      darkMode: false,
    };
  },
  getters: {},
  actions: {
    getDarkMode() {
      if (localStorage.getItem('darkMode')) {
        if (localStorage.getItem('darkMode') === 'true') {
          this.darkMode = true;
        } else {
          this.darkMode = false;
        }
      } else {
        localStorage.setItem('darkMode', 'false');
      }
    },
    applyDarkMode(param = true) {
      localStorage.setItem('darkMode', param);
      this.darkMode = param;
    },
  },
});
