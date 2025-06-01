import React from 'react';
import { movies } from '../data/movies';
import { getAllBookings } from '../services/BookingService';
import styles from '../styles/BookingsModal.module.css';

const BookingsModal = ({ onClose }) => {
  const bookings = getAllBookings();

  const handleClearBookings = () => {
    localStorage.removeItem('bookings');
    window.location.reload(); // Перезавантаження для оновлення UI
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <button className={styles.closeButton} onClick={onClose}>
          ×
        </button>
        <h2 className={styles.title}>Ваші бронювання</h2>
        {bookings.length > 0 ? (
          <>
            <ul className={styles.bookingsList}>
              {bookings.map((booking, index) => {
                const movie = movies.find((m) => m.id === parseInt(booking.movieId));
                return (
                  <li key={index} className={styles.bookingItem}>
                    <h3>{movie ? movie.title : 'Невідомий фільм'}</h3>
                    <p>Місця: {booking.seats.join(', ')}</p>
                    <p>Ім'я: {booking.userData.name}</p>
                    <p>Email: {booking.userData.email}</p>
                    <p>Статус оплати: {booking.paid ? 'Оплачено' : 'Не оплачено'}</p>
                  </li>
                );
              })}
            </ul>
            <button className={styles.clearButton} onClick={handleClearBookings}>
              Очистити всі бронювання
            </button>
          </>
        ) : (
          <p>Немає бронювань</p>
        )}
      </div>
    </div>
  );
};

export default BookingsModal;