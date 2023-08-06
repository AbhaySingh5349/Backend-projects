const faker = require("faker");
const { Screen, Timings } = require("../models");

const getAllTimings = async (req, res) => {
  const timings = await Timings.findAll({});

  return res.status(200).json(timings);
};

const addTimings = async (req, res) => {
  const screen = await Screen.findOne({ id: req.body.screenId });

  const time = req.body.time;

  const formattedTime = time.toLocaleString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });

  const timing = Timings.build({
    time: formattedTime,
    screenId: screen.id,
  });

  await timing
    .save()
    .then(function (timing) {
      return res.status(201).json(timing);
    })
    .catch(function (error) {
      return res.json(`error in adding ${formattedTime} to screen: `, error);
    });
};

module.exports = {
  getAllTimings,
  addTimings,
};
