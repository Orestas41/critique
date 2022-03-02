import React, { useRef, useState } from "react";
import ReactDOM, { render } from "react-dom";
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
        <FilmTable filterText={this.state.filterText} />
      </div>
    );
  }
}

class Title extends React.Component {
  render() {
    return (
      <div id="title">
        <h1>Critique</h1>
        <h3>To Maximize Your Movie-Going-Experience</h3>
      </div>
    );
  }
}

class SearchBar extends React.Component {
  render() {
    const filterText = this.props.filterText;
    return (
      <form id="search">
        <input
          type="text"
          id="search-box"
          placeholder="Search..."
          value={filterText}
          onChange={(e) => this.props.onFilterTextChange(e.target.value)}
        />
      </form>
    );
  }
}

function AmendReview() {
  const baseURL = "http://3.88.31.41:8080/HomePage";
  const review_id = useRef(null);
  const update_review = useRef(null);
  const [updateResult, setUpdateResult] = useState(null);
  const formatDelResponse = (del) => {
    return JSON.stringify(del, null, 2);
  };
  const [deleteResult, setDeleteResult] = useState(null);
  const formatResResponse = (res) => {
    return JSON.stringify(res, null, 2);
  };
  //////////////////////////////////////////////////////////////
  async function deleteReviewId() {
    const id = review_id.current.value;
    if (id) {
      try {
        const del = await fetch(`${baseURL}/RemoveReviews/${id}`, {
          method: "delete",
        });
        const data = await del.json();
        const result = {
          status: del.status + "-" + del.statusText,
          headers: { "Content-Type": del.headers.get("Content-Type") },
          data: data,
        };
        setDeleteResult(formatDelResponse(result));
      } catch (err) {
        setDeleteResult(err.message);
      }
    }
    window.location.reload(false);
  }
  const clearDeleteOutput = () => {
    setDeleteResult(null);
  };
  ////////////////////////////////////////////////////////
  async function updateReviewId() {
    const id = review_id.current.value;
    const rev = update_review.current.value;
    if (id) {
      try {
        const res = await fetch(
          `${baseURL}/UpdateReviews/${id}?customer_review=${rev}`,
          {
            method: "put",
            headers: {
              "Content-Type": "application/json",
              "x-access-token": "token-value",
            },
          }
        );
        const data = await res.json();
        const result = {
          status: res.status + "-" + res.statusText,
          headers: { "Content-Type": res.headers.get("Content-Type") },
          data: data,
        };
        setUpdateResult(formatResResponse(result));
      } catch (err) {
        setUpdateResult(err.message);
      }
    }
    window.location.reload(false);
  }
  const clearUpdateOutput = () => {
    setUpdateResult(null);
  };
  ///////////////////////////////////////////////////////////
  return (
    <div>
      <form>
        <input
          type="number"
          id="text-box"
          placeholder="Review id"
          ref={review_id}
        />
        <textarea
          type="text"
          placeholder="Amend the review here..."
          ref={update_review}
          id="text-box"
        />
      </form>
      <button onClick={updateReviewId} id="button">
        Save
      </button>
      <button onClick={deleteReviewId} id="button">
        Delete
      </button>
    </div>
  );
}

class FilmRow extends React.Component {
  render() {
    const filmdata = this.props.movies;

    function AddReview(props) {
      const baseURL = "http://3.88.31.41:8080/HomePage";
      const film_film_id = useRef(null);
      const post_review = useRef(null);
      const [postResult, setPostResult] = useState(null);
      const formatResponse = (res) => {
        return JSON.stringify(res, null, 2);
      };

      async function postData() {
        const rev = post_review.current.value;

        try {
          const res = await fetch(
            `${baseURL}/AddReviews?film_film_id=${filmdata.film_id}&customer_review=${rev}`,
            {
              method: "post",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(postData),
            }
          );
          if (!res.ok) {
            const message = `An error has occured: %{res.status} - ${res.statusText}`;
            throw new Error(message);
          }
          const data = await res.json();
          const result = {
            status: res.status + "-" + res.statusText,
            headers: {
              "Content-Type": res.headers.get("Content-Type"),
              "Content-Length": res.headers.get("Content-Length"),
            },
            data: data,
          };
          setPostResult(formatResponse(result));
        } catch (err) {
          setPostResult(err.message);
        }
        window.location.reload(false);
      }
      const clearPostOutput = () => {
        setPostResult(null);
      };
      return (
        <div>
          <form>
            <textarea
              type="text"
              placeholder="Add your review here..."
              ref={post_review}
              id="text-box"
            />
          </form>
          <button onClick={postData} id="button">
            Save
          </button>
        </div>
      );
    }

    return (
      <ul id="k">
        {/* <button className="select-film" onClick={changeStatus}> */}
        <div className="select-film">
          <dt>
            <h1 id="centre">{filmdata.title}</h1>
          </dt>
          <dt id="centre">{filmdata.release_year}</dt>
          <br />
          <dt id="centre">{filmdata.description}</dt>
          <br />
          <b id="heading">ACTORS:</b>
          {filmdata.actor.map((filmActors) => (
            <li id="actor-list">
              {filmActors.first_name} {filmActors.last_name}
            </li>
          ))}
          <br />
          <b id="heading">REVIEWS:</b>
          {filmdata.reviews.map((filmReviews) => (
            <div>
              <b>{filmReviews.review_id}</b> - {filmReviews.customer_review}
            </div>
          ))}
          <br />
          <b>Leave your review</b>
          <AddReview />
          <br />
          <b>Amend or delete review</b>
          <AmendReview />
        </div>
        {/* </button> */}
      </ul>
    );
  }
}

class FilmTable extends React.Component {
  constructor() {
    super();
    this.state = {
      top: [],
    };
  }

  componentDidMount() {
    fetch("http://3.88.31.41:8080/HomePage/AllFilms")
      .then((response) => response.json())
      .then((response) => this.setState({ top: response }));
  }

  render() {
    const filterText = this.props.filterText.toLowerCase();

    const rows = [];

    this.state.top.forEach((movies) => {
      if (movies.title.toLowerCase().indexOf(filterText) === -1) {
        return;
      }
      rows.push(<FilmRow movies={movies} key={movies.film_id} />);
    });
    return <dl id="films">{rows}</dl>;
  }
}

ReactDOM.render(<FilterableFilmTable />, document.getElementById("root"));
