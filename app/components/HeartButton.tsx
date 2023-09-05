"use client";

// IMPORTS -
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { safeUser } from "../types";

// PARTIALS -
interface HeartButtonProps {
  listingId: string;
  currentUser?: safeUser | null;
}

const HeartButton: React.FC<HeartButtonProps> = ({
  listingId,
  currentUser,
}) => {
  const hasFavorited = false;
  const toggleFavorite = () => {};

  return (
    <div
      onClick={toggleFavorite}
      className="
      relative 
      hover:opacity-80 
      transition 
      cursor-pointer      
      "
    >
      <AiOutlineHeart
        size={28}
        className="
      fill-white
      absolute
      left-2
      top-2       
      "
      />

      <AiFillHeart
        size={28}
        className={
          hasFavorited
            ? "fill-rose-500 left-2 top-2 absolute"
            : "fill-neutral-500/70 left-2 top-2 absolute"
        }
      />
    </div>
  );
};

export default HeartButton;
