import {createStore, applyMiddleware} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import * as actionTypes from '../reducers/constant'

const initialState = {
  films: [],
  film: {},
  searchedValue: "",
  loaded: true,
  errorNewFilm: false,
  totalResults:0,
  currentPage:1
};

const mainReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SEARCH_FILM:
      return {...state, searchedValue: action.value};
    case actionTypes.FETCH_NEW_FILM_ERROR:
      return {...state, errorNewFilm: !state.errorNewFilm,totalResults:0};
    case actionTypes.FETCH_NEW_FILM_SUCCESS:
      console.log(action.payload);
      return {...state,films:action.payload.films.Search,loaded: true,totalResults:action.payload.films.totalResults,currentPage:action.payload.page};
    case actionTypes.GET_FILM:
      return {...state,film:action.payload};
    case actionTypes.GET_FILM_ERROR:
      return {...state};
    default:
      return state;
  }
};

const store = createStore(mainReducer, composeWithDevTools(applyMiddleware(thunk)));
export default store