// IMPORTS -
import { NextResponse } from "next/server";
import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prismadb";

// PARTIALS -
interface IParams {
  listingId?: string;
}

export async function DELETE(
  request: Request,
  { params }: { params: IParams }
) {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return new NextResponse(
        JSON.stringify({
          error: "You must be logged in to delete your listings!",
        }),
        {
          status: 401,
        }
      );
    }

    const { listingId } = params;

    if (!listingId || typeof listingId !== "string") {
      return new NextResponse(JSON.stringify({ error: "Invalid listing ID" }), {
        status: 400,
      });
    }

    const listing = await prisma.listing.deleteMany({
      where: {
        id: listingId,
        userId: currentUser.id,
      },
    });

    if (!listing) {
      return new NextResponse(JSON.stringify({ error: "Listing not found" }), {
        status: 404,
      });
    }

    return new NextResponse(
      JSON.stringify({ message: `Property deleted successfully!` }),
      { status: 200 }
    );
  } catch (error: any) {
    return new NextResponse(
      JSON.stringify({ error: error?.message || "Something went wrong" }),
      { status: 500 }
    );
  }
}
