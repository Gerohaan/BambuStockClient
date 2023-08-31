<template>
  <q-layout class="app-font" view="lHh Lpr lFf">
    <q-header class="">
      <q-toolbar :class="configStore.darkMode ? 'bg-dark' : 'bg-primary'">
        <q-btn
          flat
          dense
          round
          color="white"
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer()"
        />
        <q-toolbar-title class="text-white"> BambúStock v 1.0</q-toolbar-title>
        <q-btn
          flat
          round
          dense
          color="white"
          icon="notifications"
          size="md"
          class="q-mr-sm"
        >
          <q-badge color="secondary" floating>4</q-badge>
        </q-btn>
        <q-btn
          dense
          :label="userName"
          outline
          style="border-radius: 8px"
          padding="2px 12px 2px 12px"
          color="secondary"
          class="bg-white"
          size="md"
        />
        <q-btn flat round dense icon="more_vert" size="md" color="white">
          <q-menu
            auto-close
            :class="configStore.darkMode ? 'bg-dark' : 'bg-secondary'"
            class="text-white"
          >
            <q-list dense>
              <q-item clickable>
                <q-item-section>Dark</q-item-section>
                <q-item-section side>
                  <q-toggle
                    dense
                    size="xs"
                    @click="darkApply()"
                    v-model="darkMode"
                  />
                </q-item-section>
              </q-item>
              <q-item clickable>
                <q-item-section>Configuración</q-item-section>
              </q-item>
              <q-item clickable>
                <q-item-section>Salir</q-item-section>
              </q-item>
            </q-list>
          </q-menu>
        </q-btn>
      </q-toolbar>
    </q-header>

    <q-drawer
      :class="configStore.darkMode ? 'bg-dark' : 'bg-primary'"
      show-if-above
      :width="200"
      bordered
      :mini="leftDrawerOpen"
    >
      <div class="bg-transparent q-pa-sm" align="center">
        <q-avatar :size="leftDrawerOpen ? '36px' : '56px'" class="">
          <img src="https://cdn.quasar.dev/img/boy-avatar.png" />
        </q-avatar>
        <div v-if="!leftDrawerOpen" class="text-weight-bold text-white">
          {{ userName }}
        </div>
        <!-- <div class="text-white">@username</div> -->
      </div>
      <q-list class="q-mt-md text-white">
        <q-item clickable active-class="white" to="/app" v-ripple>
          <q-item-section avatar>
            <q-icon color="white" name="dashboard" />
          </q-item-section>
          <q-item-section>Inicio</q-item-section>
        </q-item>
        <q-expansion-item
          :content-inset-level="0.2"
          expand-icon-class="text-white"
          icon="inventory_2"
          label="Inventario"
          no-caps
        >
          <q-item clickable active-class="white" to="/app/categorias" v-ripple>
            <q-item-section avatar>
              <q-icon color="white" name="receipt" />
            </q-item-section>
            <q-item-section>Categorias</q-item-section>
          </q-item>
          <q-item clickable v-ripple>
            <q-item-section avatar>
              <q-icon color="white" name="schedule" />
            </q-item-section>
            <q-item-section>Almacen</q-item-section>
          </q-item>
          <q-item clickable v-ripple>
            <q-item-section avatar>
              <q-icon color="white" name="schedule" />
            </q-item-section>
            <q-item-section>Unidad de Medidad</q-item-section>
          </q-item>
          <q-item clickable v-ripple>
            <q-item-section avatar>
              <q-icon color="white" name="schedule" />
            </q-item-section>
            <q-item-section>Presentación del Producto</q-item-section>
          </q-item>
          <q-item clickable v-ripple>
            <q-item-section avatar>
              <q-icon color="white" name="schedule" />
            </q-item-section>
            <q-item-section>Producto</q-item-section>
          </q-item>
          <q-item clickable v-ripple>
            <q-item-section avatar>
              <q-icon color="white" name="schedule" />
            </q-item-section>
            <q-item-section>Tipo de Pagos</q-item-section>
          </q-item>
          <q-item clickable v-ripple>
            <q-item-section avatar>
              <q-icon color="white" name="schedule" />
            </q-item-section>
            <q-item-section>Roles de Usuario</q-item-section>
          </q-item>
          <q-item clickable v-ripple>
            <q-item-section avatar>
              <q-icon color="white" name="schedule" />
            </q-item-section>
            <q-item-section>Usuario</q-item-section>
          </q-item>
        </q-expansion-item>

        <q-expansion-item
          class="rounded-borders"
          expand-icon-class="text-white"
          expand-separator
          icon="real_estate_agent"
          label="Ventas"
          no-caps
        >
        </q-expansion-item>

        <q-expansion-item
          class="rounded-borders"
          expand-icon-class="text-white"
          expand-separator
          icon="shopping_cart_checkout"
          label="Compras"
          no-caps
        >
        </q-expansion-item>

        <q-expansion-item
          class="rounded-borders"
          expand-icon-class="text-white"
          expand-separator
          icon="insert_chart"
          label="Reportes"
          no-caps
        >
        </q-expansion-item>

        <q-expansion-item
          :content-inset-level="0.5"
          expand-icon-class="text-white"
          expand-separator
          icon="groups"
          label="Terceros"
          no-caps
        >
          <q-item-section class="text-white" side>
            <q-btn
              size="14px"
              :to="{ name: 'personas' }"
              flat
              icon="person"
              label="Personas"
              no-caps
            ></q-btn>
          </q-item-section>
          <q-item-section class="text-white" side>
            <q-btn
              size="14px"
              :to="{ name: 'clientes' }"
              flat
              icon="person"
              label="Clientes"
              no-caps
            ></q-btn>
          </q-item-section>
          <q-item-section class="text-white" side>
            <q-btn
              :to="{ name: 'proveedores' }"
              size="14px"
              flat
              icon="person"
              label="Proveedores"
              no-caps
            ></q-btn>
          </q-item-section>
        </q-expansion-item>

        <q-expansion-item
          :content-inset-level="0.5"
          expand-icon-class="text-white"
          expand-separator
          icon="home_repair_service"
          label="Servicios"
          no-caps
        >
          <q-expansion-item
            expand-separator
            :content-inset-level="0.5"
            icon="receipt"
            label="Categorias"
          >
            <q-item-section side>
              <q-btn
                label="Agregar"
                :to="{ name: 'categorias' }"
                size="md"
                flat
                icon="add"
                no-caps
                color="primary"
              ></q-btn>
            </q-item-section>
          </q-expansion-item>
          <q-expansion-item
            expand-separator
            :content-inset-level="0.5"
            icon="receipt"
            label="Empresas"
          >
            <q-item-section side>
              <q-btn
                label="Agregar"
                :to="{ name: 'empresas' }"
                size="md"
                flat
                icon="add"
                no-caps
                color="primary"
              ></q-btn>
            </q-item-section>
          </q-expansion-item>
          <q-expansion-item
            :content-inset-level="0.5"
            expand-separator
            icon="storefront"
            label="Almacen"
          >
            <q-item-section side>
              <q-btn
                size="md"
                flat
                icon="add"
                color="primary"
                no-caps
                :to="{ name: 'almacens' }"
                label="Agregar"
              >
              </q-btn>
            </q-item-section>
          </q-expansion-item>
          <q-expansion-item
            :content-inset-level="0.5"
            expand-separator
            icon="schedule"
            label="Unidad de Medidad"
          >
            <q-item-section side>
              <q-btn
                size="md"
                flat
                icon="add"
                color="primary"
                no-caps
                :to="{ name: 'medida' }"
                label="Agregar"
              >
              </q-btn>
            </q-item-section>
          </q-expansion-item>
          <q-expansion-item
            :content-inset-level="0.5"
            expand-separator
            icon="schedule"
            label="Presentación del Producto"
          >
            <q-item-section side>
              <q-btn
                size="md"
                flat
                icon="add"
                color="primary"
                no-caps
                :to="{ name: 'presentaciones' }"
                label="Agregar"
              >
              </q-btn>
            </q-item-section>
          </q-expansion-item>
          <q-expansion-item
            :content-inset-level="0.5"
            expand-separator
            icon="schedule"
            label="Producto"
          >
            <q-item-section side>
              <q-btn
                size="md"
                flat
                icon="add"
                color="primary"
                no-caps
                :to="{ name: 'productos' }"
                label="Agregar"
              >
              </q-btn>
            </q-item-section>
          </q-expansion-item>
          <q-expansion-item
            :content-inset-level="0.5"
            expand-separator
            icon="schedule"
            label="Tipo de Pagos"
          >
            <q-item-section side>
              <q-btn
                size="md"
                flat
                icon="add"
                color="primary"
                no-caps
                to="/FormaPago"
                label="Agregar"
              >
              </q-btn>
            </q-item-section>
          </q-expansion-item>
          <q-expansion-item
            :content-inset-level="0.5"
            expand-separator
            icon="schedule"
            label="Roles de Usuario"
          >
            <q-item-section side>
              <q-btn
                size="md"
                flat
                icon="add"
                color="primary"
                no-caps
                :to="{ name: 'roles' }"
                label="Agregar"
              >
              </q-btn>
            </q-item-section>
          </q-expansion-item>
          <q-expansion-item
            :content-inset-level="0.5"
            expand-separator
            icon="schedule"
            label="Usuario"
          >
            <q-item-section side>
              <q-btn
                size="md"
                flat
                icon="add"
                color="primary"
                no-caps
                :to="{ name: 'usuarios' }"
                label="Agregar"
              >
              </q-btn>
            </q-item-section>
          </q-expansion-item>
        </q-expansion-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useUsersStore } from 'src/stores/users';
