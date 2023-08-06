const faker = require("faker");
const { Theatre, Screen } = require("../models");

const getAllScreens = async (req, res) => {
  const screens = await Screen.findAll({});

  return res.status(200).json(screens);
};

const getScreenById = (req, res) => {
  Screen.findOne({
    where: { id: req.params.screenId },
    include: "timings", // This will fetch all timings associated with the screen
  })
    .then((theatre) => {
      return res.status(200).json(theatre.toJSON());
    })
    .catch((error) => {
      console.error("Error in retrieving screen by id:", error);
    });
};

const addScreens = async (req, res) => {
  const theatre = await Theatre.findOne({ id: req.body.theatreId });

  const screenCount = faker.datatype.number({ min: 2, max: 4 });
  const screens = [];
  for (let i = 0; i < screenCount; i++) {
    const name = faker.random.word();

    const screen_promise = Screen.create({
      name,
      capacity: req.body.capacity,
      theatreId: theatre.id,
    });
    screens.push(screen_promise);
  }

  Promise.all(screens)
    .then((values) => {
      return res.status(201).json(values);
    })
    .catch((error) => {
      console.log(`error in adding ${screenCount} number of screens: `, error);
    });
};

module.exports = {
  getAllScreens,
  getScreenById,
  addScreens,
};
