import React, {useMemo, useState} from "react";
import {useBasket} from "../state/basket";
import styled from "styled-components";
import Money from "./money";

const Wrapper = styled.div`
  position: relative;
  border: 1px solid lightgray;
  text-align: left;
  display: flex;
  flex: 1;
  flex-direction: column;
  // requirement of maximal width of 360px, and it aligns it nicely center
  max-width: 360px;
  margin: 0 auto; 
  width: 100%;
`;

const Image = styled.div`
  padding-top: calc( 0.3 / 0.4 * 100%);
  overflow: hidden;
  position: relative;
  background-color: lightgray;

  img {  
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    object-position: center;
    object-fit: cover;
  }
`;

const Content = styled.div`
  padding: 25px 15px;
  background-color: white;
  display: flex;
  flex-direction: column;
  gap: 15px 0;
  height: 100%;
`

const Title = styled.span`
  display: block;
  font-weight: 500;
`

const Vendor = styled.a`
  display: block;
  color: var(--color-brand);
  text-decoration: none;
  font-size: 0.9em;
`

const Select = styled.select`
  display: block;
  width: 100%;
  background-color: #ECF1EA;
  color: #3D5D5A;
  text-transform: uppercase;
  border: none;
  padding: 5px 10px;
  font-size: 0.9em;
`

const Column = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: end;
`

const Button = styled.button`
  font-weight: 600;
  background-color: var(--color-brand);
  width: 100%;
  border: none;
  color: white;
  padding: 9px;
  cursor: pointer;
`

const Prices = styled.div`
  margin-top: auto;
`

const SaleText = styled.span`
  color: var(--color-sale);
`

const PriceStroke = styled.span`
  text-decoration: line-through;
  font-size: 0.9em;
`

const PriceSale = styled.span`
  color: var(--color-sale);
  font-size: 1.1em;
`

const Price = styled.span`
  font-size: 1.1em;
`

const PricePerUnit = styled.span`
  font-size: 0.9em;
`

const SingleVariant = styled.span`
  text-transform: uppercase;
  color: gray;
  font-size: 0.9em;
`

const Product = ({ data }) => {
  const {
    media,
    name,
    producer,
    variants: relative_variants,
    ...variant
  } = data;

  const variants = [{ name, ...variant }, ...relative_variants];
  const image = media.find(item => item.type === "Image").url;
  const fallbackImg = "https://fd-v5-api.imgix.net/assets/images/product-placeholder.svg";

  const [selectedVariant, setSelectedVariant] = useState(variants[0]);
  const [imgUrl, setImgUrl] = useState(image);
  const { products: basketProducts, addToBasket } = useBasket();

  const selectedVariantInBasket = useMemo(() => {
    const count = basketProducts.filter((items) => {
      return items.id === selectedVariant.id
    });
    return count.length || 0;
  }, [selectedVariant, basketProducts])

  const onSelectVariant = (event) => {
    const id = event.target.value
    const variant = variants.find(variant => variant.id === id);
    if (variant) {
      setSelectedVariant(variant);
    }
  }

  const showSalePrice = selectedVariant.salePrice && selectedVariant.salePrice.pence !== selectedVariant.price.pence;

  return (
    <Wrapper>

      {imgUrl && (
        <Image>
          <img src={imgUrl} alt={name} onError={() => setImgUrl(fallbackImg)}/>
        </Image>
      )}
      <Content>
        <Title href={`/#${name}`} title={`see more details about ${name}`}>{name}</Title>
        <Vendor href={`/#${producer.name}`} title={`see more produce from ${producer.name}`}>{producer.name}</Vendor>
        {variants.length > 1 && (
          <Select onChange={(event) => onSelectVariant(event)} defaultValue={selectedVariant.id}>
            {variants.map((variant) => {
              return <option key={variant.id} value={variant.id}>
                {variant.measurement.displayName}
              </option>
            })}
          </Select>
        )}
        {variants.length === 1 && (
          <SingleVariant>{selectedVariant.measurement.displayName}</SingleVariant>
        )}
        <Prices>
          {showSalePrice && (
            <>
              <SaleText>{selectedVariant.saleText}</SaleText>
              <PriceStroke><Money pence={selectedVariant.price.pence}/></PriceStroke>
              <Column>
                <PriceSale><Money pence={selectedVariant.salePrice.pence}/></PriceSale>
                <PricePerUnit>{selectedVariant.pricePerUnit}</PricePerUnit>
              </Column>
            </>
          )}
          {!showSalePrice && (
            <Column>
              <Price><Money pence={selectedVariant.price.pence}/></Price>
              <PricePerUnit>{selectedVariant.pricePerUnit}</PricePerUnit>
            </Column>
          )}
        </Prices>
        <div>
          {selectedVariantInBasket > 0 && `In Basket ${selectedVariantInBasket}`}
          <Button type="submit" onClick={() => addToBasket(selectedVariant)}>Add</Button>
        </div>
      </Content>
    </Wrapper>
  )
}

export default Product;
