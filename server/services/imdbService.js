import axios from 'axios';
import { getConfig } from '../config/apiConfig.js';

const imdbService = {
    // Get list of popular films from RapidApi IMDB
    async listOfPopularFilms() {
        const config = getConfig();

        return await axios.get(`title/get-most-popular-movies`, config)
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            return error;
        });
    },

    // Get MetaData by titleId or multiple titleId from RapidApi IMDB
    // get-meta-data
    async getMetaDataById(titleId) {
        const config = getConfig();
        const params = {
            ids: titleId
        }

        config.params = params;

        return await axios.get(`title/get-meta-data`, config)
            .then((response) => {
                return response.data;
            }
        )
        .catch((error) => {
            return error;
        });
    },

    async getOverViewDetails(titleId) {
        const config = getConfig();
        const params = {
            tconst: titleId
        }

        config.params = params;
        return await axios.get(`title/get-overview-details`, config)
            .then((response) => {
                return response.data;
            }
        )
        .catch((error) => {
            return error;
        });
    }
  };

  
  
export default imdbService;