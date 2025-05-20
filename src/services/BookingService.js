
const saveBooking = (movieId, seats, userData) => {
    const bookings = JSON.parse(localStorage.getItem('bookings') || '{}');
    const movieBookings = bookings[movieId] || [];
    movieBookings.push({ seats, userData });
    bookings[movieId] = movieBookings;
    localStorage.setItem('bookings', JSON.stringify(bookings));
  };
  
  const getBookedSeats = (movieId) => {
    const bookings = JSON.parse(localStorage.getItem('bookings') || '{}');
    return bookings[movieId] ? bookings[movieId].flatMap((booking) => booking.seats) : [];
  };
  
  export { saveBooking, getBookedSeats };