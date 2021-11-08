import { render, screen, fireEvent } from '@testing-library/react';
import Product from "./product";
import {BasketProvider} from "../state/basket";

const oneVariant = {
  "id": "1",
  "name": "100% Pasture Fed Organic Leg of Lamb",
  "producer": {
    "name": "Proper Food Collective"
  },
  "measurement": {
    "displayName": "1 Leg (1.5kg)"
  },
  "pricePerUnit": "£21.32/kg",
  "media": [
    {
      "type": "Image",
      "url": "https://fd-v5-api-release.imgix.net/assets/product_images/87899fc89dfca6fac8751445b627234022ec762c48645e5e0f3f6ab07ddf49b8/Horton_HOuse_100__Pasture_Fed_Organic_Leg_of_LambFD20_Sept7.jpg",
      "position": 1
    }
  ],
  "variants": [],
  "saleText": null,
  "price": {
    "pence": 3198
  },
  "salePrice": null
};

const multiVariants = {
  "id": "2",
  "name": "100% Pasture Fed Organic Leg of Lamb",
  "producer": {
    "name": "Proper Food Collective"
  },
  "measurement": {
    "displayName": "Half a Leg (750g)"
  },
  "pricePerUnit": "£21.32/kg",
  "media": [
    {
      "type": "Image",
      "url": "https://fd-v5-api-release.imgix.net/assets/product_images/87899fc89dfca6fac8751445b627234022ec762c48645e5e0f3f6ab07ddf49b8/Horton_HOuse_100__Pasture_Fed_Organic_Leg_of_LambFD20_Sept7.jpg",
      "position": 1
    }
  ],
  "variants": [oneVariant],
  "saleText": null,
  "price": {
    "pence": 2000
  },
  "salePrice": null
}

test('should render one variant', () => {
  render(<Product data={oneVariant}/>);
  let title = screen.queryByText(oneVariant.name);
  expect(title).toBeInTheDocument();

  let vendor = screen.queryByText(oneVariant.producer.name)
  expect(vendor).toBeInTheDocument();

  let variant = screen.queryByText(oneVariant.measurement.displayName);
  expect(variant).toBeInTheDocument();

  let price = screen.queryByText(`£31.98`);
  expect(price).toBeInTheDocument();

  let addToBasket = screen.queryByText("Add");
  expect(addToBasket).toBeInTheDocument();
});

test('should render two variants', () => {
  render(<Product data={multiVariants}/>);

  let options = screen.getAllByRole('option');
  expect(options.length).toBe(2);
});

test('should change the price when changing variant', () => {
  render(<Product data={multiVariants}/>);

  let price = screen.queryByText(`£20.00`);
  expect(price).toBeInTheDocument();

  fireEvent.change(screen.getByRole('combobox'), { target: { value: "1" } })

  price = screen.queryByText(`£31.98`);
  expect(price).toBeInTheDocument();
});

test('should add Item', () => {
  render(
    <BasketProvider>
      <Product data={oneVariant}/>
    </BasketProvider>
  );

  screen.getByText("Add").click();
  expect(screen.getByText("In Basket 1")).toBeInTheDocument();
})
