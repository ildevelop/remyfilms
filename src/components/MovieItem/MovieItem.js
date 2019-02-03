import React, {Component} from 'react';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import * as mainActions from "../../actions/mainActions";
import * as selector from "../../selector";
import {withRouter} from "react-router";
import './MovieItem.css'
import {NavLink} from "react-router-dom";

class MovieItem extends Component {

  componentDidMount() {
    if (this.props.match)
      this.props.getFilm(this.props.match.url)
  }

  render() {
    let {film} = this.props;
    console.log('filmMovieItem', film);
    return (
      <div className="movieContainer">
          <div className="example-2 card">
            <div className="wrapper" style={{background: `url(${film.Poster}) center no-repeat`}}>
              <div className="header">
                <div className="date">
                  <NavLink
                    exact to="/">
                    <div className="backBtn">
                      Back to home
                    </div>
                  </NavLink>
                  <span >Box office: {film.BoxOffice}</span>
                  <span >{film.DVD}</span>
                  <span >star:{film.imdbRating}</span>
                </div>

              </div>
              <div className="data">
                <div className="content">
                  <h1 className="title">{film.Type}: {film.Title}</h1>
                  <p >{film.Actors}</p>
                  <p >{film.Plot}</p>
                  <a href={film.Website} target="_blank" className="button">Read more</a>
                </div>
              </div>
            </div>
        </div>
      </div>
      )
  }
}

const mapStateToProps = state => ({
  film: selector.getFilm(state),
});

function mapDispatchToProps(dispatch) {
  return {...bindActionCreators(mainActions, dispatch)}
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MovieItem));
