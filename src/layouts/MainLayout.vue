<template>
  <q-layout view="lHh Lpr lFf">
    <q-page-container class="bg-grey-2">
      <div
        class="shadow-custome q-py-lg bg-primary text-white"
        data-cy="header-background"
      >
        <div class="container">
          <span
            data-cy="header-title"
            class="text-h5 text-bold text-uppercase q-py-sm"
          >
            TO DO LIST APP
          </span>
        </div>
      </div>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script></script>
