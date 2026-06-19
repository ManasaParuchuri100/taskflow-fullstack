const mongoose = require("mongoose");

const taskSchema =
    new mongoose.Schema(
        {
            title: {
                type: String,
                required: true,
                trim: true
            },

            description: {
                type: String,
                default: ""
            },

            priority: {
                type: String,
                enum: [
                    "Low",
                    "Medium",
                    "High"
                ],
                default: "Medium"
            },

            category: {
                type: String,
                default: "General"
            },

            completed: {
                type: Boolean,
                default: false
            }
        },
        {
            timestamps: true
        }
    );

module.exports =
    mongoose.model(
        "Task",
        taskSchema
    );