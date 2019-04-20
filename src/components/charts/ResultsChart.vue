<template>
    <div>
        <svg ref="resultsChart">
        </svg>
        <div>
            <table>
                <thead>
                    <tr>
                        <th>level</th>
                        <th>average</th>
                        <th>error rate</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(d,i) in tableData" :key="i">
                        <td :style="{color: jsonData[i].bgColor}">{{i}}</td>
                        <td>{{d.avg}}</td>
                        <td>{{d.errRate}}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
import json from '@/assets/levels.json'
import * as d3 from 'd3'

export default {
    data() {
        return {
            tableData: {},
            maxTime: 1,
            jsonData: {}
        }
    },
    computed: {
        rec() {
            return this.$store.state.record
        }
    },
    created() {
        this.jsonData = json
        console.log('result chart created')
        this.tableData = this.rec.map((data, i) => {
            var len = data.length
            var timeSum = 0, errSum = 0
            data.forEach(e => {
                timeSum += e[2]
                if(e[1]===false) {
                    errSum++
                }
                // max time, for y axis of chart
                if(this.maxTime < e[2]) {
                    this.maxTime = e[2]
                }
            });
            if(len===0) {
                return {
                    level: i,
                    avg: '-',
                    errRate: '-'
                }
            }
            else {
                return {
                    level: i,
                    avg: timeSum/(len-1)+' ms',     // 1st input is not recorded
                    errRate: errSum/len*100+'%'
                }
            }
        })
    },
    mounted() {
        this.drawChart()
    },
    methods: {
        drawChart() {
            var chart = d3.select(this.$refs.resultsChart)
                .attr('height', 300)
                .attr('width', 600)

            var yScale = d3.scaleLinear().domain([0, this.maxTime]).range([chart.attr('height')-5,5])
            var line = d3.line()
                .y(d => yScale(d[2]))
                .curve(d3.curveMonotoneX)

            var errors = chart.append('g').selectAll('g')
            var lines = chart.append('g')


            var line = d3.line()
                .y(d => yScale(d[2]))
                .curve(d3.curveMonotoneX)
            
            this.rec.forEach(function(lv, index) {
                var errData = lv.map((d,i) => [d,i]).filter(v => v[0][1]===false)

                var xScale = d3.scaleLinear().domain([0, lv.length-1]).range([5, chart.attr('width')-5])

                errors.data(errData).enter().append('circle')
                    .attr('r', 4)
                    .attr('cx', d => xScale(d[1]))
                    .attr('cy', d => yScale(d[0][2]))
                    .attr('style', "{z-index: 100}")
                
                // draw each path
                line.x((d, i) => xScale(i))
                
                lines.append('path')
                .attr('stroke', json[index].bgColor)
                .attr('fill', 'none')
                .data([lv])
                .attr('d', line)
            })
        }
    }
}
</script>
