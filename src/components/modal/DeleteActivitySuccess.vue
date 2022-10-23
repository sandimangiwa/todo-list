<template>
  <q-dialog
    v-model="isShow"
    transition-show="slide-down"
    transition-hide="slide-down"
  >
    <q-card
      data-cy="modal-information"
      style="box-shadow: 0px 6px 10px 0px #0000001a; border-radius: 12px"
    >
      <q-card-section class="row items-center">
        <q-icon
          data-cy="modal-information-icon"
          name="mdi-alert-circle-outline"
          color="info"
          size="md"
        ></q-icon>
        <span data-cy="modal-information-title" class="q-ml-sm q-mr-xl">{{
          type == "activity"
            ? "Activity berhasil dihapus"
            : " Item Todo Berhasil Dihapus"
        }}</span>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script>
import { ref } from "vue";
export default {
  name: "DeleteActivitySuccess",
  props: {
    type: {
      type: String,
      default: "activity",
    },
  },
  setup() {
    const isShow = ref(false);

    const show = () => {
      isShow.value = true;
    };
    return {
      isShow,
      show,
    };
  },
};
</script>

<style></style>
