import React, { useRef, useState } from "react";
import ReactDOM, { render } from "react-dom";
import "./index.css";

class FilterableFilmTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filterText: "",
      name: "React",
      showSearch: true,
      showFilmTable: true,
      showFilmInfo: false,
      showReviewBox: false,
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
      case "showSearch":
        this.setState({ showSearch: !this.state.showSearch });
        break;
      case "showFilmTable":
        this.setState({ showFilmTable: !this.state.showFilmTable });
        break;
      case "showFilmInfo":
        this.setState({ showFilmInfo: !this.state.showFilmInfo });
        break;
      case "showReviewBox":
        this.setState({ showReviewBox: !this.state.showReviewBox });
    }
  }

  handleFilterTextChange(FT) {
    this.setState({
      filterText: FT,
    });
  }

  render() {
    const { showSearch, showFilmTable, showFilmInfo, showReviewBox } =
      this.state;

    return (
      <div id="welcome">
        <Title />
        {showSearch && (
          <SearchBar
            filterText={this.state.filterText}
            onFilterTextChange={this.handleFilterTextChange}
          />
        )}
        <AddReview />
        <br />
        <DeleteReview />
        <br></br>
        <br />
        <UpdateReview />
        {showFilmInfo && (
          <FilmInfo actors={this.props.actors} reviews={this.props.reviews} />
        )}
        {showFilmTable && (
          <FilmTable
            filterText={this.state.filterText}
            actors={this.props.actors}
            reviews={this.props.reviews}
            onClick={() => this.showComponent()}
          />
        )}
        {showReviewBox && <Review />}
      </div>
    );
  }
}

function changeStatus(props) {
  return console.log("hi");
}

class Title extends React.Component {
  render() {
    return (
      <div id="title">
        <h1>Critique</h1>
        <h3>website description</h3>
      </div>
    );
  }
}

