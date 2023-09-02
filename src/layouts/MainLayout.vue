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
          @click="openTabWhatsApp()"
          flat
          size="md"
          round
          dense
          icon="img:icons/whatsapp.svg"
        >
          <q-tooltip class="bg-primary">Soporte whatsapp</q-tooltip>
        </q-btn>
        <q-btn
          flat
          round
          dense
          color="white"
          icon="notifications"
          size="md"
          class="q-mr-sm"
        >
          <q-tooltip class="bg-primary">Notificaciones</q-tooltip>
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
        >
          <q-tooltip class="bg-primary">Pefíl</q-tooltip>
        </q-btn>
        <q-btn flat round dense icon="more_vert" size="md" color="white">
          <q-menu>
            <div class="row no-wrap q-pa-md">
              <div class="column">
                <div class="text-h6 q-mb-md">Ajustes</div>
                <q-toggle
                  label="Modo oscuro"
                  @click="darkApply()"
                  v-model="darkMode"
                />
                <q-btn
                  padding="none"
                  outline
                  class="q-mt-md"
                  color="primary"
                  dense
                  no-caps
                  >Configuración</q-btn
                >
              </div>

              <q-separator vertical inset class="q-mx-lg" />

              <div class="column items-center">
                <q-avatar size="72px">
                  <img src="https://cdn.quasar.dev/img/boy-avatar.png" />
                </q-avatar>

                <div class="text-subtitle1 text-center q-mt-md q-mb-xs">
                  {{ userName }}
                </div>

                <q-btn
                  @click="confirmlogOut()"
                  color="primary"
                  label="Salir"
                  push
                  size="sm"
                  v-close-popup
                />
              </div>
            </div>
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
      <q-scroll-area class="fit">
        <div class="bg-transparent q-pa-sm" align="center">
          <q-avatar :size="leftDrawerOpen ? '36px' : '56px'" class="">
            <img src="https://cdn.quasar.dev/img/boy-avatar.png" />
          </q-avatar>
          <div v-if="!leftDrawerOpen" class="text-weight-bold text-white">
            {{ userName }}
          </div>
        </div>

        <q-list class="q-mt-md text-white">
          <q-item
            clickable
            active-class="white"
            :to="{ name: 'index' }"
            v-ripple
          >
            <q-item-section avatar>
              <q-icon color="white" name="dashboard" />
            </q-item-section>
            <q-item-section>Inicio</q-item-section>
          </q-item>
          <q-expansion-item
            @click="showingInventory = true"
            :content-inset-level="0.2"
            expand-icon-class="text-white"
            expand-separator
            icon="inventory_2"
            label="Inventario"
            no-caps
          >
            <!-- Apertura: Se mostrará si el sidebar está contraido -->
            <q-menu
              square
              style="
                border-top-right-radius: 8px;
                border-bottom-right-radius: 8px;
              "
              class="text-white"
              :class="configStore.darkMode ? 'bg-dark' : 'bg-primary'"
              transition-show="jump-down"
              transition-hide="jump-up"
              :offset="[-57, 120]"
              self="top left"
              v-if="leftDrawerOpen"
              v-model="showingInventory"
            >
              <q-list separator dense style="min-width: 100px">
                <q-item
                  clickable
                  active-class="white"
                  :to="{ name: 'categories' }"
                  v-ripple
                >
                  <q-item-section>Categorias</q-item-section>
                </q-item>
                <q-item
                  clickable
                  active-class="white"
                  :to="{ name: 'warehouses' }"
                  v-ripple
                >
                  <q-item-section>Almacen</q-item-section>
                </q-item>
                <q-item
                  clickable
                  active-class="white"
                  :to="{ name: 'unit' }"
                  v-ripple
                >
                  <q-item-section>Unidad de Medidad</q-item-section>
                </q-item>
                <q-item clickable v-ripple>
                  <q-item-section>Presentación del Producto</q-item-section>
                </q-item>
                <q-item clickable v-ripple>
                  <q-item-section>Productos</q-item-section>
                </q-item>
                <q-item clickable v-ripple>
                  <q-item-section>Tipos de pago</q-item-section>
                </q-item>
              </q-list>
            </q-menu>
            <!-- Cierre: Se mostrará si el sidebar está contraido -->
            <q-item
              clickable
              active-class="white"
              :to="{ name: 'categories' }"
              v-ripple
            >
              <q-item-section avatar>
                <q-icon color="white" name="category" />
              </q-item-section>
              <q-item-section>Categorias</q-item-section>
            </q-item>
            <q-item
              clickable
              active-class="white"
              :to="{ name: 'warehouses' }"
              v-ripple
            >
              <q-item-section avatar>
                <q-icon color="white" name="storefront" />
              </q-item-section>
              <q-item-section>Almacen</q-item-section>
            </q-item>
            <q-item
              clickable
              active-class="white"
              :to="{ name: 'unit' }"
              v-ripple
            >
              <q-item-section avatar>
                <q-icon color="white" name="ad_units" />
              </q-item-section>
              <q-item-section>Unidad de Medidad</q-item-section>
            </q-item>
            <q-item clickable v-ripple>
              <q-item-section avatar>
                <q-icon color="white" name="conveyor_belt" />
              </q-item-section>
              <q-item-section>Presentación del Producto</q-item-section>
            </q-item>
            <q-item clickable v-ripple>
              <q-item-section avatar>
                <q-icon color="white" name="eco" />
              </q-item-section>
              <q-item-section>Productos</q-item-section>
            </q-item>
            <q-item clickable v-ripple>
              <q-item-section avatar>
                <q-icon color="white" name="payments" />
              </q-item-section>
              <q-item-section>Tipos de pago</q-item-section>
            </q-item>
          </q-expansion-item>

          <q-expansion-item
            @click="showingSales = true"
            :content-inset-level="0.2"
            class="rounded-borders"
            expand-separator
            expand-icon-class="text-white"
            icon="real_estate_agent"
            label="Ventas"
            no-caps
          >
            <!-- Apertura: Se mostrará si el sidebar está contraido -->
            <q-menu
              square
              style="
                border-top-right-radius: 8px;
                border-bottom-right-radius: 8px;
              "
              class="text-white"
              :class="configStore.darkMode ? 'bg-dark' : 'bg-primary'"
              transition-show="jump-down"
              transition-hide="jump-up"
              :offset="[-57, 165]"
              v-if="leftDrawerOpen"
              v-model="showingSales"
            >
              <q-list separator dense style="min-width: 100px">
                <q-item clickable active-class="white" v-ripple>
                  <q-item-section>Ventas en caja</q-item-section>
                </q-item>
                <q-item clickable active-class="white" v-ripple>
                  <q-item-section>Ventas en linea</q-item-section>
                </q-item>
              </q-list>
            </q-menu>
            <!-- Cierre: Se mostrará si el sidebar está contraido -->
            <q-item clickable active-class="white" v-ripple>
              <q-item-section avatar>
                <q-icon color="white" name="point_of_sale" />
              </q-item-section>
              <q-item-section>Ventas en caja</q-item-section>
            </q-item>
            <q-item clickable active-class="white" v-ripple>
              <q-item-section avatar>
                <q-icon color="white" name="shopping_cart" />
              </q-item-section>
              <q-item-section>Ventas en linea</q-item-section>
            </q-item>
          </q-expansion-item>
          <q-item clickable active-class="white" v-ripple>
            <q-item-section avatar>
              <q-icon color="white" name="shopping_cart_checkout" />
            </q-item-section>
            <q-item-section>Compras</q-item-section>
          </q-item>
          <q-item clickable active-class="white" v-ripple>
            <q-item-section avatar>
              <q-icon color="white" name="insert_chart" />
            </q-item-section>
            <q-item-section>Reportes</q-item-section>
          </q-item>

          <q-expansion-item
            @click="showingThirdParties = true"
            :content-inset-level="0.5"
            expand-icon-class="text-white"
            expand-separator
            icon="groups"
            label="Terceros"
            no-caps
          >
            <!-- Apertura: Se mostrará si el sidebar está contraido -->
            <q-menu
              square
              style="
                border-top-right-radius: 8px;
                border-bottom-right-radius: 8px;
              "
              class="text-white"
              :class="configStore.darkMode ? 'bg-dark' : 'bg-primary'"
              transition-show="jump-down"
              transition-hide="jump-up"
              :offset="[-57, 310]"
              v-if="leftDrawerOpen"
              v-model="showingThirdParties"
            >
              <q-list separator dense style="min-width: 100px">
                <q-item
                  clickable
                  active-class="white"
                  :to="{ name: 'clients' }"
                  v-ripple
                >
                  <q-item-section>Clientes</q-item-section>
                </q-item>
                <q-item
                  clickable
                  active-class="white"
                  :to="{ name: 'proveedores' }"
                  v-ripple
                >
                  <q-item-section>Proveedores</q-item-section>
                </q-item>
              </q-list>
            </q-menu>
            <!-- Cierre: Se mostrará si el sidebar está contraido -->
            <q-item
              clickable
              active-class="white"
              :to="{ name: 'clients' }"
              v-ripple
            >
              <q-item-section avatar>
                <q-icon color="white" name="person" />
              </q-item-section>
              <q-item-section>Clientes</q-item-section>
            </q-item>
            <q-item
              clickable
              active-class="white"
              :to="{ name: 'proveedores' }"
              v-ripple
            >
              <q-item-section avatar>
                <q-icon color="white" name="hail" />
              </q-item-section>
              <q-item-section>Proveedores</q-item-section>
            </q-item>
          </q-expansion-item>
          <q-item clickable active-class="white" v-ripple>
            <q-item-section avatar>
              <q-icon color="white" name="home_repair_service" />
            </q-item-section>
            <q-item-section>Servicios</q-item-section>
          </q-item>
          <q-item clickable active-class="white" v-ripple>
            <q-item-section avatar>
              <q-icon color="white" name="help_outline" />
            </q-item-section>
            <q-item-section>Soporte</q-item-section>
          </q-item>
        </q-list>
      </q-scroll-area>
    </q-drawer>
    <q-page-container>
      <transition name="fade">
        <router-view />
      </transition>
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { ref, onMounted, inject } from 'vue';
import { useUsersStore } from 'src/stores/users';
import { useRouter } from 'vue-router';
import { useConfigUserStore } from 'src/stores/configUser';
import { Notify, useQuasar, QSpinnerFacebook, QSpinnerDots } from 'quasar';
const whatsAppLinkSupport = 'https://api.whatsapp.com/send?phone=584143510401&';
const swal = inject('$swal');
const usersStore = useUsersStore();
const configStore = useConfigUserStore();

