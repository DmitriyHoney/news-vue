<template>
    <div>
        <h4>
            Кол-во отображаемых новостей
        </h4>
        <input
                id="number"
                type="number"
                max="15"
                min="1"
                v-bind:value="newsOnPage"
                v-on:change="changeCheckboxValue"
        />
    </div>
</template>

<script>
    export default {
        props: ['newsOnPage'],
        methods: {
            changeCheckboxValue(e) {
                this.$emit('changeNewsOnPage', e.target.value)
            }
        }
    }
</script>

<style></style>