<template>
    <div>
        <div class="bg bg-levels-container"></div>
        
        <transition name="levels-tr">
            <router-view></router-view>
        </transition>
        <button @click="toResults">to results</button>
    </div>
</template>

<script>
import json from '@/assets/levels.json'
export default {
    data() {
        return {
            lv: 0,
        }
    },
    methods: {
        toResults() {
            this.$router.push({path: '/results/unfinished'})
        },
    }
}
</script>

<style lang="scss" scoped>
.bg-levels-container {
    background: #d0a0e0;
}
.lvs-enter, .lvs-to {
  opacity: 0;
}
.lvs-enter-active, .lvs-leave-active {
  transition: opacity .3s ease;
}
</style>
