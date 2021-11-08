import React from 'react';
import styled from 'styled-components';

import logoImg from "../logo.svg";
import Basket from "./basket";

const Wrapper = styled.div`
  position: sticky;
  top: 0;
  z-index: 100;
  background-color: var(--color-brand);
`

const InnerHeader = styled.header`
  width: calc( 100vw - 40px);
  max-width: var(--max-page-width);
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
`

const Logo = styled.img`
  border: 0;
`

const LogoLink = styled.a`
 display: block;
 width: 100px;
`

const Header = () => {
  return (
    <Wrapper>
      <InnerHeader>
        <LogoLink href="/">
          <Logo src={logoImg} alt="Farmdrop logo"/>
        </LogoLink>
        <Basket/>
      </InnerHeader>

    </Wrapper>
  )
}

export default Header;
