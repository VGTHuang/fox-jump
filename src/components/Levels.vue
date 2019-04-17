<template>
    <div id="levels-wrapper" class="component-wrapper">
        <div id="levels-bg" class="bg"></div>
        <div class="back-to-home-btn" @click="backToHome"><div>Back to home</div></div>
        <div class="level-ctn">{{this.reqLevel}}</div>
        <div class="text-ctn">
            <div class="text-box" @mousewheel="MouseScroll">
                <div class="text-scroll" id="scroll" :style="{marginTop: scrollTop+'px'}">
                    <span v-for="(d, i) in chars" :key="i" :class="{finished: isFinished(i)}"><div class="space" v-if="isSpace(d)"></div>{{d===" "?"":(d==="$"? '&#8626;':d)}}<br v-if="isBreak(d)"/></span>
                </div>
            </div>
        </div>
        <button @click="toNextLevel">to next level</button>
    </div>
</template>

<script>
import json from '@/assets/levels.json'

export default {
    name: 'Level',
    data() {
        return {
            level: {},
            reqLevel: "level 0",
            text: "",
            assertIndex: 0,
            chars: [],
            scrollTop: 300,
            spans: []
        }
    },
    created() {
        this.level = json[this.$route.params.lv]
        this.reqLevel = (this.$route.params.lv)
        this.levelName = (this.level.level)
        this.text = this.level.text
        this.chars = this.text.split('')
    },
    mounted() {
        window.addEventListener('keypress', this.assert, true)
        this.spans = document.getElementById('scroll').getElementsByTagName('span')
        var spanTop =this.spans[0].offsetTop
        this.scrollTop = 100 - spanTop
        
    },
    methods: {
        backToHome() {
            window.removeEventListener('keypress', this.assert, true)
            this.$router.push({name: 'home'})
        },
        isSpace(d) {
            return d===" "
        },
        isBreak(d) {
            return d==="$"
        },
        isFinished(i) {
            return i < this.assertIndex
        },
        assert(key) {
            var code = key.which || key.keyCode
            // if already finised
            if(!this.chars[this.assertIndex]) {
                console.log("already finished!")
            }
            // is line break, expect code === 13
            else if(this.chars[this.assertIndex] === "$") {
                code === 13?this.pushForward(code):this.pushBackward()
            }
            // not line break
            else {
                this.chars[this.assertIndex] === String.fromCharCode(code)?this.pushForward(code):this.pushBackward()
            }
        },
        pushForward(code) {
            // get element position and scroll text-scroll to that position
            if(code !== 32) {
                // don't scroll when code is a space (because inline block)
                this.scrollTop = 100-this.spans[this.assertIndex].offsetTop
            }
            if(code === 13) {
                // is line break; jumps to next line
                if(this.chars[this.assertIndex+1]) {
                    this.scrollTop = 100-this.spans[this.assertIndex+1].offsetTop
                }
            }
            this.assertIndex++;
            if(!this.chars[this.assertIndex]) {
                console.log("finished")
            }
        },
        pushBackward() {
            this.assertIndex = 0
            this.scrollTop = 100-this.spans[0].offsetTop
        },
        MouseScroll(e) {
            if(e && e.deltaY > 0) {
                this.scrollTop -= 50
            }
            else {
                this.scrollTop += 50
            }
        },
        toNextLevel() {
            this.$router.push({path: '/'})
        }
    },
    beforeRouterLeave() {
        window.removeEventListener('keypress', this.assert, true)
        this.assertIndex = 0
        this.chars = []
        this.scrollTop = 300
        this.spans = []
    }

}
</script>

<style lang="scss" scoped>
#levels-wrapper {
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
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
#levels-bg {
    background: #a080c0;
}
.level-ctn {
    margin: 20px 0;
    font-size: 1.7em;
}
.text-ctn {
    box-sizing: border-box;
    width: 100%;
    height: 280px;
    padding: 10px;
    .text-box {
        position: relative;
        height: 100%;
        width: 100%;
        border-radius: 10px;
        overflow: hidden;
        background: #808080;
        .text-scroll {
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

</style>