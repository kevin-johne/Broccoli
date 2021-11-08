import {createContext, useContext, useState} from "react";

export const basketState = {
  products: [],
  count: 0,
}

export const BasketContext = createContext([
  {}, (state) => {}
]);

export const BasketProvider = (props) => {
  const [state, setState] = useState(basketState);
  return (
    <BasketContext.Provider value={[state, setState]}>
      {props.children}
    </BasketContext.Provider>
  );
};

export const useBasket = () => {
  const [state, setState] = useContext(BasketContext);

  function addToBasket(variant) {
    const products = [...state.products];
    products.push(variant);

    setState(state => ({
      ...state,
      products
    }));
  }

  return {
    count: state.products.length,
    products: state.products,
    addToBasket,
  }
};
