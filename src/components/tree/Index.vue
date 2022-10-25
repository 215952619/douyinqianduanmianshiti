<template>
  <div>
    <TreeSearch :searchKey="searchKey" @update-search-key="updateSearchKey" />

    <TreeItem
      v-for="item in data"
      :key="item.id"
      :data="item"
      :searchKey="searchKey"
      :handleItemClick="itemClick"
    />
  </div>
</template>

<script>
import { defineComponent, ref } from "vue";
import TreeSearch from "./Search";
import TreeItem from "./Item";
export default defineComponent({
  name: "Tree Component",
  props: {
    data: {
      type: Object,
      required: true,
    },
  },
  emits: ["handle-item-click"],
  components: {
    TreeSearch,
    TreeItem,
  },
  setup(props, { emit }) {
    const searchKey = ref("");
    const updateSearchKey = (val) => (searchKey.value = val);

    const itemClick = (item) => {
      // dosomething
      emit("handle-item-click", item);
    };
    return {
      searchKey,
      updateSearchKey,
      itemClick,
    };
  },
});
</script>

<style>
</style>