<template>
  <div class="menu">
    <p
      v-for="item in menuItems"
      :key="item.key"
      :class="['menu-item', item.key === componentName ? 'active' : '']"
      @click="changeComponent(item.key)"
    >
      {{ item.label }}
    </p>
  </div>
</template>

<script>
export default {
  props: {
    componentName: {
      type: String,
      default: "search",
    },
    changeComponent: {
      type: Function,
      required: true,
    },
  },
  setup(props, { emit }) {
    const menuItems = [
      {
        key: "flex",
        label: "左右自适应布局",
      },
      {
        key: "search",
        label: "搜索列表",
      },
      {
        key: "toast",
        label: "弹窗组件",
      },
      {
        key: "tree",
        label: "树形组件",
      },
    ];
    return {
      menuItems,
    };
  },
};
</script>

<style scoped>
.menu {
  width: 200px;
  max-height: 100%;
  overflow-y: auto;
  flex: 0 0 auto;
  background-color: moccasin;
}
.menu-item {
  text-align: center;
  line-height: 2em;
  cursor: pointer;
}
.menu-item.active {
  background-color: blue;
  color: white;
}
</style>