<template>
  <div class="row q-pa-sm">
    <div class="col-12 q-pa-md">
      <q-table
        class="text-weight-regular"
        :rows="products"
        :columns="columns"
        row-key="codigo_prod"
        :filter="filter"
        :selected-rows-label="getSelectedString"
        v-model:selected="selected"
      >
        <template v-slot:top>
          <q-toolbar
            style="border-radius: 8px"
            :class="$q.dark.isActive ? 'bg-grey-9 text-white' : 'bg-grey-3'"
          >
            <q-btn-dropdown
              class="col"
              dense
              padding="none"
              round
              flat
              color="primary"
              no-caps
              label="Acciones Generales"
            >
              <q-list>
                <!-- <q-item clickable tabindex="0">
                  <q-item-section avatar>
                    <q-avatar
                      icon="delete"
                      size="md"
                      color="secondary"
                      text-color="white"
                    />
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>Eliminar</q-item-label>
                    <q-item-label caption>{{
                      getSelectedString()
                    }}</q-item-label>
                  </q-item-section>
                  <q-item-section side>
                    <q-icon name="info" />
                  </q-item-section>
                </q-item> -->
                <q-item clickable tabindex="0">
                  <q-item-section avatar>
                    <q-avatar
                      icon="edit"
                      size="md"
                      color="secondary"
                      text-color="white"
                    />
                  </q-item-section>
                  <q-item-section
                    @click="
                      {
                        {
                          changePrices();
                        }
                      }
                    "
                  >
                    <q-item-label>Ajustar precios</q-item-label>
                    <q-item-label caption></q-item-label>
                  </q-item-section>
                  <q-item-section side>
                    <q-icon name="info" />
                  </q-item-section>
                </q-item>
              </q-list>
            </q-btn-dropdown>
            <q-btn-dropdown
              dense
              class="col q-ml-md"
              padding="none"
              round
              flat
              color="primary"
              no-caps
              label="Filtros"
            >
              <q-list>
                <q-item clickable tabindex="0">
                  <q-item-section>
                    <q-item-label>
                      <q-select
                        bg-color="grey-2"
                        input-class="text-black"
                        :rules="[(val) => !!val || 'Selecciona una opción.']"
                        use-input
                        hide-selected
                        fill-input
                        input-debounce="0"
                        dense
                        standout
                        v-model="categorySelected"
                        :options="categoriesList"
                        :option-label="
                          (categoriesList) =>
                            categoriesList === null
                              ? null
                              : categoriesList.nombre_categoria
                        "
                        :option-value="
                          (categoriesList) =>
                            categoriesList === null ? null : categoriesList.id
                        "
                        emit-value
                        map-options
                        label="Categoria"
                      >
                        <template v-slot:prepend>
                          <q-icon color="primary" name="category" />
                        </template>
                        <template v-slot:no-option>
                          <q-item>
                            <q-item-section class="text-grey">
                              Sin resultados
                            </q-item-section>
                          </q-item>
                        </template>
                      </q-select>
                    </q-item-label>
                  </q-item-section>
                </q-item>
                <q-item clickable tabindex="0">
                  <q-item-section>
                    <q-item-label
                      ><q-select
                        bg-color="grey-2"
                        input-class="text-black"
                        :rules="[(val) => !!val || 'Selecciona una opción.']"
                        use-input
                        hide-selected
                        fill-input
                        input-debounce="0"
                        dense
                        standout
                        v-model="statusSelected"
                        :options="statusOption"
                        emit-value
                        option-label="label"
                        option-value="value"
                        label="Estado"
                      >
                        <template v-slot:prepend>
                          <q-icon color="primary" name="edit_attributes" />
                        </template>
                        <template v-slot:no-option>
                          <q-item>
                            <q-item-section class="text-grey">
                              Sin resultados
                            </q-item-section>
                          </q-item>
                        </template>
                      </q-select></q-item-label
                    >
                  </q-item-section>
                </q-item>
              </q-list>
            </q-btn-dropdown>
            <q-input
              class="col"
              outlined
              dense
              debounce="300"
              v-model="filter"
              placeholder="Busqueda..."
            >
              <template v-slot:append>
                <q-icon name="search" />
              </template>
            </q-input>
          </q-toolbar>
        </template>
        <template v-slot:body="props">
          <q-tr :props="props">
            <!-- <q-td class="text-center">
              <q-checkbox
                dense
                color="primary"
                size="xs"
                keep-color
                v-model="props.selected"
              />
            </q-td> -->
            <q-td key="codigo_prod" auto-width>
              {{ props.row.codigo_prod }}
            </q-td>
            <q-td key="nombre_prod" auto-width>
              {{ props.row.nombre_prod }}
            </q-td>
            <q-td key="descripcion_prod" auto-width>
              {{ props.row.descripcion_prod }}
            </q-td>
            <q-td key="costo_prod" auto-width>
              {{ props.row.costo_prod }} $
            </q-td>
            <q-td key="precio_prod" auto-width>
              {{ props.row.precio_prod }} $
            </q-td>
            <q-td key="impuesto_prod" auto-width>
              {{ props.row.impuesto_prod }} %
            </q-td>
            <q-td key="utilidad_prod" auto-width>
              {{ props.row.utilidad_prod }} %
            </q-td>
            <q-td key="categoria" auto-width>
              {{ JSON.parse(props.row.categoria).join(', ') }}
            </q-td>
            <q-td key="precio_bcv" auto-width>
              {{ props.row.precio_bcv }} Bs.
            </q-td>
            <q-td key="precio_promedio" auto-width>
              {{ props.row.precio_promedio }} Bs.
            </q-td>
            <q-td key="precio_paralelo" auto-width>
              {{ props.row.precio_paralelo }} Bs.
            </q-td>
            <q-td key="PresentacionProd" auto-width>
              {{ props.row.PresentacionProd.nombre_present }}
            </q-td>
            <q-td key="actions" class="text-center" auto-width>
              <q-btn
                size="sm"
                flat
                icon="visibility"
                dense
                padding="none"
                color="primary"
                round
                @click="openModalAdd(props.row)"
              ></q-btn>
              <q-btn
                size="sm"
                flat
                icon="delete"
                dense
                padding="none"
                color="primary"
                round
                @click="confirmDelete(props.row.id)"
              ></q-btn>
            </q-td>
          </q-tr>
        </template>
      </q-table>
    </div>
  </div>
  <modal-price-change
    v-if="utilsDollarStore.getterModalChangePrices"
  ></modal-price-change>
