"use client";

// IMPORTS -
import useRentModal from "@/app/hooks/useRentModel";
import Modal from "./Modal";

const RentModel = () => {
  const rentModel = useRentModal();

  return (
    <Modal
      isOpen={rentModel.isOpen}
      onClose={rentModel.onClose}
      onSubmit={rentModel.onClose}
      actionLabel="Submit"
      title="Airbnb your home!"
    />
  );
};

export default RentModel;
