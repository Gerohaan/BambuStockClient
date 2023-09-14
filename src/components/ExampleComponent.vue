<template>
  <div class="row q-pa-sm">
    <div class="col col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4 q-pa-md">
      <q-card
        class="text-primary"
        bordered
        style="border-color: #4caf50; border-radius: 8px"
      >
        <q-card-section>
          <div class="col">
            <p class="text-h6">Ventas totales</p>
          </div>
          <div class="col text-right">
            <p class="text-h3">1230 $</p>
          </div>
        </q-card-section>
      </q-card>
    </div>
    <div class="col col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4 q-pa-md">
      <q-card
        class="text-primary"
        bordered
        style="border-color: #4caf50; border-radius: 8px"
      >
        <q-card-section class="q-pa-md">
          <div class="col">
            <p class="text-h6">Compras</p>
          </div>
          <div class="col text-right">
            <p class="text-h3">1000 $</p>
          </div>
        </q-card-section>
      </q-card>
    </div>
    <div class="col col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4 q-pa-md">
      <q-card
        class="text-primary"
        bordered
        style="border-color: #4caf50; border-radius: 8px"
      >
        <q-card-section class="q-pa-md">
          <div class="col">
            <p class="text-h6">Utilidades</p>
          </div>
          <div class="col text-right">
            <p class="text-h3">1230 $</p>
          </div>
        </q-card-section>
      </q-card>
    </div>
  </div>
  <div class="row q-pa-md">
    <div class="col col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4 q-pa-md">
      <q-card
        class="text-primary"
        bordered
        style="
          border-color: #4caf50;
          border-radius: 8px;
          height: 90%;
          max-height: 90%;
        "
      >
        <q-card-section>
          <div class="text-h6">Productos más vendidos</div>
          <apexchart
            type="donut"
            class=""
            :options="optionsD"
            :series="seriesD"
          ></apexchart>
        </q-card-section>
      </q-card>
    </div>
    <div class="col col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4 q-pa-md">
      <q-card
        class="text-primary"
        bordered
        style="
          border-color: #4caf50;
          border-radius: 8px;
          height: 90%;
          max-height: 90%;
        "
      >
        <q-card-section>
          <div class="text-h6">Ventas por mes</div>
          <apexchart
            type="bar"
            class=""
            :options="options"
            :series="series"
          ></apexchart>
        </q-card-section>
      </q-card>
    </div>
    <div class="col col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4 q-pa-md">
      <q-card
        class="text-primary"
        bordered
        style="
          border-color: #4caf50;
          border-radius: 8px;
          height: 90%;
          max-height: 90%;
        "
      >
        <q-card-section>
          <div class="text-h6">Categorias más vendidas</div>
          <apexchart
            type="bar"
            class=""
            :options="optionsL"
            :series="seriesL"
          ></apexchart>
        </q-card-section>
      </q-card>
    </div>
  </div>

  <!--  <div>
    <p>
      <button @click="showAlert">Hello world</button>
    </p>
    <div>
      <apexchart
        width="500"
        type="bar"
        :options="options"
        :series="series"
      ></apexchart>
    </div>
  </div> -->
</template>

<script setup lang="ts">
import { computed, ref, inject } from 'vue';
import { Todo, Meta } from './models';
const swal = inject('$swal');
interface Props {
  title: string;
  todos?: Todo[];
  meta: Meta;
  active: boolean;
}
const props = withDefaults(defineProps<Props>(), {
  todos: () => [],
});

const options = {
  chart: {
    id: 'vuechart-example',
    toolbar: {
      show: false,
    },
  },
  plotOptions: {
    bar: {
      borderRadius: 10,
    },
  },
  xaxis: {
    categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998],
  },
  colors: ['#4caf50'],
  grid: {
    row: {
      colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
      opacity: 0.5,
    },
  },
};
const series = [
  {
    name: 'series-1',
    data: [30, 40, 45, 50, 49, 60, 70, 91],
  },
];

const seriesD = [44, 55, 41, 17, 15];

const seriesL = [
  {
    data: [400, 430, 448, 470, 540, 580, 690, 1100, 1200, 1380],
  },
];

const optionsD = {
  chart: {
    type: 'donut',
    toolbar: {
      show: false,
    },
  },
  colors: ['#4caf50'],
  responsive: [
    {
      breakpoint: 480,
      options: {
        chart: {
          width: 200,
        },
        legend: {
          position: 'bottom',
        },
      },
    },
  ],
};

const optionsL = {
  chart: {
    type: 'bar',
    height: 350,
    toolbar: {
      show: false,
    },
  },
  colors: ['#4caf50'],
  plotOptions: {
    bar: {
      borderRadius: 4,
      horizontal: true,
    },
  },
  dataLabels: {
    enabled: false,
  },
  xaxis: {
    categories: [
      'Categoria 1',
      'Categoria 2',
      'Categoria 3',
      'Categoria 4',
      'Categoria 5',
      'Categoria 6',
      'Categoria 7',
      'Categoria 8',
      'Categoria 9',
      'Categoria 10',
    ],
  },
};

function showAlert() {
  swal.fire({
    icon: 'error',
    title: 'Oops...',
    text: 'Something went wrong!',
    footer: '<a href="">Why do I have this issue?</a>',
  });
}

const clickCount = ref(0);
function increment() {
  clickCount.value += 1;
  return clickCount.value;
}

const todoCount = computed(() => props.todos.length);
</script>
