const express = require("express");
const router = express.Router();
const bookController = require("../controllers/bookController");
const authMiddleware = require("../middlewares/authMiddleware");

/**
 * @typedef {object} Book
 * @property {string} _id - Book ID
 * @property {string} title.required - Book title
 * @property {string} author.required - Book author
 * @property {string} genre.required - Book genre
 * @property {string} userId - User ID who owns the book
 * @property {string} createdAt - Creation timestamp
 * @property {string} updatedAt - Last update timestamp
 */

/**
 * @typedef {object} BookRequest
 * @property {string} title.required - Book title
 * @property {string} author.required - Book author
 * @property {string} genre.required - Book genre
 * @property {string} description - Book description
 * @property {number} totalPages - Total number of pages
 */

/**
 * @typedef {object} BookResponse
 * @property {string} message - Response message
 * @property {Book} data - Book data
 */

/**
 * @typedef {object} BookListResponse
 * @property {string} message - Response message
 * @property {Book[]} data - List of books
 */

/**
 * POST /api/books
 * @summary Add a new book
 * @tags Books
 * @security BearerAuth
 * @param {BookRequest} request.body.required - Book data
 * @return {BookResponse} 201 - Book created successfully
 * @return {object} 400 - Validation error
 * @return {object} 500 - Server error
 */
router.post("/", authMiddleware, bookController.addBook);

/**
 * GET /api/books
 * @summary Get all books for authenticated user
 * @tags Books
 * @security BearerAuth
 * @param {string} genre.query - Filter by genre
 * @param {string} author.query - Filter by author
 * @param {number} limit.query - Number of books to return
 * @param {number} page.query - Page number for pagination
 * @return {BookListResponse} 200 - List of books
 * @example response - 200 - example success response
 * {
 *  "message": "Success",
 *   "data": [
 *     {
 *       "_id": "string",
 *       "title": "string",
 *       "author": "string",
 *       "genre": "string",
 *       "description": "string"
 *     },
 *     {
 *       "_id": "string",
 *       "title": "string",
 *       "author": "string",
 *       "genre": "string",
 *       "description": "string"
 *     }
 *   ]
 * }
 * @return {object} 401 - Unauthorized
 * @return {object} 500 - Server error
 */
router.get("/", authMiddleware, bookController.getBooks);

/**
 * GET /api/books/{id}
 * @summary Get a book by ID
 * @tags Books
 * @security BearerAuth
 * @param {string} id.path.required - Book ID
 * @return {object} 200 - Book found
 * @return {object} 401 - Unauthorized
 * @return {object} 404 - Book not found
 * @return {object} 500 - Server error
 */
router.get("/:id", authMiddleware, bookController.getBookById);

/**
 * PUT /api/books/{id}
 * @summary Update a book by ID
 * @tags Books
 * @security BearerAuth
 * @param {string} id.path.required - Book ID
 * @param {BookRequest} request.body.required - Book data
 * @return {object} 200 - Book updated successfully
 * @return {object} 401 - Unauthorized
 * @return {object} 404 - Book not found
 * @return {object} 500 - Server error
 */
router.put("/:id", authMiddleware, bookController.updateBookById);

/**
 * DELETE /api/books/{id}
 * @summary Delete a book by ID
 * @tags Books
 * @security BearerAuth
 * @param {string} id.path.required - Book ID
 * @return {object} 200 - Book deleted successfully
 * @return {object} 401 - Unauthorized
 * @return {object} 404 - Book not found
 * @return {object} 500 - Server error
 */
router.delete("/:id", authMiddleware, bookController.deleteBookById);

module.exports = router;
