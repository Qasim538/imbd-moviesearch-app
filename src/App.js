import { useEffect, useState } from "react";
import "./App.css";
import SearchIcon from "./search.svg";
import MovieCard from "./MovieCard";

const API_URL = "https://www.omdbapi.com?apikey=5c806954";

function App() {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  // Function to search for movies by title
  const searchMovies = async (title) => {
    const response = await fetch(`${API_URL}&s=${title}`);
    const data = await response.json();

    // Check if the response contains movies
    setMovies(data.Search || []);
  };

  useEffect(() => {
    searchMovies();
  }, []);

  // Handle the search button click event
  const handleSearch = () => {
    searchMovies(searchTerm);
    setSearchTerm("");  // Reset the search term after the search
  };

  return (
    <div className="App">
      <h1>Movie Land</h1>

      <div className="search">
        <input
          type="text"
          placeholder="Search for movies"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <img
          src={SearchIcon}
          alt="search"
          onClick={handleSearch}  // Call the handleSearch function on click
        />
      </div>

      {/* Conditional rendering of movies or empty state */}
      {movies?.length > 0 ? (
        <div className="container">
          {movies.map((movie) => (
            <MovieCard key={movie.imdbID} movie={movie} />
          ))}
        </div>
      ) : (
        <div className="empty">
          <h2>No movies found</h2>
        </div>
      )}
    </div>
  );
}

export default App;
