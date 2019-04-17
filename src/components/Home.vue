<template>
    <div id="home-wrapper" class="component-wrapper">
        <div id="home-bg" class="bg"></div>
        <div class="center-ctn">
            <div class="home-titles">
                <div class="home-title-lg">Fox Run</div>
                <div class="home-title-sm">test your typing speed</div>
            </div>
            <div class="select-btn-group">
                <div class="select-btn start">
                    start
                </div>
                <div class="select-btn see-lv">
                    see level
                </div>
            </div>
        </div>
        <div v-for="(v, k) in levels" :key="k" style="border: 1px solid red" @click="goToLevel(k)">
            <div>{{k}}</div>
            <div>{{v.text}}</div>
        </div>
    </div>
</template>

<script>
import json from '@/assets/levels.json'

export default {
    name: 'Home',
    data() {
        return {
            levels: {}
        }
    },
    created() {
        this.levels = json
    },
    methods: {
        goToLevel(lv) {
            console.log(lv)
            this.$router.push({name: 'levels', params: {lv: lv}})
        }
    }
}
</script>

<style lang="scss" scoped>
#home-bg {
    background: #f0e0d0
}
.center-ctn > * {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}
.home-titles {
    color: #404040;
    margin: 40px 40px;
    .home-title-lg {
        font-size: 4em;
        line-height: 1.7em;
    }
    .home-title-sm {
        font-size: 2em;
    }
}
.select-btn-group {
    flex-direction: row;
    border: 1px solid blue;
    .select-btn {
        height: 60px;
        width: 180px;
        border: 1px solid green;
        font-size: 1.7em;
        white-space: nowrap;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        user-select: none; 
    }
    > * {
        margin: 0 20px;
    }
}


</style>
