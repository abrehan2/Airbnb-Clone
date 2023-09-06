"use client";

// IMPORTS -
import { safeUser } from "@/app/types";

// PARTIALS -
interface ListingHeadProps {
  title: string;
  locationValue: string;
  imgSrc: string;
  id: string;
  currentUser?: safeUser | null;
}

const ListingHead: React.FC<ListingHeadProps> = ({
  title,
  locationValue,
  imgSrc,
  id,
  currentUser,
}) => {
  return <div>ListingHead</div>;
};

export default ListingHead;
