import { NextResponse } from "next/server";
import connectDB from "../../../../lib/mongodb";
import Book from "../../../../models/Book";

export async function PUT(request, { params }) {
    try {
        await connectDB();

        const { id } = await params;
        const body = await request.json();

        const book = await Book.findByIdAndUpdate(
            id,
            {
                title: body.title,
                author: body.author,
                category: body.category,
                isbn: body.isbn,
                quantity: Number(body.quantity),
                availableQuantity: Number(body.availableQuantity),
                publicationYear: Number(body.publicationYear),

                // Save real book cover URL
                coverImage: body.coverImage || "",
            },
            {
                new: true,
                runValidators: true,
            }
        );

        if (!book) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Book not found",
                },
                { status: 404 }
            );
        }

        return NextResponse.json({
            success: true,
            message: "Book updated successfully",
            book,
        });
    } catch (error) {
        console.error("UPDATE BOOK ERROR:", error);

        return NextResponse.json(
            {
                success: false,
                message: error.message,
            },
            { status: 500 }
        );
    }
}

export async function DELETE(request, { params }) {
    try {
        await connectDB();

        const { id } = await params;

        const book = await Book.findByIdAndDelete(id);

        if (!book) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Book not found",
                },
                { status: 404 }
            );
        }

        return NextResponse.json({
            success: true,
            message: "Book deleted successfully",
        });
    } catch (error) {
        console.error("DELETE BOOK ERROR:", error);

        return NextResponse.json(
            {
                success: false,
                message: error.message,
            },
            { status: 500 }
        );
    }
}

export async function GET(request, { params }) {
    try {
        await connectDB();

        const { id } = await params;

        const book = await Book.findById(id);

        if (!book) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Book not found",
                },
                { status: 404 }
            );
        }

        return NextResponse.json({
            success: true,
            book,
        });
    } catch (error) {
        console.error("GET BOOK ERROR:", error);

        return NextResponse.json(
            {
                success: false,
                message: error.message,
            },
            { status: 500 }
        );
    }
}

