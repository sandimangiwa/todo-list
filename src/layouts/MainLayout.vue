<template>
  <q-layout view="lHh Lpr lFf">
    <q-header class="shadow-custome q-mb-lg q-py-lg">
      <q-toolbar class="container">
        <q-toolbar-title
          class="text-h5 text-bold text-uppercase q-py-sm"
          data-cy="header-title"
        >
          To Do List App
        </q-toolbar-title>
      </q-toolbar>
    </q-header>
    <q-page-container class="bg-grey-2">
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script></script>
