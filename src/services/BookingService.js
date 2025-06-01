const saveBooking = (movieId, seats, userData, paid = false) => {
    const bookings = JSON.parse(localStorage.getItem('bookings') || '{}');
    // Переконаємося, що bookings[movieId] є масивом
    const movieBookings = Array.isArray(bookings[movieId]) ? bookings[movieId] : [];
    movieBookings.push({ seats, userData, paid });
    bookings[movieId] = movieBookings;
    localStorage.setItem('bookings', JSON.stringify(bookings));
  };
  
  const getBookedSeats = (movieId) => {
    const bookings = JSON.parse(localStorage.getItem('bookings') || '{}');
    const movieBookings = Array.isArray(bookings[movieId]) ? bookings[movieId] : [];
    return movieBookings.flatMap((booking) => booking.seats || []);
  };
  
  const getAllBookings = () => {
    const bookings = JSON.parse(localStorage.getItem('bookings') || '{}');
    const allBookings = [];
    Object.keys(bookings).forEach((movieId) => {
      const movieBookings = Array.isArray(bookings[movieId]) ? bookings[movieId] : [];
      movieBookings.forEach((booking) => {
        allBookings.push({ movieId, ...booking });
      });
    });
    return allBookings;
  };
  
  const markBookingAsPaid = (movieId, bookingIndex) => {
    const bookings = JSON.parse(localStorage.getItem('bookings') || '{}');
    if (Array.isArray(bookings[movieId]) && bookings[movieId][bookingIndex]) {
      bookings[movieId][bookingIndex].paid = true;
      localStorage.setItem('bookings', JSON.stringify(bookings));
    }
  };
  
  export { saveBooking, getBookedSeats, getAllBookings, markBookingAsPaid };