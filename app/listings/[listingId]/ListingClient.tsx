"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { FC, useCallback, useEffect, useMemo, useState } from "react";
import { toast } from "react-hot-toast";
import Container from "../../components/Container";
import { safeListings, safeUser } from "../../types";
import { categories } from "@/app/components/navbar/Categories";
import ListingHead from "@/app/components/listings/ListingHead";
import ListingInfo from "@/app/components/listings/ListingInfo";

interface ListingClientProps {
  listing: safeListings & { user: safeUser };
  currentUser?: safeUser | null;
}

const ListingClient: FC<ListingClientProps> = ({ listing, currentUser }) => {
  const [isLoading, setIsLoading] = useState(false);

  const category = useMemo(() => {
    return categories.find((item) => item.label === listing.category);
  }, [listing.category]);

  return (
    <Container>
      <div className="max-w-screen-lg mx-auto">
        <div className="flex flex-col gap-6">
          <ListingHead
            title={listing.title}
            imgSrc={listing.imgSrc}
            locationValue={listing.locationValue}
            id={listing.id}
            currentUser={currentUser}
          />
          <div
            className="
grid
grid-cols-1
md:grid-cols-7
md:gap-10
mt-6
"
          >
            <ListingInfo
              user={listing.user}
              category={category}
              description={listing.description}
              roomCount={listing.roomCount}
              guestCount={listing.guestCount}
              bathroomCount={listing.bathroomCount}
              locationValue={listing.locationValue}
            />
          </div>
        </div>
      </div>
    </Container>
  );
};

export default ListingClient;
