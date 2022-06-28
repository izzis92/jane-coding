import React from "react";
import {
  fireEvent,
  render,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";

import App from "./App";
import * as Client from "./client";
import { products } from "../public/data/products.json";
import { CartContext } from "./context/cart";
import ProductView from "./components/product";
import CartView from "./components/cart";

/**
 * We should test that following requirements are met.
 *
 * 1. Customer should be presented with a list of products on app load.
 *
 * 2. When a customer types in a search box some text, the product
 *    results should filter to display only items with a name
 *    or description matching that text.
 *
 * 3. Customer should be able to add a product to their cart.
 *
 * 4. Customer should be able to remove a product from their cart.
 *
 */

test("renders correctly", async () => {
  jest
    .spyOn(Client, "fetchProducts")
    .mockImplementationOnce(() =>
      Promise.resolve([
        products[0] as Client.Product,
        products[1] as Client.Product,
      ])
    );
  render(<App />);
  await waitForElementToBeRemoved(() => screen.queryByText("loading"));

  // renders correct amount of items
  expect(screen.getAllByTestId("product-item").length).toBe(2);

  // filter works correctly
  const input = screen.getByRole("textbox");
  await fireEvent.change(input, { target: { value: "Blueberry" } });
  expect(screen.getAllByTestId("product-item").length).toBe(1);
});

test("add to cart", () => {
  const setCart = jest.fn();
  render(
    <CartContext.Provider value={{ cart: [], setCart }}>
      <ProductView item={products[0] as Client.Product} />
    </CartContext.Provider>
  );
  fireEvent.click(screen.getByText("Add to cart"));
  expect(setCart).toHaveBeenCalledWith([products[0]]);
});

test("remove from cart", () => {
  const setCart = jest.fn();
  const item = products[0] as Client.Product;
  render(<CartView cart={[item]} modifyCart={setCart} close={jest.fn()} />);
  fireEvent.click(screen.getByText("REMOVE"));
  expect(setCart).toHaveBeenCalledWith(item, false);
});
