/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

const BurgerStyled = (props) => (
  <button
    aria-label="menu"
    css={css`
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      width: 2rem;
      height: 2rem;
      background: transparent;
      border: none;
      cursor: pointer;
      padding: 0;
      margin-right: 10px;

      &:focus {
        outline: none;
      }

      div {
        width: 2rem;
        height: 0.25rem;
        background: ${props.isMenuOpen ? '#252525' : 'white'};
        border-radius: 10px;
        transition: all 0.3s linear;
        position: relative;
        transform-origin: 1px;

        &:first-of-type {
          transform: ${props.isMenuOpen ? 'rotate(45deg)' : 'rotate(0)'};
        }

        &:nth-of-type(2) {
          opacity: ${props.isMenuOpen ? '0' : '1'};
          transform: ${props.isMenuOpen ? 'translateX(20px)' : 'translateX(0)'};
        }

        &:nth-of-type(3) {
          transform: ${props.isMenuOpen ? 'rotate(-45deg)' : 'rotate(0)'};
        }
      }
    `}
    onClick={props.onClick}
  >
    {props.children}
  </button>
);

export default function Burger({ isMenuOpen, toggleMenu }) {
  return (
    <BurgerStyled
      onClick={() => toggleMenu(!isMenuOpen)}
      isMenuOpen={isMenuOpen}
    >
      <div data-cy="hamburger-menu" />
      <div />
      <div />
    </BurgerStyled>
  );
}
