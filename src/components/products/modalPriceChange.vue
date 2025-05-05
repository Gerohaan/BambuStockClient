<template>
  <q-dialog v-model="utilsDollarStore.getterModalChangePrices" persistent>
    <q-card :dark="configStore.darkMode" style="border-radius: 8px; width: 50%">
      <q-bar
        :class="configStore.darkMode ? 'text-white' : 'bg-secondary text-white'"
      >
        <div>Ajuste de precios acorde a las tasas del mercado</div>

        <q-space />

        <q-btn
          dense
          flat
          color="white"
          icon="close"
          @click="utilsDollarStore.adminModalChange(false)"
        >
          <q-tooltip class="bg-primary">Cerrar</q-tooltip>
        </q-btn>
      </q-bar>
      <q-form @submit.prevent="confirmSaveDollarsProducts()" @reset="onReset">
        <q-card-section class="col q-pa-md">
          <div v-if="loadinggetDollar">
            <q-spinner color="primary" size="3em" />
          </div>
          <div v-else>
            <q-input
              v-model="prices.precio_bcv"
              lazy-rules
              class="col-6 q-ma-md"
              input-class="text-black"
              dense
              label="Precio BCV *"
              :label-color="configStore.darkMode ? 'dark' : ''"
              standout
              bg-color="grey-2"
            ></q-input>
            <q-input
              v-model="prices.precio_promedio"
              lazy-rules
              class="col-6 q-ma-md"
              input-class="text-black"
              dense
              label="Precio Promedio *"
              :label-color="configStore.darkMode ? 'dark' : ''"
              standout
              bg-color="grey-2"
            ></q-input>
            <q-input
              v-model="prices.precio_paralelo"
              lazy-rules
              class="col-6 q-ma-md"
              input-class="text-black"
              dense
              label="Precio Paralelo *"
              :label-color="configStore.darkMode ? 'dark' : ''"
              standout
              bg-color="grey-2"
            ></q-input>
          </div>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn
            :color="configStore.darkMode ? 'dark' : 'secondary'"
            @click="updatePricesAll()"
            dense
            no-caps
            padding="1px 28px 1px 28px"
            >Actualizar precios</q-btn
          >
          <q-btn
            :color="configStore.darkMode ? 'dark' : 'secondary'"
            type="submit"
            dense
            no-caps
            padding="1px 28px 1px 28px"
            >Ajustar precios</q-btn
          >
        </q-card-actions>
      </q-form>
    </q-card>
  </q-dialog>
</template>
<script lang="ts" setup>
defineOptions({
  name: 'modalPriceChange',
});
import { ref, onMounted, computed, inject } from 'vue';
import { useUtilsDollarStore } from 'src/stores/utilsDollar';
import { useProductStore } from 'src/stores/products';
import { useConfigUserStore } from 'src/stores/configUser';
const utilsDollarStore = useUtilsDollarStore();
const productStore = useProductStore();
const configStore = useConfigUserStore();

const swal = inject('$swal');

const prices = computed(() => {
  return {
    precio_bcv: utilsDollarStore.getterDollarFindOne.precio_bcv,
    precio_promedio: utilsDollarStore.getterDollarFindOne.precio_promedio,
    precio_paralelo: utilsDollarStore.getterDollarFindOne.precio_paralelo,
  };
});

const loadinggetDollar = ref(false);
const changePricesAllProduct = async () => {
  await productStore.changePricesProductsAll(prices.value);
  await productStore.productsGet();
  utilsDollarStore.adminModalChange(false);
};

const confirmSaveDollarsProducts = () => {
  swal
    .fire({
      title: '¿Confirma esta acción?',
      text: 'Actualiza los precios de todos sus productos en bolivares acorde a las tasas de cambio.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#8dbc5c',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, ajustar precios!',
      cancelButtonText: 'Cancelar',
      customClass: {
        container: 'high-z-index', // Clase personalizada
      },
    })
    .then((result) => {
      if (result.isConfirmed) {
        changePricesAllProduct();
      }
    });
};

const updatePricesAll = async () => {
  try {
    loadinggetDollar.value = true;
    await utilsDollarStore.getCambio();
    loadinggetDollar.value = false;
  } catch (error) {
    loadinggetDollar.value = false;
    throw error;
  }
};

const onReset = () => {
  console.log('hola');
};
onMounted(async () => {
  await utilsDollarStore.getDollarFindOne();
  console.log(utilsDollarStore.getterDollarFindOne);
});
</script>
<style>
.high-z-index {
  z-index: 10000 !important;
}
</style>
