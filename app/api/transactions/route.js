import { NextResponse } from "next/server";
import connectDB from "../../../lib/mongodb";
import Transaction from "../../../models/Transaction";

export async function GET() {
    try {
        await connectDB();

        const transactions = await Transaction.find()
            .populate("bookId", "title author")
            .populate("memberId", "name email")
            .sort({ createdAt: -1 });

        return NextResponse.json({
            success: true,
            transactions,
        });
    } catch (error) {
        console.error("Transactions error:", error);

        return NextResponse.json(
            {
                success: false,
                message: "Failed to load transactions.",
            },
            { status: 500 }
        );
    }
}