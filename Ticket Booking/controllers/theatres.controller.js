const Sequelize = require("sequelize");
const faker = require("faker");
const { Theatre } = require("../models/theatre.model");

const getAllTheatres = async (req, res) => {
  console.log("hello getAllTheatres");
  const theatres = await Theatre.findAll({});

  return res.status(200).json(theatres);
};

const getTheatreById = async (req, res) => {
  Theatre.findOne({
    where: { id: req.params.theatreId },
    include: "screens", // This will fetch all screens associated with the theatre,
  })
    .then((theatre) => {
      return res.status(200).json(theatre);
    })
    .catch((error) => {
      console.error("Error in retrieving theatre by id:", error);
    });
};

const getGroupedMovies = async (theatre) => {
  const currentDate = new Date();

  const movies = await theatre.getMovies({
    where: {
      lastScreeningDate: {
        [Sequelize.Op.gte]: new Date(
          currentDate.getTime() + 7 * 24 * 60 * 60 * 1000
        ),
      },
    },
  });

  const movieMap = new Map();

  movies.forEach((movie) => {
    const movieInfo = {
      name: movie.name,
      overview: movie.overview,
      firstScreeningDate: movie.firstScreeningDate,
      lastScreeningDate: movie.lastScreeningDate,
      Timings: [],
    };

    if (!movieMap.has(movie.name)) {
      movieMap.set(movie.name, movieInfo);
    }

    movieMap.get(movie.name).Timings.push({
      screenId: movie.Timings.screenId,
      time: movie.Timings.time,
      ticketsAvailable: movie.Timings.ticketsAvailable,
    });
  });

  // Convert the map to an array of objects
  const groupedMovies = Array.from(movieMap.values());

  return groupedMovies;
};

const getNextSevenDaysShows = async (req, res) => {
  const theatre = await Theatre.findByPk(req.params.theatreId);

  const groupedMovies = await getGroupedMovies(theatre);

  return res.status(200).send(groupedMovies);
};

const getTheatresInCity = async (req, res) => {
  const theatres = await Theatre.findAll({
    where: { city: req.params.city },
  });

  let promises_arr = [];
  theatres.forEach((theatre) => {
    let promise = getGroupedMovies(theatre);
    promises_arr.push(promise);
  });

  Promise.all(promises_arr)
    .then((values) => {
      const modifiedValues = values.map((value, index) => {
        return { theatre: theatres[index].name, movies: value }; // Add your desired key and value structure here
      });

      return res.status(200).json(modifiedValues);
    })
    .catch((err) => {
      return res.status(500).json({ error: err });
    });
};

const addTheatre = async (req, res) => {
  const name = faker.company.companyName();
  const city = req.body.city;

  const theatre = Theatre.build({
    name,
    city,
  });

  await theatre
    .save()
    .then(function (theatre) {
      return res.status(201).json(theatre);
    })
    .catch(function (error) {
      return res.json(`error in adding theatre: `, error);
    });
};

module.exports = {
  getAllTheatres,
  getTheatreById,
  getNextSevenDaysShows,
  addTheatre,
  getTheatresInCity,
};
