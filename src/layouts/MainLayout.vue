<template>
  <q-layout view="lHh Lpr lFf" class="bg-grey-2">
    <header
      class="shadow-custome q-mb-lg q-py-lg bg-primary text-white"
      data-cy="header-background"
    >
      <div class="container">
        <q-toolbar-title
          class="text-h5 text-bold text-uppercase q-py-sm"
          data-cy="header-title"
        >
          To Do List App
        </q-toolbar-title>
      </div>
    </header>
    <q-page-container class="bg-grey-2">
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script></script>
