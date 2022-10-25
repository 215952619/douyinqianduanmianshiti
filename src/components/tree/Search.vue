<template>
  <input type="text" placeholder="搜索" v-model="word" />
</template>

<script>
import { defineComponent, computed } from "vue";
export default defineComponent({
  name: "TreeSearch",
  props: {
    searchKey: {
      type: String,
      default: "",
    },
  },
  setup(props, { emit }) {
    const word = computed({
      get() {
        return props.searchKey;
      },
      set(val) {
        emit("update-search-key", val);
      },
    });

    return {
      word,
    };
  },
});
</script>

<style>
</style>