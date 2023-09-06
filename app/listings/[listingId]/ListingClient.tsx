"use client";

// IMPORTS -
import { useMemo } from "react";
import { Reservation } from "@prisma/client";
import { safeListings, safeUser } from "@/app/types";
import { categories } from "@/app/components/navbar/Categories";
import ListingHead from "@/app/components/listings/ListingHead";

// PARTIALS -
interface ListingClientProps {
  reservations?: Reservation[];
  listing: safeListings & {
    user: safeUser;
  };

  currentUser?: safeUser | null;
}

const ListingClient: React.FC<ListingClientProps> = ({
  listing,
  currentUser,
}) => {
  const category = useMemo(() => {
    return categories.find((item) => item.label === listing.category);
  }, [listing.category]);

  return (
    <div className="max-w-screen-lg mx-auto">
      <div className="flex flex-col gap-6">
        <ListingHead
          title={listing.title}
          imgSrc={listing.imgSrc}
          locationValue={listing.locationValue}
          id={listing.id}
          currentUser={currentUser}
        />
      </div>
    </div>
  );
};

export default ListingClient;
