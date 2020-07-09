<template>
    <div>
        <input
                id="colDesign"
                name="design"
                type="checkbox"
                v-model="isColumn"
                v-on:click="$emit('toggleIsColumn', getCheckboxState)"
        />
        <label for="colDesign">Списком</label>
    </div>
</template>
<script>
    export default {
        props: ['isColumn'],
        components: {

        },
        methods: {
            getCheckboxState(e) {
                return e.target.value;
            }
        }

    }
</script>
<style></style>