<template>
  <div class="row q-pa-sm">
    <div class="col-12 q-pa-md">
      <q-table
        class="text-weight-regular"
        :rows="payment"
        :columns="columns"
        row-key="id"
        :filter="filter"
        :selected-rows-label="getSelectedString"
        selection="multiple"
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
                <q-item clickable tabindex="0">
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
                </q-item>
                <q-item clickable tabindex="0">
                  <q-item-section avatar>
                    <q-avatar
                      icon="edit"
                      size="md"
                      color="secondary"
                      text-color="white"
                    />
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>Ajustar precios</q-item-label>
                    <q-item-label caption>{{
                      getSelectedString()
                    }}</q-item-label>
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
            <q-td class="text-center">
              <q-checkbox
                dense
                color="primary"
                size="xs"
                keep-color
                v-model="props.selected"
              />
            </q-td>
            <q-td key="codeProduct" auto-width> {{ props.row.id }} </q-td>
            <q-td key="name" auto-width>
              {{ props.row.descripcion_pago }}
            </q-td>
            <q-td key="cost" auto-width>
              {{ props.row.descripcion_pago }}
            </q-td>
            <q-td key="price" auto-width>
              {{ props.row.descripcion_pago }}
            </q-td>
            <q-td key="inventory" auto-width>
              {{ props.row.descripcion_pago }}
            </q-td>
            <q-td key="status" auto-width>
              {{ props.row.descripcion_pago }}
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
</template>

<script setup lang="ts">
import { computed, ref, inject, onMounted } from 'vue';
import { Notify } from 'quasar';
import { usePaymentStore } from 'src/stores/payment';
import { useCategoryStore } from 'src/stores/category';

const categoryStore = useCategoryStore();
const swal = inject('$swal');
const categorySelected = ref({});
const paymentStore = usePaymentStore();
const filter = ref('');
const selected = ref([]);
const payment = computed(() => paymentStore.payment);
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
    name: 'codeProduct',
    required: true,
    label: 'Código',
    align: 'left',
    field: (row) => row.nombre_pago,
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: 'name',
    required: true,
    label: 'Producto',
    align: 'left',
    field: (row) => row.nombre_pago,
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: 'cost',
    required: true,
    label: 'Costo',
    align: 'left',
    field: (row) => row.nombre_pago,
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: 'price',
    required: true,
    label: 'Precio',
    align: 'left',
    field: (row) => row.nombre_pago,
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: 'inventory',
    required: true,
    label: 'Inventario',
    align: 'left',
    field: (row) => row.nombre_pago,
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: 'status',
    required: true,
    label: 'Estado',
    align: 'left',
    field: (row) => row.nombre_pago,
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
  categoryStore.CategoriaAll();
});
</script>
