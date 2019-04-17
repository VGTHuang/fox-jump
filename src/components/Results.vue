<template>
    <div>
        results: {{isFinsihed}}
    </div>
</template>

<script>
export default {
    data() {
        return {
            isFinsihed: ""
        }
    },
    created() {
        this.isFinsihed = this.$route.params.finishState
    }

}
</script>
