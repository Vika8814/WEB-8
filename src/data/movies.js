// src/data/movies.js
export const movies = [
    {
      id: 1,
      title: "Inception",
      description: "Злодій зі здатністю проникати у сни повинен здійснити ідеальну крадіжку.",
      genre: "Sci-Fi",
      poster: require('../card/inception.jpg'),
      showtime: "2025-05-20 18:00",
    },
    {
      id: 2,
      title: "The Matrix",
      description: "Хакер відкриває таємничу реальність за відомим йому світом.",
      genre: "Action",
      poster: require('../card/thematrix.jpg'),
      showtime: "2025-05-20 20:00",
    },
    {
      id: 3,
      title: "Interstellar",
      description: "Команда дослідників подорожує крізь червоточину в пошуках нового дому для людства.",
      genre: "Sci-Fi",
      poster: require('../card/interstellar.jpg'),
      showtimes: [
        { date: "2025-05-20", time: "18:00" },
        { date: "2025-05-20", time: "21:00" },
        { date: "2025-05-21", time: "19:00" },
      ],
    },
  ];