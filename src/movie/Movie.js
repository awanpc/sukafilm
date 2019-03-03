// Movie.js

import React from "react";
import LoadingMovie from "./LoadingMovie";
import "./Movie.css";
import { Link } from "react-router-dom";

class Movie extends React.Component {
  state = {
    isLoading: true,
    movie: {}
  }

  componentDidMount() {
    const { movieId } = this.props.match.params;
    const movieUrl = `https://api.themoviedb.org/3/movie/${movieId}?api_key=8713a662b1e28abeaa3f31824bdb9f16&language=en-US`;
    fetch(movieUrl)
      .then(response => response.json())
      .then(data => {
        this.setState({ movie: data, isLoading: false })
      })
      .catch(error => console.log("Error:", error));
  }

  render() {
    const { isLoading } = this.state;
    const {
      title,
      backdrop_path,
      release_date,
      genres,
      overview,
      vote_average,
      runtime,
      poster_path,
      id,
      vote_count
    } = this.state.movie;

    const year = release_date ? release_date.substring(0, 4) : null;
    const imgUrl = `https://image.tmdb.org/t/p/w342/${poster_path}`;
    const backgroundStyle = {
      backgroundImage: `url(http://image.tmdb.org/t/p/w1280/${backdrop_path})`
    }

    return (
     <div className="movie-page"> 
      { 
        isLoading 
          ? <LoadingMovie />
          : <div>
              <div className="movie-image" style={backgroundStyle}>
              <div className="movie-bg">

              <div className="movie-details">
              <div class="row">
  <div class="col-md-6"><div className="i-thumbnail">
              <img className="poster" src={imgUrl} alt={title} />
              </div></div>
  <div class="col-md-6"><div className="movie-text">
                <h1>
                <Link to={`/movie/${id}`}>{title}
                  <span>({year})</span>
                  </Link>
                </h1>
                <div className="movie-more-details">
                <h5>
                <section className="genres">
                Genre:
                  {genres.map((genre, index) => (
                    <div key={genre.id}> 
                      <span>{genre.name}</span>
                      {index < genres.length - 1 && (
                        <span className="separator">|</span>
                      )}
                    </div>
                  ))}
                </section>
                </h5>
                <h5>
                  Rating:
                  <span>{vote_average} / 10</span>
                </h5>
                <h5>
                  Total Vote:
                  <span>{vote_count}</span>
                </h5>
                <h5>
                  Runtime:
                  <span>{`${runtime} min`}</span>
                </h5>
                </div>
                <h4>Overview</h4>
                <p>{overview}</p>
                </div>
              </div></div>
</div>
              
              
            </div>
            </div>
            </div>
              
      }
     </div> 
    )
  }
}

export default Movie;