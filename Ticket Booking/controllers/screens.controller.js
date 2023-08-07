const { Theatre, Screen } = require("../models");

const getAllScreens = async (req, res) => {
  const screens = await Screen.findAll({});

  return res.status(200).json(screens);
};

const getScreenById = async (req, res) => {
  const user = await Screen.findByPk(1);
  const projects = await user.getTimings();

  return res.status(200).send(projects);

  // Screen.findOne({
  //   where: { id: req.params.screenId },
  //   include: "timings", // This will fetch all timings associated with the screen
  // })
  //   .then((screen) => {
  //     return res.status(200).json(screen.toJSON());
  //   })
  //   .catch((error) => {
  //     console.error("Error in retrieving screen by id:", error);
  //   });
};

const addScreenToTheatre = async (req, res) => {
  const theatre = await Theatre.findByPk(req.body.theatreId);

  const screen = Screen.build({
    capacity: req.body.capacity,
    theatreId: theatre.id,
  });

  screen
    .save()
    .then(function (screen) {
      theatre.addScreen(screen);
      return res.status(201).json(screen);
    })
    .catch(function (error) {
      return res.json(`error in adding screen: `, error);
    });
};

module.exports = {
  getAllScreens,
  getScreenById,
  addScreenToTheatre,
};
