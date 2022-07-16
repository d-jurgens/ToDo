<template>
  <input
    type="checkbox"
    :name="'completed-' + item.id"
    class="mr-4 text-primary rounded border-light-gray border-2 w-6 h-6 hover:cursor-pointer focus:ring-primary-lighter"
    :checked="item.completed"
    @input="updateCompleted"
  />
  <label :for="'completed-' + item.id" class="mr-4 grow">
    {{ item.title }}
  </label>
  <div class="min-w-max">
    <font-awesome-icon
      icon="fa-solid fa-pen"
      class="text-medium-gray mr-4 hover:cursor-pointer hover:text-primary transition-colors"
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

// Components
import UiDialog from "@/components/ui/UiDialog.vue";

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

async function updateCompleted() {
  const docRef = doc(db, "todos/" + userStore.uid + "/items", props.item.id);
  await updateDoc(docRef, {
    completed: !props.item.completed,
  });
}

const showDeleteDialog = ref(false);

async function onDelete() {
  showDeleteDialog.value = false;
  try {
    await deleteDoc(
      doc(db, "todos/" + userStore.uid + "/items", props.item.id)
    );
    toast.success("The item was deleted");
  } catch (error) {
    toast.error("Somthing went wrong when trying to delete the item" + error);
  }
}
</script>
