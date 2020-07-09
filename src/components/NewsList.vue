<template>
    <ul class="news-wrap" v-bind:class="{col: isColumn}">
       <NewsItem
        v-for="oneNews of news"
        v-bind:oneNews="oneNews"
       />
    </ul>
</template>

<script>
    import NewsItem from '@/components/NewsItem';
    export default {
        props: ['news', 'isColumn'],
        components: {
            NewsItem
        }
    }
</script>

<style>
    .news-wrap {
        margin-top: 30px;
        display: flex;
        justify-content: space-around;
        flex-wrap: wrap;
    }
    .col {
        flex-direction: column;
    }
    .col li {
        width: 90%;
        padding: 5px;
        display: flex;
        justify-content: flex-start;
        margin: 15px auto;
    }
    .col li  div{
        margin: 0;
        margin-right: 15px;
    }
    .col .news-item {
        text-align: left;
    }
    .news-item .info {
        width: 95%;
        margin: 0px auto;
    }
</style>