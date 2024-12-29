const express = require('express');
const AuthController = require('../controllers/authController');
const router = express.Router();

const authController = new AuthController();

/**
 * @typedef {object} ValidationError
 * @property {string} message - Error message
 * @property {object} errors - Validation errors
 */

/**
 * @typedef {object} RegisterRequest
 * @property {string} username.required - Username (min 3 characters)
 * @property {string} password.required - Password (min 6 characters)
 * @property {string} email.required - Valid email address
 */

/**
 * @typedef {object} RegisterResponse
 * @property {string} message - Response message
 */

/**
 * @typedef {object} LoginRequest
 * @property {string} username.required - Username
 * @property {string} password.required - Password
 */

/**
 * @typedef {object} LoginResponse
 * @property {string} message - Response message
 * @property {object} data - Response data
 * @property {string} data.token - JWT token
 */

/**
 * POST /api/auth/register
 * @summary Register a new user
 * @tags Auth
 * @param {RegisterRequest} request.body.required - User info
 * @return {RegisterResponse} 201 - User registered successfully
 * @return {ValidationError} 400 - Validation error
 * @return {object} 500 - Server error
 */
router.post('/register', authController.register);

/**
 * POST /api/auth/login
 * @summary Login a user
 * @tags Auth
 * @param {LoginRequest} request.body.required - User credentials
 * @return {LoginResponse} 200 - Login successful
 * @return {ValidationError} 400 - Validation error
 * @return {ValidationError} 401 - Invalid credentials
 * @return {object} 500 - Server error
 */
router.post('/login', authController.login);

module.exports = router;