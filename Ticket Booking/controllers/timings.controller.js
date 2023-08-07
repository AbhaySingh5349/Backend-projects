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
  const theatres = await await movie.getTheatres();
  console.log("await screen.getTimings(): ", timings.dataValues);
  console.log("await theatre.getMovies(): ", movies.dataValues);
  console.log("await movie.getTheatres(): ", theatres.dataValues);

  return res.status(201).json(time);
};

module.exports = {
  getAllTimings,
  addTimingsToScreen,
};

/*
{
  "name": "Crazy Stupid Love",
  "overview": "fun and drama",
  "firstScreeningDate": "2023-03-25",
  "lastScreeningDate": "2023-04-28"
}
{
  "name": "YJHD",
  "overview": "trekking trip",
  "firstScreeningDate": "2023-03-10",
  "lastScreeningDate": "2023-04-10"
}
{
  "name": "ZNMD",
  "overview": "vacation in Spain",
  "firstScreeningDate": "2023-01-15",
  "lastScreeningDate": "2023-02-25"
}
{
  "name": "Wolf of walt street",
  "overview": "fraud and malfeasance",
  "firstScreeningDate": "2023-01-11",
  "lastScreeningDate": "2023-02-8"
} 
*/