const router = useRouter();
const $q = useQuasar();
const userName = localStorage.getItem('usuario');
const leftDrawerOpen = ref(true);
const darkMode = ref(false);

const showingInventory = ref(false);
const showingSales = ref(false);
const showingThirdParties = ref(false);
function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value;
}
const openTabWhatsApp = () => {
  window.open(whatsAppLinkSupport, '_blank');
};
const darkApply = () => {
  configStore.applyDarkMode(darkMode.value);
  $q.dark.set(darkMode.value);
};
const confirmlogOut = (id = 1) => {
  swal
    .fire({
      title: '¿Esta seguro/a?',
      text: 'Cerrará sesión en el sistema',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#8dbc5c',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, cerrar sesión!',
      cancelButtonText: 'Cancelar',
    })
    .then((result) => {
      if (result.isConfirmed) {
        logOut();
      }
    });
};
const logOut = async () => {
  $q.loading.show({
    spinner: QSpinnerDots,
    spinnerColor: 'primary',
    spinnerSize: 110,
    backgroundColor: 'secondary',
    message: '',
    messageColor: 'black',
  });
  try {
    await usersStore.logOut();
    location.reload();
    router.push('/');
    /* swal.fire({
      title: 'Te esperamos pronto...',
      timer: 2000,
      timerProgressBar: true,
    }); */
    Notify.create({
      type: 'positive',
      message: 'Te esperamos pronto...',
      color: 'positive',
      position: 'bottom-right',
    });
    $q.loading.hide();
  } catch (error) {
    Notify.create({
      type: 'danger',
      message: error.response.data,
      color: 'negative',
      position: 'bottom-right',
      icon: 'warning',
    });
    $q.loading.hide();
  }
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
