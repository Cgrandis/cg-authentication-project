import { Card, CardContent } from "@/app/components/authentication/shared/Cards";

interface StatCardProps {
  title: string;
  value: number;
  description: string;
  color?: string;
}

const StatCard = ({ title, value, description, color }: StatCardProps) => {
  return (
    <Card className={`border-l-4 ${color} shadow-sm`}>
      <CardContent>
        <h3 className="text-xl font-semibold">{title}</h3>
        <p className="text-4xl font-bold mt-2">{value}</p>
        <p className="text-sm text-gray-500 mt-1">{description}</p>
      </CardContent>
    </Card>
  );
};

export default StatCard;
