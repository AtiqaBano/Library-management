import { NextResponse } from "next/server";
import connectDB from "../../../lib/mongodb";
import Book from "../../../models/Book";
import Member from "../../../models/Member";
import Transaction from "../../../models/Transaction";

export async function GET() {
    try {
        await connectDB();

        const [
            totalBooks,
            totalMembers,
            issuedBooks,
            returnedBooks,
            availableBooks,
        ] = await Promise.all([
            Book.countDocuments(),
            Member.countDocuments(),
            Transaction.countDocuments({ status: "Issued" }),
            Transaction.countDocuments({ status: "Returned" }),
            Book.aggregate([
                {
                    $group: {
                        _id: null,
                        total: {
                            $sum: "$availableQuantity",
                        },
                    },
                },
            ]),
        ]);

        return NextResponse.json({
            success: true,
            stats: {
                totalBooks,
                totalMembers,
                issuedBooks,
                returnedBooks,
                availableBooks: availableBooks[0]?.total || 0,
            },
        });
    } catch (error) {
        console.error("Dashboard error:", error);

        return NextResponse.json(
            {
                success: false,
                message: "Failed to load dashboard.",
            },
            { status: 500 }
        );
    }
}