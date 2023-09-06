// IMPORTS -
import axios from "axios";
import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";
import toast from "react-hot-toast";
import { safeUser } from "../types";
import useLoginModal from "./useLoginModel";

// PARTIALS -
interface IUseFavorite {
  listingId: string;
  currentUser?: safeUser | null;
}

const useFavorite = ({ listingId, currentUser }: IUseFavorite) => {
  const router = useRouter();
  const loginModal = useLoginModal();
  
  const hasFavorited = useMemo(() => {
    const list = currentUser?.favoriteIds || [];
   
    return list.includes(listingId);
  }, [currentUser, listingId]);

  const toggleFavorite = useCallback(
    async (e: React.MouseEvent<HTMLDivElement>) => {
      e.stopPropagation();
      if (!currentUser) {
        toast.error("Login to add to favorites!");
        return loginModal.onOpen();
      }

      try {
        let request;
        if (hasFavorited) {
          request = () => axios.delete(`/api/favorites/${listingId}`);
        } else {
          request = () => axios.post(`/api/favorites/${listingId}`);
        }

        await request();
        router.refresh();
        toast.success(
          hasFavorited ? "Removed from favorites!" : "Added to favorites!"
        );
      } catch (error: any) {
        toast.error(error?.response?.data?.error || "Something went wrong");
      }
    },
    [currentUser,
    hasFavorited,
    listingId,
    loginModal,
    router]
  );

  return {
    hasFavorited,
    toggleFavorite
  }
};

export default useFavorite;