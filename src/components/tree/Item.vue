<template>
  <div :class="['tree-item', focus ? 'focus' : '']">
    <div class="row" :style="{ textIndent: level + 'em' }">
      <span
        :class="[
          'tag',
          hasChild ? 'hasChild' : '',
          showChild ? 'show' : 'hidden',
        ]"
        @click.self="toggleChild"
      ></span>
      <span @click.self="handleClick">{{ data.text }}</span>
    </div>
    <Transition v-if="hasChild" mode="out-in">
      <div v-if="showChild">
        <TreeItem
          v-for="item in data.children"
          :key="item.id"
          :data="item"
          :level="level + 1"
          :searchKey="searchKey"
          :handleItemClick="handleItemClick"
        />
      </div>
    </Transition>
  </div>
</template>

<script>
import { defineComponent, ref, computed } from "vue";
export default defineComponent({
  name: "TreeItem",
  emits: ["handle-item-click"],
  props: {
    level: {
      type: Number,
      default: 0,
    },
    data: {
      type: Object,
      required: true,
      default: () => ({ id: "", text: "", children: [] }),
    },
    searchKey: {
      type: String,
      default: "",
    },
    handleItemClick: {
      type: Function,
      default: (item) => {},
    },
  },
  setup(props, { emit }) {
    const showChild = ref(true);
    const toggleChild = () => (showChild.value = !showChild.value);
    const hasChild = computed(() => (props?.data?.children?.length || 0) > 0);
    const focus = computed(() => props.data.text === props.searchKey);
    const handleClick = () => {
      // console.log(props.data.text, "click on child");
      props.handleItemClick && props.handleItemClick(props.data);
    };

    return {
      showChild,
      toggleChild,
      hasChild,
      focus,
      handleClick,
    };
  },
});
</script>

<style>
.tree-item {
  line-height: 1.5em;
}
.tree-item.focus > .row {
  background-color: lightblue;
  color: bule;
}
.tag {
  display: inline-block;
  width: 2em;
  text-align: center;
  cursor: pointer;
}
.tag.hasChild::after {
  content: "";
  display: inline-block;
  height: 0;
  width: 0;
  border: 0.3em solid transparent;
  border-left-color: black;
  border-bottom-color: black;
  transform-origin: center;
  transition: all 1s;
}
.tag.hasChild.show::after {
  transform: rotateZ(-45deg);
  margin-bottom: 0.2em;
}
.tag.hasChild.hidden::after {
  transform: rotateZ(-135deg);
  margin-right: 0.3em;
}
</style>