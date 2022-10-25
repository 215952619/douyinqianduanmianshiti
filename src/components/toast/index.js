import { createVNode, render } from "vue";
import ToastTemplate from "./View.vue";

const defaultOpts = { image: "", text: "", headerText: "提示" };

const createContainer = () => {
  const el = document.createElement("div");
  el.style.position = "fixed";
  el.style.top = "0";
  el.style.bottom = "0";
  el.style.left = "0";
  el.style.right = "0";
  el.style.backgroundColor = "rgba(0,0,0,0.5)";
  el.style.padding = "1em";
  el.style.display = "flex";
  el.style.alignItems = "center";
  el.style.justifyContent = "center";
  el.style.zIndex = "9999 !important";
  return el;
};

const deleteInstance = (el) => {
  el && el.parentElement.removeChild(el);
};

const createInstance = (opts) => {
  const options = {
    ...defaultOpts,
    ...opts,
    onDelete: () => deleteInstance(container)
  };
  let instance = createVNode(ToastTemplate, options, null);
  const container = createContainer();
  render(instance, container);
  document.body.appendChild(container);
};

const miniInstance = (str) => createInstance({ text: str });

export default (args) => {
  if (typeof args === "string") {
    miniInstance(args);
  } else {
    createInstance(args);
  }
};

// TODO 需要全局的实例列表进行控制
