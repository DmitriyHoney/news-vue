<template>
  <div id="app">
    <h1>News application</h1>
    <hr>
    <paginate

            :page-count="Math.ceil(getAllNews / newsOnPage)"
            :page-range="3"
            :margin-pages="2"
            :click-handler="clickCallback"
            :prev-text="'Prev'"
            :next-text="'Next'"
            :container-class="'pagination'"
            :page-class="'page-item'">
    </paginate>
    <FilterNews
      v-bind:isColumn="isColumn"
      v-on:toggleIsColumn="toggleIsColumn"
      v-on:changeNewsOnPage="changeNewsOnPage"
      v-bind:newsOnPage="newsOnPage"
      v-on:sortNews="sortNews"
    />
    <NewsList

      v-bind:news="news"
      v-bind:isColumn="isColumn"
    />
  </div>
</template>

<script>
  import Paginate from 'vuejs-paginate';
  import NewsList from '@/components/NewsList';
  import FilterNews from '@/components/FilterNews';
  import {newsApi} from "../api/api";
  export default {
    name: 'App',
    data() {
      return {
        news: [],
        titleNews: [],
        isColumn: true,
        newsOnPage: 3, //кол-во новостей показанных за раз
        currentPage: 1,
        getAllNews: 0,
      }
    },
    initialStateForLocalStorage: {
      isColumn: true,
      newsOnPage: 3, //кол-во новостей показанных зsа раз
    },
    watch: {
      newsOnPage(val) {
        this.newsOnPage = val;
        this.getNewsFromApi(this.newsOnPage);
        this.clickCallback(this.currentPage);

        let newStorageSettings = {
          ...this.getInitialStateForLocalStorage(),
          newsOnPage: this.newsOnPage
        };

        this.updateSettingsFromLocalStorage(newStorageSettings);
      },
      currentPage(val) {
        this.currentPage = val;
        this.getNewsFromApi();
      },
      isColumn(val) {
        this.isColumn = val;
        let newStorageSettings = {
          ...this.getInitialStateForLocalStorage(),
          isColumn: this.isColumn
        };

        this.updateSettingsFromLocalStorage(newStorageSettings);
      }
    },
    async mounted() {
      let response = await this.getNewsFromApi(this.newsOnPage); //Получаем новости

      let initialStateForLocalStorage = this.getInitialStateForLocalStorage();
      this.getSettingsFromLocalStorage(initialStateForLocalStorage);
      this.scroll(); //скролл event

    },
    methods: {
      async getSettingsFromLocalStorage(defaultSettings) {
        let response = await newsApi.getStorageSettings(defaultSettings)
        this.newsOnPage = response.newsOnPage;
        this.isColumn = response.isColumn;
      },
      updateSettingsFromLocalStorage(newSettings) {
       newsApi.updateStorageSettings(newSettings);
      },

      getInitialStateForLocalStorage() {
        return {
          isColumn: true,
          newsOnPage: 3, //кол-во новостей показанных за раз
          currentPage: 1,
          getAllNews: 0,
        }
      },
      scroll () {
        window.onscroll = () => {
          let bottomOfWindow = document.documentElement.scrollTop + window.innerHeight === document.documentElement.offsetHeight;
            if (bottomOfWindow) {
              if (+this.newsOnPage + 3 < this.getAllNews) this.newsOnPage = Number(this.newsOnPage) + 3;
              else {
                let remains = this.getAllNews - this.newsOnPage;
                this.newsOnPage = Number(this.newsOnPage) + remains;
              }
            }
            return false;
        }
      },
      toggleIsColumn() {
         this.isColumn = !this.isColumn;
      },
      changeNewsOnPage(num) {
        this.newsOnPage = num;
      },
      sortNews(optionValue) {
        let copyNewsArray = [...this.news];
        switch(optionValue) {
           case 'name': {
             this.sortByName(copyNewsArray)
             break;
           }
           case 'date': {
             this.sortByDate(copyNewsArray);
             break;
           }
        }
      },
      sortByName(arr) {
        arr.sort(function(a, b){
          let nameA = a.Title.toLowerCase(), nameB=b.Title.toLowerCase();
          if (nameA < nameB) //sort string ascending
            return -1;
          if (nameA > nameB)
            return 1;
          return 0; //default return value (no sorting)
        });
        this.news = arr;
      },
      sortByDate(arr) {
        arr.sort(function(a, b){
          let dateA=new Date(a.PublicationDate), dateB=new Date(b.PublicationDate)
          return dateA-dateB;
        });
        this.news = arr;
      },
      getNewsFromApi(num = this.newsOnPage, currentPage = this.currentPage) {
        newsApi.getAllNews(num, currentPage).then(response => {
          this.getAllNews = response.commonLengthNews;
          this.news = response.data;
        });
      },
      clickCallback(num) {
        this.currentPage = num;
      },
    },
    components: {
      NewsList,
      FilterNews,
      Paginate
    }
  }
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}


.pagination {
  display: flex;
  width: 100%;
  text-align: center;
  justify-content: center;
}

.pagination li{
  padding: 7px;
  border: 1px solid #ccc;
  border-radius: 3px;
  margin: 3px;
}

.disabled {
   display: none;
}

.active {
  background-color: #839ecc;
}

  ul, li {
    padding: 0;
    margin: 0;
    display: block;
  }
</style>
