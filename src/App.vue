<template>
  <div class="header">
    <div class="image"></div>
    <div class="nameBar">
      <p>我是用户昵称</p>
      <p>经纪人</p>
    </div>
  </div>
  <div class="main-container">
    <Menu :componentName="componentName" :changeComponent="changeComponent" />
    <div class="wrap">
      <component :is="componentMap[componentName]" />
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import SearchList from "./components/SearchList";
import Toast from "./components/Toast";
import Tree from "./components/Tree";
import Menu from "./components/Menu";
import Flex from "./components/Flex";

export default {
  name: "App",
  components: {
    Menu,
  },
  setup(props) {
    const componentName = ref("flex");
    const componentMap = {
      toast: Toast,
      tree: Tree,
      search: SearchList,
      flex: Flex,
    };
    const changeComponent = (name) => (componentName.value = name);

    // ------------------------------------
    // 域名倒置
    const revertDomain = (target) => {
      return target.split(".").reverse().join(".");
    };
    console.log("revertDomain ", revertDomain("www.douyin.com"));

    // 查找重复数字
    const sameNumbers = (arr1, arr2) => {
      const result = new Set();
      const numReg = /^[0-9]+.?[0-9]*/;
      if (Array.isArray(arr1) && Array.isArray(arr2)) {
        arr1.map((v) => {
          if (numReg.test(v)) {
            if (arr2.includes(v) || arr2.includes(parseFloat(v))) {
              result.add(parseFloat(v));
            }
          }
        });
      }
      return [...result];
    };
    console.log("sameNumbers ", sameNumbers([1, 5, 6], [2, 6, 7]));

    // 版本比较
    const compare = (a, b) => {
      if (a === b) return 0;
      const maxIndex = 4; // 最大索引
      const tagIndex = 3; // 修饰符所在索引，需要特殊处理
      const tagMap = { nil: window.Infinity, alpha: 1, beta: 2, rc: 3 };
      let aInfo = a.split(".");
      let bInfo = b.split(".");
      // 固定最大循环次数，省略两版本位数不一致的复杂判断
      for (let index = 0; index <= maxIndex; index++) {
        let aVal = aInfo[index] ?? 0,
          bVal = bInfo[index] ?? 0;
        if (index === tagIndex) {
          aVal = tagMap[aVal || "nil"];
          bVal = tagMap[bVal || "nil"];
        }
        if (aVal > bVal) {
          return 1;
        } else if (aVal < bVal) {
          return -1;
        }
      }
    };
    console.log("compare ", compare("1.3.0", "1.3.0.rc.1"));

    // 对象扁平化
    const flatten = (obj) => {
      const result = {};
      const typeCheck = (tar) =>
        Object.prototype.toString.call(tar).slice(8, -1).toLowerCase();
      const handle = (item, path = "", isArray = false) => {
        switch (typeCheck(item)) {
          case "array":
            item.map((v, i) => {
              handle(v, path ? `${path}[${i}]` : i, true);
            });
            break;
          case "object":
            Object.keys(item).map((key) => {
              handle(item[key], path ? `${path}.${key}` : key, false);
            });
            break;
          default:
            result[path] = item;
        }
      };

      handle(obj);
      return result;
    };
    const sources = {
      a: {
        b: 1,
        c: 2,
        d: { e: 5 },
      },
      b: [1, 3, { a: 2, b: 3 }],
      c: 3,
    };
    console.log("flatten ", flatten(sources));
    // ------------------------------------

    return {
      componentName,
      componentMap,
      changeComponent,
    };
  },
};
</script>

<style scoped>
.header {
  height: 80px;
  flex: 0 0 none;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  background-color: lightblue;
}
.image {
  border-radius: 50%;
  width: 0px;
  height: 0px;
  border: 25px solid red;
  border-left-color: orange;
  border-right-color: orange;
  margin-right: 1rem;
}
.image:hover {
  transform: rotateZ(360deg);
  transition: all 3s;
}
.nameBar {
  margin-right: 1rem;
}
.main-container {
  height: 0;
  flex: 1 1 auto;
  display: flex;
  margin: 1rem;
}

.wrap {
  flex: 1 1 auto;
  max-height: 100%;
  overflow-y: auto;
  background-color: #fff;
  padding: 1em;
  margin-left: 1rem;
}
</style>
