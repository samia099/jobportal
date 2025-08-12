const express = require("express");
const router = express.Router();
const {
  applyForJob,
  updateApplicationStatus,
  getApplicationsForJob,
  getUserApplications,
} = require("../Controllers/ApplicationController");
const ensureAuthenticated = require("../Middlewares/Auth");
const upload = require("../Middlewares/Upload");

router.post(
  "/:jobId",
  ensureAuthenticated,
  upload.single("resume"),
  applyForJob
);
router.put(
  "/status/:applicationId",
  ensureAuthenticated,
  updateApplicationStatus
);
router.get("/job/:jobId", ensureAuthenticated, getApplicationsForJob);
router.get("/my-applications", ensureAuthenticated, getUserApplications);

module.exports = router;