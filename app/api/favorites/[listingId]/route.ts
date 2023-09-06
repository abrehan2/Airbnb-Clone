// IMPORTS -
import { NextResponse } from "next/server";
import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prismadb";

// PARTIALS -
interface IParams {
  listingId?: string;
}

export async function POST(request: Request, { params }: { params: IParams }) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return new NextResponse(
      JSON.stringify({ error: "Login to add to favorites" }),
      { status: 401 }
    );
  }

  const { listingId } = params;

  if (!listingId || typeof listingId !== "string") {
    return new NextResponse(JSON.stringify({ error: "Invalid listing ID" }), {
      status: 400,
    });
  }

  let favoriteIds = [...(currentUser.favoriteIds || [])];

  if (favoriteIds.includes(listingId)) {
    return new NextResponse(
      JSON.stringify({ error: "Listing already favorited" }),
      { status: 400 }
    );
  }

  favoriteIds.push(listingId);

  const user = await prisma.user.update({
    where: {
      id: currentUser.id,
    },
    data: {
      favoriteIds,
    },
  });

  return new NextResponse(JSON.stringify({ user }), { status: 200 });
}

export async function DELETE(
  request: Request,
  { params }: { params: IParams }
) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return new NextResponse(
      JSON.stringify({ error: "Login to remove from favorites" }),
      { status: 401 }
    );
  }

  const { listingId } = params;

  if (!listingId || typeof listingId !== "string") {
    return new NextResponse(JSON.stringify({ error: "Invalid listing ID" }), {
      status: 400,
    });
  }

  let favoriteIds = [...(currentUser.favoriteIds || [])];

  if (!favoriteIds.includes(listingId)) {
    return new NextResponse(
      JSON.stringify({ error: "Listing not favorited" }),
      { status: 400 }
    );
  }

  favoriteIds = favoriteIds.filter((id) => id !== listingId);

  const user = await prisma.user.update({
    where: {
      id: currentUser.id,
    },
    data: {
      favoriteIds,
    },
  });

  return new NextResponse(JSON.stringify({ user }), { status: 200 });
}
