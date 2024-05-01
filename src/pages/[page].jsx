import client from "@/apollo_client/client";
import {
    GET_SLUG_TEMPLATE,
    GET_CERTIFICATION_PAGE,
    GET_ABOUT_PAGE,
    GET_CSR_POLICY_PAGE,
    GET_INFRASTRUCTURE_PAGE,
    GET_EVENTS_PAGE,
    GET_SUSTAINABILITY_PAGE,
    GET_CONTACT_PAGE,
    GET_CAREER_PAGE,
    GET_ALL_CAREER_DEPARTMENT_CATEGORIES,
    GET_ALL_CAREER_LOCATION_CATEGORIES,
    GET_DEALERS_PAGE,
    GET_HISTORY_PAGE,
    GET_NEWS_LANDING_PAGE,
    GET_ALL_NEWS,
    GET_ALL_NEWS_CATEGORIES,
    GET_BLOG_DETAIL_PAGE,
    GET_BUILDYOURPDU_PAGE,
    GET_REQUEST_QUOTE_PAGE,
    GET_ALL_PRODUCTS,
    GET_SEO_DATA,
    GET_POSTS_SEO_DATA,
    GET_BLOG_LISTING_PAGE,
    GET_ALL_BLOG_POSTS,
    GET_ALL_BLOG_CATEGORIES,
    GET_SIMPLE_PAGE,
    GET_PAST_EVENTS,
    GET_ALL_PAGES_SLUG
} from "@/queries/graphql_queries";
import CsrPolicyPage from "@/component/page/CsrPolicyPage";
import EventsPage from "@/component/page/EventsPage";
import InfrastructurePage from '@/component/page/InfrastructurePage';
import AboutPage from '@/component/page/AboutPage';
import CertiFicationPage from '@/component/page/CertificationPage';
import BlogLandingPage from "@/component/page/BlogLandingPage";
import SustainaBilityPage from "@/component/page/SustainabilityPage";
import InnerBanner from "@/component/InnerBanner";
import ContactPage from "@/component/page/ContactPage";
import CareerPage from "@/component/page/CareerPage";
import DistributorPartners from "@/component/page/DistributorPartners";
import HistoryPage from "@/component/page/HistoryPage";
import NewsLandingPage from "@/component/page/NewsLandingPage";
import BlogDetailPage from "@/component/page/BlogDetailPage";
import BuildYourPDUPage from "@/component/page/BuildYourPDUPage";
import RequestQuotePage from "@/component/page/RequestQuotePage";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";
import SimplePage from "@/component/page/SimplePage";

