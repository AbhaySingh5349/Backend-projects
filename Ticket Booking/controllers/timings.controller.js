const { Theatre, Screen, Movie, Timings } = require("../models");

const generateTime = (time_str) => {
  const currentDate = new Date();
  const [hours, minutes] = time_str.split(":");

  const time = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    currentDate.getDate(),
    hours,
    minutes
  );

  const formattedTime = time.toLocaleString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });

  return formattedTime;
};

const getAllTimings = async (req, res) => {
  const timings = await Timings.findAll({});

  return res.status(200).json(timings);
};

const addTimingsToScreen = async (req, res) => {
  const screen = await Screen.findByPk(req.body.screenId);
  const theatre = await Theatre.findByPk(req.body.theatreId);
  const movie = await Movie.findByPk(req.body.movieId);

  const time = await Timings.create({
    time: generateTime(req.body.time),
    screenId: screen.id,
    movieId: movie.id,
    theatreId: theatre.id,
  });

  await screen.addTimings(time);
  await theatre.addMovie(movie);
  await movie.addTheatre(theatre);

  const timings = await screen.getTimings();
  const movies = await theatre.getMovies();
  const theatres = await movie.getTheatres();
  console.log("await screen.getTimings(): ", timings);
  console.log("await theatre.getMovies(): ", movies);
  console.log("await movie.getTheatres(): ", theatres);

  return res.status(201).json({ time, timings, movies, theatres });
};

module.exports = {
  getAllTimings,
  addTimingsToScreen,
};
