import React from "react";
import ReactDOM from "react-dom";
import "./index.css";

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

class FilterableFilmTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filterText: "",
    };

    this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
  }

  handleFilterTextChange(FT) {
    this.setState({
      filterText: FT,
    });
  }

  render() {
    return (
      <div id="welcome">
        <Title />
        <SearchBar
          filterText={this.state.filterText}
          onFilterTextChange={this.handleFilterTextChange}
        />
        <br></br>
        <FilmTable
          films={this.props.films}
          filterText={this.state.filterText}
        />
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

class FilmRow extends React.Component {
  render() {
    const film = this.props.film;

    return (
      <k>
        <button id="select-film">
          <dt>
            <br />
            <h3>{film.title}</h3>
          </dt>
          <dd>{film.release_year}</dd>
          <br />
        </button>
      </k>
    );
  }
}

class FilmTable extends React.Component {
  render() {
    const filterText = this.props.filterText.toLowerCase();

    const rows = [];

    this.props.films.forEach((film) => {
      if (film.title.toLowerCase().indexOf(filterText) === -1) {
        return;
      }

      rows.push(<FilmRow film={film} key={film.title} />);
    });
    return (
      <dl>{rows}</dl>
      //   <table>
      //     <tbody>{rows}</tbody>
      //   </table>
    );
  }
}

// class FilmInfo extends React.Component {
//   filmButton = "select-film";
//   render() {
//     return (filmButton = addEventListener("click", (evt) => {
//       <div id="welcome">
//         <FilmTitle />
//         {/* <SearchBar
//             filterText={this.state.filterText}
//             onFilterTextChange={this.handleFilterTextChange}
//           />
//           <br></br>
//           <FilmTable
//             films={this.props.films}
//             filterText={this.state.filterText}
//           /> */}
//       </div>;
//     }));
//   }
// }

class FilmTitle extends React.Component {
  render() {
    return (
      <div>
        <h1>Film Title</h1>
        <h3>film description</h3>
      </div>
    );
  }
}

const FILMS = [
  {
    release_year: "2006",
    title: "ACADEMY DINOSAUR",
  },
  {
    release_year: "2006",
    title: "ACE GOLDFINGER",
  },
  {
    release_year: "2006",
    title: "ADAPTATION HOLES",
  },
  {
    release_year: "2006",
    title: "AFFAIR PREJUDICE",
  },
  {
    release_year: "2006",
    title: "AFRICAN EGG",
  },
  { release_year: "2006", title: "AGENT TRUMAN" },
];

ReactDOM.render(
  <FilterableFilmTable films={FILMS} />,
  document.getElementById("root")
);
