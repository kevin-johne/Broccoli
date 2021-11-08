import React from 'react';
import styled from 'styled-components';
import {useQuery, gql} from "@apollo/client";
import Product from "./product";

const Wrapper = styled.div`
  display: grid;
  // requirement of minimum of 200px
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  grid-gap: 10px;
  grid-area: auto;
  justify-content: center;
  width: calc( 100vw - 40px);
  max-width: var(--max-page-width);
  margin: 50px auto;
`;


const Products = () => {
  const { data , loading, error } = useQuery(ProductQuery, { variables: { query: "Lamb Roasting Joints", first: 10 }});

  let products = [];
  if(data) {
    products = data.productSearch.nodes;
  }

  return (
    <Wrapper>
      {loading && (
        <span>... Loading ...</span>
      )}
      {!loading && !error && products.length > 0 && products.map((product, index) => {
        return <Product key={index} data={product}/>
      })}

      {error && (
        <>
          <h3>We couldn't load the products, please try again later.</h3>
          <pre> Error: {error.message}</pre>
        </>
      )}
    </Wrapper>
  )
}

const ProductQuery = gql`
    query productSearch($query: String, $first: Int){
        productSearch(query: $query, first: $first) {
            nodes {
                id
                name
                producer {
                    name
                }
                measurement {
                    displayName
                }
                pricePerUnit
                media {
                    type
                    url
                    position
                }
                variants {
                    id
                    pricePerUnit
                    measurement {
                        displayName
                    }
                    price {
                        pence
                    }
                    saleText
                    salePrice {
                        pence
                    }
                }
                saleText
                price {
                    pence
                }
                salePrice {
                    pence
                }
            }
        }
    }
`;


export default Products;
