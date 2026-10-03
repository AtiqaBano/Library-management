import { NextResponse } from "next/server";
import connectDB from "../../../lib/mongodb";
import Book from "../../../models/Book";

export async function GET() {
    try {
        await connectDB();

        const books = await Book.find().sort({ createdAt: -1 });

        return NextResponse.json({
            success: true,
            books,
        });
    } catch (error) {
        console.error("GET BOOKS ERROR:", error);

        return NextResponse.json(
            {
                success: false,
                message: "Failed to load books.",
            },
            { status: 500 }
        );
    }
}

export async function POST(request) {
    try {
        await connectDB();

        const body = await request.json();

        const {
            title,
            author,
            category,
            isbn,
            quantity,
            publicationYear,
            coverImage,
        } = body;

        // Required fields
        if (
            !title ||
            !author ||
            !category ||
            !isbn ||
            !quantity ||
            !publicationYear
        ) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Please fill all required fields.",
                },
                { status: 400 }
            );
        }

        // Check duplicate ISBN
        const existingBook = await Book.findOne({ isbn });

        if (existingBook) {
            return NextResponse.json(
                {
                    success: false,
                    message: "A book with this ISBN already exists.",
                },
                { status: 400 }
            );
        }

        // Create book
        const book = await Book.create({
            title: title.trim(),
            author: author.trim(),
            category: category.trim(),
            isbn: isbn.trim(),
            quantity: Number(quantity),
            availableQuantity: Number(quantity),
            publicationYear: Number(publicationYear),

            // IMPORTANT: save cover URL
            coverImage: coverImage ? coverImage.trim() : "",
        });

        return NextResponse.json(
            {
                success: true,
                message: "Book added successfully.",
                book,
            },
            { status: 201 }
        );
    } catch (error) {
        console.error("ADD BOOK ERROR:", error);

        return NextResponse.json(
            {
                success: false,
                message: error.message || "Failed to add book.",
            },
            { status: 500 }
        );
    }
}
