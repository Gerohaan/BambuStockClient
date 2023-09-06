<template>
  <div class="row q-ma-md">
    <div class="col-12 q-pa-sm">
      <p class="text-h5 text-primary">Crear nuevo producto</p>
    </div>
    <div class="q-pa-md col col-xs-12 col-sm-12 col-md-8 col-lg-8 col-xl-8">
      <q-card class="">
        <q-card-section class="q-pb-none">
          <p>Datos del producto</p>
        </q-card-section>
        <q-card-section horizontal class="q-pa-md">
          <q-label class="col q-ma-sm"
            >Nombre del producto
            <q-input
              v-model="product.name"
              label="Nombre del producto *"
              standout
              bg-color="grey-2"
              dense
              color="primary"
            ></q-input>
          </q-label>
          <q-label class="col q-ma-sm">
            Código
            <q-input
              v-model="product.name"
              label="Nombre del producto *"
              standout
              bg-color="grey-2"
              dense
              color="primary"
            ></q-input
          ></q-label>
          <q-label class="col q-ma-sm"
            >Unidad de medida
            <q-input
              v-model="product.name"
              label="Nombre del producto *"
              standout
              bg-color="grey-2"
              dense
              color="primary"
            ></q-input>
          </q-label>
        </q-card-section>
      </q-card>
    </div>
    <div class="q-pa-md col col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
      <q-card class="">
        <q-card-section class="q-pb-none">
          <p>Datos del producto</p>
        </q-card-section>
        <q-card-section horizontal class="q-pa-md">
          <q-input
            class="col q-ma-sm"
            v-model="product.name"
            label="Nombre del producto *"
            standout
            bg-color="grey-2"
            dense
            color="primary"
          ></q-input>
          <q-input
            class="col q-ma-sm"
            v-model="product.name"
            label="Nombre del producto *"
            standout
            bg-color="grey-2"
            dense
            color="primary"
          ></q-input>
          <q-input
            class="col q-ma-sm"
            v-model="product.name"
            label="Nombre del producto *"
            standout
            bg-color="grey-2"
            dense
            color="primary"
          ></q-input>
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { usePaymentStore } from 'src/stores/payment';

const paymentStore = usePaymentStore();

const product = ref({});

onMounted(async () => {
  await paymentStore.paymentAll();
});
</script>
