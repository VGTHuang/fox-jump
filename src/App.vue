<template>
  <div id="app">
    <transition name="fade" mode="out-in">
      <router-view></router-view>
    </transition>
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
  background:#a0a0a0;
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
#app {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.component-wrapper {
  height: 100%;
  width: 768px;
  box-sizing: border-box;
  border: 1px solid #a0f0f0;
}
.fade-enter-active, .fade-leave-active {
  transition: 600ms ease;
}

.fade-enter, .fade-leave {
  opacity: 0
}
</style>
