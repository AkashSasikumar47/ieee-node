import { FeedType } from "@/lib/supabase";

interface FeedCardProps {
  title: string;
  description: string;
  date: string;
  type: FeedType;
}

const FeedCard = ({ title, description, date, type }: FeedCardProps) => {
  return (
    <div className="block rounded-lg border border-neutral-200 bg-white p-4 shadow-xs">
      <div>
        <h3 className="text-base font-semibold">{title}</h3>
        <p className="mt-3 text-sm font-normal text-neutral-400">
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

export default FeedCard;
