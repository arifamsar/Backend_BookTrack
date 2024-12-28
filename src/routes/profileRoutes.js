const express = require('express');
const ProfileController = require('../controllers/profileController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

/**
 * @typedef {object} Profile
 * @property {string} _id - User ID
 * @property {string} username - Username
 * @property {string} email - Email address
 * @property {string} createdAt - Creation timestamp
 */

/**
 * @typedef {object} ProfileUpdateRequest
 * @property {string} username.required - New username (min 3 characters)
 * @property {string} email.required - New email address (must be valid email)
 */

/**
 * @typedef {object} ProfileResponse
 * @property {string} message - Response message
 * @property {Profile} data - User profile data
 */

/**
 * GET /api/profile
 * @summary Get current user profile
 * @tags Profile
 * @security BearerAuth
 * @return {ProfileResponse} 200 - Success response with profile data
 * @return {object} 401 - Unauthorized - Invalid or missing token
 * @return {object} 404 - User profile not found
 * @return {object} 500 - Server error
 */
router.get('/', authMiddleware, ProfileController.getProfile);

/**
 * PUT /api/profile
 * @summary Update user profile
 * @tags Profile
 * @security BearerAuth
 * @param {ProfileUpdateRequest} request.body.required - Profile update data
 * @return {ProfileResponse} 200 - Profile updated successfully
 * @return {object} 400 - Validation error
 * @return {object} 401 - Unauthorized
 * @return {object} 404 - User not found
 * @return {object} 500 - Server error
 */
router.put('/', authMiddleware, ProfileController.updateProfile);

module.exports = router;