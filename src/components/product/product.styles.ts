import { css } from "styled-components";

const Styles = {
  container: css`
    background-color: #f0f8ff;
    elevation: 50deg;
    width: 300px;
    height: 400px;
    padding: 20px;
    margin: 10px;
    display: flex;
    flex-direction: column;
  `,
  description: css`
    font-size: 13px;
    flex: 1;
  `,
  label: css`
    background-color: grey;
    padding: 3px;
    border-radius: 5px;
    inline-size: fit-content;
    color: white;
  `,
  price: css`
    font-size: 15px;
    inline-size: fit-content;
    color: blue;
  `,
  title: css``,
  info: css`
    flex-direction: row;
    display: flex;
    justify-content: space-between;
  `,
};

export default Styles;
