const express = require("express");
const router = express.Router();
const {
  getNotifications,
  markAsRead,
} = require("../Controllers/NotificationController");
const ensureAuthenticated = require("../Middlewares/Auth");

router.get("/", ensureAuthenticated, getNotifications);
router.put("/:notificationId/read", ensureAuthenticated, markAsRead);

module.exports = router;