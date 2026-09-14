export type Category = {
  id: string;
  name: string;
  emoji: string;
};

export type MenuItem = {
  id: string;
  categoryId: string;
  name: string;
  description: string;
  priceBRL: number;
  emoji: string;
  image?: string;
  popular?: boolean;
};

export type Neighborhood = {
  name: string;
  feeBRL: number;
  note?: string;
};

export type CartItem = MenuItem & { qty: number };
