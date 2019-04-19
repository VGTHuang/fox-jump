<template>
    <div class="component-wrapper" height="100" width="280">
        <div>
            results: {{isFinished}}
        </div>
        <keyboard :data="keyData"/>
        <results-chart :data="record"/>
    </div>
</template>

<script>
import Keyboard from './charts/Keyboard.vue'
import ResultsChart from './charts/ResultsChart.vue'
import { mapState } from 'vuex'

export default {
    components:  {
        Keyboard,
        ResultsChart
    },
    data() {
        return {
            isFinished: "",
            keyData: {}
        }
    },
    computed: {
        ...mapState({
            record: state => state.record
        })
    },
    created() {
        this.isFinished = this.$route.params.finishState

        // calculate data for each key
        this.record.forEach((lv) => {
            lv.forEach((rec) => {
                if(!this.keyData[rec[0]]) {
                    // hasn't recorded this key
                    this.keyData[rec[0]] = {
                        total: rec[2],
                        num: 1,
                        errors: rec[1]===false?1:0,
                    }
                }
                else {
                    this.keyData[rec[0]].total += rec[2]
                    this.keyData[rec[0]].num++
                    if(rec[1]===false) {
                        this.keyData[rec[0]].errors++
                    }
                }
            })
        })
    },

}
</script>