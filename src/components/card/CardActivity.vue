<template>
  <q-card class="card-custome" style="height: 234px">
    <router-link
      :to="'detail/' + activity.id"
      style="text-decoration: none; color: inherit"
    >
      <q-card-section style="height: 100%">
        <div
          data-cy="activity-item-title"
          class="text-h6 text-overflow-ellipsis-5"
        >
          {{ activity.title }}
        </div>
      </q-card-section>
    </router-link>
    <q-card-section
      class="row"
      style="bottom: 0; width: 100%; position: absolute"
    >
      <div
        class="text-grey text-subtitle2 q-mt-xs"
        data-cy="activity-item-date"
      >
        {{
          formatDate(
            activity.updated_at ? activity.updated_at : activity.created_at
          )
        }}
      </div>
      <q-space />
      <q-btn
        data-cy="activity-item-delete-button"
        icon="mdi-trash-can-outline"
        unelevated
        dense
        flat
        @click="deleteActivity(activity)"
        color="grey"
      >
      </q-btn>
    </q-card-section>
  </q-card>
</template>

<script>
import helper from "src/js/helper";
export default {
  name: "CardActivity",
  props: {
    activity: {
      type: Object,
    },
    deleteActivityConfirmation: {
      type: Function,
    },
  },
  setup(props) {
    const deleteActivity = (item) => {
      props.deleteActivityConfirmation(item);
    };
    // format date
    const formatDate = (date) => {
      return helper.formatDate(date);
    };
    return {
      deleteActivity,
      formatDate,
    };
  },
};
</script>
