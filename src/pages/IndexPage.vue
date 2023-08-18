<template>
  <q-page class="flex-center q-pa-md">
    <div class="row">
      <div class="col q-pa-md">
        <q-parallax>
          <template v-slot:media>
            <!-- <img src="public\ba0m.avif" /> -->
          </template>

          <template v-slot:content="scope">
            <div
              class="column items-center"
              :style="{
                opacity: 0.45 + (1 - scope.percentScrolled) * 0.55,
                top: scope.percentScrolled * 50 + '%',
                left: 0,
                right: 0,
              }"
            >
              <q-icon name="compost" color="green-6" size="200px"></q-icon>
              <div class="text-h3 text-green-6 text-center">Bambú Stock</div>
              <div class="text-h6 text-green-6 text-center">v1.1</div>
            </div>
          </template>
        </q-parallax>
      </div>
      <div class="col-4 q-pa-md">
        <q-card
          class="q-pa-md shadow-2 my_card"
          bordered
          style="margin-top: 20%"
        >
          <q-card-section class="text-center">
            <div class="text-primary text-h5 text-weight-bold">
              Iniciar sesión
            </div>
            <div class="text-primary">
              Inicie sesión a continuación para acceder a su cuenta
            </div>
          </q-card-section>
          <q-card-section>
            <q-input
              dense
              outlined
              color="primary"
              v-model="email"
              label="Correo electrónico"
            ></q-input>
            <q-input
              dense
              outlined
              class="q-mt-md"
              v-model="password"
              type="password"
              label="Password"
            ></q-input>
          </q-card-section>
          <q-card-section>
            <q-btn
              style="border-radius: 8px"
              color="primary"
              rounded
              size="md"
              label="Acceder"
              no-caps
              class="full-width"
            ></q-btn>
          </q-card-section>
          <q-card-section class="text-center q-pt-none">
            <div class="text-primary">
              ¿Aún no tienes una cuenta?
              <a
                href="#"
                class="text-primary text-weight-bold"
                style="text-decoration: none"
                >Contáctanos.</a
              >
            </div>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
</script>
