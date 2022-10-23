<template>
  <q-dialog
    v-model="isShow"
    transition-show="slide-up"
    transition-hide="slide-down"
  >
    <q-card
      data-cy="modal-delete"
      class="q-pa-md text-center"
      style="box-shadow: 0px 6px 10px 0px #0000001a; border-radius: 12px"
    >
      <q-card-section>
        <q-avatar square size="6em" data-cy="modal-delete-icon">
          <q-img src="../../assets/alert.svg"></q-img>
        </q-avatar>
      </q-card-section>
      <q-card-section>
        <div class="text-h6 text-weight-light">
          <div>
            {{
              type == "activity"
                ? "Apakah anda yakin menghapus activity"
                : "Apakah anda yakin menghapus List Item"
            }}
          </div>
          <strong>“{{ name }}”?</strong>
        </div>
      </q-card-section>
      <q-card-actions align="center">
        <q-btn
          data-cy="modal-delete-cancel-button"
          style="padding: 8px 38px"
          rounded
          dense
          text-color="black"
          size="lg"
          label="Batal"
          unelevated
          no-caps
          color="grey-4"
          v-close-popup
        />
        <q-btn
          style="padding: 8px 38px"
          rounded
          dense
          text-color="white"
          size="lg"
          label="Hapus"
          unelevated
          no-caps
          color="negative"
          v-close-popup
          data-cy="modal-delete-confirm-button"
          @click="action"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import { ref } from "vue";
export default {
  name: "DeleteActivity",
  props: {
    name: {
      type: String,
      default: "",
    },
    type: {
      type: String,
      default: "activity",
    },
    callback: {
      type: Function,
    },
  },
  setup(props) {
    const isShow = ref(false);

    const show = () => {
      isShow.value = true;
    };
    const action = () => {
      props.callback();
    };
    return {
      isShow,
      show,
      action,
    };
  },
};
</script>

<style></style>
