<template>
  <q-form>
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
            <q-label class="col q-ma-sm text-subtitle1 ellipsis"
              >Nombre del producto*
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
            <q-label class="col q-ma-sm text-subtitle1 ellipsis">
              Código*
              <q-input
                input-class="text-black"
                v-model="product.codBar"
                label="Escriba el código del producto"
                standout
                bg-color="grey-2"
                dense
                color="primary"
              ></q-input
            ></q-label>
            <q-label class="col q-ma-sm text-subtitle1 ellipsis"
              >Unidad de medida*
              <q-select
                bg-color="grey-2"
                color="primary"
                input-class="text-black"
                :rules="[(val) => !!val || 'Selecciona una opción.']"
                use-input
                hide-selected
                fill-input
                input-debounce="0"
                dense
                v-model="product.unitOfMeasurement"
                :options="apilista"
                :option-label="
                  (apilista) =>
                    apilista === null ? null : apilista.nombre_unidad
                "
                :option-value="
                  (apilista) => (apilista === null ? null : apilista.id)
                "
                emit-value
                map-options
                standout
              >
                <template v-slot:no-option>
                  <q-item>
                    <q-item-section class="text-grey">
                      Sin resultados
                    </q-item-section>
                  </q-item>
                </template>
              </q-select>
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
          style="
            height: 100%;
            max-height: 100%;
            border-color: #4caf50;
            border-radius: 8px;
          "
          class="text-primary"
        >
          <q-card-section class="row q-pb-none">
            <span class="col text-left text-h6">Categoría</span>
            <span class="col text-right">
              <q-input
                v-model="filterCat"
                debounce="1000"
                label-color="primary"
                label="Buscar..."
                @update:model-value="filterCategory()"
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

          <q-card-section class="q-pa-md">
            <q-scroll-area
              :thumb-style="scrollOptions.thumbStyle"
              :content-style="scrollOptions.contentStyle"
              style="height: 200px"
            >
              <q-list separator>
                <q-item
                  v-for="(category, index) in categories"
                  :key="index"
                  clickable
                  v-ripple
                >
                  <q-item-section side top>
                    <q-checkbox
                      :id="category.id"
                      :val="category.nombre_categoria"
                      v-model="categeriSelected"
                    />
                  </q-item-section>

                  <q-item-section>
                    <q-item-label>{{ category.nombre_categoria }}</q-item-label>
                  </q-item-section>
                </q-item>
              </q-list>
            </q-scroll-area>
          </q-card-section>
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
            <div class="row">
              <div class="col q-pa-xs">
                <p class="text-h6">Inventario</p>
              </div>
              <div class="col-4 q-pa-xs">
                <!-- <q-label class="ellipsis">
                Código de barra
                <q-input
                  v-model="product.codBar"
                  dense
                  bg-color="grey-2"
                  input-class="text-black"
                  standout
                ></q-input>
              </q-label> -->
              </div>
            </div>
          </q-card-section>
          <q-card-section horizontal class="q-pl-md q-pr-md">
            <p>
              <q-toggle
                disable
                v-model="variableProduct"
                label="Simple"
                left-label
              />
              <span>Variable</span>
            </p>
          </q-card-section>
          <q-card-section horizontal class="q-pl-md q-pr-md q-pb-md">
            <div
              v-for="(store, index) in quantityStores"
              :key="index"
              class="col q-pa-xs"
            >
              <q-label>
                {{ store.name }}
                <q-input
                  :rules="[
                    (val) => (val && val >= 0) || 'Cantidad incorrecta.',
                  ]"
                  v-model.number="store.quantity"
                  dense
                  type="number"
                  bg-color="grey-2"
                  input-class="text-black"
                  standout
                ></q-input>
              </q-label>
            </div>
          </q-card-section>
        </q-card>
      </div>
      <div class="q-pa-md col col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
        <q-card
          bordered
          style="
            height: 100%;
            max-height: 100%;
            border-color: #4caf50;
            border-radius: 8px;
          "
          class="text-primary"
        >
          <q-card-section horizontal class="q-pa-none">
            <q-uploader
              style="
                border-radius: 8px;
                position: relative;
                margin-left: 9%;
                margin-right: 9%;
                margin-top: 4%;
              "
              url="http://localhost:9000/upload"
              label="Imagen del producto"
              accept=".jpg, image/*"
              v-model="fileImage"
              hide-upload-btn
              @rejected="onRejected"
            >
              <template v-slot:list="scope">
                <q-list separator>
                  <q-item v-for="file in scope.files" :key="file.__key">
                    <q-item-section>
                      <q-item-label class="full-width ellipsis">
                        {{ logImg(scope.files) }}
                        {{ file.name }}
                      </q-item-label>

                      <!-- <q-item-label caption>
                      Status: {{ file.__status }}
                    </q-item-label> -->

                      <q-item-label caption>
                        {{ file.__sizeLabel }} / {{ file.__progressLabel }}
                      </q-item-label>
                    </q-item-section>

                    <q-item-section v-if="file.__img" thumbnail class="gt-xs">
                      <img :src="file.__img.src" />
                    </q-item-section>

                    <q-item-section top side>
                      <q-btn
                        class="gt-xs"
                        size="12px"
                        flat
                        dense
                        round
                        icon="delete"
                        @click="scope.removeFile(file)"
                      />
                    </q-item-section>
                  </q-item>
                </q-list>
              </template>
            </q-uploader>
          </q-card-section>
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
            <p class="text-h6">Montos</p>
          </q-card-section>
          <q-card-section horizontal class="q-pt-none q-pl-md q-pr-md q-pb-md">
            <q-label class="col q-ma-sm text-subtitle1"
              >Costo
              <q-input
                :rules="[(val) => (val && val >= 0) || 'Cantidad incorrecta.']"
                prefix="$"
                type="number"
                input-class="text-black"
                v-model="coste"
                label="Costo..."
                standout
                bg-color="grey-2"
                dense
                color="primary"
              ></q-input>
            </q-label>
            <q-label class="col q-ma-sm text-subtitle1"
              >M. de ganancia (%)
              <q-input
                prefix="%"
                type="number"
                input-class="text-black"
                v-model="marginOfGain"
                label="Margen de ganancia..."
                standout
                bg-color="grey-2"
                dense
                color="primary"
              ></q-input>
            </q-label>
            <q-label class="col q-ma-sm text-subtitle1"
              >Impuesto (%)
              <q-input
                prefix="%"
                type="number"
                input-class="text-black"
                v-model="tax"
                label="Impuesto..."
                standout
                bg-color="grey-2"
                dense
                color="primary"
              ></q-input>
            </q-label>
            <q-label class="col q-ma-sm text-subtitle1"
              >Precio Final
              <q-input
                prefix="$"
                type="number"
                input-class="text-black"
                v-model="priceTotalProduct"
                label="Precio..."
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
        <q-card flat>
          <q-card-section class="q-pb-none">
            <div class="q-gutter-md" align="center" style="margin-top: 30%">
              <q-btn
                padding="2px 22px 2px 22px"
                no-caps
                label="Cancelar"
                color="primary"
                outline
                class=""
              ></q-btn>
              <q-btn
                padding="2px 22px 2px 22px"
                no-caps
                type="submit"
                label="Registrar"
                color="primary"
                class=""
              ></q-btn>
            </div>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-form>
