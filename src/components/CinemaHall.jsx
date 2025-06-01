import React, { useState, useEffect } from 'react';
import { getBookedSeats } from '../services/BookingService';
import styles from '../styles/CinemaHall.module.css';

const CinemaHall = ({ movieId, onSelectSeats }) => {
  const rows = 5;
  const seatsPerRow = 10;
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [bookedSeats, setBookedSeats] = useState([]);

  useEffect(() => {
    setBookedSeats(getBookedSeats(movieId));
  }, [movieId]);

  const handleSeatClick = (row, seat) => {
    const seatId = `${row}-${seat}`;
    if (bookedSeats.includes(seatId)) return;
    let updatedSeats;
    if (selectedSeats.includes(seatId)) {
      updatedSeats = selectedSeats.filter((id) => id !== seatId);
    } else {
      updatedSeats = [...selectedSeats, seatId];
    }
    setSelectedSeats(updatedSeats);
    onSelectSeats(updatedSeats);
  };

  const renderSeats = () => {
    const seats = [];
    for (let row = 1; row <= rows; row++) {
      const rowSeats = [];
      for (let seat = 1; seat <= seatsPerRow; seat++) {
        const seatId = `${row}-${seat}`;
        rowSeats.push(
          <div
            key={seatId}
            className={`${styles.seat} ${
              bookedSeats.includes(seatId)
                ? styles.booked
                : selectedSeats.includes(seatId)
                ? styles.selected
                : styles.available
            }`}
            onClick={() => handleSeatClick(row, seat)}
          >
            {seat}
          </div>
        );
      }
      seats.push(
        <div key={row} className={styles.row}>
          Ряд {row}: {rowSeats}
        </div>
      );
    }
    return seats;
  };

  return (
    <div className={styles.cinemaHall}>
      <h2>Вибір місць</h2>
      <div className={styles.screen}>Екран</div>
      <div className={styles.seatsContainer}>{renderSeats()}</div>
      <div className={styles.legend}>
        <div className={styles.legendItem}>
          <div className={`${styles.legendBox} ${styles.available}`}></div>
          Доступні
        </div>
        <div className={styles.legendItem}>
          <div className={`${styles.legendBox} ${styles.selected}`}></div>
          Вибрані
        </div>
        <div className={styles.legendItem}>
          <div className={`${styles.legendBox} ${styles.booked}`}></div>
          Заброньовані
        </div>
      </div>
      <p className={styles.selectedSeats}>
        Вибрані місця: {selectedSeats.length > 0 ? selectedSeats.join(', ') : 'Немає'}
      </p>
    </div>
  );
};

export default CinemaHall;