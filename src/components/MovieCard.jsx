// src/components/MovieCard.jsx
import React from 'react';
import styles from '../styles/MovieCard.module.css';

const MovieCard = ({ movie }) => {
  return (
    <div className={styles.card}>
      <img src={movie.poster} alt={movie.title} className={styles.poster} />
      <div className={styles.content}>
        <h3 className={styles.title}>{movie.title}</h3>
        <p className={styles.description}>{movie.description}</p>
        <p className={styles.genre}>Жанр: {movie.genre}</p>
        <p className={styles.showtime}>Сеанс: {movie.showtime}</p>
      </div>
    </div>
  );
};

export default MovieCard;