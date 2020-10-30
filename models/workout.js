const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const workoutSchema = new Schema ({
    day: {
        type: Date,
        default: () => new Date()
    },
    exercises: [
        {
            type: {
                type: String,
                trim: true,
                required: "Type of Exercise"
            },
            name: {
                type: String,
                trim: true,
                required: "Name of exercise"
            },
            duration: {
                type: Number,
                required: "How long is your exercise"
            },
            distance: {
                type: Number
            },
            reps: {
                type: Number
            },
            sets: {
                type: Number
            },
            weight: {
                type: Number
            }
        }
    ]
});

workoutSchema.virtual("totalDuration").get(function() {
    return this.exercises.reduce((total, exercise) => {
        return total + exercise.duration;
    }, 0);
});

const Workout = mongoose.model("Workout", workoutSchema);

module.exports = Workout;