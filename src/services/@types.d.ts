import { ReactNode } from "react";

export type FC<T> = (props: T) => ReactNode;

export type FCP = FC<{ children: ReactNode }>;

export type productType = {
  id: number;
  name: string;
  imageUrl: string;
  description: string;
  category: string;
  price: number;
};
