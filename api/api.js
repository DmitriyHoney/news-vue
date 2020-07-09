import * as axios from 'axios';
import store from 'store-js';

const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://dev-kvant-14856-ng.ecosystem-kvant.com/api'
});

export const newsApi = {
    getStorageSettings(defaultSettings) {
        let currentSettings = store.get("newsLocalStorageSettings");
        if (currentSettings) return currentSettings;
        else store.set("newsLocalStorageSettings", defaultSettings);
        return defaultSettings;
    },
    updateStorageSettings(newSettings) {
        store.set("newsLocalStorageSettings", newSettings);
    },
    async getAllNews(howDisplayNews, currentPage) {
        let response = await instance.post(`/H:1D6419D74772A07/P:WORK/B:1D56942E082C9E7/C:1D56DF2707EFEF7/I:PACK?format=json`);

        let commonLengthNews = response.data.$PACK[0].$OBJECT.length; //Всего пользователей
        console.log(response.data.$PACK[0].$OBJECT)
        let quantityPage = Math.ceil(commonLengthNews / howDisplayNews); //Всего страниц
        let resultData = getUserArray(response, commonLengthNews, quantityPage); //Возвращаю конкретную страницу
        function getUserArray(response, commonLengthNews, quantityPage) {
            let resultData = [];
            let j = 0;
            for (let i = 0; i <= quantityPage; i++) { //массив страниц

                let pageArr = [];
                for(let k = 0; k < howDisplayNews; k++) {
                    pageArr.push(response.data.$PACK[0].$OBJECT[j]);
                    j += 1;
                }
                resultData.push(pageArr);
            }
            return resultData[currentPage - 1];
        };

        return {data: resultData, commonLengthNews}; //возвращаю массив с конкретной страницей + общая длина всех новостей
    }
}