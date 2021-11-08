import React from 'react';
import styled from 'styled-components';

import icon from "../assets/icons/basket.svg";
import {useBasket} from "../state/basket";

const Wrapper = styled.div`
  position: relative;
`

const Count = styled.span`
  position: absolute;
  top: 5px;
  right: 5px;
  color: white;
`

const Basket = () => {
  const { count } = useBasket();

  return (
    <Wrapper>
      <img src={icon} alt="basket icon"/>
      <Count>{count}</Count>
    </Wrapper>
  )
}

export default Basket;
