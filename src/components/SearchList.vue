<template>
  <SearchListComponent :load="load">
    <template #default="{ data }">
      <div class="list-item" v-for="item in data" :key="item.title">
        <h3>{{ item.title }}</h3>
        <p>{{ item.content }}</p>
      </div></template
    >
  </SearchListComponent>
</template>

<script>
import { defineComponent } from "vue";
import SearchListComponent from "./search/Index";

// mock
const generateData = ({ pageSize = 15, pageNumber = 1, keyword = "" }) => {
  console.log("收到请求，请求参数为 ", { pageSize, pageNumber, keyword });
  const total = 65;
  return new Promise((resolve, reject) => {
    const result = [];
    const startId = (pageNumber - 1) * pageSize;
    setTimeout(() => {
      for (let i = startId; i < pageSize * pageNumber && i < total; i++) {
        result.push({
          title: `第${i}条数据标题`,
          content: keyword
            ? `包含关键词${keyword}的第${i}条数据内容`
            : `第${i}条数据内容`,
        });
      }
      resolve({
        status: 0,
        total,
        list: result,
      });
    }, 1500);
  });
};
export default defineComponent({
  name: "SearchList",
  components: { SearchListComponent },
  setup(props, { emit }) {
    const load = async (pageInfo) => {
      return await generateData(pageInfo);
    };

    return {
      load,
    };
  },
});
</script>

<style scoped>
.list-item {
  background-color: lightskyblue;
  padding: 1em;
  line-height: 1.5em;
}
.list-item:not(:last-child) {
  margin-bottom: 1em;
}
</style>