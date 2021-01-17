import imdbService  from '../services/imdbService.js';

const data_of_10_random_popular_movies = async function(req, res) {
    try {
        var getPopularFilms = await imdbService.listOfPopularFilms();
        var getListOfRandom10PopularMovies = getRandom(getPopularFilms, 10);
        //var getPreparedIdsList = prepareIdsString(getListOfRandom10PopularMovies);
        getListOfRandom10PopularMovies = prepareIdsList(getListOfRandom10PopularMovies);
        var result = [];
        for (let index = 0; index < getListOfRandom10PopularMovies.length; index++) {
            const element = await imdbService.getOverViewDetails(getListOfRandom10PopularMovies[index]);
            result.push(element);
        }
        //var metaDataList = await imdbService.getMetaDataById(getPreparedIdsList);
        //var newArrayDataOfOjbect = Object.values(metaDataList)

        res.json(result);
    } catch (error) {
        return error;
    }
};

function getRandom(arr, size) {
    var result = new Array(size), len = arr.length, choosen = new Array(len);
    if (size > len) {
        throw new RangeError("given size for choosen random elements is more than given arrays length");
    }
    while (size--) {
        var x = Math.floor(Math.random() * len);
        result[size] = arr[x in choosen ? choosen[x] : x];
        choosen[x] = --len in choosen ? choosen[len] : len;
    }
    return result;
}

function prepareIdsList(arr) {
    return arr.map(element => element.replace('title', '').split('/').join(''));
}

function prepareIdsString(arr) {
    return prepareIdsList(arr).join("&ids=");
}

export default data_of_10_random_popular_movies;