<template>
  <q-page class="container">
    <section class="row q-my-lg">
      <div class="col-xs-12 col-md-9 text-h4 text-bold">
        <div class="row">
          <div class="col-1">
            <q-btn
              to="/"
              icon="arrow_back_ios"
              unelevated
              flat
              round
              color="black"
              size="lg"
              dense
              class="col-1"
              data-cy="todo-back-button"
            ></q-btn>
          </div>
          <div class="col q-my-xs">
            <q-form @submit="editActivityTitle" class="flex">
              <q-input
                v-if="isEditActivityTitle"
                input-class="text-h4 text-bold"
                v-model="title"
                :style="$q.screen.lt.sm ? 'width: 82%' : 'width: 90%'"
              />
              <span v-else data-cy="todo-title">{{ title }}</span>
              <q-btn
                data-cy="todo-title-edit-button"
                color="grey"
                flat
                dense
                round
                icon="mdi-pencil-outline"
                type="submit"
              ></q-btn>
            </q-form>
          </div>
        </div>
      </div>
      <div data-cy="sort" class="col-xs-12 col-md-3" align="right">
        <q-btn-dropdown
          data-cy="todo-sort-button"
          unelevated
          color="grey"
          rounded
          padding="14px"
          outline
          dense
          cover
          class="q-mr-md"
          dropdown-icon="mdi-swap-vertical"
        >
          <q-list data-cy="sort-parent" style="width: 235px">
            <q-item
              v-for="filter in options_filters"
              :key="filter"
              clickable
              v-close-popup
              data-cy="sort-selection"
              @click="sortTodo(filter)"
            >
              <q-item-section avatar data-cy="sort-selection-icon">
                <q-icon color="primary" :name="filter.icon" />
              </q-item-section>
              <q-item-section data-cy="sort-selection-title">
                <q-item-label>{{ filter.label }}</q-item-label>
              </q-item-section>
              <q-item-section
                side
                v-if="sort.value == filter.value"
                data-cy="sort-selection-selected"
              >
                <q-icon color="black" name="check" />
              </q-item-section>
            </q-item>
          </q-list>
        </q-btn-dropdown>
        <q-btn
          data-cy="todo-add-button"
          no-caps
          icon="add"
          unelevated
          color="primary"
          rounded
          size="lg"
          @click="togelAction"
          >Tambah</q-btn
        >
      </div>
    </section>

    <!-- List Detail Activity -->
    <section>
      <div v-if="todo_items.length <= 0" class="flex justify-center q-py-lg">
        <q-img
          data-cy="todo-empty-state"
          @click="togelAction"
          class="cursor-pointer"
          :width="$q.screen.lt.sm ? '80%' : '60%'"
          src="../../assets/todo-empty-state.png"
        ></q-img>
      </div>
      <div v-else>
        <q-list>
          <q-item
            data-cy="todo-item"
            v-for="item in todo_items"
            :key="item"
            class="card-custome bg-white q-pa-md q-mb-md"
          >
            <q-item-section avatar>
              <q-checkbox
                data-cy="todo-item-checkbox"
                v-model="item.is_active"
                :true-value="0"
                :false-value="1"
                @click="editTodoItem(item)"
              />
            </q-item-section>
            <q-item-section avatar>
              <q-badge
                data-cy="todo-item-priority-indicator"
                rounded
                :color="
                  item.priority == 'very-high'
                    ? 'negative'
                    : item.priority == 'high'
                    ? 'warning'
                    : item.priority == 'normal'
                    ? 'info'
                    : item.priority == 'low'
                    ? 'primary'
                    : 'accent'
                "
              />
            </q-item-section>
            <q-item-section class="row">
              <q-item-label>
                <span
                  data-cy="todo-item-title"
                  class="text-h6"
                  :class="item.is_active ? '' : 'text-strike text-grey'"
                  >{{ item.title }}</span
                >
                <q-btn
                  data-cy="todo-item-edit-button"
                  color="grey"
                  flat
                  dense
                  round
                  icon="mdi-pencil-outline"
                  @click="togelAction(item)"
                />
              </q-item-label>
            </q-item-section>
            <q-item-section side>
              <div class="text-grey">
                <q-btn
                  data-cy="todo-item-delete-button"
                  flat
                  dense
                  round
                  icon="mdi-trash-can-outline"
                  @click="deleteActivityConfirmation(item)"
                />
              </div>
            </q-item-section>
          </q-item>
        </q-list>
      </div>
    </section>
    <q-dialog
      v-model="isOpen"
      transition-show="slide-up"
      transition-hide="slide-down"
    >
      <q-card
        data-cy="modal-add"
        style="
          width: 830px;
          max-width: 80vw;
          box-shadow: 0px 6px 10px 0px #0000001a;
          border-radius: 12px;
        "
      >
        <q-form @submit="todo.id ? editTodoItem() : addTodoItem()">
          <q-card-section class="row">
            <div class="text-h6 text-weight-medium" data-cy="modal-add-title">
              {{ todo.id ? "Edit Item" : "Tambah List Item" }}
            </div>
            <q-space />
            <q-btn
              data-cy="modal-add-close-button"
              icon="close"
              color="grey"
              flat
              round
              dense
              v-close-popup
            />
          </q-card-section>

          <q-separator />

          <q-card-section>
            <div class="q-mb-md">
              <div
                class="text-subtitle2 text-uppercase"
                data-cy="modal-add-name-title"
              >
                Nama List Item
              </div>
              <q-input
                data-cy="modal-add-name-input"
                class="q-py-sm"
                outlined
                v-model="todo.title"
                placeholder="Tambah nama list item"
              />
            </div>
            <div class="q-mb-md">
              <div class="text-subtitle2 text-uppercase">Priority</div>
              <q-select
                data-cy="modal-add-priority-dropdown"
                outlined
                class="q-py-sm"
                v-model="todo.priority"
                :options="options_priority"
                style="width: 205px"
              >
                <template v-slot:option="scope">
                  <q-item v-bind="scope.itemProps" dense>
                    <q-item-section avatar>
                      <q-badge rounded :color="scope.opt.color" />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label> {{ scope.opt.label }}</q-item-label>
                    </q-item-section>
                  </q-item>
                </template>
                <template v-slot:selected-item="scope">
                  <q-badge rounded :color="scope.opt.color" class="q-mr-sm" />
                  {{ scope.opt.label }}
                </template>
              </q-select>
            </div>
          </q-card-section>

          <q-separator />

          <q-card-actions align="right" class="q-pa-md">
            <q-btn
              data-cy="modal-add-save-button"
              :disable="!todo.title"
              dense
              style="padding: 10px 38px"
              rounded
              size="lg"
              label="Simpan"
              unelevated
              no-caps
              color="primary"
              type="submit"
            />
          </q-card-actions>
        </q-form>
      </q-card>
    </q-dialog>
    <delete-activity-success ref="deleteSuccess" type="todo" />
    <delete-activity
      ref="deleteConfirmation"
      type="todo-list"
      :name="delete_item.title"
      :callback="deleteActivity"
    ></delete-activity>
  </q-page>
