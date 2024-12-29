const Book = require("../models/book");

const generateSampleBooks = async (userId) => {
    const sampleBooks = [
        {
            title: "The Great Gatsby", 
            author: "F. Scott Fitzgerald",
            genre: "Fiction",
            description: "The story of the mysteriously wealthy Jay Gatsby and his love for the beautiful Daisy Buchanan.",
            totalPages: 180,
            userId
        },
        {
            title: "To Kill a Mockingbird",
            author: "Harper Lee",
            genre: "Fiction",
            description: "The story of a young girl growing up in the racially charged Deep South and her father's fight for justice.",
            totalPages: 281,
            userId
        },
    ];

    await Book.insertMany(sampleBooks);
}

module.exports = { generateSampleBooks };