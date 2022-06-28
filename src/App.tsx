import { useState } from "react";
import "./App.css";
import Products from "./components/productList";
import { CartContext } from "./context/cart";

function App() {
  const [cart, setCart] = useState([] as any);
  return (
    <div className="App">
      <CartContext.Provider value={{ cart, setCart }}>
        <Products />
      </CartContext.Provider>
    </div>
  );
}

export default App;