</template>

<script>
import { ref, reactive, onMounted } from "vue";
import { useRoute } from "vue-router";
import deleteActivitySuccess from "src/components/modal/DeleteActivitySuccess.vue";
import deleteActivity from "src/components/modal/DeleteActivity.vue";
import { api } from "src/boot/axios";
export default {
  name: "ActivityDetail",
  components: {
    deleteActivitySuccess,
    deleteActivity,
  },
  setup() {
    // const router = useRouter();
    const route = useRoute();
    const options_filters = [
      {
        label: "Terbaru",
        value: "latest",
        icon: "mdi-sort-ascending",
      },
      {
        label: "Terlama",
        value: "oldest",
        icon: "mdi-sort-descending",
      },
      {
        label: "A-Z",
        value: "a-z",
        icon: "mdi-sort-alphabetical-ascending",
      },
      {
        label: "Z-A",
        value: "z-a",
        icon: "mdi-sort-alphabetical-descending",
      },
      {
        label: "Belum Selesai",
        value: "not-finished-yet",
        icon: "mdi-swap-vertical",
      },
    ];
    const options_priority = [
      {
        label: "Very High",
        value: "very-high",
        color: "negative",
      },
      {
        label: "High",
        value: "high",
        color: "warning",
      },
      {
        label: "Medium",
        value: "normal",
        color: "info",
      },
      {
        label: "Low",
        value: "low",
        color: "primary",
      },
      {
        label: "Very Low",
        value: "very-low",
        color: "accent",
      },
    ];

    const isOpen = ref(false);
    const isEditActivityTitle = ref(false);
    const title = ref("");
    const todo_items = ref([]);
    const todo = ref({});
    const deleteConfirmation = ref(null);
    const deleteSuccess = ref(null);
    const sort = ref({
      label: "Terbaru",
      value: "latest",
      icon: "mdi-sort-ascending",
    });
    const delete_item = reactive({
      title: "",
      id: "",
    });

    // method
    const editActivityTitle = async () => {
      isEditActivityTitle.value = !isEditActivityTitle.value;
      if (!isEditActivityTitle.value) {
        const body = { title: title.value };
        await api
          .patch(`/activity-groups/${route.params.id}`, body)
          .then(() => {
            getActivity();
          })
          .catch((err) => {
            console.log(err);
          });
      }
    };

    const getActivity = async () => {
      await api
        .get(`/activity-groups/${route.params.id}`)
        .then((res) => {
          title.value = res.data.title;
        })
        .catch((err) => {
          console.log(err);
        });
    };

    const getTodoItem = async () => {
      const config = {
        params: { activity_group_id: route.params.id },
      };
      await api
        .get(`/todo-items`, config)
        .then((res) => {
          todo_items.value = res.data.data;
          sortTodo(sort.value);
        })
        .catch((err) => {
          console.log(err);
        });
    };

    const togelAction = (data) => {
      const priority = data.title
        ? options_priority.filter((item) => item.value == data.priority)[0]
        : "";
      todo.value = data.title
        ? { ...data, ...{ priority: priority } }
        : {
            title: "",
            priority: {
              label: "Very High",
              value: "very-high",
              color: "negative",
            },
          };
      isOpen.value = !isOpen.value;
    };

    const addTodoItem = async () => {
      const body = {
        activity_group_id: route.params.id,
        title: todo.value.title,
        priority: todo.value.priority.value,
      };
      await api
        .post(`/todo-items`, body)
        .then(() => {
          isOpen.value = !isOpen.value;
          getTodoItem();
        })
        .catch((err) => {
          console.log(err);
        });
    };

    const editTodoItem = async (data) => {
      const body = {
        is_active: data ? data.is_active : todo.value.is_active,
        title: data ? data.title : todo.value.title,
        priority: data ? data.priority : todo.value.priority.value,
      };
      await api
        .patch(`/todo-items/${data ? data.id : todo.value.id}`, body)
        .then(() => {
          isOpen.value = false;
          getTodoItem();
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
        .delete(`/todo-items/${delete_item.id}`)
        .then(() => {
          getTodoItem();
          deleteSuccess.value.show();
        })
        .catch((err) => {
          console.log(err);
        });
    };
    const sortTodo = (data) => {
      sort.value = data;
      switch (data.value) {
        case "latest":
          todo_items.value = todo_items.value.sort((a, b) => b.id - a.id);
          break;
        case "oldest":
          todo_items.value = todo_items.value.sort((a, b) => a.id - b.id);
          break;
        case "a-z":
          todo_items.value = todo_items.value.sort((a, b) => {
            let x = String(a.title).toLowerCase();
            let y = String(b.title).toLowerCase();
            if (x < y) {
              return -1;
            }
            if (x > y) {
              return 1;
            }
            return 0;
          });
          break;
        case "z-a":
          todo_items.value = todo_items.value.sort((a, b) => {
            let x = String(a.title).toLowerCase();
            let y = String(b.title).toLowerCase();

            if (x < y) {
              return 1;
            }
            if (x > y) {
              return -1;
            }
            return 0;
          });
          break;
        case "not-finished-yet":
          todo_items.value = todo_items.value.sort(
            (a, b) => b.is_active - a.is_active
          );
          break;
      }
    };

    onMounted(() => {
      getActivity();
      getTodoItem();
    });
    return {
      sort,
      delete_item,
      isOpen,
      todo,
      title,
      todo_items,
      isEditActivityTitle,
      options_filters,
      options_priority,
      deleteConfirmation,
      deleteSuccess,
      sortTodo,
      togelAction,
      addTodoItem,
      editTodoItem,
      editActivityTitle,
      getActivity,
      deleteActivity,
      deleteActivityConfirmation,
    };
  },
};
</script>

<style>
.q-item__section--avatar {
  min-width: 12px;
}
</style>
