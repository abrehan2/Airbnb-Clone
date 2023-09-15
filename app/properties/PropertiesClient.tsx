"use client";

// IMPORTS -
import { useRouter } from "next/navigation";
import Container from "../components/Container";
import Heading from "../components/Heading";
import { safeListings, safeUser } from "../types";
import { useCallback, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import ListingCard from "../components/listings/ListingCard";

// PARTIALS -
interface PropertiesClientProps {
  listings: safeListings[];
  currentUser?: safeUser | null;
}

const PropertiesClient: React.FC<PropertiesClientProps> = ({
  listings,
  currentUser,
}) => {
  const router = useRouter();

  const [deleteId, setDeletingId] = useState(``);
  const onCancel = useCallback(
    (id: string) => {
      setDeletingId(id);
      axios
        .delete(`/api/listings/${id}`)
        .then(() => {
          toast.success("Listing deleted");
          router.refresh();
        })
        .catch((error: any) => {
          toast.error(error?.response?.data?.error);
        })
        .finally(() => {
          setDeletingId(``);
        });
    },
    [router]
  );

  return (
    <Container>
      <Heading
        title="Properties"
        subtitle="List of your properties"
      />
      <div
        className="
    mt-10
    grid
    grid-cols-1
    sm:grid-cols-2
    md:grid-cols-3
    lg:grid-cols-4
    xl:grid-cols-5
    2xl:grid-cols-6
    gap-8"
      >
        {listings.map((listing) => {
         return (
           <ListingCard
             key={listing.id}
             data={listing}
             actionId={listing.id}
             onAction={onCancel}
             disabled={deleteId === listing.id}
             actionLabel="Deleted property"
             currentUser={currentUser}
           />
         );
        })}
      </div>
    </Container>
  );
};

export default PropertiesClient;
