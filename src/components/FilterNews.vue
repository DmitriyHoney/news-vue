<template>
    <div id="app">
        <DisplayDesignSiteFilter
                v-on:toggleIsColumn="toggleIsColumn"
                :isColumn="isColumn"
        />

        <DisplayNewsNowFilter
                v-on:changeNewsOnPage="changeNewsOnPage2"
                :news-on-page="newsOnPage"
        />
        <SortNewsFilter
            v-on:sortNews="sortNews"
        />
    </div>
</template>

<script>
    import DisplayDesignSiteFilter from "./DisplayDesignSiteFilter";
    import DisplayNewsNowFilter from "./DisplayNewsNowFilter";
    import SortNewsFilter from "./SortNewsFilter";

    export default {
        props: ['isColumn', 'changeNewsOnPage', 'newsOnPage'],
        components: {
            DisplayDesignSiteFilter,
            DisplayNewsNowFilter,
            SortNewsFilter
        },
        methods: {
            changeNewsOnPage2(num) {
                this.$emit('changeNewsOnPage', num);
            },
            toggleIsColumn() {
                this.$emit('toggleIsColumn');
            },
            sortNews(optionValue) {
                this.$emit('sortNews', optionValue);
                console.log(optionValue)
            }
        },

    }

</script>

<style>

</style>
