const getSpy = jest.fn();
const mockMoviesController = jest.fn();

jest.mock('../../controllers/moviesController.js', () => mockMoviesController);

jest.doMock('express', () => {
  return {
    Router() {
      return {
        get: getSpy,
      }
    }
  }
});

describe('should test router', () => {
  beforeEach(() => {
    jest.resetModules();
  });

  it('should test get popular movies route', () => {
    require('../../routes/movies.js');
    expect(getSpy).toHaveBeenCalledWith('/movies', mockMoviesController);
  });
});