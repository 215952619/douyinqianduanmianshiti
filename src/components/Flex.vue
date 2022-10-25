<template>
  <div class="container">
    <div class="left">
      <p>left</p>
      <p>second left</p>
    </div>
    <div class="right">right</div>
  </div>
</template>

<script>
export default {
  name: "Flex",
};
</script>

<style scoped>
.container {
  width: 100%;
  height: fit-content;
  display: flex;
}
.left {
  width: 150px;
  box-sizing: border-box;
  flex: 0 0 none;
  border: 1px solid #ccc;
}
.right {
  flex: 1 1 auto;
  border: 1px solid #ccc;
}
</style>