import moviesController from '../../controllers/moviesController.js';
import imdbService from '../../services/imdbService.js';

// Mock axios
jest.mock('../../services/imdbService');

// Run tests
describe('should test controller', () => {
    afterEach(() => {
        jest.resetModules();
    });

    describe('getRandomTop10Movies', () => {
        it('test get Random Top 10 movies', async () => {
            const top10TitleIds = [
                "/title/tt7126948/", "/title/tt10539608/", "/title/tt2948372/", "/title/tt6723592/", "/title/tt0097958/",
                "/title/tt0314331/", "/title/tt0038650/", "/title/tt0099785/", "/title/tt0085334/", "/title/tt0319343/"];

            const metaDataResponse = {
                "tt7126948": {
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
                },
                "tt2948372": {
                    "title": {
                        "title": "Avengers: Infinity War",
                        "year": 2018
                    }
                },
                "tt6723592": {
                    "title": {
                        "title": "The Midnight Sky",
                        "year": 2020
                    }
                },
                "tt0097958": {
                    "title": {
                        "title": "Avengers: Infinity War",
                        "year": 2018
                    }
                },
                "tt0314331": {
                    "title": {
                        "title": "The Midnight Sky",
                        "year": 2020
                    }
                },
                "tt0038650": {
                    "title": {
                        "title": "Avengers: Infinity War",
                        "year": 2018
                    }
                },
                "tt0099785": {
                    "title": {
                        "title": "The Midnight Sky",
                        "year": 2020
                    }
                },
                "tt0085334": {
                    "title": {
                        "title": "Avengers: Infinity War",
                        "year": 2018
                    }
                },
                "tt0319343": {
                    "title": {
                        "title": "The Midnight Sky",
                        "year": 2020
                    }
                }
            };

            const mockResponse = () => {
                const res = metaDataResponse;
                res.json = jest.fn().mockReturnValue(res);
                return res;
            };
            
            imdbService.listOfPopularFilms.mockImplementationOnce(() => Promise.resolve(top10TitleIds));
            imdbService.getMetaDataById.mockImplementationOnce(() => Promise.resolve(metaDataResponse));
            const response = await moviesController(null, mockResponse());
            
            expect(response.json).toBeCalledWith(metaDataResponse);
        });

        it('test getListOfPopularMovies exception #1', async () => {
            const error = new Error();
            imdbService.listOfPopularFilms.mockImplementationOnce(() => Promise.reject(error));
            const response = await moviesController();
            expect(response).toEqual(error);
        });

        it('test getListOfPopularMovies exception #2', async () => {
            const top10TitleIds = [
                "/title/tt7126948/", "/title/tt10539608/", "/title/tt2948372/", "/title/tt6723592/", "/title/tt0097958/",
                "/title/tt0314331/", "/title/tt0038650/", "/title/tt0099785/", "/title/tt0085334/", "/title/tt0319343/"];
            const error = new Error();
            imdbService.listOfPopularFilms.mockImplementationOnce(() => Promise.resolve(top10TitleIds));
            imdbService.getMetaDataById.mockImplementation(() => Promise.reject(error));
            const response = await moviesController();
            expect(response).toEqual(error);
        });

        it('test getListOfPopularMovies exception #3 range error', async () => {
            const top10TitleIds = [
                "/title/tt7126948/", "/title/tt10539608/", "/title/tt2948372/", "/title/tt6723592/", "/title/tt0097958/",
                "/title/tt0314331/", "/title/tt0038650/", "/title/tt0099785/", "/title/tt0085334/"];
            const error = new RangeError("given size for choosen random elements is more than given arrays length");
            imdbService.listOfPopularFilms.mockImplementationOnce(() => Promise.resolve(top10TitleIds));
            const response = await moviesController();
            expect(response).toEqual(error);
        });
    });
});
