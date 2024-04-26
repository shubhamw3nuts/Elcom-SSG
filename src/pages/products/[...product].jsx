import client from '@/apollo_client/client';
import { GET_PRODUCT_DETAIL_PAGE } from '@/queries/graphql_queries';
import SimpleProductDetailPage from '@/component/page/SimpleProductDetailPage';
import PDUProductDetailPage from '@/component/page/PDUProductDetailPage';
import SeoData from '@/component/SeoData';

const ProductDetail = ({ productDetails, res }) => {
    const data = productDetails.product
    const { is_pdu_category_product } = res;
    const { title,seoData } = data;
    return (
        <>
            <SeoData pageTitle={title} seodata={seoData}/>    
            {!is_pdu_category_product &&
                <SimpleProductDetailPage productDetails={productDetails} res={res} />
            }
            {is_pdu_category_product &&
                <PDUProductDetailPage productDetails={productDetails} res={res} />
            }
        </>
    )
}

export async function getServerSideProps(context) {
    const { query } = context;
    const slugs = query.product;
    const lastSlug = slugs.pop()

    const { data: productDetails, loading, networkStatus } = await client.query({
    query: GET_PRODUCT_DETAIL_PAGE,
        variables: { id: lastSlug },
    });

    let res = '';
    const url = `${process.env.NEXT_PUBLIC_WORDPRESS_SITE_URL}/wp-json/wp/v2/productdetail`;
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ "slug": lastSlug })
    });

    const pageData = await response.json();

    return {
        props: {
            productDetails: productDetails,
            headerClass: 'header-v2',
            res: pageData
        }
    }
}

export default ProductDetail