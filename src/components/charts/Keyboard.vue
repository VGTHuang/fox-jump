<template>
    <div style="position: relative" @mouseenter="tooltipShown=true" @mouseleave="tooltipShown=false">
        <svg x="0" y="0" width="584" height="200" viewBox="-5 -5 584 200">
            <g class="single-key" v-for="(v,k) in keyPos" :key="k" :transform="'translate('+v.p[0]+','+v.p[1]+')'">
                <rect
                    :height="v.p[2]-5"
                    :width="v.p[3]-5"
                    rx="5" ry="5"
                    :style="v.style"
                    @mouseover="showTooltip(v, $event)"
                ></rect>
                <g class="key-text">
                    <text class="text-u" :x="(v.p[3]-5)/3" y="13" style="text-anchor: middle;">{{v.d[0]}}</text>
                    <text class="text-d" :x="(v.p[3]-5)/2" :y="v.d[0]===''?23:30" style="text-anchor: middle;">{{v.d[1]}}</text>
                </g>
            </g>
        </svg>
        <div class="tooltip" :class="{show: tooltipShown}" :style="{left: currentData.pos.x+'px', top: currentData.pos.y+'px'}">
            <p>{{currentData.key[1]}}</p>
            <p>average: {{currentData.avg}}ms</p>
            <p>errors: {{currentData.errors}}</p>
        </div>
    </div>
</template>

<script>
import json from '@/assets/keyboard.json'

export default {
    props: {
        data: Object
    },
    data() {
        return {
            keyPos: {},
            tooltipShown: false,
            currentData: {
                key: "",
                avg: "",
                errors: "",
                pos: {
                    x: 0,
                    y: 0
                }
            },
        }
    },
    created() {
        this.keyPos = json.key
        console.log("keyboard component created")
        // process data
        for(var key in this.keyPos) {
            this.keyPos[key]['data'] = {errors:0, num:0, total:0}
        }
        for(var key in this.data) {
            if(json.charKey[key]) {
                for(var i = 0; i < json.charKey[key].length; i++) {
                    this.keyPos[json.charKey[key][i]].data.errors += this.data[key].errors
                    this.keyPos[json.charKey[key][i]].data.num += this.data[key].num
                    this.keyPos[json.charKey[key][i]].data.total += this.data[key].total
                    
                }
            }
            else {
                this.keyPos[key].data.errors += this.data[key].errors
                this.keyPos[key].data.num += this.data[key].num
                this.keyPos[key].data.total += this.data[key].total
            }
        }
        for(var key in this.keyPos) {
            this.keyPos[key]['style'] = this.calcKeyStyle(this.keyPos[key].data)
        }
    },
    mounted() {

    },
    methods: {
        calcKeyStyle(vd) {
            if(vd.num===0) {
                return "fill:#707070"
            }
            var avg = vd.total/vd.num
            var proj = 1-1000/(avg+1000)
            //***************************var col =  d3.interpolateYlGnBu(proj)
            var col = 'red'
            console.log(col)
            var re = "fill:"+col
            if(vd.errors !== 0) {
                re += `; stroke:${this.projectErrorStroke(vd.errors)}; stroke-width:4`
            }
            return re
        },
        projectErrorStroke(err) {
            /*
            if(err>6) {
                return d3.interpolateYlOrRd(1)
            }
            return d3.interpolateYlOrRd(0.4+err/10)
            */
           return 'green'
        },
        showTooltip(v, e) {
            this.currentData.key = v.d
            this.currentData.avg = v.data.num===0 ? 0 : Math.floor(v.data.total/v.data.num)
            this.currentData.errors = v.data.errors
            this.currentData.pos.x = e.offsetX
            this.currentData.pos.y = e.offsetY
        }
    }
}
</script>

<style lang="scss" scoped>
.single-key {
    cursor: pointer;
    &:hover rect {
        stroke: #403080 !important;
    }
}
.key-text {
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}
.text-u {
    font-size: .8em;
    fill: #a0a0a0;
    user-select: none;
}
.text-d {
    font-size: 1.1em;
    fill: white;
    user-select: none;
}
.tooltip {
    opacity: 0;
    position: absolute;
    height: 100px;
    width: 160px;
    margin-top: -120px;
    margin-left: -80px;
    background: #a0a0a0;
    background: #00000080;
    border-radius: 5px;
    transition: 100ms;
    color: #fff;
}
.show {
    opacity: 1
}
</style>
