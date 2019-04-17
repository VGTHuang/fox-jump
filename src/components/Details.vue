<template>
    <div>details
        <div>{{item}}</div>
    </div>
</template>

<script>
export default {
    name: 'Bar',
    computed: {
        item() {
            return this.$route.params.fruitItem
        }
    }
}
</script>

