import * as React from "react";
import lodash from 'lodash';
import Modal from "react-modal";
import { FaTimes } from "react-icons/fa";
import { Button } from "./components/button";
import ProductList from "./components/product-list-components";
import { Form } from "./components/form";
import logo from "./assets/images/droppe-logo.png";
import img1 from "./assets/images/img1.png";
import img2 from "./assets/images/img2.png";
import styles from "./assets/styles/modules/shopApp.module.css";
import APIClientRequest from "./utils/APIClientRequest";


export class ShopApp extends React.Component<
  {},
  { products: any[]; isOpen: boolean; isShowingMessage: boolean; message: string; numFavorites: number; prodCount: number }
> {
  constructor(props: any) {
    super(props);

    this.toggleFavorite = this.toggleFavorite.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = { products: [], isOpen: false, isShowingMessage: false, message: '', numFavorites: 0, prodCount: 0 };

    const fetchData = APIClientRequest('https://fakestoreapi.com/products');
    fetchData.then((data: any) => {
      const productsArray = Object.values(data)
      this.setState(() => ({
          products: productsArray,
          prodCount: productsArray.length
      }))
    })
  }

   componentDidMount(){
      document.title = "Droppe refactor app"
   }

  toggleFavorite(title: string) {
    const products = this.state.products;
    const index = lodash.findIndex(products, {title: title})
    let currentFavorites = this.state.numFavorites
    let totalFavorites: any;

    if (products[index].isFavorite) {
        products[index].isFavorite = false;
        totalFavorites = --currentFavorites
    } else {
        totalFavorites = ++currentFavorites
        products[index].isFavorite = true;
    }

    this.setState(() => ({ products: products, numFavorites: totalFavorites }));
  }

  onSubmit(payload: { title: string; description: string, price: string }) {
    const updated = lodash.clone(this.state.products);
    updated.push({
      title: payload.title,
      description: payload.description,
      price: payload.price
    });

    this.setState(() => ({
        products: updated,
        prodCount: lodash.size(this.state.products) + 1,
        isOpen: false,
        isShowingMessage: true,
        message: 'Adding product...'
    }));

    // **this POST request doesn't actually post anything to any database**
    APIClientRequest('https://fakestoreapi.com/products', {
            method:"POST",
            body:JSON.stringify(
                {
                    title: payload.title,
                    price: payload.price,
                    description: payload.description,
                }
            )
        })
        .then(() => {
            (function (t) {
                setTimeout(()=>{
                    t.setState(() => ({
                        isShowingMessage: false,
                        message: ''
                    }))
                }, 2000)
            })(this);
        })
  }

  render() {
    const { products, isOpen } = this.state;
    return (
      <React.Fragment>
        <div className={styles.header}>
          <div className={['container', styles.headerImageWrapper].join(' ')}>
            <img src={logo} className={styles.headerImage} alt="Logo"/>
          </div>
        </div>

        <>
           <div
              className={['container', styles.main].join(' ')}
              style={{margin: '50px inherit', display: 'flex', justifyContent: 'space-evenly'}}
           >
            <img src={img1} style={{maxHeight: "15em", display: 'block'}} alt={'image1'} />
            <img src={img2} style={{maxHeight: "15rem", display: 'block'}} alt={'image2'} />
           </div>
        </>

        <div className={['container', styles.main].join(' ')} style={{paddingTop: 0}}>
          <div className={styles.buttonWrapper}>
               <Button
                  onClick={function (this: any) {
                     this.setState({
                        isOpen: true,
                     });
                  }.bind(this)}
               >Send product proposal</Button>
             {this.state.isShowingMessage && <div className={styles.messageContainer}>
                <i>{this.state.message}</i>
             </div>}
          </div>

          <div className={styles.statsContainer}>
            <span>Total products: {this.state.prodCount}</span>
            {' - '}
            <span>Number of favorites: {this.state.numFavorites}</span>
          </div>

          {products && !!products.length ? <ProductList products={products} onToggleFavorite={this.toggleFavorite} /> : <div></div>}
        </div>

        <>
           <Modal
              isOpen={isOpen}
              className={styles.reactModalContent}
              overlayClassName={styles.reactModalOverlay}
           >
              <div className={styles.modalContentHelper}>
                 <div
                    className={styles.modalClose}
                    onClick={function (this: any) {
                       this.setState({
                          isOpen: false,
                       });
                    }.bind(this)}
                 ><FaTimes /></div>

                 <Form
                     onSubmit={this.onSubmit}
                 />
              </div>
           </Modal>
        </>
      </React.Fragment>
    );
  }
}
