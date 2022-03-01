import React from "react";
import ReactDOM from "react-dom";
import { useState } from "react";
import axios from "axios";
import "./index.css";

class FilterableFilmTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filterText: "",
      name: "React",
      showFilmTable: true,
      showFilmInfo: false,
    };

    this.showComponent = this.showComponent.bind(this);
    this.handleFilterTextChange = this.handleFilterTextChange.bind(this);

    // handleShowFilmTable(film) {
    //   this.setState({ categoryClicked: true });
    //   this.setState({ category: filmCategory });

    //   console.log(this.state.category);
  }

  showComponent(name) {
    console.log(name);
    switch (name) {
      case "showFilmTable":
        this.setState({ showFilmTable: !this.state.showFilmTable });
        break;
      case "showFilmInfo":
        this.setState({ showFilmInfo: !this.state.showFilmInfo });
    }
  }

  handleFilterTextChange(FT) {
    this.setState({
      filterText: FT,
    });
  }

  changeStatus() {
    return <FilmRow onClick={() => this.showComponent()} />;
  }

  render() {
    const { showFilmTable, showFilmInfo } = this.state;

    return (
      <div id="welcome">
        <Title />
        <SearchBar
          filterText={this.state.filterText}
          onFilterTextChange={this.handleFilterTextChange}
        />
        <br></br>
        {showFilmInfo && <FilmInfo />}
        {showFilmTable && (
          <FilmTable
            filmRepo={this.state.filmRepo}
            filterText={this.state.filterText}
            onClick={() => this.showComponent()}
          />
        )}
      </div>
    );
  }
}

class Title extends React.Component {
  render() {
    return (
      <div>
        <h1>Critique</h1>
        <h3>website description</h3>
      </div>
    );
  }
}

class SearchBar extends React.Component {
  render() {
    const filterText = this.props.filterText;
    return (
      <form>
        <input
          type="text"
          placeholder="Search..."
          value={filterText}
          onChange={(e) => this.props.onFilterTextChange(e.target.value)}
        />
      </form>
    );
  }
}

// function show() {
//   onClick={() => this.showComponent("showFilmTable")}
// };

class FilmRow extends React.Component {
  render() {
    const film = this.state.filmPackages;
    // let showComponent = this.props.showComponent;
    return (
      <k>
        <button className="select-film" onClick={() => this.props.onClick()}>
          <dt>
            <br />
            <h3>{film.title}</h3>
          </dt>
          <dd>{film.release_date}</dd>
          <br />
        </button>
      </k>
    );
  }
}

class FilmTable extends React.Component {
  constructor() {
    super();
    this.state = {
      name: "React",
      filmPackages: [],
    };
  }

  componentDidMount() {
    axios.get("http://localhost:8080/HomePage/AllFilms").then((res) =>
      this.setState({
        filmPackages: res.data,
      })
    );
  }

  render() {
    const filterText = this.props.filterText.toLowerCase();

    const rows = [];

    this.state.filmPackages.forEach((film) => {
      if (film.res.data.toLowerCase().indexOf(filterText) === -1) {
        return;
      }

      rows.push(
        <FilmRow
          film={film}
          key={film.title}
          onClick={(i) => this.props.onClick(film)} //////////////////////
        />
      );
    });
    return <dl>{rows}</dl>;
  }
}

class FilmInfo extends React.Component {
  constructor() {
    super();
    this.state = {
      name: "React",
    };
  }
  render() {
    const film = this.props.film;
    let show = this.state.show;

    if ((show = 1)) {
      return (
        <div id="film-info">
          <h1>test</h1>
        </div>
      );
    }
  }
}

// const FILMS = () => {
//   fetch("http://50.17.38.181:8080/HomePage/AllFilms")
//     .then((response) => response.json())
//     .then((jsonData) => console.log(jsonData));
// }

// const FILMS = [
//   {
//     release_year: "2006",
//     title: "ACADEMY DINOSAUR",
//     id: 1,
//   },
//   {
//     release_year: "2006",
//     title: "ACE GOLDFINGER",
//     id: 2,
//   },
//   {
//     release_year: "2006",
//     title: "ADAPTATION HOLES",
//     id: 3,
//   },
//   {
//     release_year: "2006",
//     title: "AFFAIR PREJUDICE",
//     id: 4,
//   },
//   {
//     release_year: "2006",
//     title: "AFRICAN EGG",
//     id: 5,
//   },
//   { release_year: "2006", title: "AGENT TRUMAN", id: 6 },
// ];

ReactDOM.render(
  <FilterableFilmTable />,
  // <WebsiteBody />,
  document.getElementById("root")
);
