 <template>
  <div class="toast">
    <button @click="showToast">以字符串方式调用</button>
    <button @click="showToastWithOpts">以配置方式调用</button>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import Toast from "./toast/index.js";
export default defineComponent({
  name: "Toast",
  setup(props) {
    const showToast = () => Toast("字符串弹窗");
    const showToastWithOpts = () =>
      Toast({
        image:
          "https://img2.woyaogexing.com/2020/06/19/02d268db09ff4e8e9608fd64adbbeed8!400x400.jpeg",
        text: "配置弹窗",
      });

    return {
      showToast,
      showToastWithOpts,
    };
  },
});
</script>

<style scoped>
button {
  margin-left: 1rem;
}
</style>