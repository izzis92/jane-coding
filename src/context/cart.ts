import React from "react";
import { Product } from "../client";

export interface ICartContext {
  cart: Product[];
  setCart?: (item?: Product[]) => void;
}

export const CartContext = React.createContext<ICartContext>({ cart: [] });
