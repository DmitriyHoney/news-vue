<template>
    <li class="news-item">
        <div class="news-image">
            <img :src="oneNews.img || `https://avatars.mds.yandex.net/get-pdb/2380153/85d417c7-8d83-4ca3-8abb-89032bc054a4/s1200`" alt="">
        </div>
        <div class="info">
            <h4>
                {{oneNews.Title}}
            </h4>
            <p>
            {{oneNews.Description.slice(0, 250) + " Читать далее..."}}
            </p>
            <span>
                Дата публикации: {{new Date(oneNews.PublicationDate).toLocaleString()   }}
            </span>

        </div>
    </li>
</template>

<script>
    export default {
        props: {
            oneNews: {
                type: Object,
                required: true
            }
        },
    }
</script>

<style scope>
    .news-image {
        width: 35%;
        height: 200px;
        margin: 0px auto;
        min-width: 297px;
    }
    .col .news-item .info  {
        width: 45%;
        margin: 0;
    }
    .news-image img {
        width: 100%;
        height: 100%;
    }

    .news-item {
        width: 300px;
        text-align: center;
        border: 1px solid #ccc;
        padding: 15px;
        border-radius: 3px;
        margin-top: 30px;
        display: flex;
        flex-wrap: wrap;
    }
    @media screen and (max-width: 680px) {
        .col .news-item {
            justify-content: center;
        }
        .col li .news-image {
            width: 90%;
            margin: 0px;
            padding-top: 15px;
        }
        .col .news-item .info  {
            width: 85%;
            margin: 0;
        }
    }
</style>