</template>

<script setup lang="ts">
defineOptions({
  name: 'listPage',
});
import { computed, ref, inject, onMounted } from 'vue';
import { Notify } from 'quasar';
import { usePaymentStore } from 'src/stores/payment';
import { useCategoryStore } from 'src/stores/category';
import { useProductStore } from 'src/stores/products';
import { useUtilsDollarStore } from 'src/stores/utilsDollar';
import modalPriceChange from 'src/components/products/modalPriceChange.vue';

const categoryStore = useCategoryStore();
const swal = inject('$swal');
const categorySelected = ref({});
const paymentStore = usePaymentStore();
const productsStore = useProductStore();
const utilsDollarStore = useUtilsDollarStore();
const filter = ref('');
const selected = ref([]);
const products = computed(() => productsStore.getProductAll);
const categoriesList = computed(() => categoryStore.Categoria);

const statusOption = [
  {
    label: 'Disponible',
    value: 'disponible',
  },
  {
    label: 'No disponible',
    value: 'no disponible',
  },
];

const columns = [
  {
    name: 'codigo_prod',
    required: true,
    label: 'Código',
    align: 'left',
    field: (row) => row.codigo_prod,
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: 'nombre_prod',
    required: true,
    label: 'Nombre',
    align: 'left',
    field: (row) => row.nombre_prod,
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: 'descripcion_prod',
    required: true,
    label: 'Descripción',
    align: 'left',
    field: (row) => row.descripcion_prod,
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: 'costo_prod',
    required: true,
    label: 'Costo',
    align: 'left',
    field: (row) => row.costo_prod,
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: 'precio_prod',
    required: true,
    label: 'Precio',
    align: 'left',
    field: (row) => row.precio_prod,
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: 'impuesto_prod',
    required: true,
    label: 'Impuesto',
    align: 'left',
    field: (row) => row.impuesto_prod,
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: 'utilidad_prod',
    required: true,
    label: 'Utilidad',
    align: 'left',
    field: (row) => row.utilidad_prod,
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: 'categoria',
    required: true,
    label: 'Categoria',
    align: 'left',
    field: (row) => row.categoria,
    format: (val) => JSON.parse(val).join(', '),
    sortable: true,
  },
  {
    name: 'precio_bcv',
    required: true,
    label: 'Precio BCV',
    align: 'left',
    field: (row) => row.precio_bcv,
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: 'precio_promedio',
    required: true,
    label: 'Precio Promedio',
    align: 'left',
    field: (row) => row.precio_promedio,
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: 'precio_paralelo',
    required: true,
    label: 'Precio Paralelo',
    align: 'left',
    field: (row) => row.precio_paralelo,
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: 'PresentacionProd',
    required: true,
    label: 'Presentación',
    align: 'left',
    field: (row) => row.PresentacionProd.nombre_present,
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: 'actions',
    align: 'center',
    label: 'Acciones',
    field: '',
    sortable: true,
  },
];

const getSelectedString = () => {
  return selected.value.length === 0
    ? ''
    : `${selected.value.length} registro${
        selected.value.length > 1 ? 's' : ''
      } de ${payment.value.length}`;
};
const openModalAdd = (row = {}) => {
  paymentStore.manageModal(true, true, row);
};

const changePrices = () => {
  console.log('hola');
  utilsDollarStore.adminModalChange(true);
};

const confirmDelete = (id = 1) => {
  swal
    .fire({
      title: '¿Esta seguro?',
      text: 'Eliminará el tipo de pago seleccionado',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#8dbc5c',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar!',
      cancelButtonText: 'Cancelar',
    })
    .then((result) => {
      if (result.isConfirmed) {
        deletePayment(id);
      }
    });
};
const deletePayment = async (id = 1) => {
  try {
    await paymentStore.paymentDelete(id);
    swal.fire('Eliminado!', 'El tipo de pago ha sido eliminado.', 'success');
  } catch (error) {
    Notify.create({
      type: 'warning',
      message: 'Error al intentar eliminar el tipo de pago',
      color: 'warning',
      position: 'bottom-right',
    });
  }
  await paymentStore.paymentAll();
};
onMounted(async () => {
  await productsStore.productsGet();
  console.log(productsStore.getProductAll);
});
</script>
