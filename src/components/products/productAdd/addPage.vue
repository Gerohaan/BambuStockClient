<template>
  <div class="row q-ma-md">
    <div class="col-12 q-pa-sm">
      <p class="text-h5 text-primary">Crear nuevo producto</p>
    </div>
    <div class="q-pa-md col col-xs-12 col-sm-12 col-md-8 col-lg-8 col-xl-8">
      <q-card
        bordered
        style="border-color: #4caf50; border-radius: 8px"
        class="text-primary"
      >
        <q-card-section class="q-pb-none">
          <p class="text-h6">Datos del producto*</p>
        </q-card-section>
        <q-card-section horizontal class="q-pa-md">
          <q-label class="col q-ma-sm text-subtitle1"
            >Nombre del producto
            <q-input
              input-class="text-black"
              v-model="product.name"
              label="Escriba el nombre del producto"
              standout
              bg-color="grey-2"
              dense
              color="primary"
            ></q-input>
          </q-label>
          <q-label class="col q-ma-sm text-subtitle1">
            Código*
            <q-input
              input-class="text-black"
              v-model="product.name"
              label="Escriba el código del producto"
              standout
              bg-color="grey-2"
              dense
              color="primary"
            ></q-input
          ></q-label>
          <q-label class="col q-ma-sm text-subtitle1"
            >Unidad de medida
            <q-input
              input-class="text-black"
              v-model="product.name"
              label="Seleccione unidad de medida"
              standout
              bg-color="grey-2"
              dense
              color="primary"
            ></q-input>
          </q-label>
        </q-card-section>
        <q-card-section horizontal class="q-pa-md">
          <q-label class="col q-ma-sm text-subtitle1">
            Descripción
            <q-input
              input-class="text-black"
              label="Descripción del producto"
              standout
              bg-color="grey-2"
              dense
              input-style="height: 40px;"
              color="primary"
              type="textarea"
              v-model="product.description"
            ></q-input>
          </q-label>
        </q-card-section>
      </q-card>
    </div>
    <div class="q-pa-md col col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
      <q-card
        bordered
        style="border-color: #4caf50; border-radius: 8px"
        class="text-primary"
      >
        <q-card-section class="row q-pb-none">
          <span class="col text-left text-h6">Categoría</span>
          <span class="col text-right">
            <q-input
              label-color="primary"
              label="Buscar"
              round
              outlined
              bg-color="grey-2"
              dense
              input-style=""
            >
              <template v-slot:prepend> <q-icon name="search" /> </template
            ></q-input>
          </span>
        </q-card-section>
        <q-card-section horizontal class="q-pa-md"> </q-card-section>
      </q-card>
    </div>
  </div>
  <div class="row q-ma-md">
    <div class="q-pa-md col col-xs-12 col-sm-12 col-md-8 col-lg-8 col-xl-8">
      <q-card
        bordered
        style="border-color: #4caf50; border-radius: 8px"
        class="text-primary"
      >
        <q-card-section class="q-pb-none">
          <p class="text-h6">Imágenes del producto</p>
        </q-card-section>
        <q-card-section horizontal class="q-pa-md"
          ><q-uploader
            url="http://localhost:4444/upload"
            multiple
            style="max-width: 300px"
          />
        </q-card-section>
      </q-card>
    </div>
    <div class="q-pa-md col col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
      <q-card
        bordered
        style="border-color: #4caf50; border-radius: 8px"
        class="text-primary"
      >
        <q-card-section class="row q-pb-none">
          <span class="col text-left text-h6">Estado</span>
        </q-card-section>
        <q-card-section horizontal class="q-pa-md"> </q-card-section>
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