</template>

<script setup lang="ts">
import { onMounted, ref, computed } from 'vue';
import { useCategoryStore } from 'src/stores/category';
import { useUnitStore } from 'src/stores/unit';
import { useStorePStore } from 'src/stores/storeP';
import { Notify } from 'quasar';
const storePStore = useStorePStore();
const unitStore = useUnitStore();
const categoryStore = useCategoryStore();
const categories = ref([]);
const categeriSelected = ref([]);
const stores = computed(() => storePStore.store);
const product = ref({});
const variableProduct = ref(false);
const fileImage = ref(null);
const apilista = computed(() => unitStore.unit);
const quantityStores = ref([]);
const filterCat = ref('');
const tax = ref(12);
const coste = ref(0);
const marginOfGain = ref(0);
const marginOfGainCash = computed(() => {
  let resultMargin = marginOfGain.value / 100;
  return coste.value * resultMargin;
});
const taxCash = computed(() => {
  let taxResult = tax.value / 100;
  let totalPrice = parseFloat(coste.value) + parseFloat(marginOfGainCash.value);
  let total = totalPrice * taxResult;
  return total;
});
const priceTotalProduct = computed(() => {
  let total =
    parseFloat(coste.value) +
    parseFloat(marginOfGainCash.value) +
    taxCash.value;
  return roundTwoDecimals(total);
});
const roundTwoDecimals = (number) => {
  return Math.round(number * 100) / 100;
};
const scrollOptions = {
  contentStyle: {
    backgroundColor: 'rgba(0,0,0,0.02)',
    color: '#8dbc5c',
  },

  contentActiveStyle: {
    backgroundColor: '#eee',
    color: 'black',
  },

  thumbStyle: {
    right: '2px',
    borderRadius: '5px',
    backgroundColor: '#8dbc5c',
    width: '5px',
    opacity: '0.75',
  },
};
const onRejected = (rejectedEntries) => {
  Notify.create({
    type: 'negative',
    position: 'bottom-right',
    message: `${rejectedEntries.length} los archivos no pasaron las restricciones de validación`,
  });
};
const logImg = (param) => {
  fileImage.value = param;
};

const filterCategory = () => {
  let search = filterCat.value;
  let expression = new RegExp(`${search}.*`, 'i');
  let catFilter = categoryStore.Categoria.filter((item) =>
    expression.test(item.nombre_categoria)
  );
  if (filterCat.value.length > 0) {
    categories.value = categoryStore.Categoria;
  }
  categories.value = catFilter;
};
onMounted(async () => {
  await categoryStore.CategoriaAll();
  await unitStore.unitAll();
  await storePStore.storeAll();

  let storeListNew = storePStore.store.map((item) => {
    return {
      name: item.nombre_bodega,
      id: item.id,
      quantity: 0,
    };
  });
  storeListNew.map((item) => {
    quantityStores.value.push(item);
  });

  categories.value = categoryStore.Categoria;
});
</script>
