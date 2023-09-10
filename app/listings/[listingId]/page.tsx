// IMPORTS -
import { Metadata } from "next";
import getCurrentUser from "../../actions/getCurrentUser";
import getListingById from "../../actions/getListingById";
import EmptyState from "../../components/EmptyState";
import ListingClient from "./ListingClient";
import getReservations from "@/app/actions/getReservations";

// PARTIAL -
interface IParams {
  listingId?: string;
}

export async function generateMetadata({
  params,
}: {
  params: IParams;
}): Promise<Metadata> {
  const listing = await getListingById(params);
  if (!listing) {
    return {
      title: "Listing not found",
      description:
        "The listing you are looking for does not exist or has been removed.",
    };
  }

  return {
    title: `${listing.title}`,
    description: listing.description,
  };
}

const ListingPage = async ({ params }: { params: IParams }) => {
  const listing = await getListingById(params);
  const currentUser = await getCurrentUser();
  const reservations = await getReservations(params);

  if (!listing) {
    return (
      <EmptyState
        title="Listing not found"
        subtitle="The listing you are looking for does not exist or has been removed."
        showReset
      />
    );
  }

  return (
    <ListingClient
      listing={listing}
      currentUser={currentUser}
      reservations={reservations}
    />
  );
};

export default ListingPage;
