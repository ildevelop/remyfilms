import React, {Component} from 'react';
import {Route, Switch} from 'react-router-dom';
import {withRouter} from 'react-router';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as selector from './../selector'
import * as mainActions from '../actions/mainActions';
import Header from "../components/Header/Header";
import SearchPage from "../components/SearchPage/SearchPage";


class App extends Component {
  state={
    page:1,
    currentPage:1
  };
  handleSearchFilm = value => {
    this.props.searchfilms(value);
  };

  componentDidMount() {
    let myFilm = '';
    this.timerID = setInterval(() => {
      if (this.props.searchValue.length > 2 && myFilm !== this.props.searchValue) {
        myFilm = this.props.searchValue;
        console.log('INSIDE2');
        this.props.getfilmsAPI(this.props.searchValue,this.state.page);
      }
    }, 5000);
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  handleAddNewFilm = () => {
    this.props.getfilmsAPI(this.props.searchValue);
  };

  render() {
    const {loaded, searchValue, searchedfilms,totalResults} = this.props;
    return (
      <div>
        {/*<Header/>*/}
        <Switch>
          <Route
            exact path="/"
            render={() => {
              return (
                <SearchPage
                  loaded={loaded}
                  films={searchedfilms}
                  value={searchValue}
                  total={totalResults}
                  onInputChange={this.handleSearchFilm}
                  onAddNewFilm={this.handleAddNewFilm}
                />
              );
            }}
          />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  loaded: selector.getLoadingStatus(state),
  film: selector.getFilm(state),
  films: selector.getfilms(state),
  searchValue: selector.getSearchValue(state),
  totalResults:selector.getTotalResult(state),
  searchedfilms: selector.getSearchedfilms(state),
});

function mapDispatchToProps(dispatch) {
  return {...bindActionCreators(mainActions, dispatch)}
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));