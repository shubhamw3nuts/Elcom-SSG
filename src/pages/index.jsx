import Banner from '@/component/layouts/Banner';
import AboutSec from '@/component/AboutSec';
import BrackerSec from '@/component/BrackerSec';
import PowerStrip from '@/component/PowerStrip';
import TrustedCompoSlider from '@/component/layouts/TrustedCompoSlider';
import BrackerBox from '@/component/BrackerBox';
import InsightsSec from '@/component/InsightsSec';
import FaqSec from '@/component/FaqSec';
import ProductSec from '@/component/ProductSec';
import CertiSec from '@/component/CertiSec';
import TowardGreen from '@/component/TowardGreen';
import client from '@/apollo_client/client';
import { GET_ALL_PAGES_SLUG, GET_HOME_PAGE } from '@/queries/graphql_queries';
import SeoData from '@/component/SeoData';

export default function Index(props) {
  const {
    bannerInfo,
    aboutSectionHeading, aboutHeading, aboutDescription, aboutButtonInfo, aboutSectionImage, aboutCompaniesHeading, aboutCompaniesImagesInfo,
    ctaSmallHeading, ctaHeading, ctaDescription, ctaButtonInfo, ctaLeftImage, ctaRightImage,
    certificationSectionHeading, certificationHeading, certificationDescription, certificationButtonInfo, logosInfo,
    cta2Heading, cta2Description, cta2ButtonInfo, cta2BackgroundImage,
    faqSectionHeading, faqHeading, faqInfo,
    productCtaSelectSectionLayout, productCtaSelectBackgroundColor, productCtaTitle, productCtaHeading, productCtaDescription, productCtaImage, productCtaButtonInfo, productCtaInfo,
    productSectionHeading, productDescription, productHeading, productButtonInfo,
    insightsSectionHeading, insightsHeading, insightsReadMoreText, insightsBlogsPageLink, insightsNewsPageLink, insightsEventsPageLink, insightsBlogsTabHeading, insightsNewsTabHeading, insightsEventsTabHeading
  } = props.homepagedata;

  const blogPosts = props?.blogPosts;
  const productCategories = props.productCategories;
  const certifications = props.certifications;
  const allNews = props.allNews;
  const events = props.events;
  const seoData = props.seoData;
  // const slugs = props.slugs;
  // console.log(" slugs : ",slugs?.pages?.nodes)

  // const slugsdata = slugs?.pages?.nodes;

  // const paths = slugsdata.map((data) => ({
  //   params: { page: data.slug.toString() },
  // }));

  // console.log("paths : ",paths)

  return (
    <>
      <SeoData pageTitle={"Home"} seodata={seoData} />

      {bannerInfo && <Banner bannerData={bannerInfo} />}
      <div className="homeWrapper">
        <AboutSec
          sectionHeading={aboutSectionHeading}
          heading={aboutHeading}
          description={aboutDescription}
          buttonInfo={aboutButtonInfo}
          aboutImage={aboutSectionImage}
        />
        <TrustedCompoSlider
          heading={aboutCompaniesHeading}
          imagesInfo={aboutCompaniesImagesInfo}
        />
        <ProductSec
          sectionHeading={productSectionHeading}
          heading={productHeading}
          description={productDescription}
          buttonInfo={productButtonInfo}
          categoriesInfo={productCategories}
        />
        <BrackerSec
          smallHeading={ctaSmallHeading}
          heading={ctaHeading}
          description={ctaDescription}
          buttonInfo={ctaButtonInfo}
          leftImage={ctaLeftImage}
          rightImage={ctaRightImage}
        />
        <CertiSec
          sectionHeading={certificationSectionHeading}
          heading={certificationHeading}
          description={certificationDescription}
          buttonInfo={certificationButtonInfo}
          logosInfo={logosInfo}
          certifications={certifications}
        />
        <TowardGreen
          backgroundImage={cta2BackgroundImage}
          heading={cta2Heading}
          description={cta2Description}
          buttonInfo={cta2ButtonInfo}
        />
        {(productCtaSelectSectionLayout == 'full') &&
          <>
            <PowerStrip
              backgroundColor={productCtaSelectBackgroundColor}
              title={productCtaTitle}
              heading={productCtaHeading}
              description={productCtaDescription}
              image={productCtaImage}
              buttonInfo={productCtaButtonInfo}
            />
          </>
        }
        {
          (productCtaSelectSectionLayout != 'full') &&
          <BrackerBox
            layout={productCtaSelectSectionLayout}
            productCtaInfo={productCtaInfo}
          />
        }
        <InsightsSec
          sectionHeading={insightsSectionHeading}
          heading={insightsHeading}
          blogButton={insightsBlogsPageLink}
          newsButton={insightsNewsPageLink}
          eventButton={insightsEventsPageLink}
          readMoreText={insightsReadMoreText}
          blogPosts={blogPosts}
          newsPosts={allNews}
          eventsPosts={events}
          blogTabTitle={insightsBlogsTabHeading}
          newsTabTitle={insightsNewsTabHeading}
          eventsTabTitle={insightsEventsTabHeading}
        />
        <FaqSec
          sectionHeading={faqSectionHeading}
          heading={faqHeading}
          faqInfo={faqInfo}
        />
      </div>
    </>
  )
}
export async function getStaticProps({ req, res }) {
  // console.log("CONTENT X ",context);
  // res.setHeader(
  //   'Cache-Control',
  //   'public, s-maxage=10, stale-while-revalidate=59'
  // )
  const { data, loading, networkStatus } = await client.query({
    query: GET_HOME_PAGE,
  });

  // const { data:slugs } = await client.query({
  //   query: GET_ALL_PAGES_SLUG,
  // });


  return {
    props: {
      homepagedata: data?.page?.homeNewOptions,
      seoData: data?.page?.seoData,
      blogPosts: data?.posts?.nodes,
      productCategories: data?.productCategories?.nodes,
      allNews: data?.allNews?.nodes,
      events: data?.events?.nodes,
      certifications: data?.certifications?.nodes,
      // slugs:slugs
    },
    revalidate: false, // In seconds
  }
}