class SearchBar extends React.Component {
  constructor() {
    super();
    this.state = {
      name: "React",
    };
  }
  render() {
    const filterText = this.props.filterText;
    return (
      <form id="search">
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

function AddReview() {
  const baseURL = "http://localhost:8080/HomePage";
  const film_film_id = useRef(null);
  const post_review = useRef(null);
  const [postResult, setPostResult] = useState(null);
  const fortmatResponse = (res) => {
    return JSON.stringify(res, null, 2);
  };
  async function postData() {
    const id = film_film_id.current.value;
    const rev = post_review.current.value;
    const postData = {
      filmId: film_film_id.current.value,
      review: post_review.current.value,
    };
    try {
      const res = await fetch(
        `${baseURL}/AddReviews?film_film_id=${id}&customer_review=${rev}`,
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
          "Content-Type": res.headers.get("Constent-Type"),
          "Content-Length": res.headers.get("Content-Length"),
        },
        data: data,
      };
      setPostResult(fortmatResponse(result));
    } catch (err) {
      setPostResult(err.message);
    }
  }
  const clearPostOutput = () => {
    setPostResult(null);
  };
  return (
    <div>
      <form>
        <input type="number" placeholder="Add film id" ref={film_film_id} />
      </form>
      <form>
        <textarea
          type="text"
          placeholder="Add your review here..."
          ref={post_review}
        />
      </form>
      <button onClick={postData}>Save</button>
    </div>
  );
}

function DeleteReview() {
  const baseURL = "http://localhost:8080/HomePage";
  const delete_id = useRef(null);
  const [deleteResult, setDeleteResult] = useState(null);
  const fortmatResponse = (res) => {
    return JSON.stringify(res, null, 2);
  };

  async function deleteReviewId() {
    const id = delete_id.current.value;
    if (id) {
      try {
        const res = await fetch(`${baseURL}/RemoveReviews/${id}`, {
          method: "delete",
        });
        const data = await res.json();
        const result = {
          status: res.status + "-" + res.statusText,
          headers: { "Content-Type": res.headers.get("Content-Type") },
          data: data,
        };
        setDeleteResult(fortmatResponse(result));
      } catch (err) {
        setDeleteResult(err.message);
      }
    }
  }
  const clearDeleteOutput = () => {
    setDeleteResult(null);
  };
  return (
    <div>
      <form>
        <input type="number" placeholder="Review id" ref={delete_id} />
      </form>
      <button onClick={deleteReviewId}>Delete</button>
    </div>
  );
}

function UpdateReview() {
  const baseURL = "http://localhost:8080/HomePage";
  const review_id = useRef(null);
  const update_review = useRef(null);
  const [updateResult, setUpdateResult] = useState(null);
  const fortmatResponse = (res) => {
    return JSON.stringify(res, null, 2);
  };
  async function updateReviewId() {
    const id = review_id.current.value;
    const rev = update_review.current.value;
    if (id) {
      const updateData = {
        review: update_review.current.value,
      };
      try {
        const res = await fetch(
          `${baseURL}/UpdateReviews/${id}?customer_review=${rev}`,
          {
            method: "put",
            headers: {
              "Content-Type": "application/json",
              "x-access-token": "token-value",
            },
            body: JSON.stringify(updateData),
          }
        );
        if (!res.ok) {
          const message = `An error has occured: ${res.status} - ${res.statusText}`;
          throw new Error(message);
        }
        const data = await res.json();
        const result = {
          status: res.status + "-" + res.statusText,
          headers: { "Content-Type": res.headers.get("Content-Type") },
          data: data,
        };
        setUpdateResult(fortmatResponse(result));
      } catch (err) {
        setUpdateResult(err.message);
      }
    }
  }
  const clearUpdateOutput = () => {
    setUpdateResult(null);
  };
  return (
    <div>
      <form>
        <input type="number" placeholder="Review id" ref={review_id} />
      </form>
      <form>
        <textarea
          type="text"
          placeholder="Update your review here..."
          ref={update_review}
        />
      </form>
      <button onClick={updateReviewId}>Save</button>
    </div>
  );
}

class FilmRow extends React.Component {
  constructor() {
    super();
    this.state = {
      customer_review: "",
    };
  }

  // componentDidMount() {

  //   const requestOptions = {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify({ postReview }),
  //   };
  //   fetch("http://localhost:8080/HomePage/AddReviews", requestOptions)
  //   .then((response) => response.json())
  //   .then((data) => this.setState({ 'Success': customer_review }));
  // }

  render() {
    const filmdata = this.props.movies;
    const customer_review = this.AddReview;
    const postData = this.state.postData;
    // const changeStatus = this.props.FilterableFilmTable;
    // let showComponent = this.props.showComponent;

    return (
      <k>
        {/* <button className="select-film" onClick={changeStatus}> */}
        <div className="select-film">
          <dt>
            <br />
            <h3>{filmdata.title}</h3>
          </dt>
          <dt>{filmdata.release_year}</dt>
          <br />
          <dt>{filmdata.description}</dt>
          <br />
          {filmdata.reviews.map((filmReviews) => (
            <div>
              {filmReviews.review_id} - {filmReviews.customer_review}
            </div>
          ))}
          <br />
          {/* <form>
            <textarea
              type="text"
              placeholder="Add your review here..."
              ref={customer_review}
            />
          </form>
          <button onClick={postData}>Save</button> */}
          {/* <AddReview /> */}
        </div>
        {/* </button> */}
      </k>
    );
  }
}

class FilmTable extends React.Component {
  constructor() {
    super();
    this.state = {
      name: "React",
      top: [],
    };
  }

  componentDidMount() {
    fetch("http://localhost:8080/HomePage/AllFilms")
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
          <FilmTitle />
          <br />
          <FilmDescription />
          <br />
          <ActorsTable actors={this.props.actors} />
          <ReviewsTable reviews={this.props.reviews} />
          <br />
          <ReviewButton />
        </div>
      );
    }
  }
}

class FilmTitle extends React.Component {
  render() {
    const filmdata = this.props.movies;
    return (
      <div id="film-title">
        <h1>title</h1>
        <p>Release Year</p>
      </div>
    );
  }
}

