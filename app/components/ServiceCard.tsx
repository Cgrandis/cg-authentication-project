import { Card, CardContent } from "@/app/components/ui/cards";

interface ServiceCardProps {
  title: string;
  description: string;
  duration: number;
}

const ServiceCard = ({ title, description, duration }: ServiceCardProps) => {
  return (
    <Card className="border-l-4 border-green-500 shadow-sm">
      <CardContent>
        <h3 className="text-xl font-semibold">{title}</h3>
        <p className="text-gray-600 mt-1">{description}</p>
        <p className="text-sm text-gray-500 mt-1">Duração: {duration} minutos</p>
      </CardContent>
    </Card>
  );
};

export default ServiceCard;
