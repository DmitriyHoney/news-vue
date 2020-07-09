<template>
    <img :src="creatorImage" @error="imageError = true"/>
</template>

<script>
    export default {
        data() {
            return {
                imageError: false,
                defaultImage: require("https://avatars.mds.yandex.net/get-pdb/2380153/85d417c7-8d83-4ca3-8abb-89032bc054a4/s1200")
            };
        },
        computed: {
            creatorImage() {
                return this.imageError ? this.defaultImage : "creator-image.jpg";
            }
        }
    }

</script>