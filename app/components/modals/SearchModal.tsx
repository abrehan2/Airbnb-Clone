"use client";

// IMPORTS -
import Modal from "./Modal";
import useSearchModal from "@/app/hooks/useSearchModal";
import { useRouter, useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import { Range } from "react-date-range";
import dynamic from "next/dynamic";

// PARTIALS -
enum STEPS {
  LOCATION = 0,
  DATE = 1,
  INFO = 2,
}

const SearchModal = () => {
  const searchState = useSearchModal();
  const router = useRouter();
  const params = useSearchParams();
  const [set, setStep] = useState(STEPS.LOCATION);
  const [guestCount, setGuestCount] = useState(1);
  const [roomCount, setroomCount] = useState(1);
  const [bathroomCount, setbathroomCount] = useState(1);
  const [dateRange, setDateRange] = useState<Range>({
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection'
  });

  const Map = useMemo(() => dynamic(), {
    
  })

  return (
    <Modal
      isOpen={searchState.isOpen}
      onClose={searchState.onClose}
      onSubmit={searchState.onOpen}
      title="Filters"
      actionLabel="Search"
    />
  );
};

export default SearchModal;
