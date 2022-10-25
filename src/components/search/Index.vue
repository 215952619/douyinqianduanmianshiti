<template>
  <div class="search-list" :loading="loading" :init="init">
    <div class="header">
      <input
        type="text"
        placeholder="请输入关键词"
        v-model="keyword"
        @keyup.enter="searchHandle"
      />
      <button @click="searchHandle">Search</button>
    </div>
    <div ref="wrap" class="wrap" @scroll="instanceCheck">
      <slot :data="data">
        <p v-if="data.length === 0">暂无结果</p>
      </slot>
    </div>
    <div class="footer" v-if="init || !loading">
      <template v-if="finish">数据加载完毕</template>
      <template v-else-if="loading">正在加载数据</template>
      <template v-else>
        <a @click="pageNumber++">加载更多</a>
      </template>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, watch, computed, onMounted } from "vue";
const throttle = (fn, time) => {
  let timer = null;
  return (...args) => {
    if (!timer) {
      timer = setTimeout(() => {
        fn(...args);
        timer = null;
      }, time);
    }
  };
};
export default defineComponent({
  name: "Search",
  props: {
    distance: {
      type: Number,
      default: 200,
    },
    load: {
      type: Function,
      required: true,
      default: () => Promise(),
    },
    pageSize: {
      type: Number,
      default: 15,
    },
  },
  setup(props, { emit }) {
    const data = ref([]);
    const total = ref(0);
    const keyword = ref("");
    const realKeyword = ref("");
    const wrap = ref(null);
    const loading = ref(false);
    const init = ref(false);
    const pageNumber = ref(0);
    const finish = computed(() =>
      init.value ? data.value.length >= total.value : false
    );
    const pageInfo = computed(() => {
      return {
        pageSize: props.pageSize,
        pageNumber: pageNumber.value,
        keyword: realKeyword.value,
      };
    });
    const loadHandle = () => {
      loading.value = true;
      props
        .load(pageInfo.value)
        .then((res) => {
          if (res.status === 0) {
            total.value = res.total;
            if (pageNumber.value === 1) {
              data.value = res.list;
            } else {
              data.value.push(...res.list);
            }
          } else {
            console.error("加载数据失败，请稍后刷新重试");
          }
        })
        .catch((err) => {
          console.error("加载数据失败，请稍后刷新重试", err);
        })
        .finally(() => {
          loading.value = false;
        });
    };
    const instanceCheck = throttle((e) => {
      if (finish.value) return false;
      const scrollBottom =
        e.target.scrollHeight - e.target.clientHeight - e.target.scrollTop;

      if (!loading.value && scrollBottom <= props.distance) {
        pageNumber.value++;
      }
    }, 100);
    watch(pageInfo, loadHandle, { deep: true, flush: "post" });

    watch(
      data,
      () => {
        if (!init.value) {
          const innerHeight = Array.from(wrap.value.children).reduce(
            (height, dom) => {
              height += dom.clientHeight;
              return height;
            },
            0
          );
          const fullHeight = wrap.value.clientHeight;
          if (innerHeight < fullHeight) {
            pageNumber.value++;
          } else {
            init.value = true;
          }
        }
      },
      { deep: true, flush: "post" }
    );

    onMounted(() => {
      pageNumber.value = 1;
    });

    const searchHandle = () => {
      realKeyword.value = keyword.value;
      pageNumber.value = 1;
      init.value = false;
    };

    return {
      data,
      total,
      keyword,
      realKeyword,
      wrap,
      loading,
      init,
      finish,
      pageNumber,
      pageInfo,
      instanceCheck,
      searchHandle,
    };
  },
});
</script>

<style scoped>
.search-list {
  height: 100%;
  display: flex;
  flex-flow: column nowrap;
  position: relative;
}

.search-list[loading="true"][init="false"]::after {
  content: "loading...";
  font-size: 2em;
  width: 100%;
  height: 100%;
  position: absolute;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.header {
  flex: 0 0 none;
  display: flex;
}

.header > input {
  line-height: 2em;
  flex: 1 1 auto;
}

.header > button {
  flex: 0 0 none;
  background-color: blue;
  color: white;
  padding: 0 2em;
  border: none;
  cursor: pointer;
}

.wrap {
  height: 0;
  flex: 1 1 auto;
  overflow-y: auto;
  border-bottom: 1px dashed #ccc;
  padding: 1em 0;
}

.footer {
  line-height: 2em;
  text-align: center;
}
</style>