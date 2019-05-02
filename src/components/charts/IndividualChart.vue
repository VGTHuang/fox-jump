<template>
<div>
    <button @click="asd">asd</button>
    <svg ref="chart">
        
    </svg>
</div>
</template>

<script>
import * as d3 from './d3.min.js'
import { mapState } from 'vuex'

export default {
    props: {
        lv: Number
    },
    data() {
        return {
            chart: {},
            path: {},
            line: {},
            xScale: {},
            yScale: {},
            errors: {},
            yMax: 0,
            errorData: []
        }
    },
    computed: {
        ...mapState({
            data: function(state) {
                return state.record[this.lv]
            }
        })
    },
    mounted() {
        console.log('chart mounted')
        
        this.chart = d3.select(this.$refs.chart)
            .attr('height', 200)
            .attr('width', 700)
        
        this.path = this.chart.append('path')
            .attr('stroke', 'red')
            .attr('stroke-width', 2)
            .attr('fill', 'none')
        
        this.xScale = d3.scaleLinear().domain([0, this.data.length]).range([0, this.chart.attr('width')])
        this.yScale = d3.scaleLinear().domain([0, this.yMax]).range([this.chart.attr('height'), 0])

        this.line = d3.line()
            .x((d, i) => this.xScale(i))
            .y(d => this.yScale(d[2]))
            .curve(d3.curveMonotoneX)

        this.path.data([this.data])
            .attr('d', this.line)
        
        this.chart.append('g').attr('class', 'errors')
        this.errors = this.chart.select('.errors')
    },
    watch: {
        data: function() {
            this.joinNewData()
        }
    },
    methods: {
        joinNewData() {
            if(this.data[this.data.length-1] && this.data[this.data.length-1][2] > this.yMax) {
                this.yMax = this.data[this.data.length-1][2]
            }
            else if(this.data.length === 0) {
                // a new chart, needs to reset all previous variables
                this.reset()
            }
            this.xScale = d3.scaleLinear().domain([0, this.data.length]).range([0, this.chart.attr('width')])
            this.yScale = d3.scaleLinear().domain([0, this.yMax]).range([this.chart.attr('height'), 0])

            this.path.data([this.data])
                .attr('d', this.line)
            
            if(this.data[this.data.length-1] && !this.data[this.data.length-1][1]) {
                // error input
                this.errorData.push([this.data[this.data.length-1][2], this.data.length-1])
            }

            this.errors.selectAll('circle')
                .data(this.errorData)
                .join('circle')
                .attr('cx', d => this.xScale(d[1]))
                .attr('cy', d => this.yScale(d[0]))
                .attr('r', 4)
        },
        reset() {
            this.yMax = 0
            this.errorData = []
            this.errors.selectAll('circle').remove()
        },
        asd() {
            console.log(this.data)
        }
    }
}
</script>

<style scoped>
svg {
    overflow: visible;
}
</style>
