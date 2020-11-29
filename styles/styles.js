/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

export const linkStyles = css`
  border: 1px solid #1564d1;
  color: #1564d1;
  font-size: 0.875rem;
  padding: 5px 10px;
  border-radius: 4px;
  background-color: #fcf8f2;

  &:hover {
    background-color: #1564d1;
    color: white;
    cursor: pointer;
  }
`;

export const boxStyles = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  letter-spacing: 1px;
  color: #252525;
  button {
    border: 1px solid #1564d1;
    color: #1564d1;
    background-color: #fcf8f2;
    font-size: 14px;
    padding: 5px 10px;
    border-radius: 4px;
    cursor: pointer;
  }
  button:hover {
    background-color: #1564d1;
    color: white;
  }

  @media screen and (min-width: 768px) {
    input,
    textarea {
      min-width: 300px;
    }
  }
  a {
    color: #1564d1;
  }
`;
export const wholeCardStyles = css`
  display: grid;
  grid-template-columns: 1fr;
  row-gap: 25px;

  @media screen and (min-width: 650px) {
    grid-template-columns: 1fr 1fr;
    column-gap: 60px;
  }
  @media screen and (min-width: 1000px) {
    grid-template-columns: 1fr 1fr 1fr;
    row-gap: 50px;
    column-gap: 50px;
  }
`;

export const cardStyles = css`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: white;
  max-width: 300px;
  padding: 25px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  border-radius: 4px;
  text-align: center;

  img {
    max-height: 100px;
    max-width: 200px;
  }
  input {
    font-size: 1.125rem;
    font-family: 'Josefin Sans';
  }
  button,
  a {
    border: 1px solid #41b076;
    color: #41b076;
    font-size: 14px;
    padding: 5px 10px;
    border-radius: 4px;
    cursor: pointer;
    background-color: white;
  }
  a:hover,
  button:hover {
    background-color: #41b076;
    color: white;
  }
  button:disabled {
    opacity: 0.65;
    cursor: unset;
    :hover {
      background-color: white;
      color: #41b076;
    }
  }

  h4 {
    color: #ff8914;
    font-weight: normal;
  }
`;

export const actionItemsWrapper = css`
  display: flex;
  flex-direction: column;

  & > *:first-of-type {
    margin-bottom: 10px;
  }
`;
