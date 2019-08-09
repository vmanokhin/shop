import React from 'react';
import ProductCard from './product-card';

function ProductList(props)  {
    const { products } = props;

    const productsElements = products.map(product => (
        <div key={product.id} className="col-md-4">
            <ProductCard product={product} />
        </div>
    ));

    return (
        <div className="row">
            {productsElements}
        </div>
    )
}

export default ProductList;