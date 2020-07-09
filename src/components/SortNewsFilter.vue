<template>
    <div class="wrap">
        <span>
            Сортировать
        </span>
        <select v-on:change="handleSelect">
            <option value="name">По названию</option>
            <option value="date">По дате</option>
        </select>
    </div>
</template>

<script>
    export default {
        methods: {
            handleSelect(e) {
                let optionValue = e.target.value;
                    this.$emit('sortNews', optionValue);
            }
        }
    }
</script>

<style scope>
    .wrap {
        margin-top: 30px;
    }
</style>