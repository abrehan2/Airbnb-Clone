// IMPORTS -
import { Listing, User } from "@prisma/client";

export type safeListings = Omit<Listing, "createdAt"> & {
  createdAt: string;
};

export type safeUser = Omit<
  User,
  "createdAt" | "updatedAt" | "emailVerified"
> & {
  createdAt: string;
  updatedAt: string;
  emailVerified: string | null;
};
