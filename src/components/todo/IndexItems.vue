<template>
  <TransitionGroup name="list" tag="ul" v-if="items">
    <li
      v-for="item in items"
      :key="item.id"
      class="flex mb-4 mx-auto p-4 max-w-md bg-white shadow rounded"
    >
      <view-item :item="item" />
    </li>
  </TransitionGroup>
</template>

<script setup lang="ts">
import { collection, query, onSnapshot, orderBy } from "firebase/firestore";
import { db } from "@/firebase";
import { onUnmounted } from "vue";
import { useUserStore } from "@/stores/user";
import { ref } from "vue";
import type { Ref } from "vue";

// Components
import ViewItem from "@/components/todo/ViewItem.vue";

const userStore = useUserStore();

interface Item {
  id: string;
  title: string;
  createdAt: string;
  completed: boolean;
}

const items: Ref<Item[]> = ref([]);

const q = query(
  collection(db, "todos/" + userStore.uid + "/items"),
  orderBy("createdAt", "desc")
);
const unsubscribe = onSnapshot(q, (querySnapshot) => {
  items.value = [];
  querySnapshot.forEach((doc) => {
    items.value.push({
      id: doc.id,
      title: doc.data().title,
      createdAt: doc.data().createdAt,
      completed: doc.data().completed,
    });
  });
});

onUnmounted(() => {
  unsubscribe();
});
</script>

<style lang="css">
.list-move, /* apply transition to moving elements */
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

/* ensure leaving items are taken out of layout flow so that moving
   animations can be calculated correctly. */
.list-leave-active {
  position: absolute;
}
</style>