function Page({ templateName, pageData, params, departmentCategories, locationCategories, allBlogPostsData, allCategoriesData, allNewsPostsData, allNewsCategoriesData, currentPageIsPostDetailPage, allProducts, seodata, pastEventsData }) {
    // console.log("Template name",templateName)
    // console.log("pageData",pageData)
    let seoData = ''
    if (currentPageIsPostDetailPage) {
        seoData = seodata?.post?.seoData;
    } else {
        seoData = seodata?.page?.seoData;
    }
    let capitalizedString = '';
    if (params) {
        capitalizedString = params.page
            .split('-') // Split the input string by hyphens
            .map(word => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize the first letter of each word
            .join(' '); // Join the words with a space
    } else {
        capitalizedString = 'Comming Soon';
    }
    if (templateName == 'Certifications') {
        const pageTitle = pageData.page.title;
        const Data = pageData.page.template.certificationsPageOptions;
        return <CertiFicationPage data={Data} pageTitle={pageTitle} seodata={seoData} />;
    } else if (templateName == 'About') {
        const pageTitle = pageData.page.title;
        const Data = pageData.page.template.aboutUsPageNew;
        const teamMembers = pageData?.teamMembers;
        return <AboutPage data={Data} teamMembers={teamMembers} seodata={seoData} pageTitle={pageTitle} />;
    } else if (templateName == 'Csr_Policy') {
        const pageTitle = pageData.page.title;
        const Data = pageData.page.template.csrPolicyNew;
        return <CsrPolicyPage data={Data} pageTitle={pageTitle} seodata={seoData} />
    } else if (templateName == 'Infrastructure') {
        const pageTitle = pageData.page.title;
        const Data = pageData.page.template.infrastructurePageOptions;
        return <InfrastructurePage data={Data} pageTitle={pageTitle} seodata={seoData} />;
    } else if (templateName == 'Events') {
        const pageTitle = pageData.page.title;
        const Data = pageData.page.template.eventsPage;
        const eventsFuture = pageData.eventsFuture;
        const eventsPast = pastEventsData?.eventsPast;
        return <EventsPage data={Data} eventsFuture={eventsFuture} pageTitle={pageTitle} seodata={seoData} pastEvents={eventsPast} />
    } else if (templateName == 'Sustainability') {
        const pageTitle = pageData.page.title;
        const Data = pageData.page.template.sustainabilityOptionsNew;
        return <SustainaBilityPage data={Data} pageTitle={pageTitle} seodata={seoData} />
    } else if (templateName == 'Contact') {
        const pageTitle = pageData.page.title;
        const Data = pageData.page.template.contactPageOption;
        return (
            <GoogleReCaptchaProvider
                reCaptchaKey="6Lfn6G0pAAAAAOBEa4rJn9BxZPjV59ZPJyzne78M"
                scriptProps={{
                    async: false,
                    defer: false,
                    appendTo: "head",
                    nonce: undefined,
                }}
            >
                <ContactPage data={Data} pageTitle={pageTitle} seodata={seoData} />
            </GoogleReCaptchaProvider>
        )
    } else if (templateName == 'Career') {
        const pageTitle = pageData.page.title;
        const Data = pageData.page.template.culturePageOptions;
        const allCareers = pageData.allCareers
        let departmentCategoriesOptions = '';
        let locationCategoriesOptions = '';
        if (departmentCategories?.careerDepartmentCategories?.nodes) {
            departmentCategoriesOptions = departmentCategories?.careerDepartmentCategories?.nodes;
        }
        if (locationCategories?.careerLocationCategories?.nodes) {
            locationCategoriesOptions = locationCategories?.careerLocationCategories?.nodes;
        }
        return (
            <GoogleReCaptchaProvider
                reCaptchaKey="6Lfn6G0pAAAAAOBEa4rJn9BxZPjV59ZPJyzne78M"
                scriptProps={{
                    async: false,
                    defer: false,
                    appendTo: "head",
                    nonce: undefined,
                }}
            >
                <CareerPage data={Data} careerPosts={allCareers} departmentCategories={departmentCategoriesOptions} locationCategories={locationCategoriesOptions} pageTitle={pageTitle} seodata={seoData} />
            </GoogleReCaptchaProvider>
        )
    } else if (templateName == 'DealersAndDistributors') {
        const pageTitle = pageData.page.title;
        const Data = pageData.page.template.distributorsAndChannelPartnersNew;
        return <DistributorPartners data={Data} pageTitle={pageTitle} seodata={seoData} />
    } else if (templateName == 'History') {
        const pageTitle = pageData.page.title;
        const Data = pageData.page.template.historyPageOptions;
        return <HistoryPage data={Data} pageTitle={pageTitle} seodata={seoData} />
    } else if (templateName == 'BlogLanding') {
        const pageTitle = pageData.page.title;
        const Data = pageData.page.template.blogLandingNew;
        const latestPost = pageData.latestPost.nodes;
        const allposts = allBlogPostsData.allposts.nodes;
        const allpostsPageInfo = allBlogPostsData.allposts.pageInfo;
        return <BlogLandingPage data={Data} latestPost={latestPost} allPosts={allposts} allpostsPageInfo={allpostsPageInfo} categories={allCategoriesData} pageTitle={pageTitle} seodata={seoData} />
    } else if (templateName == 'NewsLanding') {
        const pageTitle = pageData.page.title;
        const Data = pageData.page.template.newsPageOptionsNew;
        const latestNews = pageData.latestNews.nodes;
        const allposts = allNewsPostsData.allNews.nodes;
        const allpostsPageInfo = allNewsPostsData.allNews.pageInfo;
        return (
            <NewsLandingPage data={Data} latestPost={latestNews} allNews={allposts} allNewsPageInfo={allpostsPageInfo} categories={allNewsCategoriesData} pageTitle={pageTitle} seodata={seoData} />
        )
    } else if (templateName == 'Simple') {
        const pageTitle = pageData.page.title;
        const Data = pageData.page;
        return (
            <SimplePage data={Data} seodata={seoData} />
        )
    } else if (templateName == 'BuildYourPDU') {
        const pageTitle = pageData.page.title;
        const Data = pageData;
        return (
            <GoogleReCaptchaProvider
                reCaptchaKey="6Lfn6G0pAAAAAOBEa4rJn9BxZPjV59ZPJyzne78M"
                scriptProps={{
                    async: false,
                    defer: false,
                    appendTo: "head",
                    nonce: undefined,
                }}
            >
                <BuildYourPDUPage buildPDUData={Data} pageTitle={pageTitle} seodata={seoData} />
            </GoogleReCaptchaProvider>
        )
    } else if (templateName == 'Requestaquote') {
        const pageTitle = pageData.page.title;
        const Data = pageData;
        if (allProducts && Data) {
            return (
                <GoogleReCaptchaProvider
                    reCaptchaKey="6Lfn6G0pAAAAAOBEa4rJn9BxZPjV59ZPJyzne78M"
                    scriptProps={{
                        async: false,
                        defer: false,
                        appendTo: "head",
                        nonce: undefined,
                    }}
                >
                    <RequestQuotePage allProducts={allProducts} quotepageData={Data} pageTitle={pageTitle} seodata={seoData} />
                </GoogleReCaptchaProvider>
            )
        } else {
            return "";
        }
    } else if (currentPageIsPostDetailPage) {
        const pageTitle = pageData.post.title;
        const postData = pageData.post;
        return <BlogDetailPage data={postData} pageTitle={pageTitle} seodata={seoData} />
    } else {
        return (
            <>
                <InnerBanner heading="404 : Page Not Found" />
            </>
        )
    }
}
export default Page

export async function getStaticPaths() {

    const { data: slugs } = await client.query({
        query: GET_ALL_PAGES_SLUG,
    });
    const slugsdata = await slugs?.pages?.nodes;

    const paths = slugsdata.map((data) => ({
        params: { page: data.slug.toString() },
    }));

    return { paths, fallback: true };
}

export async function getStaticProps(context) {
    // console.log("CONTENT ",context)
    const { params } = context;

    //getting page slug
    const variables = {
        page: params.page,
    };

    //getting Template by slug
    const { data: dataTemplate, loading, networkStatus } = await client.query({
        query: GET_SLUG_TEMPLATE,
        variables: variables,
    });

    const page = await dataTemplate?.page;
    const post = await dataTemplate?.post;
    let templateName = '';
    let pageData = '';
    let currentPageIsPostDetailPage = false;
    let departmentCategories = '';
    let locationCategories = '';
    let allBlogPostsData = '';
    let allCategoriesData = '';
    let allNewsPostsData = '';
    let allNewsCategoriesData = '';
    let headerClass = '';
    let allProducts = '';
    let pastEventsData = '';

    //checking if data of page or not
    if (page) {
        templateName = page.template.templateName;
        if (templateName == 'Certifications') {
            const { data: certificationData, loading, networkStatus } = await client.query({
                query: GET_CERTIFICATION_PAGE,
                variables: variables,
            });
            pageData = certificationData;
        } else if (templateName == 'About') {
            const { data: aboutData, loading, networkStatus } = await client.query({
                query: GET_ABOUT_PAGE,
                variables: variables,
            });
            pageData = aboutData;
            // return {
            //     props:{}
            // }
        } else if (templateName == 'Csr_Policy') {
            const { data: csrPolicyData, loading, networkStatus } = await client.query({
                query: GET_CSR_POLICY_PAGE,
                variables: variables,
            });
            pageData = csrPolicyData;
        } else if (templateName == 'Infrastructure') {
            const { data: infrastructureData, loading, networkStatus } = await client.query({
                query: GET_INFRASTRUCTURE_PAGE,
                variables: variables,
            });
            pageData = infrastructureData;
        } else if (templateName == 'Events') {
            const { data: eventData, loading, networkStatus } = await client.query({
                query: GET_EVENTS_PAGE,
                variables: variables,
            });
            variables.offset = 0;
            variables.size = 4;
            const { data: pastEventData } = await client.query({
                query: GET_PAST_EVENTS,
                variables: variables,
            });
            pageData = eventData;
            pastEventsData = pastEventData;
        } else if (templateName == 'Sustainability') {
            const { data: sustainabilityData, loading, networkStatus } = await client.query({
                query: GET_SUSTAINABILITY_PAGE,
                variables: variables,
            });
            pageData = sustainabilityData;
        } else if (templateName == 'Contact') {
            const { data: contactData, loading, networkStatus } = await client.query({
                query: GET_CONTACT_PAGE,
                variables: variables,
            });
            pageData = contactData
        } else if (templateName == 'Career') {
            const { data: careerData, loading, networkStatus } = await client.query({
                query: GET_CAREER_PAGE,
                variables: variables,
            });
            pageData = careerData;
            const { data: allDepartmentCategories } = await client.query({
                query: GET_ALL_CAREER_DEPARTMENT_CATEGORIES,
            });
            const { data: allLocationCategories } = await client.query({
                query: GET_ALL_CAREER_LOCATION_CATEGORIES,
            });
            departmentCategories = allDepartmentCategories;
            locationCategories = allLocationCategories;
        } else if (templateName == 'DealersAndDistributors') {
            const { data: dealersData, loading, networkStatus } = await client.query({
                query: GET_DEALERS_PAGE,
                variables: variables,
            });
            pageData = dealersData;
        } else if (templateName == 'History') {
            const { data: historyData, loading, networkStatus } = await client.query({
                query: GET_HISTORY_PAGE,
                variables: variables,
            });
            pageData = historyData;
        } else if (templateName == 'BlogLanding') {
            const { data: blogListingData, loading, networkStatus } = await client.query({
                query: GET_BLOG_LISTING_PAGE,
                variables: variables,
            });
            const { data: allBlogPosts, loading_blogs, networkStatus_blogs } = await client.query({
                query: GET_ALL_BLOG_POSTS,
                variables: { after: '', where: { "categoryIn": [] } },
            });
            const { data: allCategories } = await client.query({
                query: GET_ALL_BLOG_CATEGORIES,
            });
            pageData = blogListingData;
            allBlogPostsData = allBlogPosts;
            allCategoriesData = allCategories;
        } else if (templateName == 'NewsLanding') {
            const { data: newsLandingData, loading, networkStatus } = await client.query({
                query: GET_NEWS_LANDING_PAGE,
                variables: variables,
            });
            const { data: allNewsPosts, loading_news, networkStatus_blogs } = await client.query({
                query: GET_ALL_NEWS,
                variables: { "after": '' },
            });
            const { data: allCategories } = await client.query({
                query: GET_ALL_NEWS_CATEGORIES,
            });
            pageData = newsLandingData;
            allNewsPostsData = allNewsPosts;
            allNewsCategoriesData = allCategories;
        } else if (templateName == 'BuildYourPDU') {
            const { data: buildPDUdata, loading, networkStatus } = await client.query({
                query: GET_BUILDYOURPDU_PAGE,
                variables: variables,
            });
            pageData = buildPDUdata;
        } else if (templateName == 'Requestaquote') {
            const { data: requestaquotedata, loading, networkStatus } = await client.query({
                query: GET_REQUEST_QUOTE_PAGE,
                variables: variables,
            });
            const { data: allProductsData } = await client.query({
                query: GET_ALL_PRODUCTS,
                variables: {},
            });
            pageData = requestaquotedata;
            allProducts = allProductsData
            headerClass = 'header-v2';
        } else if (templateName == 'Simple') {
            const { data: simpleData, loading, networkStatus } = await client.query({
                query: GET_SIMPLE_PAGE,
                variables: variables,
            });
            pageData = simpleData;
        }
    } else if (post) {
        headerClass = 'header-v2';
        const { data: blogDetailData, loading, networkStatus } = await client.query({
            query: GET_BLOG_DETAIL_PAGE,
            variables: variables,
        });
        pageData = blogDetailData;
        currentPageIsPostDetailPage = true;
    }

    let seodata = '';
    if (page) {
        const { data: pageseo } = await client.query({
            query: GET_SEO_DATA,
            variables: variables,
        });
        seodata = pageseo
    } else if (post) {
        const { data: postseo } = await client.query({
            query: GET_POSTS_SEO_DATA,
            variables: variables,
        });
        seodata = postseo
    }

    return {
        props: {
            templateName,
            pageData,
            params,
            departmentCategories,
            locationCategories,
            allBlogPostsData,
            allCategoriesData,
            allNewsPostsData,
            allProducts,
            allNewsCategoriesData,
            currentPageIsPostDetailPage,
            headerClass: headerClass,
            pastEventsData,
            seodata
        },
        revalidate: 20,
    }
}