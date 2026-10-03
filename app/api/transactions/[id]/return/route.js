import { NextResponse } from "next/server";
import connectDB from "../../../../../lib/mongodb";
import Transaction from "../../../../../models/Transaction";
import Book from "../../../../../models/Book";

export async function PUT(request, { params }) {
    try {
        await connectDB();

        const { id } = await params;

        const transaction = await Transaction.findById(id);

        if (!transaction) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Transaction not found.",
                },
                { status: 404 }
            );
        }

        if (transaction.status === "Returned") {
            return NextResponse.json(
                {
                    success: false,
                    message: "This book has already been returned.",
                },
                { status: 400 }
            );
        }

        transaction.returnDate = new Date();
        transaction.status = "Returned";

        await transaction.save();

        const book = await Book.findById(transaction.bookId);

        if (book) {
            book.availableQuantity += 1;
            await book.save();
        }

        return NextResponse.json({
            success: true,
            message: "Book returned successfully.",
            transaction,
        });
    } catch (error) {
        console.error("Return book error:", error);

        return NextResponse.json(
            {
                success: false,
                message: "Failed to return book.",
            },
            { status: 500 }
        );
    }
}