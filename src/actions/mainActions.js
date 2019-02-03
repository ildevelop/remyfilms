import * as mainConstanst from '../reducers/constant'
import axios from "axios";
import {URL} from './secret'

export const getfilmsAPI = (name,page) => async dispatch => {
  let url = URL + 's=' + name+'&page='+page;
  const newfilm = await axios.get(url);
  if (newfilm.data.Response === "True") {
    dispatch({
      type: mainConstanst.FETCH_NEW_FILM_SUCCESS,
      payload: newfilm.data
    });
  } else {
    return dispatch({
      type: mainConstanst.FETCH_NEW_FILM_ERROR,
    });
  }
};

export const searchfilms = value => {
  return {
    type: mainConstanst.SEARCH_FILM,
    value
  };
};

