<template>
  <input
    type="checkbox"
    :name="'completed-' + item.id"
    class="mr-4 text-primary rounded border-light-gray border-2 w-6 h-6 hover:cursor-pointer focus:ring-primary-lighter disabled:text-light-gray disabled:bg-light-gray"
    :checked="item.completed"
    @input="updateCompleted"
    :disabled="updatingTitle"
  />
  <label v-if="!updatingTitle" :for="'completed-' + item.id" class="mr-4 grow">
    {{ item.title }}
  </label>
  <div v-if="updatingTitle" class="mr-4 grow">
    <form @submit="onSubmit">
      <ui-text-input name="title" type="text" :compact="true" />
    </form>
  </div>
  <div class="min-w-max">
    <font-awesome-icon
      icon="fa-solid fa-pen"
      class="text-medium-gray mr-4 hover:cursor-pointer hover:text-primary transition-colors"
      @click="updatingTitle ? (updatingTitle = false) : (updatingTitle = true)"
    />
    <font-awesome-icon
      icon="fa-solid fa-trash-can"
      class="text-medium-gray hover:cursor-pointer hover:text-primary transition-colors"
      @click="showDeleteDialog = true"
    />
  </div>
  <ui-dialog
    v-if="showDeleteDialog"
    :title="'Delete: ' + item.title"
    text="Are you sure you want to delete this item? This cannot be undone."
    type="danger"
    accept-text="Delete item"
    @on-cancel="showDeleteDialog = false"
    @on-accept="onDelete"
  />
</template>

<script setup lang="ts">
import { ref } from "vue";
import { doc, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from "@/firebase";
import { useUserStore } from "@/stores/user";
import { useToast } from "vue-toastification";
import { useForm } from "vee-validate";
import * as yup from "yup";

// Components
import UiDialog from "@/components/ui/UiDialog.vue";
import UiTextInput from "@/components/ui/UiTextInput.vue";

const toast = useToast();
const userStore = useUserStore();

interface Props {
  item: {
    id: string;
    title: string;
    completed: boolean;
  };
}

const props = defineProps<Props>();

/**
 * updateCompleted:
 * Toggle the completed status of this item.
 * @version 1.0
 * @since 1.0
 * @author David Jurgens
 */

async function updateCompleted() {
  try {
    const docRef = doc(db, "todos/" + userStore.uid + "/items", props.item.id);
    await updateDoc(docRef, {
      completed: !props.item.completed,
    });
  } catch (error) {
    // Show error if something goes wrong
    toast.error("Somthing went wrong when trying to complete the item" + error);
  }
}

/**
 * onDelete:
 * Delete this item
 * @version 1.0
 * @since 1.0
 * @author David Jurgens
 */

// Refs
const showDeleteDialog = ref(false);

// Function
async function onDelete() {
  // Close the dialog
  showDeleteDialog.value = false;
  try {
    // Delete the item
    await deleteDoc(
      doc(db, "todos/" + userStore.uid + "/items", props.item.id)
    );
    // Show notification if success
    toast.success("The item was deleted");
  } catch (error) {
    // Show error if something goes wrong
    toast.error("Somthing went wrong when trying to delete the item" + error);
  }
}

/**
 * updateTitle:
 * Update the title of this item
 * @version 1.0
 * @since 1.0
 * @author David Jurgens
 */

const updatingTitle = ref(false);

const schema = yup.object({
  title: yup.string().required(),
});

const formValues = {
  title: props.item.title,
};

const { handleSubmit } = useForm({
  validationSchema: schema,
  initialValues: formValues,
  initialTouched: {
    title: false,
  },
});

const onSubmit = handleSubmit(async (values, { setFieldValue }) => {
  updatingTitle.value = false;
  try {
    const docRef = doc(db, "todos/" + userStore.uid + "/items", props.item.id);
    await updateDoc(docRef, {
      title: values.title,
    });
    setFieldValue("title", values.title);
  } catch (error) {
    // Show error if something goes wrong
    toast.error("Somthing went wrong when trying to update the title" + error);
  }
});
</script>
