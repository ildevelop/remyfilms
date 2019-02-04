import * as mainConstanst from '../reducers/constant'
import axios from "axios";
import {URL} from './secret'

export const getfilmsAPI = (name,page) => async dispatch => {
  let url = URL + 's=' + name+'&page='+page;
  const newfilm = await axios.get(url);
  if (newfilm.data.Response === "True") {
    dispatch({
      type: mainConstanst.FETCH_NEW_FILM_SUCCESS,
      payload: {films:newfilm.data,page}
    });
  } else {
    return dispatch({
      type: mainConstanst.FETCH_NEW_FILM_ERROR,
    });
  }
};
export const getFilm = (IMDbID) => async dispatch => {
  let url = URL + 'i=' + IMDbID.slice(1);
  const newfilm = await axios.get(url);
  if (newfilm.data.Response === "True") {
    dispatch({
      type: mainConstanst.GET_FILM,
      payload: newfilm.data
    });
  } else {
    return dispatch({
      type: mainConstanst.GET_FILM_ERROR,
    });
  }
};


export const searchfilms = value => {
  return {
    type: mainConstanst.SEARCH_FILM,
    value
  };
};

