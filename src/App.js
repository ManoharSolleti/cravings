import React from "react";
import "./App.css";
import BusinessList from "./components/BusinessList/BusinessList";
import SearchBar from "./components/SearchBar/SearchBar";
import Yelp from "./util/Yelp";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      businesses: [],
      unKnown: ""
    };
    this.searchYelp = this.searchYelp.bind(this);
  }

  searchYelp(term, location, sortBy) {
    Yelp.search(term, location, sortBy).then(businesses => {
      if (businesses) {
        this.setState({ businesses: businesses });
      } else {
        this.setState({ unKnown: "This app does not work outside of USA." });
      }
    });
  }

  render() {
    return (
      <div className="App">
        <h1>Cravings</h1>
        <SearchBar searchYelp={this.searchYelp} />
        {this.state.businesses.length > 0 ? (
          <BusinessList businesses={this.state.businesses} />
        ) : (
          <h1>{this.state.unKnown}</h1>
        )}
      </div>
    );
  }
}

export default App;
