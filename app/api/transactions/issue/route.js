import { NextResponse } from "next/server";
import connectDB from "../../../../lib/mongodb";
import Book from "../../../../models/Book";
import Member from "../../../../models/Member";
import Transaction from "../../../../models/Transaction";

export async function POST(request) {
    try {
        await connectDB();

        const body = await request.json();

        const { bookId, memberId } = body;

        if (!bookId || !memberId) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Book and member are required.",
                },
                { status: 400 }
            );
        }

        const book = await Book.findById(bookId);
        const member = await Member.findById(memberId);

        if (!book) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Book not found.",
                },
                { status: 404 }
            );
        }

        if (!member) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Member not found.",
                },
                { status: 404 }
            );
        }

        if (book.availableQuantity <= 0) {
            return NextResponse.json(
                {
                    success: false,
                    message: "This book is currently unavailable.",
                },
                { status: 400 }
            );
        }

        const transaction = await Transaction.create({
            bookId,
            memberId,
            issueDate: new Date(),
            status: "Issued",
        });

        book.availableQuantity -= 1;
        await book.save();

        return NextResponse.json(
            {
                success: true,
                message: "Book issued successfully.",
                transaction,
            },
            { status: 201 }
        );
    } catch (error) {
        console.error("Issue book error:", error);

        return NextResponse.json(
            {
                success: false,
                message: "Failed to issue book.",
            },
            { status: 500 }
        );
    }
}