<template>
  <div class="toast" v-if="show">
    <div class="toast_header">
      <h3>{{ headerText }}</h3>
      <i class="toast_header_close_icon" @click="close">
        <svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
          <path
            fill="currentColor"
            d="M764.288 214.592 512 466.88 259.712 214.592a31.936 31.936 0 0 0-45.12 45.12L466.752 512 214.528 764.224a31.936 31.936 0 1 0 45.12 45.184L512 557.184l252.288 252.288a31.936 31.936 0 0 0 45.12-45.12L557.12 512.064l252.288-252.352a31.936 31.936 0 1 0-45.12-45.184z"
          ></path>
        </svg>
      </i>
    </div>
    <div class="toast_warp">
      <slot>
        <img v-if="image" :src="image" alt="" />
        <p>{{ text }}</p>
      </slot>
    </div>
    <div class="toast_footer">
      <slot name="footer">
        <button @click="close">关闭（{{ time }}）</button>
      </slot>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, onMounted, onUnmounted } from "vue";
export default defineComponent({
  name: "toast",
  props: {
    headerText: {
      type: String,
      default: "提示",
    },
    image: {
      type: String,
      required: false,
    },
    text: {
      type: String,
      required: true,
    },
    onDelete: {
      type: Function,
      required: true,
    },
  },
  setup(props) {
    const time = ref(10);
    const show = ref(true);
    const timer = ref(null);
    const close = () => {
      clearInterval(timer.value);
      props.onDelete();
      show.value = false;
    };

    onMounted(() => {
      timer.value = setInterval(() => {
        time.value--;
        if (time.value === 0) {
          close();
        }
      }, 1000);
    });

    onUnmounted(props.onDelete);

    return {
      time,
      show,
      close,
    };
  },
});
</script>

<style scoped>
.toast {
  background-color: white;
  border: 1px solid #ebeefe;
  border-radius: 4px;
  box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.12);
  overflow: hidden;
  min-width: 400px;
}

.toast_header {
  padding: 1em;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.toast_header_close_icon {
  width: 1em;
  height: 1em;
  cursor: pointer;
}

.toast_warp {
  margin: 0 1em;
  text-align: center;
}

.toast_footer {
  padding: 1em;
  display: flex;
  justify-content: flex-end;
}
.toast_footer button {
  padding: 0.5em;
  cursor: pointer;
}
.toast_footer button:not(:first-child) {
  margin-left: 1em;
}
</style>