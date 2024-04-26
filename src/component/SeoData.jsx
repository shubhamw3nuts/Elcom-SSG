import Head from 'next/head'
import { useRouter } from 'next/router';
import React from 'react'

const SeoData = ({seodata,pageTitle}) => {
    const router = useRouter();
    if(seodata){
        const {metaTitle,metaDescription,metaKeywords,metaImage,jsonSchema} = seodata;
        let title = metaTitle ? metaTitle : pageTitle;
        const url = process.env.NEXT_PUBLIC_NEXTJS_SITE_URL + router.asPath;
        
        return (
            <Head>
                <title>{`${pageTitle}`}</title>
                {metaDescription && <meta name='description' content={metaDescription} />}
                {metaKeywords && <meta name="keywords" content={metaKeywords}/>}
                <meta property="og:type" content="website" />
                <meta property="og:site_name" content="Elcom" />
                <meta property="og:title" content={`${title}`} />
                {metaDescription && <meta property="og:description" content={metaDescription} />}
                <meta property="og:url" content={url}/>
                {metaImage && <meta property="og:image" content={metaImage?.sourceUrl}/>}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content={`${title}`} />
                {metaDescription && <meta name="twitter:description" content={metaDescription} />}
                {metaImage && <meta name="twitter:image" content={metaImage?.sourceUrl} />}
                {jsonSchema && <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonSchema) }}
                />}
            </Head>
      )
    }
    return (
        <Head>
            <title>{`${pageTitle}`}</title>
            <meta property="og:type" content="website" />
            <meta property="og:site_name" content="Elcom" />
            <meta property="og:title" content={`${pageTitle}`} />
        </Head>
    )
}

export default SeoData