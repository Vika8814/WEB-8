// src/components/MovieCard.jsx
import React from 'react';
import { Link } from 'react-router-dom';
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
        <Link to={`/booking/${movie.id}`} className={styles.bookButton}>
          Забронювати
        </Link>
      </div>
    </div>
  );
};

export default MovieCard;