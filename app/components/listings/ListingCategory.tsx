"use client";

// IMPORTS -
import { IconType } from "react-icons";

// PARTIALS -
interface ListingCategoryProps {
  icon: IconType;
  label: String;
  description: string;
}

const ListingCategory: React.FC<ListingCategoryProps> = ({
  icon: Icon,
  label,
  description,
}) => {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-row items-center gap-4"></div>
      <Icon size={40} className="text-neutral-600" />
      <div className="flex flex-col">
        <div className="text-lg font-semibold">{label}</div>
        <div className="text-neutral-500 font-light">{description}</div>
      </div>
    </div>
  );
};

export default ListingCategory;
