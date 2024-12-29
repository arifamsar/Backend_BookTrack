const Book = require("../models/book");

class BookController {
	async addBook(req, res) {
        const { title, author, genre, description, totalPages } = req.body;
        const userId = req.user.id;

        try {
            const newBook = new Book({
                title,
                author,
                genre,
                description,
                totalPages,
                userId,
            });
            await newBook.save();
            res.status(201).json({ message: "Book created successfully", data: newBook });
        } catch (error) {
            if (error.name === "ValidationError") {
                const messages = Object.values(error.errors).map((val) => val.message);
                return res.status(400).json({ message: "Validation error", error: messages });
            } else {
                res.status(500).json({ message: "Server error", error: error.message });
            }
        }
    }

	async getBooks(req, res) {
		const userId = req.user.id;
		try {
			const books = await Book.find({ userId }).select('id title author genre description');
			res.status(200).json({ message: "Success", data: books });
		} catch (error) {
			if (error.name === "ValidationError") {
				const messages = Object.values(error.errors).map((val) => val.message);
				return res.status(400).json({ message: "Validation error", error: messages });
			} else {
				res.status(500).json({ message: "Server error", error: error.message });
			}
		}
	}

	async getBookById(req, res) {
		const { id } = req.params;
		try {
			const book = await Book.findById(id).select('id title author genre description totalPages');
			if (!book) {
				return res.status(404).json({ message: "Book not found" });
			}
			res.status(200).json({ data: book });
		} catch (error) {
			if (error.name === "ValidationError") {
				const messages = Object.values(error.errors).map((val) => val.message);
				return res.status(400).json({ message: "Validation error", error: messages });
			} else {
				res.status(500).json({ message: "Server error", error: error.message });
			}
		}
	}

	async updateBookById(req, res) {
        const { id } = req.params;
        const { title, author, genre, description, totalPages } = req.body;

        try {
            const updatedBook = await Book.findByIdAndUpdate(
                id, 
                { title, author, genre, description, totalPages }, 
                { new: true }
            );
            if (!updatedBook) {
                return res.status(404).json({ message: "Book not found" });
            }
            res.status(200).json({ 
                message: "Book updated successfully", 
                data: updatedBook 
            });
        } catch (error) {
            if (error.name === "ValidationError") {
                const messages = Object.values(error.errors).map((val) => val.message);
                return res.status(400).json({ message: "Validation error", error: messages });
            } else {
                res.status(500).json({ message: "Server error", error: error.message });
            }
        }
    }

	async deleteBookById(req, res) {
		const { id } = req.params;
		try {
			const book = await Book.findByIdAndDelete(id);
			if (!book) {
				return res.status(404).json({ message: "Book not found" });
			}
			res.status(200).json({ message: "Book deleted successfully" });
		} catch (error) {
			if (error.name === "ValidationError") {
				const messages = Object.values(error.errors).map((val) => val.message);
				return res.status(400).json({ message: "Validation error", error: messages });
			} else {
				res.status(500).json({ message: "Server error", error: error.message });
			}
		}
	}
}

module.exports = new BookController();