<template>
    <div>
        <transition name="levels-tr">
            <router-view></router-view>
        </transition>
        <button @click="toResults">to results</button>
    </div>
</template>

<script>
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
.lvs-enter, .lvs-to {
  opacity: 0;
}
.lvs-enter-active, .lvs-leave-active {
  transition: opacity .3s ease;
}
</style>
