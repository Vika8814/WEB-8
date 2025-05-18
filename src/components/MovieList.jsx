// src/components/MovieList.jsx
import React, { useState } from 'react';
import MovieCard from './MovieCard';
import styles from '../styles/MovieList.module.css';

const MovieList = ({ movies }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredMovies = movies.filter((movie) =>
    movie.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={styles.container}>
      <input
        type="text"
        placeholder="Пошук за назвою фільму..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className={styles.searchInput}
      />
      <div className={styles.movieGrid}>
        {filteredMovies.length > 0 ? (
          filteredMovies.map((movie) => <MovieCard key={movie.id} movie={movie} />)
        ) : (
          <p>Фільми не знайдено</p>
        )}
      </div>
    </div>
  );
};

export default MovieList;