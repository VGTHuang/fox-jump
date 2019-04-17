<template>
    <div id="home-wrapper" class="component-wrapper">
        <div class="bg home-bg"></div>
        <transition name="center-tr">
            <div class="home-center-ctn">
                <div class="home-titles">
                    <div class="home-title-lg">Fox Run</div>
                    <div class="home-title-sm">test your typing speed</div>
                </div>
                <div class="home-btn-group">
                    <div class="home-btn start">
                        start
                    </div>
                    <div class="home-btn see-lv">
                        see level
                    </div>
                </div>
            </div>
        </transition>
        <div v-for="(v, i) in levels" :key="i" style="border: 1px solid red" @click="goToLevel(i)">
            <div>{{i}}</div>
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
            this.$router.push({path: `/levels/${lv}`})
        }
    }
}
</script>

<style lang="scss" scoped>
.home-bg {
    background: #e9ac73;
}
.home-center-ctn > * {
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
.home-btn-group {
    flex-direction: row;
    border: 1px solid blue;
    .home-btn {
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
.center-tr-leave-active {
    transition: 300ms ease;
}
.center-tr-to {
    background: #ff0000;
}
</style>
