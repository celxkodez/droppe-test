import * as React from "react";
import { Product } from "./product";

interface IPostsProps {
  products: any;
  onToggleFavorite: (title: string) => void;
}

export default class Posts extends React.Component<IPostsProps, {}> {
  constructor({products, onToggleFavorite}:  IPostsProps) { super({ products, onToggleFavorite }) }
  render(){
    let productsArray = []

    for (const [index, product] of this.props.products.entries()) {
        productsArray.push(
            <Product
                key={`product-key-${index}`}
                index={index}
                product={product}
                toggleFavorite={this.props.onToggleFavorite}
            />
        );
    }

    return <div>{productsArray.reverse()}</div>
  }
}