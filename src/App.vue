<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {

}
</script>

<style>
body {
  margin: 0;
  padding: 0;
}
#app {
  display: flex;
  justify-content: center;
}
.bg {
  display: block;
  position: fixed;
  height: 100vh;
  width: 100vw;
  top: 0;
  left: 0;
  z-index: -100;
}
.component-wrapper {
  height: 100%;
  width: 70%;
  min-width: 600px;
  max-width: 900px;

  box-sizing: border-box;
  border: 1px solid #a0f0f0;
}
</style>
