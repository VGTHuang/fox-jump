<template>
    <svg ref="chart">
        <g>
            <rect height="100" width="100" fill="red"/>
        </g>
    </svg>
</template>

<script>
export default {
    props: {
        lv: Number
    },
    data() {
        return {
            chart: ""
        }
    },
    mounted() {
        this.chart = this.$refs.chart
    },
    methods: {
        
    }
}
</script>
