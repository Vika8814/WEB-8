// src/pages/Booking.jsx
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import CinemaHall from '../components/CinemaHall';
import { movies } from '../data/movies';
import styles from '../styles/Booking.module.css';

const Booking = () => {
  const { id } = useParams();
  const movie = movies.find((m) => m.id === parseInt(id));
  const [selectedSeats, setSelectedSeats] = useState([]);

  if (!movie) {
    return <p>Фільм не знайдено</p>;
  }

  return (
    <div className={styles.booking}>
      <h2>{movie.title}</h2>
      <p>Сеанс: {movie.showtime}</p>
      <CinemaHall onSelectSeats={setSelectedSeats} />
    </div>
  );
};

export default Booking;