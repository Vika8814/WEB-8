import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CinemaHall from '../components/CinemaHall';
import PaymentModal from '../components/PaymentModal';
import { movies } from '../data/movies';
import { saveBooking } from '../services/BookingService';
import styles from '../styles/Booking.module.css';

const Booking = () => {
  const { id } = useParams();
  const movie = movies.find((m) => m.id === parseInt(id));
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [userData, setUserData] = useState({
    name: '',
    phone: '',
    email: '',
  });
  const [errors, setErrors] = useState({});
  const [showPayment, setShowPayment] = useState(false);
  const [lastBooking, setLastBooking] = useState(null);

  if (!movie) {
    return <p>Фільм не знайдено</p>;
  }

  const validateForm = () => {
    const newErrors = {};
    if (!userData.name) newErrors.name = "Ім'я є обов'язковим";
    if (!userData.phone) newErrors.phone = "Телефон є обов'язковим";
    if (!userData.email) {
      newErrors.email = "Email є обов'язковим";
    } else if (!/\S+@\S+\.\S+/.test(userData.email)) {
      newErrors.email = "Невірний формат email";
    }
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }
    if (selectedSeats.length === 0) {
      toast.error('Виберіть хоча б одне місце');
      return;
    }
    saveBooking(id, selectedSeats, userData);
    setLastBooking({ movieId: id, seats: selectedSeats, userData });
    toast.success('Бронювання успішно збережено!');
    setSelectedSeats([]);
    setUserData({ name: '', phone: '', email: '' });
    setErrors({});
    setShowPayment(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
    setErrors({ ...errors, [name]: '' });
  };

  return (
    <div className={styles.booking}>
      <h2 className={styles.title}>{movie.title}</h2>
      <p className={styles.showtime}>Сеанс: {movie.showtime || 'Немає сеансів'}</p>
      <CinemaHall movieId={id} onSelectSeats={setSelectedSeats} />
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label>Ім'я:</label>
          <input
            type="text"
            name="name"
            value={userData.name}
            onChange={handleInputChange}
            className={errors.name ? styles.error : ''}
            placeholder="Введіть ваше ім'я"
          />
          {errors.name && <p className={styles.errorText}>{errors.name}</p>}
        </div>
        <div className={styles.formGroup}>
          <label>Телефон:</label>
          <input
            type="text"
            name="phone"
            value={userData.phone}
            onChange={handleInputChange}
            className={errors.phone ? styles.error : ''}
            placeholder="Введіть ваш телефон"
          />
          {errors.phone && <p className={styles.errorText}>{errors.phone}</p>}
        </div>
        <div className={styles.formGroup}>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={userData.email}
            onChange={handleInputChange}
            className={errors.email ? styles.error : ''}
            placeholder="Введіть ваш email"
          />
          {errors.email && <p className={styles.errorText}>{errors.email}</p>}
        </div>
        <button type="submit" className={styles.submitButton}>
          Забронювати
        </button>
      </form>
      <ToastContainer />
      {showPayment && lastBooking && (
        <PaymentModal
          booking={lastBooking}
          onClose={() => setShowPayment(false)}
          movieTitle={movie.title}
        />
      )}
    </div>
  );
};

export default Booking;