
require("dotenv").config({ path: "./../.env" })
const mongoose = require("mongoose");

const bycrypt = require("bcryptjs");
const Statistics = require("../models/Statistics");

exports.seedeStatistic = async (req, res) => {
    try {
        await mongoose.connect(process.env.MONGO_ULR)
        console.log("db connected");
        const result = await Statistics.find()
        if (result) {
            await Statistics.create({
                expYear: "0",
                noOfProject: "0",
                tech: "0",
                happyClient: "0",
            })
        }

        console.log("Statistic seed complete");
        process.exit(1)

    } catch (error) {
        console.log(error);
        process.exit(1)

    }
}