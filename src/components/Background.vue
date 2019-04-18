<template>
    <div class="bg bg-levels-container" :style="{background: bgColor}"></div>
</template>

<script>
import json from '@/assets/levels.json'

export default {
    props: {
        lv: Number
    },
    computed: {
        bgColor() {
            return json[this.lv].bgColor
        }
    },
}
</script>


<style scoped>
.bg-levels-container {
    transition: 200ms;
}
</style>
