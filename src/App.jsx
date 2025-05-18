// src/App.jsx
import React from 'react';
import MovieList from './components/MovieList';
import { movies } from './data/movies';
import styles from './styles/App.module.css';

function App() {
  return (
    <div className={styles.app}>
      <h1 className={styles.title}>Кінотеатр</h1>
      <MovieList movies={movies} />
    </div>
  );
}

export default App;