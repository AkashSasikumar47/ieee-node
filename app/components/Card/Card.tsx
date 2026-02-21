import { FeedType } from "@/lib/supabase";

interface CardProps {
  title: string;
  description: string;
  date: string;
  type: FeedType;
}

const Card = ({ title, description, date, type }: CardProps) => {
  return (
    <div className="block rounded-lg border border-neutral-200 bg-white p-4 shadow-xs">
      <div>
        <h3 className="text-lg font-medium">{title}</h3>
        <p className="mt-4 text-sm font-normal text-neutral-400">
          {description}
        </p>
      </div>
      <div className="mt-6 flex items-center justify-between">
        <p className="text-xs font-medium text-blue-500">{date}</p>
        <p className="text-xs font-medium text-blue-500">{type}</p>
      </div>
    </div>
  );
};

export default Card;
