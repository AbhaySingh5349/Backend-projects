const { Movie, MovieDetails, Reviews } = require("../models");
const cacheMiddleware = require("../middlewares/cache.middleware");
const config = require("../config/config");
const Sequelize = require("sequelize");

const getAllMovies = async (req, res) => {
  let filters = {};

  const languageFilter = req.query.language;
  const genresFilter = req.query.genres ? req.query.genres.split(",") : [];

  if (languageFilter) {
    filters.language = req.query.language;
  }

  if (genresFilter && genresFilter.length > 0) {
    filters.genre = { [Sequelize.Op.in]: genresFilter };
  }

  const movies = await Movie.findAll({
    include: [
      {
        model: MovieDetails,
        as: "moviedetails", // Assuming this is the alias for the association
        where: filters,
        attributes: [], // do not select any attribute from MovieDetails
      },
      {
        model: Reviews,
        as: "reviews", // Assuming this is the alias for the association
        attributes: {
          exclude: ["id", "movieId", "createdAt", "updatedAt"], // Exclude specific fields from moviedetails
        },
      },
    ],
  });

  return res.status(200).json(movies);
};

const getMovieInfo = async (req, res) => {
  const movie = await Movie.findOne({
    where: { id: req.params.movieId },
    attributes: {
      exclude: ["id", "overview", "firstScreeningDate", "lastScreeningDate"],
    },
    include: [
      {
        model: MovieDetails,
        as: "moviedetails", // Assuming this is the alias for the association
        attributes: {
          exclude: [
            "id",
            "movieId",
            "name",
            "createdAt",
            "updatedAt",
            "overview",
          ], // Exclude specific fields from moviedetails
        },
      },
    ],
  });

  const cacheKey = `movie:${req.params.movieId}`;
  await cacheMiddleware.redisClient.set(
    cacheKey,
    JSON.stringify(movie),
    "EX",
    config.cache_expiration_time
  );

  return res.status(200).json(movie);
};

const getMoviesInCity = async (req, res) => {
  const movie = await Movie.findByPk(req.params.id);

  const theatres = await movie.getTheatres({
    where: { city: req.params.city },
    attributes: {
      exclude: ["id", "city"],
    },
  });

  const theatreMap = new Map();

  theatres.forEach((theatre) => {
    if (!theatreMap.has(theatre.name)) {
      theatreMap.set(theatre.name, []);
    }

    theatreMap.get(theatre.name).push({
      screenId: theatre.Timings.screenId,
      time: theatre.Timings.time,
      ticketsAvailable: theatre.Timings.ticketsAvailable,
    });
  });

  // Convert the map to an array of objects
  const groupedTheatres = Array.from(theatreMap, ([name, timings]) => ({
    name: name,
    Timings: timings,
  }));

  return res.status(200).json(groupedTheatres);
};

const addMovie = async (request, response) => {
  const { name, overview, firstScreeningDate, lastScreeningDate } =
    request.body;

  const movie = Movie.build({
    name,
    overview,
    firstScreeningDate,
    lastScreeningDate,
  });

  await movie
    .save()
    .then(function (success) {
      response.status(201).json(success);
    })
    .catch(function (error) {
      response.json(error);
    });
};

const addMovieDeatils = async (req, res) => {
  const { movieId, name, cast, plot, language, genre } = req.body;

  const movieDetails = MovieDetails.build({
    movieId,
    name,
    cast,
    plot,
    language,
    genre,
  });

  await movieDetails
    .save()
    .then(function (success) {
      res.status(201).json(success);
    })
    .catch(function (error) {
      res.status(400).json(error);
    });
};

const addMovieReview = async (req, res) => {
  const movieId = req.params.movieId;
  const { comment, rating } = req.body;

  const review = await Reviews.create({
    movieId,
    comment,
    rating,
  });

  const movie = await Movie.findByPk(movieId);
  await movie.addReviews(review);

  return res.status(201).send(review);
};

const getMovieReviews = async (req, res) => {
  const movie = await Movie.findByPk(req.params.movieId);
  const reviews = await movie.getReviews();

  return res.status(200).json(reviews);
};

module.exports = {
  getAllMovies,
  addMovie,
  getMoviesInCity,
  addMovieDeatils,
  getMovieInfo,
  addMovieReview,
  getMovieReviews,
};
