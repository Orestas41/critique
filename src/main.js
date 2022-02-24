import React from "react";
import ReactDOM from "react-dom";
import "./index.css";

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

class Title extends React.Component {
  render() {
    return (
      <div>
        <h1>Critique</h1>
        <h3>Website description</h3>
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
        <dt>
          <br />
          <h3>{film.name}</h3>
        </dt>
        <dd>{film.price}</dd>
        <br />
      </k>
    );
  }
}

class FilmTable extends React.Component {
  render() {
    const filterText = this.props.filterText.toLowerCase();

    const rows = [];

    this.props.films.forEach((film) => {
      if (film.name.toLowerCase().indexOf(filterText) === -1) {
        return;
      }

      rows.push(<FilmRow film={film} key={film.name} />);
    });
    return (
      <dl>{rows}</dl>
      //   <table>
      //     <tbody>{rows}</tbody>
      //   </table>
    );
  }
}

const FILMS = [
  {
    price: "2006",
    name: "ACADEMY DINOSAUR",
  },
  {
    price: "2006",
    name: "ACE GOLDFINGER",
  },
  {
    price: "2006",
    name: "ADAPTATION HOLES",
  },
  {
    price: "2006",
    name: "AFFAIR PREJUDICE",
  },
  {
    price: "2006",
    name: "AFRICAN EGG",
  },
  { price: "2006", name: "AGENT TRUMAN" },
];

ReactDOM.render(
  <FilterableFilmTable films={FILMS} />,
  document.getElementById("root")
);
