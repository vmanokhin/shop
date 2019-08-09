import React, { PureComponent } from 'react';
import ProductCard from './product-card';

class ProductList extends PureComponent  {
    render() {
        const { products } = this.props;

        const productsElements = products.map(product => (
            <div key={product.id} className="col-md-4">
                <ProductCard product={product} />
            </div>
        ));

        return (
            <div className="row">
                {productsElements}
            </div>
        );
    }
}

export default ProductList;