const Sequelize = require("sequelize");
const faker = require("faker");
const { Theatre } = require("../models/theatre.model");

const getAllTheatres = async (req, res) => {
  const theatres = await Theatre.findAll({});

  return res.status(200).json(theatres);
};

const getTheatreById = async (req, res) => {
  Theatre.findOne({
    where: { id: req.params.theatreId },
    include: "screens", // This will fetch all screens associated with the theatre,
  })
    .then((theatre) => {
      return res.status(200).json(theatre.toJSON());
    })
    .catch((error) => {
      console.error("Error in retrieving theatre by id:", error);
    });
};

const getNextSevenDaysShows = async (req, res) => {
  const theatre = await Theatre.findByPk(req.params.theatreId);

  const currentDate = new Date();

  const movies = await theatre.getMovies({
    where: {
      lastScreeningDate: { [Sequelize.Op.lte]: currentDate },
      // lastScreeningDate: {
      //   [Sequelize.Op.lte]: new Date(currentDate.getDate() + 7),
      // },
    },
  });
  return res.status(200).send(movies);
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
};
