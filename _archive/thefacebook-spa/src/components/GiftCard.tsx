import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Gift } from 'lucide-react';

interface GiftCardProps {
  title: string;
  description: string;
  price: string;
  icon?: React.ReactNode;
  delay?: string;
  link: string;
  image?: string;
}

const GiftCard = ({ title, description, price, icon, delay = "0s", link, image }: GiftCardProps) => {
  return (
    <Card
      className="group relative overflow-hidden border-border bg-card/90 backdrop-blur shadow-lg transition-all duration-500 hover:scale-105 hover:border-primary/50 hover:shadow-[0_0_30px_hsl(0_72%_48%_/_0.3)] animate-fade-in"
      style={{ animationDelay: delay }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/10 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

      <CardHeader className="relative">
        {image && (
          <div className="mb-4 flex justify-center">
            <img
              src={image}
              alt={title}
              className="h-32 w-32 object-contain rounded-xl shadow-md transition-all duration-300 group-hover:scale-110"
            />
          </div>
        )}

        {!image && (
          <div className="mb-4 flex justify-center">
            <div className="rounded-full bg-primary/10 p-4 transition-all duration-500 group-hover:bg-primary/20 group-hover:scale-110">
              {icon || <Gift className="h-8 w-8 text-primary" />}
            </div>
          </div>
        )}

        <CardTitle className="text-center text-2xl font-bold text-foreground transition-colors duration-300 group-hover:text-primary">
          {title}
        </CardTitle>

        <CardDescription className="text-center text-muted-foreground">
          {description}
        </CardDescription>
      </CardHeader>

      <CardContent className="relative">
        <div className="text-center">
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 w-full rounded-lg bg-primary px-6 py-3 font-semibold text-primary-foreground text-center transition-all duration-300 hover:bg-primary/90 hover:shadow-[0_0_20px_hsl(0_72%_48%_/_0.4)] inline-block"
          >
            Seleccionar Regalo 🎁
          </a>
        </div>
      </CardContent>
    </Card>
  );
};

export default GiftCard;
