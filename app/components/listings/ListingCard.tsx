"use client";

// npm i date-fns

// IMPORTS -
import { Listing, Reservation } from "@prisma/client";
import { safeUser } from "@/app/types";
import { useRouter } from "next/navigation";
import useCountries from "@/app/hooks/useCountries";
import { useCallback, useMemo } from "react";
import { format } from "date-fns";
import Image from "next/image";
import HeartButton from "../HeartButton";
import Button from "../Button";

// PARTIALS -
interface ListingCardProps {
  data: Listing;
  reservation?: Reservation;
  onAction?: (id: string) => void;
  disabled?: boolean;
  actionLabel?: string;
  actionId?: string;
  currentUser?: safeUser | null;
}

const ListingCard: React.FC<ListingCardProps> = ({
  data,
  reservation,
  onAction,
  disabled,
  actionLabel,
  actionId = "",
  currentUser,
}) => {
  const router = useRouter();
  const { getByValue } = useCountries();
  const location = getByValue(data.locationValue);

  const handleCancel = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();

      if (disabled) return;

      onAction?.(actionId);
    },
    [onAction, actionId, disabled]
  );

  const price = useMemo(() => {
    if (reservation) {
      return reservation.totalPrice;
    }

    return data.price;
  }, [reservation, data.price]);

  const reservationDate = useMemo(() => {
    if (!reservation) {
      return null;
    }

    const start = new Date(reservation.startDate);
    const end = new Date(reservation.endDate);

    return `${format(start, "PP")} - ${format(end, "PP")}`;
  }, [reservation]);

  return (
    <div
      className="col-span-1 cursor-pointer group"
      onClick={() => router.push(`/listings/${data.id}`)}
    >
      <div className="flex flex-col gap-2 w-full">
        <div
          className="
    aspect-square 
    w-full 
    relative 
    overflow-hidden 
    rounded-xl"
        >
          <Image
            fill
            alt="Listing"
            src={data.imgSrc}
            className="
        object-cover
        h-full
        w-full
        group-hover:scale-110
        transition"
          />
        </div>

        <div className="absolute">
          <HeartButton listingId={data.id} currentUser={currentUser} />
        </div>
      </div>

      <div className="font-semibold text-lg">
        {location?.region}, {location?.label}
      </div>
      <div className="font-light text-neutral-500">
        {reservationDate || data?.category}
      </div>
      <div className="flex flex-row items-center gap-1">
        <div className="font-semibold">${price}</div>
        {!reservation && <div className="font-light">night</div>}
      </div>
      {onAction && actionLabel && (
        <Button
          disabled={disabled}
          small
          label={actionLabel}
          onClick={handleCancel}
        />
      )}
    </div>
  );
};

export default ListingCard;
