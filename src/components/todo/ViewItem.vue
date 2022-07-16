<template>
  <input
    type="checkbox"
    :name="'completed-' + item.id"
    class="mr-4 text-primary rounded border-dark-gray w-6 h-6 hover:cursor-pointer focus:ring-primary-lighter"
    :checked="item.completed"
    @input="updateCompleted"
  />
  <label :for="'completed-' + item.id" class="mr-4 grow">
    {{ item.title }}
  </label>
  <div>
    <font-awesome-icon icon="fa-solid fa-pen" class="text-medium-gray mr-4" />
    <font-awesome-icon icon="fa-solid fa-trash-can" class="text-medium-gray" />
  </div>
</template>

<script setup lang="ts">
import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/firebase";
import { useUserStore } from "@/stores/user";

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
</script>
