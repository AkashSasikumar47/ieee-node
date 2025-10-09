import React from "react";

interface CardProps {
  title: string;
  description: string;
  date: string;
  type: string;
}

const Card: React.FC<CardProps> = ({ title, description, date, type }) => {
  return (
    <div className="block rounded-lg border border-neutral-200 p-4 shadow-xs bg-white">
      <div>
        <h3 className="font-medium text-lg">{title}</h3>
        <p className="mt-4 font-normal text-sm text-neutral-400">
          {description}
        </p>
      </div>
      <div className="mt-6 flex justify-between items-center">
        <p className="font-medium text-xs text-blue-500">{date}</p>
        <p className="font-medium text-xs text-blue-500">{type}</p>
      </div>
    </div>
  );
};

export default Card;
