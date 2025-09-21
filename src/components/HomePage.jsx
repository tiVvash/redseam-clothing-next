'use client';

import Header from "./Header";
import ProductFilter from "./ProductFilter";
import ProductList from './ProductList'

export default function HomePage(){
    return(
        <div>
            <Header/>
            <ProductFilter/>
            <ProductList/>
        </div>
    )
}