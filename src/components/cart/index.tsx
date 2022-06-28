import { Button } from "@material-ui/core";
import { Close } from "@material-ui/icons";
import { useMemo } from "react";
import styled from "styled-components";

import Styles from "./cart.styles";

const Header = styled.div`
  ${Styles.header}
`;

const Title = styled.h5`
  ${Styles.title}
`;

const CartItem = styled.div`
  ${Styles.cartItem}
`;

const CartView = ({ cart, close, modifyCart }) => {
  const CartItems = useMemo(() => {
    return (
      <>
        {cart.map((item) => (
          <CartItem>
            <Title>{item.name}</Title>
            <Button
              style={{ marginLeft: 30 }}
              variant="text"
              onClick={() => modifyCart(item, false)}
            >
              REMOVE
            </Button>
          </CartItem>
        ))}
      </>
    );
  }, [cart, modifyCart]);

  return (
    <div>
      <Header>
        My Cart
        <Button onClick={close}>
          <Close />
        </Button>
      </Header>
      {CartItems}
    </div>
  );
};

export default CartView;
