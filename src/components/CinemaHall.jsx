// src/components/CinemaHall.jsx
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
    if (selectedSeats.includes(seatId)) {
      setSelectedSeats(selectedSeats.filter((id) => id !== seatId));
    } else {
      setSelectedSeats([...selectedSeats, seatId]);
    }
    onSelectSeats([...selectedSeats, seatId]);
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
      <div className={styles.seatsContainer}>{renderSeats()}</div>
      <p>
        Вибрані місця: {selectedSeats.length > 0 ? selectedSeats.join(', ') : 'Немає'}
      </p>
    </div>
  );
};

export default CinemaHall;