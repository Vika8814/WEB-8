import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Booking from './pages/Booking';
import BookingsModal from './components/BookingsModal';
import styles from './styles/App.module.css';

function App() {
  const [showBookings, setShowBookings] = useState(false);

  return (
    <Router>
      <div className={styles.app}>
        <header className={styles.header}>
          <h1 className={styles.title}>Кінотеатр</h1>
          <button
            className={styles.bookingsButton}
            onClick={() => setShowBookings(true)}
            title="Переглянути бронювання"
          >
            🎟️
          </button>
        </header>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/booking/:id" element={<Booking />} />
        </Routes>
        {showBookings && <BookingsModal onClose={() => setShowBookings(false)} />}
      </div>
    </Router>
  );
}

export default App;