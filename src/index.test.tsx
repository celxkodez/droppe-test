import React from 'react';
import ReactDOM from 'react-dom';
import { ShopApp } from "./shop-app";

it('ensure app is rendered without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<ShopApp />, div);
});