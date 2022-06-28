import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import TextField from "@material-ui/core/TextField";
import { ShoppingCart } from "@material-ui/icons";
import Modal from "react-modal";
import { fetchProducts, Product } from "../../client";
import ProductView from "../product";
import Styles from "./list.styles";
import { includesText } from "../../helpers";
import { CartContext } from "../../context/cart";
import CartView from "../cart";
import { Button } from "@material-ui/core";

const modalStyle = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

const List = styled.div`
  ${Styles.list}
`;

const Header = styled.div`
  ${Styles.header}
`;

const Products = (): JSX.Element => {
  const [list, setList] = useState<Product[]>([]);
  const [filtered, setFiltered] = useState<Product[]>([]);
  const [showModal, setShow] = useState<boolean>(false);
  const { cart, setCart } = useContext(CartContext);

  const modifyCart = useCallback(
    (item, add = true) => {
      if (setCart) {
        if (add) setCart([...cart, item]);
        else {
          const newC = cart.filter((cItem) => cItem.objectID !== item.objectID);
          setCart(newC);
        }
      }
    },
    [cart, setCart]
  );

  useEffect(() => {
    fetchProducts().then((data) => {
      setList(data);
      setFiltered(data);
    });
  }, []);

  const filter = ({ target: { value } }) => {
    if (!value) return setFiltered(list);
    const newList = list.filter((item) =>
      includesText(value.toLowerCase(), item.name, item.description)
    );
    return setFiltered(newList);
  };

  const grid = useMemo((): JSX.Element => {
    return (
      <List>
        {filtered.map((listItem) => (
          <ProductView item={listItem} key={listItem.objectID} />
        ))}
      </List>
    );
  }, [filtered]);

  if (list.length < 1) return <div>loading</div>;

  return (
    <div>
      <Header>
        <TextField
          variant="filled"
          label="Search for an item"
          onChange={filter}
          style={{ minWidth: 500, alignSelf: "flex-start", margin: 10 }}
        />
        <Button onClick={() => setShow(true)}>
          <ShoppingCart />
        </Button>
      </Header>
      {grid}
      <Modal isOpen={showModal} contentLabel="My Cart" style={modalStyle}>
        <CartView
          cart={cart}
          close={() => setShow(false)}
          modifyCart={modifyCart}
        />
      </Modal>
    </div>
  );
};

export default Products;
