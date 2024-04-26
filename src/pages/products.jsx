import React from 'react';
import ProductFilters from '@/component/ProductFilters';
import SeoData from '@/component/SeoData';

const Productfinder = ({ pageData }) => {
    return (
        <>
            <SeoData pageTitle={'Products'} seodata=""/>
            <ProductFilters pageData={pageData} fromPDUPage={false} />
        </>
    )
}
export default Productfinder;

export async function getServerSideProps(context) {

    const url = `${process.env.NEXT_PUBLIC_WORDPRESS_SITE_URL}/wp-json/wp/v2/productFinder`;
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ "fromPDUPage": false })
    });

    const url_filter = `${process.env.NEXT_PUBLIC_WORDPRESS_SITE_URL}/wp-json/wp/v2/productFinderFilterData`;
    const response_filter = await fetch(url_filter, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ "selectedCategories" : [], "selectedAttributes" : [], "fromPDUPage": false })
    });

    let pageData = await response.json();
    let filterData = await response_filter.json();
    let data = { ...pageData, ...filterData };
    

    return {
        props: {
            headerClass: 'header-v2',
            pageData: data
        }
    }
}