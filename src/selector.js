import { createSelector } from 'reselect';

export const getfilms = state => state.films;
export const getFilm = state => state.film;
export const getSearchValue = state => state.searchedValue;
export const getLoadingStatus = state => state.loaded;
export const getTotalResult = state => state.totalResults;
export const getCurrentPage = state => state.currentPage;

export const getSearchedfilms= createSelector(getfilms, getSearchValue, (films, searchValue) => {
  return films.filter(film => film.Title.toLowerCase().includes(searchValue.toLowerCase()));
});

