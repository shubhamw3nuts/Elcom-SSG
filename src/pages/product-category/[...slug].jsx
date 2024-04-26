import client from '@/apollo_client/client';
import SeoData from '@/component/SeoData';
import PDUProductCategoryPage from '@/component/page/PDUProductCategoryPage';
import SimpleProductCategoryPage from '@/component/page/SimpleProductCategoryPage';
import { GET_CATEGORY_DETAIL_PAGE } from '@/queries/graphql_queries';

const CategoryDetail = ({ categoryDetails, productData,slug,relatedblogs }) => {
    const categoryData = categoryDetails.productCategory;
    if (categoryData) {
        const seoData = categoryData?.seoData;
        const pagetitle = categoryData?.name;
        const products = categoryDetails?.products;
        const certifications = categoryDetails?.certifications?.nodes;
        const categoryType = categoryDetails?.productCategory?.categoryOptions?.categoryType;
        const themeGeneralSettings = categoryDetails?.themeGeneralSettings?.theme_settings;

        /* ====================================================================================================================
           ===== NOTE : IF YOU WANT TO CHANGE ANYTHING IN CATEGORY PAGE PLEASE CHECK BOTH PAGES COMPONENT AND THEN UPDATE IT :)
           =====>        1) SimpleProductCategoryPage
           =====>        2) PDUProductCategoryPage 
           ====================================================================================================================
        */
        if (categoryType == 'simple') {
            return (
                <>
                    <SeoData pageTitle={pagetitle} seodata={seoData}/>
                    <SimpleProductCategoryPage categoryData={categoryData} products={products} relatedBlogs={relatedblogs} themeGeneralSettings={themeGeneralSettings} certifications={certifications}/>
                </>
            )
        } else if (categoryType == 'pdu') {
            return (
                <>
                    <SeoData pageTitle={pagetitle} seodata={seoData}/>
                    <PDUProductCategoryPage categoryData={categoryData} productData={productData} slug={slug} relatedBlogs={relatedblogs} themeGeneralSettings={themeGeneralSettings} certifications={certifications}/>
                </>
            )
        }
    } else {
        return "404 : Page Not Found"
    }
}

export async function getServerSideProps(context) {
    const { query } = context;
    const slugs = query.slug;
    const lastSlug = slugs.pop()
    const { data: categoryDetails, loading, networkStatus } = await client.query({
        query: GET_CATEGORY_DETAIL_PAGE,
        variables: { id: lastSlug, category: lastSlug },
    });

    const url = `${process.env.NEXT_PUBLIC_WORDPRESS_SITE_URL}/wp-json/wp/v2/productFinder`;
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ "fromPDUPage": true,"slug" : lastSlug })
    });

    const url_filter = `${process.env.NEXT_PUBLIC_WORDPRESS_SITE_URL}/wp-json/wp/v2/productFinderFilterData`;
    const response_filter = await fetch(url_filter, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ "fromPDUPage": true,"slug" : lastSlug })
    });

    const url_related_blogs = `${process.env.NEXT_PUBLIC_WORDPRESS_SITE_URL}/wp-json/wp/v2/relatedBlogs`;
    const response_relatedBlogs = await fetch(url_related_blogs, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({"slug" : lastSlug })
    });

    
    let pageData = await response.json();
    let filterData = await response_filter.json();
    let relatedblogs = await response_relatedBlogs.json();
    let data = { ...pageData, ...filterData };

    return {
        props: {
            categoryDetails: categoryDetails,
            headerClass: 'header-v2',
            productData: data,
            relatedblogs: relatedblogs,
            slug: lastSlug
        }
    }
}

export default CategoryDetail