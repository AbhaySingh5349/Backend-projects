const faker = require("faker");
const { Theatre } = require("../models/theatre.model");

const getAllTheatres = async (req, res) => {
  const theatres = await Theatre.findAll({});

  return res.status(200).json(theatres);
};

const getTheatreById = (req, res) => {
  Theatre.findOne({
    where: { id: req.params.theatreId },
    include: "screens", // This will fetch all screens associated with the theatre
  })
    .then((theatre) => {
      return res.status(200).json(theatre.toJSON());
    })
    .catch((error) => {
      console.error("Error in retrieving theatre by id:", error);
    });
};

const addTheatres = (req, res) => {
  const theatres = [];
  for (let i = 0; i < req.body.count; i++) {
    const name = faker.company.companyName();
    const address = faker.address.streetAddress() + "," + faker.address.city();

    const theatre_promise = Theatre.create({ name, address });
    theatres.push(theatre_promise);
  }

  Promise.all(theatres)
    .then((values) => {
      return res.status(201).json(values);
    })
    .catch((error) => {
      console.log(
        `error in adding ${req.body.count} number of theatres: `,
        error
      );
    });
};

module.exports = {
  getAllTheatres,
  getTheatreById,
  addTheatres,
};
