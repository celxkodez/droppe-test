import * as React from "react";
import styles from "../assets/styles/modules/product-list-components.module.css";
import {FaStar} from "react-icons/fa";

export const Product: React.FC<{
    index: number;
    product: {
        title: string;
        description: string;
        price: number;
        isFavorite: boolean;
        rating: {
            rate: number;
            count: number
        }
    };
    toggleFavorite: (title: string) => void;
}> = ({ product, toggleFavorite }) => {
    const {product: productClass, productBody, actionBarItem, actionBarItemLabel} = styles
    // Problem: Now product title can be too long, I just put overflowX as fix now
    return (
        <div className={productClass} style={{display: 'inline-block', overflowX: 'scroll', float: 'none', clear: 'both'}}>
            <h1 className={styles['product-title']} style={{overflowX: 'hidden'}}>{product.title}</h1>

            <p>
                <strong>Rating: {product.rating ? `${product.rating.rate}/5` : ''}</strong>
            </p>

            <p>
                <b>Price: ${+product.price}</b>
            </p>

            <p className={productBody}>
                <span><b>Description:</b></span>
                <br/>
                {product.description}
            </p>

            <span className={styles['action_bar']} style={{display: 'table', width: "100%"}}>
                <span
                    className={`${actionBarItem} ${
                        product.isFavorite ? "active" : ""
                    }`}
                    role="button"
                    onClick={() => {
                        toggleFavorite(product.title);
                    }}
                >
                    <FaStar /> <span className={actionBarItemLabel}>{((product.isFavorite)) ? 'Remove from favorites' : 'Add to favorites'}</span>
                </span>
            </span>
        </div>
    );
};
