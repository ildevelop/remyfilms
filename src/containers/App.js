import React, {Component} from 'react';
import {Link, Route, Switch} from 'react-router-dom';
import {withRouter} from 'react-router';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as selector from './../selector'
import * as mainActions from '../actions/mainActions';
import Header from "../components/Header/Header";
import SearchPage from "../components/SearchPage/SearchPage";
import MovieItem from "../components/MovieItem/MovieItem";
import createHistory from 'history/createBrowserHistory'
const history = createHistory();

class App extends Component {
  state = {
    next5: false
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
        this.props.getfilmsAPI(this.props.searchValue, this.props.currentPage);
      }
    }, 4000);
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  handleNext5Films = () => {
    if (this.state.next5) {
      this.props.getfilmsAPI(this.props.searchValue, this.props.currentPage + 1);
      this.setState({next5: false})
    } else {
      this.setState({next5: !this.state.next5})
    }
  };
  handlePrev5Films = () => {
    if (this.state.next5) {
      this.setState({next5: !this.state.next5})
    } else {
      if (this.props.currentPage > 1) {
        this.props.getfilmsAPI(this.props.searchValue, this.props.currentPage - 1);
        this.setState({next5: true})
      }
    }
  };
  handleAddNewFilm = () => {
    this.props.getfilmsAPI(this.props.searchValue);
  };

  render() {
    const {loaded, searchValue, searchedfilms, totalResults, currentPage} = this.props;
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
                  next={this.state.next5}
                  total={totalResults}
                  currentPage={currentPage}
                  handleNext5={this.handleNext5Films}
                  handlePrev5={this.handlePrev5Films}
                  onInputChange={this.handleSearchFilm}
                  onAddNewFilm={this.handleAddNewFilm}
                />
              );
            }}
          />
          <Route
            path="/::id"
            component={MovieItem}
          />
          <Route
            history={history}
            path="/?q=::id"
            component={() =>
                <SearchPage
                  loaded={loaded}
                  films={searchedfilms}
                  value={searchValue}
                  next={this.state.next5}
                  total={totalResults}
                  currentPage={currentPage}
                  handleNext5={this.handleNext5Films}
                  handlePrev5={this.handlePrev5Films}
                  onInputChange={this.handleSearchFilm}
                  onAddNewFilm={this.handleAddNewFilm}
                />
            }
          />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  loaded: selector.getLoadingStatus(state),
  films: selector.getfilms(state),
  searchValue: selector.getSearchValue(state),
  totalResults: selector.getTotalResult(state),
  searchedfilms: selector.getSearchedfilms(state),
  currentPage: selector.getCurrentPage(state)
});

function mapDispatchToProps(dispatch) {
  return {...bindActionCreators(mainActions, dispatch)}
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));