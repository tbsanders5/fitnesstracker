const express =  require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const htmlRoutes = require("./routes/htmlRoute.js");
const apiRoutes = require("./routes/apiRoute.js");
// const Workout = require("./models/workout.js");
mongoose.connection.on('connected', () => {
    console.log("Mongoose is connected!");
  });

const PORT = process.env.PORT || 3000;

const app = express();
app.use(morgan("dev"));

app.use(express.urlencoded({ extended: true}));
app.use(express.json());
app.use(express.static("public"));

// app.get("/api/workouts", (req, res) => {
//     Workout.find({})
//       .then(dbWorkout => {
//         res.json(dbWorkout);
//       })
//       .catch(err => {
//         res.json(err);
//       });
//   });

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", {
    useNewUrlParser: true,
    useFindAndModify: false
}).then(function() {
    console.log("connection ran")
});

app.use(apiRoutes);
app.use(htmlRoutes);

app.listen(PORT, () => {
    console.log(`App running on port ${PORT}!`);
});