<template>
  <q-layout class="app-font" view="lHh Lpr lFf">
    <q-header class="">
      <q-toolbar class="bg-purple-6 text-blue-grey-7">
        <q-btn
          flat
          dense
          round
          color="white"
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer()"
        />
        <q-toolbar-title class="text-white"> BambúStock </q-toolbar-title>
        <q-btn
          flat
          round
          dense
          icon="build"
          color="white"
          class="q-mr-sm q-ml-sm"
          size="md"
        />
        <q-btn
          flat
          round
          dense
          color="white"
          icon="notifications"
          size="md"
          class="q-mr-sm"
        />
        <q-btn flat round dense icon="more_vert" size="md" color="white" />
      </q-toolbar>
    </q-header>

    <q-drawer
      class="bg-purple-6"
      v-model="leftDrawerOpen"
      show-if-above
      :width="260"
      bordered
      :mini="miniState"
      @mouseover="miniState = false"
      @mouseout="miniState = true"
    >
      <q-list dense padding class="q-mt-md text-white">
        <q-item active clickable v-ripple>
          <q-expansion-item
            class="text-white rounded-borders"
            expand-separator
            icon="dashboard"
            label="Inicio"
            to="/inicio"
            no-caps
            expand-icon="none"
          >
          </q-expansion-item>
        </q-item>
        <q-item>
          <q-expansion-item
            class="rounded-borders"
            expand-separator
            icon="home_work"
            label="Adminstración"
            no-caps
          >
          </q-expansion-item>
        </q-item>
        <q-item>
          <q-expansion-item
            :content-inset-level="0.5"
            expand-separator
            icon="person"
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
        </q-item>
        <q-item>
          <q-expansion-item
            :content-inset-level="0.5"
            expand-separator
            icon="payments"
            label="Definición"
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
              icon="schedule"
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
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { ref } from 'vue';
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

const leftDrawerOpen = ref(false);
const miniState = ref(true);

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value;
}
</script>
<style>
@import url('https://fonts.googleapis.com/css2?family=Work+Sans:wght@200;400;500;600;700;800;900&display=swap');

.app-font {
  font-family: 'Work Sans', sans-serif;
}
</style>
