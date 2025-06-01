import React from 'react';
import styles from '../styles/MovieDetailsModal.module.css';

const MovieDetailsModal = ({ movie, onClose }) => {
  if (!movie) {
    return null;
  }

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <button className={styles.closeButton} onClick={onClose}>
          ×
        </button>
        <img src={movie.poster} alt={movie.title} className={styles.poster} />
        <h2 className={styles.title}>{movie.title}</h2>
        <p className={styles.description}>{movie.description}</p>
        <p className={styles.genre}>Жанр: {movie.genre}</p>
        <div className={styles.showtimes}>
          <h3>Сеанси:</h3>
          {movie.showtimes && movie.showtimes.length > 0 ? (
            <ul>
              {movie.showtimes.map((showtime, index) => (
                <li key={index}>
                  {showtime.date} о {showtime.time}
                </li>
              ))}
            </ul>
          ) : (
            <p>Немає сеансів</p>
          )}
        </div>
        <a
          href={`/booking/${movie.id}`}
          className={styles.bookButton}
        >
          Забронювати
        </a>
      </div>
    </div>
  );
};

export default MovieDetailsModal;