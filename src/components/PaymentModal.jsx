import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { markBookingAsPaid } from '../services/BookingService';
import styles from '../styles/PaymentModal.module.css';

const PaymentModal = ({ booking, onClose, movieTitle }) => {
  const [cardDetails, setCardDetails] = useState({
    cardNumber: '',
    expiry: '',
    cvv: '',
  });
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!cardDetails.cardNumber || cardDetails.cardNumber.length < 16) {
      newErrors.cardNumber = 'Номер картки має містити щонайменше 16 цифр';
    }
    if (!cardDetails.expiry || !/^\d{2}\/\d{2}$/.test(cardDetails.expiry)) {
      newErrors.expiry = 'Введіть дату у форматі ММ/РР';
    }
    if (!cardDetails.cvv || cardDetails.cvv.length < 3) {
      newErrors.cvv = 'CVV має містити щонайменше 3 цифри';
    }
    return newErrors;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCardDetails({ ...cardDetails, [name]: value });
    setErrors({ ...errors, [name]: '' });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }
    // Фейкова логіка оплати
    markBookingAsPaid(booking.movieId, 0); // Припускаємо, що це останнє бронювання
    toast.success('Оплата успішна!');
    onClose();
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <button className={styles.closeButton} onClick={onClose}>
          ×
        </button>
        <h2 className={styles.title}>Оплата для "{movieTitle}"</h2>
        <p className={styles.info}>Місця: {booking.seats.join(', ')}</p>
        <p className={styles.info}>Вартість: {booking.seats.length * 10} грн</p>
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label>Номер картки:</label>
            <input
              type="text"
              name="cardNumber"
              value={cardDetails.cardNumber}
              onChange={handleInputChange}
              className={errors.cardNumber ? styles.error : ''}
              placeholder="1234 5678 9012 3456"
            />
            {errors.cardNumber && <p className={styles.errorText}>{errors.cardNumber}</p>}
          </div>
          <div className={styles.formGroup}>
            <label>Термін дії:</label>
            <input
              type="text"
              name="expiry"
              value={cardDetails.expiry}
              onChange={handleInputChange}
              className={errors.expiry ? styles.error : ''}
              placeholder="ММ/РР"
            />
            {errors.expiry && <p className={styles.errorText}>{errors.expiry}</p>}
          </div>
          <div className={styles.formGroup}>
            <label>CVV:</label>
            <input
              type="text"
              name="cvv"
              value={cardDetails.cvv}
              onChange={handleInputChange}
              className={errors.cvv ? styles.error : ''}
              placeholder="123"
            />
            {errors.cvv && <p className={styles.errorText}>{errors.cvv}</p>}
          </div>
          <button type="submit" className={styles.submitButton}>
            Оплатити
          </button>
        </form>
      </div>
    </div>
  );
};

export default PaymentModal;