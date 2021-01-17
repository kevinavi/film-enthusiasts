import axios from 'axios';
import imdbService from '../../services/imdbService.js';

// Mock axios
jest.mock('axios');

// Mock api configuration and return dummy api keys
jest.mock('../../config/apiConfig', () => {
    const config = {
        headers: { "x-api-key": "Something" },
    };
    return {
        getConfig: jest.fn(() => config),
    };
});

// Run tests
describe('imdbService', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('listOfPopularFilms', () => {
        it('test get list popular films succeed', async () => {
            const mockResponse = { data: ["/title/tt7126948/", "/title/tt10539608/"] };
            axios.get.mockImplementationOnce(() => Promise.resolve(mockResponse));
            await imdbService.listOfPopularFilms();
            expect(axios.get).toHaveBeenCalledWith(
                "title/get-most-popular-movies", { "headers": { "x-api-key": "Something" }}
            );
        });

        it('test get list popular films results from api', async () => {
            const mockResponse = { data: ["/title/tt7126948/", "/title/tt10539608/"] };
            axios.get.mockImplementationOnce(() => Promise.resolve(mockResponse));
            const response = await imdbService.listOfPopularFilms();
            expect(response).toEqual(mockResponse.data);
        });

        it('test get api exception', async () => {
            const error = new Error();
            axios.get.mockImplementationOnce(() => Promise.reject(error));
            const response = await imdbService.listOfPopularFilms();
            expect(response).toEqual(error);
        });
    });

    describe('getMetaDataById', () => {
        it('test get meta data succeed', async () => {
            const mockResponse = {
                data: { 
                    "tt4154756": {
                        "title": {
                            "title": "Avengers: Infinity War",
                            "year": 2018
                        }
                    },
                    "tt10539608": {
                        "title": {
                            "title": "The Midnight Sky",
                            "year": 2020
                        }
                    }
                }
            };
            axios.get.mockImplementationOnce(() => Promise.resolve(mockResponse));
            await imdbService.getMetaDataById("tt4154756&ids=tt10539608");
            expect(axios.get).toHaveBeenCalledWith(
                "title/get-meta-data", { "headers": { "x-api-key": "Something" }, "params": { "ids": "tt4154756&ids=tt10539608" } }
            );
        });

        it('test get meta data by id results from api', async () => {
            const mockResponse = {
                data: { 
                    "tt4154756": {
                        "title": {
                            "title": "Avengers: Infinity War",
                            "year": 2018
                        }
                    },
                    "tt10539608": {
                        "title": {
                            "title": "The Midnight Sky",
                            "year": 2020
                        }
                    }
                }
            };
            axios.get.mockImplementationOnce(() => Promise.resolve(mockResponse));
            const response = await imdbService.getMetaDataById("tt4154756&ids=tt10539608");
            expect(response).toEqual(mockResponse.data);
        });

        it('test get meta data by id exception', async () => {
            const error = new Error();
            axios.get.mockImplementationOnce(() => Promise.reject(error));
            const response = await imdbService.getMetaDataById("tt4154756");
            expect(response).toEqual(error);
        });
    });
});
