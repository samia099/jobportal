const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ApplicationSchema = new Schema({
  job: {
    type: Schema.Types.ObjectId,
    ref: "BDJobBoxJobs",
    required: true,
  },
  applicant: {
    type: Schema.Types.ObjectId,
    ref: "BDJobBoxUsers",
    required: true,
  },
  coverLetter: {
    type: String,
    required: true,
  },
  resume: {
    type: String,
    required: true,
  },

  status: {
    type: String,
    enum: ["applied", "viewed", "shortlisted", "rejected", "hired"],
    default: "applied",
  },
  notes: {
    type: String,
    default: "",
  },
  appliedAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const ApplicationModel = mongoose.model(
  "BDJobBoxApplication",
  ApplicationSchema
);
module.exports = ApplicationModel;
