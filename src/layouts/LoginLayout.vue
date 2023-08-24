<template>
  <q-layout class="app-font" view="lHh Lpr lFf">
    <q-header class="">
      <q-toolbar class="bg-primary text-blue-grey-7">
        <q-toolbar-title class="text-white"> BambúStock </q-toolbar-title>
      </q-toolbar>
    </q-header>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts"></script>
<style>
@import url('https://fonts.googleapis.com/css2?family=Work+Sans:wght@200;400;500;600;700;800;900&display=swap');

.app-font {
  font-family: 'Work Sans', sans-serif;
}
</style>
