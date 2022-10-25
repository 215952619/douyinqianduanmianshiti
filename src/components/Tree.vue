<template>
  <TreeComponent :data="nodeData" @handle-item-click="treeItemClickHandle" />
</template>

<script>
import { defineComponent } from "vue";
import TreeComponent from "./tree/Index";
export default defineComponent({
  name: "Tree",
  components: { TreeComponent },
  setup(props) {
    const nodeData = [
      {
        id: "1",
        text: "value1",
        children: [
          {
            id: "1-1",
            text: "value1-1",
            children: [
              { id: "1-1-1", text: "value1-1-1" },
              { id: "1-1-2", text: "value1-1-2" },
            ],
          },
          {
            id: "1-2",
            text: "value1-2",
            children: [
              { id: "1-2-1", text: "value1-2-1" },
              { id: "1-2-2", text: "value1-2-2" },
            ],
          },
        ],
      },
      {
        id: "2",
        text: "value2",
        children: [
          { id: "2-1", text: "value2-1" },
          { id: "2-2", text: "value2-2" },
        ],
      },
    ];
    const treeItemClickHandle = (item) => {
      console.log(`${item.id} click`);
    };

    return {
      nodeData,
      treeItemClickHandle,
    };
  },
});
</script>

<style>
</style>