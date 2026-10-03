import { NextResponse } from "next/server";
import connectDB from "../../../lib/mongodb";
import Member from "../../../models/Member";

export async function GET() {
  try {
    await connectDB();

    const members = await Member.find().sort({ createdAt: -1 });

    return NextResponse.json({
      success: true,
      members,
    });
  } catch (error) {
    console.error("GET MEMBERS ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: error.message,
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
      name,
      email,
      phone,
      address,
      membershipDate,
    } = body;

    if (!name || !email || !phone || !address || !membershipDate) {
      return NextResponse.json(
        {
          success: false,
          message: "All fields are required.",
        },
        { status: 400 }
      );
    }

    const existingMember = await Member.findOne({ email });

    if (existingMember) {
      return NextResponse.json(
        {
          success: false,
          message: "A member with this email already exists.",
        },
        { status: 400 }
      );
    }

    const member = await Member.create({
      name,
      email,
      phone,
      address,
      membershipDate,
    });

    return NextResponse.json(
      {
        success: true,
        message: "Member added successfully.",
        member,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("ADD MEMBER ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: error.message,
      },
      { status: 500 }
    );
  }
}