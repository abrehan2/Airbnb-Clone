"use client";

import { FC } from "react";
import { safeUser } from "../../types";
import useCountries from "../../hooks/useCountries";
import Heading from "../Heading";
import Image from "next/image";
import HeartButton from "../HeartButton";

interface ListingHeadProps {
  title: string;
  imgSrc: string;
  locationValue: string;
  id: string;
  currentUser?: safeUser | null;
}

const ListingHead: FC<ListingHeadProps> = ({
  title,
  imgSrc,
  locationValue,
  id,
  currentUser,
}) => {
  const { getByValue } = useCountries();

  const location = getByValue(locationValue);

  return (
    <>
      <Heading
        title={title}
        subtitle={`${location?.region}, ${location?.label}`}
      />

      <div className="w-full h-[60vh] overflow-hidden rounded-xl relative">
        <Image
          src={imgSrc}
          alt={`${title}-image`}
          fill
          className="object-cover w-full"
        />

        <div className="absolute top-5 right-5">
          <HeartButton listingId={id} currentUser={currentUser} />
        </div>
      </div>
    </>
  );
};

export default ListingHead;
