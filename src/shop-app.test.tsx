import React from 'react';
import ReactDOM from 'react-dom';
import { screen } from "@testing-library/react";
import { ShopApp } from "./shop-app";
import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Modal from "react-modal";

it('ensure app is rendered without crashing', () => {
    const div: HTMLElement = document.createElement('div');
    ReactDOM.render(<ShopApp />, div);
});

describe('ensure that adding of product can be done',  () => {
    it('ensure end to end flow for product addition works', () => {
        render(<ShopApp />)
        Modal.setAppElement(document.body)

        const sendProductModalButton: HTMLElement = screen.getByText('Send product proposal')
        expect(sendProductModalButton).toBeDefined()

        userEvent.click(sendProductModalButton)
        const sendProductFormButton = screen.getByText('Add a product')
        expect(sendProductFormButton).toBeDefined()

        const productTitleInput: HTMLElement = screen.getByLabelText('Product title: *')
        const productPriceInput: HTMLElement = screen.getByLabelText('Product details: *')
        const productDescriptionInput: HTMLElement = screen.getByLabelText('Product descriptions:')

        userEvent.type(productTitleInput, 'New Product Title');
        userEvent.type(productPriceInput, '500');
        userEvent.type(productDescriptionInput, 'New Product Descriptions');
        userEvent.click(screen.getByText('Add a product'))

        expect(screen.getByText('New Product Title')).toBeTruthy()
        expect(screen.getByText('Price: $500')).toBeTruthy()
        expect(screen.getByText('New Product Descriptions')).toBeTruthy()
    })
})