import client from "@/apollo_client/client";
import PowerdisSec from "@/component/PowerdisSec";
import TitlecsrDetail from '@/component/layouts/TitlecsrDetail';
import SustainBlog from '@/component/layouts/SustainBlog';

import { GET_ALL_NEWS_SLUG, GET_NEWS_DETAIL_PAGE } from "@/queries/graphql_queries";
import FlexiblecompoSec from "@/component/FlexiblecompoSec";
import SeoData from "@/component/SeoData";

const NewsDetailPageMain = ({ newsDetailData }) => {
    if (newsDetailData) {
        const {
            title, featuredImage, excerpt, content, newsCategories, author, newsPostOptions, date,seoData
        } = newsDetailData.news;
        return (
            <>
                <SeoData pageTitle={title} seodata={seoData}/>
                <div className="blogdetailwrap">
                    <PowerdisSec title={title} categories={newsCategories} author={author} excerpt={excerpt} content={content} featuredImage={featuredImage} date={date} />
                    {newsPostOptions?.newsData &&
                        <>
                            {newsPostOptions?.newsData.map((news, index) => {
                                if (news) {
                                    const { fieldGroupName } = news;
                                    if (fieldGroupName == "News_Newspostoptions_NewsData_NewsInfo") {
                                        const { heading, info } = news;
                                        if (info) {
                                            return (
                                                <div className='dcmWrap' key={index}>
                                                    {heading &&
                                                        <div className='container'>
                                                            <div className='dcmTitle'>
                                                                <div className='row'>
                                                                    <div className='col-lg-6'>
                                                                        <div className='dcmtext'>
                                                                            <h4>{heading}</h4>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    }
                                                    {info.map((data, index) => {
                                                        if (data.heading || data.description) {
                                                            return <TitlecsrDetail heading={data.heading} description={data.description} key={index} />
                                                        }
                                                    })}
                                                </div>
                                            )
                                        }
                                    } else if (fieldGroupName == "News_Newspostoptions_NewsData_ShortDescription") {
                                        const { description } = news;
                                        if (description) {
                                            return (
                                                <div className='elcomdetail' key={index}>
                                                    <div className='container'>
                                                        <div className='elecombrief'>
                                                            <div dangerouslySetInnerHTML={{ __html: description }} className="custom_html"></div>
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        }
                                    } else if (fieldGroupName == "News_Newspostoptions_NewsData_RelatedNews") {
                                        const { sectionHeading, heading, buttonInfo, selectNews } = news;
                                        return <SustainBlog key={index} sectionHeading={sectionHeading} heading={heading} buttonInfo={buttonInfo} blogs={selectNews} />
                                    } else if (fieldGroupName == "News_Newspostoptions_NewsData_ImageVideoSection") {
                                        const { selectImage, videoUrl } = news;
                                        if (selectImage) {
                                            return <FlexiblecompoSec key={index} imageURL={selectImage.sourceUrl} videoUrl={videoUrl} />
                                        }
                                    }
                                }
                            })}
                        </>
                    }
                </div>
            </>
        )
    }
    return ''
}

export default NewsDetailPageMain;

// export async function getServerSideProps(context) {
//     const { query } = context;
//     const PostType = Object.keys(query)[0];
//     const slug = query.news[0];

//     const { data: newsDetailData, loading, networkStatus } = await client.query({
//         query: GET_NEWS_DETAIL_PAGE,
//         variables: { id: PostType + '/' + slug },
//     });
//     return {
//         props: {
//             newsDetailData: newsDetailData,
//             headerClass: 'header-v2',
//         }
//     }
// }

/*
export async function getStaticPaths() {
    const { data: slugs } = await client.query({
        query: GET_ALL_NEWS_SLUG,
    });
    const slugsdata = await slugs?.allNews?.nodes;
    const paths = slugsdata.map((data) => ({
        params: { news : [data.slug.toString()] },
    }));
    return { paths, fallback: true };
}

export async function getStaticProps(context) {
    const { params } = context;
    const PostType = Object.keys(params)[0];
    const slug = params.news[0];

    const { data: newsDetailData, loading, networkStatus } = await client.query({
        query: GET_NEWS_DETAIL_PAGE,
        variables: { id: PostType + '/' + slug },
    });

    return {
        props: {
            newsDetailData: newsDetailData,
            headerClass: 'header-v2',
        },
        revalidate: 20,
    }
}
*/