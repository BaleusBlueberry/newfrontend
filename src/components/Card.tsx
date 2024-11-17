import { ReactNode } from "react";
import placeholderImage from "../content/placeholder.png";

interface CardProps {
  children?: ReactNode;
  title: ReactNode;
  textsize?: BigInteger;
}

interface ProductCardProps extends CardProps {
  image?: string;
  text?: string;
  price?: GLfloat;
}

const Card: React.FC<CardProps> = (props: CardProps) => {
  return (
    <div className=" p-6 shadow-lg rounded-lg text-center">
      <h2 className="text-xl text-center font-semibold">{props.title}</h2>
      <div className="flex items-center justify-center">{props.children}</div>
    </div>
  );
};

const NotFoundCard: React.FC<CardProps> = (props: CardProps) => {
  return (
    <div className="Card p-6 shadow-lg rounded-lg text-center">
      <h2 className="text-xl text-center font-semibold mb-2">{props.title}</h2>
      <div className="flex items-center justify-center">{props.children}</div>
    </div>
  );
};

const ProductCard: React.FC<ProductCardProps> = (props: ProductCardProps) => {
  return (
    <div className="Card p-6 shadow-lg rounded-lg">
      <div className="flex items-center justify-between">
        <img
          className="object-cover w-24 h-24"
          src={
            props.image && !props.image.toLowerCase().includes("string")
              ? props.image
              : placeholderImage
          }
          alt="Product"
        />
        <div className="flex flex-col gap-2">
          <h3 className="text-sm font-semibold">{props.title}</h3>
          <p className="text-sm">{props.text}</p>
          <p className="text-sm">price: {props.price}</p>
        </div>
      </div>
    </div>
  );
};

export { Card, NotFoundCard, ProductCard };