import { useConfigUserStore } from 'src/stores/configUser';
import { useQuasar } from 'quasar';
const usersStore = useUsersStore();
const configStore = useConfigUserStore();
/* import EssentialLink, {
  EssentialLinkProps,
} from 'components/EssentialLink.vue';

const essentialLinks: EssentialLinkProps[] = [
  {
    title: 'Docs',
    caption: 'quasar.dev',
    icon: 'school',
    link: 'https://quasar.dev',
  },
  {
    title: 'Github',
    caption: 'github.com/quasarframework',
    icon: 'code',
    link: 'https://github.com/quasarframework',
  },
  {
    title: 'Discord Chat Channel',
    caption: 'chat.quasar.dev',
    icon: 'chat',
    link: 'https://chat.quasar.dev',
  },
  {
    title: 'Forum',
    caption: 'forum.quasar.dev',
    icon: 'record_voice_over',
    link: 'https://forum.quasar.dev',
  },
  {
    title: 'Twitter',
    caption: '@quasarframework',
    icon: 'rss_feed',
    link: 'https://twitter.quasar.dev',
  },
  {
    title: 'Facebook',
    caption: '@QuasarFramework',
    icon: 'public',
    link: 'https://facebook.quasar.dev',
  },
  {
    title: 'Quasar Awesome',
    caption: 'Community Quasar projects',
    icon: 'favorite',
    link: 'https://awesome.quasar.dev',
  },
]; */
const $q = useQuasar();
const userName = localStorage.getItem('usuario');
const leftDrawerOpen = ref(true);
const darkMode = ref(false);
function toggleLeftDrawer () {
  leftDrawerOpen.value = !leftDrawerOpen.value;
}
const darkApply = () => {
  configStore.applyDarkMode(darkMode.value);
  $q.dark.set(darkMode.value);
};
onMounted(() => {
  configStore.getDarkMode();
  darkMode.value = configStore.darkMode;
  $q.dark.set(darkMode.value);
});
</script>
<style>
@import url('https://fonts.googleapis.com/css2?family=Work+Sans:wght@200;400;500;600;700;800;900&display=swap');

.app-font {
  font-family: 'Work Sans', sans-serif;
}
.fade-enter-active,
.fade-leave-active {
  opacity: 1;
  transition: all 0.5s ease-in-out;
}

.fade-enter,
.fade-leave {
  opacity: 0;
}
</style>
