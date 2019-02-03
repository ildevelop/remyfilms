import React, {Fragment} from "react";
import Loader from '../Loader/Loader';
import './SearchPage.css'
const searchPage = props => {
  const {value, films, onInputChange, loaded, total} = props;
  return (
    <Fragment>
      <div className="container">
        <div className="search-box">
          <div>Top {films.length} yours films, total: {total}</div>
          <div className="search-item">
            <input
              type="text"
              placeholder="search film ..."
              onChange={({target}) => onInputChange(target.value)}
            />
          </div>
        </div>
        <div className="filmList">
          {loaded ? films.map((film, index) =>
            <div key={index} className="filmItem">
              {film.Poster === 'N/A' ? null : <img className="filmImg" src={film.Poster} alt="film-pic"/>}
              <p>{film.Title + "/" + film.Year}</p>
            </div>
          ) : <Loader/>
          }
        </div>
      </div>
    </Fragment>
  );
};

export default searchPage;