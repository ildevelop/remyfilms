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
  totalResults:0
};

const mainReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SEARCH_FILM:
      return {...state, searchedValue: action.value};
    case actionTypes.FETCH_NEW_FILM_ERROR:
      return {...state, errorNewFilm: !state.errorNewFilm,totalResults:0};
    case actionTypes.FETCH_NEW_FILM_SUCCESS:
      console.log(action.payload);
      return {...state,films:action.payload.Search,loaded: true,totalResults:action.payload.totalResults};
    default:
      return state;
  }
};

const store = createStore(mainReducer, composeWithDevTools(applyMiddleware(thunk)));
export default store