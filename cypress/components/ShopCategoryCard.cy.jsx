/// <reference types="Cypress" />
import React from "react";
import { Provider } from "react-redux";
import store from "store/store";
import { AppRoot } from "shared";
import _ from "lodash";
import { ShopCategoryCard } from "shared/components/ShopCategoryCard";

describe("<ShopCategoryCard />", () => {
  it("renders", () => {
    cy.mount(
      <Provider store={store}>
        <AppRoot>
          <ShopCategoryCard cardInfo={cardInfo} />
        </AppRoot>
      </Provider>
    );
    cy.get(`[data-testid="ShopCategoryCard-btn-addToCart"]`).should("exist");
  });
});

const cardInfo = {
  categoryLabel: "women's clothing",
  description:
    "95%Cotton,5%Spandex, Features: Casual, Short Sleeve, Letter Print,V-Neck,Fashion Tees, The fabric is soft and has some stretch., Occasion: Casual/Office/Beach/School/Home/Street. Season: Spring,Summer,Autumn,Winter.",
  id: 20,
  imagePath: "https://fakestoreapi.com/img/61pHAEJ4NML._AC_UX679_.jpg",
  price: 12.99,
  rating: { rate: 3.6, count: 145 },
  title: "DANVOUY Womens T Shirt Casual Cotton Short",
  uId: _.uniqueId(),
};
