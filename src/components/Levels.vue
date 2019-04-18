<template>
    <div id="level-wrapper" class="component-wrapper">
        <div class="back-to-home-btn" @click="backToHome"><div>Back to home</div></div>
        <div class="level-ctn">{{this.levelName}}</div>
        <div class="level-text-ctn">
            <div class="level-text-box" @mousewheel="mouseScroll">
                <div class="level-text-scroll" id="scroll" :style="{marginTop: scrollTop+'px'}">
                    <span v-for="(d, i) in chars" :key="i" :class="{finished: isFinished(i)}"><div class="space" v-if="isSpace(d)"></div>{{d===" "?"":(d==="$"? '&#8626;':d)}}<br v-if="isBreak(d)"/></span>
                </div>
            </div>
        </div>
        <div class="level-record-ctn">
            <div class="level-record-chart">
                <individual-chart :lv="currentLevel"></individual-chart>
            </div>
        </div>
    </div>
</template>

<script>
import json from '@/assets/levels.json'
import { mapState } from 'vuex'
import IndividualChart from './charts/IndividualChart.vue'

export default {
    name: 'Level',
    components: {
        IndividualChart
    },
    data() {
        return {
            currentLevel: 0,  // number
            level: {},        // level details
            levelName: "",    // "level 3"
            text: "",
            examineIndex: 0,
            chars: [],
            scrollTop: 300,
            spans: [],
            time: 0,          // records interval between 2 examine() in milliseconds
        }
    },
    computed: {
        ...mapState({
            myLevelRecord: function(state) {return state.record[this.currentLevel]}
        })
    },
    created() {
        window.addEventListener('keypress', this.examine, true)
        this.initialize()
    },
    mounted() {
        this.mount()
    },
    watch: {
        '$route' (to, from) {
            this.initialize()
            this.mount()
        }
    },
    methods: {
        initialize() {
            console.log(this.$route.params.lv)
            this.currentLevel = +this.$route.params.lv
            this.level = json[this.currentLevel]
            this.levelName = this.level.level
            this.text = this.level.text
            this.examineIndex = 0
            this.chars = this.text.split('')
            this.time = 0
            // graph
            
        },
        mount() {
            this.spans = document.getElementById('scroll').getElementsByTagName('span')
            var spanTop =this.spans[0].offsetTop
            this.scrollTop = 100 - spanTop
        },
        isSpace(d) {
            return d===" "
        },
        isBreak(d) {
            return d==="$"
        },
        isFinished(i) {
            return i < this.examineIndex
        },
        examine(key) {
            var code = key.which || key.keyCode
            // if already finised
            if(!this.chars[this.examineIndex]) {
                console.log("already finished!")
            }
            // is line break, expect code === 13
            else if(this.chars[this.examineIndex] === "$") {
                code === 13?this.pushForward(code):this.pushBackward()
            }
            // not line break
            else {
                this.chars[this.examineIndex] === String.fromCharCode(code)?this.pushForward(code):this.pushBackward()
            }
        },
        pushForward(code) {
            // store this code
            var now = Date.now()
            this.$store.commit('addNewKeyIn', {
                level: this.currentLevel,
                newKeyIn: [
                    this.chars[this.examineIndex],
                    true,
                    this.time === 0?0:(now-this.time)
                ]
            })
            this.time = now
            // get element position and scroll text-scroll to that position
            if(code !== 32) {
                // don't scroll when code is a space (because inline block)
                this.scrollTop = 100-this.spans[this.examineIndex].offsetTop
            }
            if(code === 13) {
                // is line break; jumps to next line
                if(this.chars[this.examineIndex+1]) {
                    this.scrollTop = 100-this.spans[this.examineIndex+1].offsetTop
                }
            }
            this.examineIndex++;
            // if level is finished
            if(!this.chars[this.examineIndex]) {
                console.log("finished")
                console.log(this.$store.state)
                if(this.currentLevel+1 >= json.length) {
                    this.$router.push({path: '/results/finished'})
                }
                else {
                    this.$router.push({path: '/levels/' + (+this.currentLevel+1)})
                }
            }
        },
        pushBackward() {
            // store this code
            var now = Date.now()
            this.$store.commit('addNewKeyIn', {
                level: this.currentLevel,
                newKeyIn: [
                    this.chars[this.examineIndex],
                    false,
                    this.time === 0?0:(now-this.time)
                ]
            })
            this.time = now
            this.examineIndex = 0
            this.scrollTop = 100-this.spans[0].offsetTop
        },
        mouseScroll(e) {
            if(e && e.deltaY > 0) {
                this.scrollTop -= 50
            }
            else {
                this.scrollTop += 50
            }
        },
        backToHome() {
            this.$router.push({name: 'home'})
        }
    },
    beforeDestroy() {
        window.removeEventListener('keypress', this.examine, true)
        console.log("component destroyed")
    }
}
</script>

<style lang="scss" scoped>
#level-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}
.level-ctn {
    margin: 20px 0;
    font-size: 1.7em;
}
.level-text-ctn {
    box-sizing: border-box;
    width: 100%;
    height: 280px;
    padding: 10px;
    .level-text-box {
        position: relative;
        height: 100%;
        width: 100%;
        border-radius: 10px;
        overflow: hidden;
        background: #808080;
        .level-text-scroll {
            position: relative;
            margin-left: 20px;
            margin-right: 20px;
            font-family: 'Courier New', Courier, monospace;
            font-size: 40px;
            word-wrap: break-word;
            line-height: 50px;
            transition: 200ms;
            span {
                color: black;
            }
            .finished {
                transition: 200ms;
                color: red;
            }
            .space {
                display: inline-block;
                height: 40px;
                width: 10px;
                background: #a0a0a0;
                background: #ffffff30;
            }
        }
    }
}
.level-record-ctn {
    box-sizing: border-box;
    width: 100%;
    height: 280px;
    padding: 10px;
    .level-record-chart {
        height: 100%;
        width: 100%;
        border-radius: 10px;
        overflow: hidden;
        background: palegreen;
        display: flex;
        align-items: center;
        justify-content: center;
    }
}
.back-to-home-btn {
    position: fixed;
    top: 0;
    left: 0;
    margin: 1em;
    color: white;
    font-size: 1.7em;
    cursor: pointer;
    user-select: none;
    div {
        position: absolute;
        top: 0;
        left: 0;
        width: 500px;
        transition: 300ms;
    }
    &::before {
        content: "←";
        display: inline-block;
        position: absolute;
        color: #ffffff00;
        position: absolute;
        transition: 300ms;
    }
    &:hover {
        div {
            left: 40px;
        }
        &::before {
            color: #ffffff;
        }
    }
}
</style>