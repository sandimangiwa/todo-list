<template>
  <q-page class="container">
    <!-- Home -->
    <section class="row q-my-lg">
      <div class="text-h4 text-bold" data-cy="activity-title">Activity</div>
      <q-space />
      <div>
        <q-btn
          data-cy="activity-add-button"
          no-caps
          icon="add"
          unelevated
          color="primary"
          rounded
          size="lg"
          @click="addActivity"
          >Tambah</q-btn
        >
      </div>
    </section>

    <!-- List Activity -->
    <section class="q-mb-lg">
      <div v-if="list_activity.length <= 0" class="flex justify-center q-py-lg">
        <q-img
          data-cy="activity-empty-state"
          @click="addActivity"
          class="cursor-pointer"
          :width="$q.screen.lt.sm ? '80%' : '60%'"
          src="../assets/activity-empty-state.png"
        ></q-img>
      </div>
      <div v-else class="row q-col-gutter-lg">
        <div
          class="col-xs-6 col-sm-6 col-md-3 col-lg-2"
          v-for="activity in list_activity"
          :key="activity.id"
        >
          <card-activity
            :activity="activity"
            :delete-activity-confirmation="deleteActivityConfirmation"
          />
        </div>
      </div>
    </section>
    <!-- <delete-activity-success ref="deleteSuccess" /> -->
    <!-- <delete-activity
      ref="deleteConfirmation"
      :name="delete_item.title"
      :callback="deleteActivity"
    ></delete-activity> -->
    <q-dialog
      v-model="isShowdeleteSuccess"
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
          <span data-cy="modal-information-title" class="q-ml-sm q-mr-xl">
            Activity berhasil dihapus</span
          >
        </q-card-section>
      </q-card>
    </q-dialog>

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
            <q-img src="../assets/alert.svg"></q-img>
          </q-avatar>
        </q-card-section>
        <q-card-section>
          <div class="text-h6 text-weight-light" data-cy="modal-delete-title">
            <div>Apakah anda yakin menghapus activity</div>
            <strong>{{ delete_item.title }}?</strong>
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
            data-cy="modal-delete-confirm-button"
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
            @click="deleteActivity()"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import { onMounted, reactive, ref } from "vue";
import { api } from "src/boot/axios";
// import deleteActivity from "src/components/modal/DeleteActivity.vue";
// import deleteActivitySuccess from "src/components/modal/DeleteActivitySuccess.vue";
import cardActivity from "src/components/card/CardActivity.vue";
import helper from "src/js/helper";
export default {
  name: "IndexPage",
  components: {
    cardActivity,
    // deleteActivity,
    // deleteActivitySuccess,
  },
  setup() {
    const list_activity = ref([]);
    const delete_item = reactive({
      title: "",
      id: "",
    });
    // const deleteConfirmation = ref(null);
    const deleteSuccess = ref(null);
    const isShowdeleteSuccess = ref(false);
    const isShow = ref(false);
    // get All Activity
    const getAllActivity = async () => {
      const config = { params: { email: "sandimangiwa@gmail.com" } };
      await api
        .get("/activity-groups", config)
        .then((res) => {
          list_activity.value = res.data.data;
        })
        .catch((err) => {
          console.log(err);
        });
    };

    // add Activity
    const addActivity = async () => {
      const body = {
        title: "New Activity",
        email: "sandimangiwa@gmail.com",
      };
      await api
        .post("/activity-groups", body)
        .then(() => {
          getAllActivity();
        })
        .catch((err) => {
          console.log(err);
        });
    };

    // delete Confirmation Activity
    const deleteActivityConfirmation = (item) => {
      delete_item.title = item.title;
      delete_item.id = item.id;
      isShow.value = true;
      // deleteConfirmation.value.show();
    };
    // delete Activity
    const deleteActivity = async () => {
      await api
        .delete(`/activity-groups/${delete_item.id}`)
        .then(() => {
          isShowdeleteSuccess.value = true;
          getAllActivity();
          // deleteSuccess.value.show();
        })
        .catch((err) => {
          console.log(err);
        });
    };

    // format date
    const formatDate = (date) => {
      return helper.formatDate(date);
    };
    onMounted(() => {
      getAllActivity();
    });

    return {
      formatDate,
      addActivity,
      deleteActivityConfirmation,
      deleteActivity,
      // deleteConfirmation,
      isShowdeleteSuccess,
      isShow,
      deleteSuccess,
      list_activity,
      delete_item,
    };
  },
};
</script>
