import styled from "styled-components";
import { Button } from "@material-ui/core";
import { Product } from "../../client";
import Styles from "./product.styles";
import { CartContext } from "../../context/cart";
import { useContext } from "react";

const Container = styled.div`
  ${Styles.container}
`;

const Title = styled.h5`
  ${Styles.title}
`;

const Info = styled.div`
  ${Styles.info}
`;
const Description = styled.div`
  ${Styles.description}
`;

const Price = styled.div`
  ${Styles.price}
`;

const Label = styled.div`
  ${Styles.label}
`;

interface Props {
  item: Product;
}

const ProductView = ({ item }: Props): JSX.Element => {
  const { cart, setCart } = useContext(CartContext);
  const { name, description, sort_price, kind } = item;

  const added = cart.findIndex((i) => i.objectID === item.objectID) > -1;
  const addToCart = () => {
    if (setCart) {
      setCart([...cart, item]);
    }
  };

  return (
    <Container data-testid="product-item">
      <Info>
        <Label>{kind}</Label>
        <Price>{`$ ${sort_price}`}</Price>
      </Info>
      <Title>{name}</Title>
      <Description>{description}</Description>
      <Button
        disabled={added}
        style={{ alignSelf: "center" }}
        variant="contained"
        onClick={addToCart}
      >
        {added ? "Added" : "Add to cart"}
      </Button>
    </Container>
  );
};

export default ProductView;