class FilmDescription extends React.Component {
  render() {
    return (
      <div id="description">
        film description film description film description film description film
        description film description film description film description film
        description film description film description film description film
        description film description film description film description film
        description film description film description film description
      </div>
    );
  }
}

class ActorsTable extends React.Component {
  render() {
    const actorRows = [];

    this.props.actors.forEach((actor) => {
      actorRows.push(<ActorsRow actor={actor} key={actor.first_name} />);
    });
    return <dl id="actors">{actorRows}</dl>;
  }
}

class ActorsRow extends React.Component {
  render() {
    const actor = this.props.actor;

    return (
      <l>
        <dt>
          <h3>
            {actor.first_name} {actor.last_name}
          </h3>
        </dt>
      </l>
    );
  }
}

class ReviewsTable extends React.Component {
  render() {
    const reviewRows = [];

    this.props.reviews.forEach((review) => {
      reviewRows.push(<ReviewsRow review={review} key={review.review} />);
    });
    return (
      <ol id="reviews">
        <ld>{reviewRows}</ld>
      </ol>
    );
  }
}

class ReviewsRow extends React.Component {
  render() {
    const review = this.props.review;
    return (
      <li>
        <ld>{review.review}</ld>
      </li>
    );
  }
}

class ReviewButton extends React.Component {
  render() {
    return (
      <div>
        <button id="add-review">Leave a Review</button>
      </div>
    );
  }
}

class Review extends React.Component {
  constructor() {
    super();
    this.state = {
      name: "React",
    };
  }
  render() {
    return (
      <div id="review">
        <FilmTitle />
        <br />
        <FilmDescription />
        <br />
        <ReviewBox />
        <br />
        <SaveReview />
      </div>
    );
  }
}

class ReviewBox extends React.Component {
  render() {
    return (
      <form id="review-box">
        <textarea type="text" placeholder="Add your review here..." />
      </form>
    );
  }
}

class SaveReview extends React.Component {
  render() {
    return (
      <div>
        <button id="save-review">Save</button>
      </div>
    );
  }
}

const FILMS = [
  {
    release_year: "2006",
    title: "ACADEMY DINOSAUR",
    film_id: "1",
  },
  {
    release_year: "2006",
    title: "ACE GOLDFINGER",
    film_id: "2",
  },
  {
    release_year: "2006",
    title: "ADAPTATION HOLES",
    film_id: "3",
  },
  {
    release_year: "2006",
    title: "AFFAIR PREJUDICE",
    film_id: "4",
  },
  {
    release_year: "2006",
    title: "AFRICAN EGG",
    film_id: "5",
  },
  { release_year: "2006", title: "AGENT TRUMAN", film_id: "6" },
];

const ACTORS = [
  {
    first_name: "Orestas",
    last_name: "Dulinskas",
  },
  {
    first_name: "Adam",
    last_name: "Bryant",
  },
  {
    first_name: "M",
    last_name: "C",
  },
  {
    first_name: "Chelise",
    last_name: "Talbot",
  },
];

const REVIEWS = [
  {
    review:
      "Autism spectrum disorder (ASD) is a developmental disability caused by differences in the brain. Some people with ASD have a known difference, such as a genetic condition. Other causes are not yet known. Scientists believe there are multiple causes of ASD that act together to change the most common ways people develop. We still have much to learn about these causes and how they impact people with ASD.",
  },
  {
    review:
      "Autism spectrum disorder (ASD) is a developmental disability caused by differences in the brain. Some people with ASD have a known difference, such as a genetic condition. Other causes are not yet known. Scientists believe there are multiple causes of ASD that act together to change the most common ways people develop. We still have much to learn about these causes and how they impact people with ASD.",
  },
  {
    review:
      "Autism spectrum disorder (ASD) is a developmental disability caused by differences in the brain. Some people with ASD have a known difference, such as a genetic condition. Other causes are not yet known. Scientists believe there are multiple causes of ASD that act together to change the most common ways people develop. We still have much to learn about these causes and how they impact people with ASD.",
  },
];

ReactDOM.render(
  <FilterableFilmTable films={FILMS} actors={ACTORS} reviews={REVIEWS} />,
  document.getElementById("root")
);
