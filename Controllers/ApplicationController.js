const ApplicationModel = require("../Models/Application");
const JobModel = require("../Models/Job");
const NotificationModel = require("../Models/Notification");

const applyForJob = async (req, res) => {
  try {
    const { _id: applicantId } = req.user;
    const { jobId } = req.params;
    const { coverLetter } = req.body;
    console.log(applicantId);
    

    // Check if resume file was uploaded
    if (!req.file) {
      return res.status(400).json({
        message: "Resume file is required",
        success: false,
      });
    }
    console.log(jobId);
    

    // Check if job exists and is active
    const job = await JobModel.findById(jobId);
    console.log(job);
    
    if (!job || job.status !== "approved") {
      return res.status(400).json({
        message: "Job is not available for application",
        success: false,
      });
    }

    // Check if deadline has passed
    if (new Date(job.deadline) < new Date()) {
      return res.status(400).json({
        message: "Application deadline has passed",
        success: false,
      });
    }

    // Check if already applied
    const existingApplication = await ApplicationModel.findOne({
      job: jobId,
      applicant: applicantId,
    });
    if (existingApplication) {
      return res.status(400).json({
        message: "You have already applied for this job",
        success: false,
      });
    }

   const application = new ApplicationModel({
      job: jobId,
      applicant: applicantId,
      coverLetter,
      resume: `/resumes/${req.file.filename}`, // Store relative path
    });
    await application.save();

    // Create notification for employer
    const notification = new NotificationModel({
      user: job.employer,
      message: `New application for your job: ${job.title}`,
      type: "application",
      relatedItem: application._id,
    });
    await notification.save();

    res.status(201).json({
      message: "Application submitted successfully",
      success: true,
      application,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

const updateApplicationStatus = async (req, res) => {
  try {
    const { id: userId, role } = req.user;
    const { applicationId } = req.params;
    const { status, notes } = req.body;

    const application = await ApplicationModel.findById(applicationId).populate(
      "job"
    );
    if (!application) {
      return res.status(404).json({
        message: "Application not found",
        success: false,
      });
    }

    // Only employer who owns the job or admin can update status
    if (application.job.employer.toString() !== userId && role !== "admin") {
      return res.status(403).json({
        message: "Unauthorized to update this application",
        success: false,
      });
    }

    application.status = status;
    if (notes) application.notes = notes;
    application.updatedAt = new Date();
    await application.save();

    // Create notification for applicant
    const notification = new NotificationModel({
      user: application.applicant,
      message: `Your application status has been updated to ${status}`,
      type: "application",
      relatedItem: application._id,
    });
    await notification.save();

    res.status(200).json({
      message: "Application status updated successfully",
      success: true,
      application,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

const getApplicationsForJob = async (req, res) => {
  try {
    const { id: userId, role } = req.user;
    const { jobId } = req.params;

    const job = await JobModel.findById(jobId);
    if (!job) {
      return res.status(404).json({
        message: "Job not found",
        success: false,
      });
    }

    // Only employer who owns the job or admin can view applications
    if (job.employer.toString() !== userId && role !== "admin") {
      return res.status(403).json({
        message: "Unauthorized to view these applications",
        success: false,
      });
    }

    const applications = await ApplicationModel.find({ job: jobId }).populate(
      "applicant",
      "name email photo resume skills"
    );

    res.status(200).json({
      message: "Applications retrieved successfully",
      success: true,
      applications,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

const getUserApplications = async (req, res) => {
  try {
    const { id: userId } = req.user;

    const applications = await ApplicationModel.find({ applicant: userId })
      .populate("job", "title employer status")
      .populate("job.employer", "name company.name");

    res.status(200).json({
      message: "Your applications retrieved successfully",
      success: true,
      applications,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

module.exports = {
  applyForJob,
  updateApplicationStatus,
  getApplicationsForJob,
  getUserApplications,
};
