import React, {Component,Fragment} from "react";
import Loader from '../Loader/Loader';
import './SearchPage.css'
import {NavLink} from "react-router-dom";
import createHistory from 'history/createBrowserHistory'
const history = createHistory();

class searchPage extends Component{
  componentDidMount() {
    const location = history.location;
    if(location && location.search){
      this.props.onInputChange(location.search.slice(3))
    }
  }

  render(){
    let films5=null;
    let step = null;
    const {currentPage,value, films, onInputChange, loaded, total,handleNext5,next,handlePrev5} = this.props;
    let totalStep =(total/5).toFixed(0);
    if(next){
      step= currentPage*2;
      films5= films.slice(5);
    }else{
      step= currentPage*2-1;
      films5= films.slice(0,5);
    }
    console.log('value',value);
    return (
      <Fragment>
        <div className="container">
          <div className="search-box">
            <div>Top {films5.length} yours films, total: {total}</div>
            <div className="search-item">
              <input
                type="text"
                placeholder="search film ..."
                value={value}
                onChange={({target}) => onInputChange(target.value)}
              />
            </div>
          </div>

          <div className="filmList">
            {films.length ? films5.map((film, index) =>
              <NavLink  key={index}  to={`/:${film.imdbID}`}>
                <div className="filmItem">
                  {film.Poster === 'N/A' ? null : <img className="filmImg" style={{maxWidth: 300}} height="350px" src={film.Poster} alt="film-pic"/>}
                  <p>{film.Title + "/" + film.Year}</p>
                </div>
              </NavLink>
            ) : <div>
              <h2>waiting for update</h2>
              <Loader/>
            </div>
            }
          </div>
          <div className="paginationContainer">
            <nav className="pagination" role="navigation">
              <div onClick={()=>handlePrev5()} className="prev stepBtn" href="#">Prev</div>
              {step>1?<div onClick={()=>handlePrev5()}  className="stepBtn" >{step-1}</div>:null}
              <div className="stepBtn active" >{step}</div>
              {total>5?<div onClick={()=>handleNext5()} className="stepBtn" >{step+1}</div>:null}
              {total>20?<div className="stepBtn">...</div>:null}
              {total>5?<div className="stepBtn" >{totalStep}</div>:null}
              <div onClick={()=>handleNext5()} className="next stepBtn">Next</div>
            </nav>
          </div>
        </div>
      </Fragment>
    );
  }
};

export default searchPage;