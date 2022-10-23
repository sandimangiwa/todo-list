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
          src="src/assets/activity-empty-state.png"
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
    <delete-activity-success ref="deleteSuccess" />
    <delete-activity
      ref="deleteConfirmation"
      :name="delete_item.title"
      :callback="deleteActivity"
    ></delete-activity>
  </q-page>
</template>

<script>
import { onMounted, reactive, ref } from "vue";
import { api } from "src/boot/axios";
import deleteActivity from "src/components/modal/DeleteActivity.vue";
import deleteActivitySuccess from "src/components/modal/DeleteActivitySuccess.vue";
import cardActivity from "src/components/card/CardActivity.vue";
import helper from "src/js/helper";
export default {
  name: "IndexPage",
  components: {
    cardActivity,
    deleteActivity,
    deleteActivitySuccess,
  },
  setup() {
    const list_activity = ref([]);
    const delete_item = reactive({
      title: "",
      id: "",
    });
    const deleteConfirmation = ref(null);
    const deleteSuccess = ref(null);

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
      deleteConfirmation.value.show();
    };
    // delete Activity
    const deleteActivity = async () => {
      await api
        .delete(`/activity-groups/${delete_item.id}`)
        .then(() => {
          getAllActivity();
          deleteSuccess.value.show();
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
      deleteConfirmation,
      deleteSuccess,
      list_activity,
      delete_item,
    };
  },
};
</script>
