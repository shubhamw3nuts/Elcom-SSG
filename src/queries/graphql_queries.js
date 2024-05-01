import { gql } from "@apollo/client";

export const GET_THEME_SETTINGS = gql`
  query THEME_SETTINGS {
    themeGeneralSettings {
      theme_settings {
        headerLogo
        searchBoxText
        inventoryButtonInfo{
          target
          title
          url
        }
        footerLogo
        footerRegisteredWithText
        footerRegisteredWithImage {
          sourceUrl
        }
        footerContactInfoHeading
        footerPhoneOne
        footerPhoneTwo
        footerEmailInfo
        footerAddressInfoHeading
        footerAddressInfo
        footerSocialHeading
        instagramUrl
        linkedinUrl
        twitterUrl
        facebookUrl
        youtubeUrl
        footerMenuOneHeading
        footerMenuOneInfo {
          selectPage {
            target
            title
            url
          }
        }
        footerMenuTwoInfo {
          selectPage {
            target
            title
            url
          }
        }
        footerMenuThreeInfo {
          selectPage {
            target
            title
            url
          }
        }
        footerConsumerProductsInfo {
          target
          title
          url
        }
        footerCtaHeading
        footerCtaDescription
        footerCtaButtonInfo {
          target
          title
          url
        }
        footerCtaBackgroundImage {
          sourceUrl
        }
        searchInputPlaceholderText
        searchProductLink{
          target
          title
          url
        }
        footerCopyrightInfo
        footerSiteMadeByInfo
        footerSiteMadeByLink{
          target
          title
          url
        }
      }
    }
    menuItems(where: { location: PRIMARY, parentId: "0" }) {
      edges {
        node {
          id
          url
          uri
          label
          cssClasses
          childItems {
            edges {
              node {
                id
                url
                uri
                label
                cssClasses
                childItems {
                  edges {
                    node {
                      id
                      label
                      url
                      uri
                      cssClasses
                      childItems {
                        edges {
                          node {
                            id
                            label
                            url
                            uri
                            cssClasses
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;

const SEOQUERY = `
  seoData{
    metaTitle
    metaDescription
    metaKeywords
    metaImage{
      sourceUrl
    }
    jsonSchema
  }
`;

export const GET_HOME_PAGE = gql`
  query HomePageQuery {
    page(id: "8316", idType: DATABASE_ID) {
      homeNewOptions {
        bannerInfo {
          heading
          subheading
          image {
            sourceUrl
          }
          buttonInfo {
            target
            title
            url
          }
          backgroundImage {
            sourceUrl
          }
          darkGradientEffect
        }
        aboutSectionHeading
        aboutHeading
        aboutDescription
        aboutButtonInfo {
          target
          title
          url
        }
        aboutSectionImage {
          sourceUrl
        }
        aboutCompaniesHeading
        aboutCompaniesImagesInfo {
          image {
            sourceUrl
          }
        }
        ctaSmallHeading
        ctaHeading
        ctaDescription
        ctaButtonInfo {
          target
          title
          url
        }
        ctaLeftImage {
          sourceUrl
        }
        ctaRightImage {
          sourceUrl
        }
        certificationSectionHeading
        certificationHeading
        certificationDescription
        certificationButtonInfo {
          target
          title
          url
        }
        cta2Heading
        cta2Description
        cta2ButtonInfo {
          target
          title
          url
        }
        cta2BackgroundImage {
          sourceUrl
        }
        faqSectionHeading
        faqHeading
        faqInfo {
          heading
          content
        }
        productCtaSelectSectionLayout
        productCtaSelectBackgroundColor
        productCtaTitle
        productCtaHeading
        productCtaDescription
        productCtaImage {
          sourceUrl
        }
        productCtaButtonInfo {
          target
          title
          url
        }
        productCtaInfo {
          selectBackgroundColor
          title
          heading
          description
          image {
            sourceUrl
          }
          buttonInfo {
            target
            title
            url
          }
        }
        productSectionHeading
        productDescription
        productHeading
        productButtonInfo {
          target
          title
          url
        }
        insightsSectionHeading
        insightsHeading
        insightsReadMoreText
        insightsBlogsTabHeading
        insightsBlogsPageLink{
          target
          url
          title
        }
        insightsNewsTabHeading
        insightsNewsPageLink{
          target
          url
          title
        }
        insightsEventsTabHeading
        insightsEventsPageLink{
          target
          url
          title
        }
      }
      ${SEOQUERY}
    }
    posts(first: 3, where: {orderby: {field: DATE, order: DESC}}) {
      nodes {
        id
        title
        date
        featuredImage {
          node {
            sourceUrl
          }
        }
        categories {
          nodes {
            name
          }
        }
        slug
      }
    }
    allNews(first: 3, where: {orderby: {field: DATE, order: DESC}}) {
      nodes {
        id
        title
        date
        featuredImage {
          node {
            sourceUrl
          }
        }
        newsCategories {
          nodes {
            name
          }
        }
        slug
      }
    }
    events(first: 3, where: {orderby: {field: DATE, order: DESC}}) {
      nodes {
        id
        title
        date
        featuredImage {
          node {
            sourceUrl
          }
        }
        slug
        eventsPostTypeOptions{
          eventType
        }
      }
    }
    productCategories(first: 10, where: {parent: 0}) {
      nodes {
        name
        description
        uri
        children {
          nodes {
            name
            uri
            description
            image {
              sourceUrl
            }
          }
        }
        image {
          sourceUrl
        }
      }
    }
    certifications {
      nodes {
        name
        certificationsTaxonomyFields {
          image{
            sourceUrl
          }
        }
      }
    }
}
`

export const GET_SLUG_TEMPLATE = gql`
  query GET_SLUG_TEMPLATE($page: ID = "") {
    page(id: $page, idType: URI) {
      template {
        templateName
      }
    }
    post(id: $page,idType:URI){
    	title
    }
  }
`

export const GET_SIMPLE_PAGE = gql`
  query GET_SIMPLE_PAGE($page: ID = "") {
    page(id: $page, idType: URI) {
      id
      link
      slug
      title
      content
    }
  }
`

export const GET_SEO_DATA = gql`
  query GET_SEO_DATA($page: ID = "") {
    page(id: $page, idType: URI) {
      title
      ${SEOQUERY}
    }
  }
`
export const GET_POSTS_SEO_DATA = gql`
  query GET_SEO_DATA($page: ID = "") {
    post(id: $page, idType: URI) {
      title
      ${SEOQUERY}
    }
  }
`

export const GET_CERTIFICATION_PAGE = gql`
  query GET_CERTIFICATION_PAGE($page: ID = "") {
  page(id: $page, idType: URI) {
    template {
      templateName
      ... on Template_Certifications {
        templateName
        certificationsPageOptions {
          bannerHeading
          introSectionHeading
          introHeading
          introDescription
          introEnterVideoUrl
          introVideoImage {
            sourceUrl
          }
          certificationsSectionHeading
          certificationsHeading
          certificationsDescription
          certificationsLogosRowOne {
            logoImage {
              sourceUrl
            }
          }
          certificationsLogosRowTwo {
            logoImage {
              sourceUrl
            }
          }
          certificationsList {
            certificationTitle
            certificationsDescriptions
            certificationsImages {
              certificationImage {
                sourceUrl
              }
            }
          }
        }
      }
    }
    title
  }
}
`

export const GET_ABOUT_PAGE = gql`
  query GET_ABOUT_PAGE($page: ID = "") {
    page(id: $page, idType: URI) {
      template {
        templateName
        ... on Template_About {
          templateName
          aboutUsPageNew {
            bannerHeading
            introSectionHeading
            introHeading
            introDescription
            introImage {
              sourceUrl
            }
            introButtonOne {
              url
              title
              target
            }
            introButtonTwo {
              target
              title
              url
            }
            counterInfo {
              counterStartValue
              counterEndValue
              counterDuration
              heading
            }
            advantageSectionHeading
            advantageHeading
            advantagesInfo {
              heading
              description
              image {
                sourceUrl
              }
            }
            mapSectionHeading
            mapHeading
            mapDescription
            mapImage {
              sourceUrl
            }
            mapMarkerInfo {
              distributorsLocation
              numberOfDistributors
              makeThisMarkerActive
            }
            mapDistributorPageLink {
              target
              title
              url
            }
            exploreSectionHeading
            exploreHeading
            exploreImage {
              sourceUrl
            }
            exploreButtonInfo {
              target
              title
              url
            }
            teamHeading
            teamSectionHeading
            halfWidhtBoxInfo {
              heading
              description
              backgroundColor
            }
            fullWidhtBoxInfo {
              heading
              description
            }
          }
        }
      }
      title
    }
    teamMembers {
      nodes {
        title
        featuredImage {
          node {
            sourceUrl
          }
        }
        teamPost {
          teamAuther
          managementDescription
          linkedinUrl
        }
      }
    }
  }
`

export const GET_CSR_POLICY_PAGE = gql`
  query GET_CSR_POLICY_PAGE($page: ID = "") {
    page(id: $page, idType: URI) {
      template {
        templateName
        ... on Template_Csr_Policy {
          templateName
          csrPolicyNew {
            bannerHeading
            csrInfoSectionHeading
            csrInfoHeading
            csrInfoDescription
            csrPolicyInfo {
              heading
              description
            }
          }
        }
      }
      title
    }
  }
`

export const GET_CONTACT_PAGE = gql`
query GET_CONTACT_PAGE($page: ID = "") {
  page(id: $page, idType: URI) {
    template {
      templateName
      ... on Template_Contact {
        contactPageOption {
          bannerHeading
          contactSectionHeading
          contactHeading
          contactMapIframe
          contactOfficeHeading
          contactPhoneHeading
          contactPhoneOneInfo
          contactPhoneTwoInfo
          contactEmailHeading
          contactEmailInfo
          contactAddressHeading
          contactAddressInfo
          contactFactoryHeading
          factoryPhoneHeading
          factoryPhoneOneInfo
          factoryPhoneTwoInfo
          factoryAddressHeading
          factoryAddressInfo
          enquirySectionHeading
          enquiryHeading
          enquiryFormSubmitButtonText
          formResetButtonText
          emptyFieldErrorMessage
          thankYouMessage
          productCtaSelectSectionLayout
          productCtaSelectBackgroundColor
          productCtaTitle
          productCtaHeading
          productCtaDescription
          productCtaImage {
            sourceUrl
          }
          productCtaButtonInfo {
            url
            title
            target
          }
          productCtaInfo {
            selectBackgroundColor
            title
            heading
            description
            buttonInfo {
              target
              title
              url
            }
            image {
              sourceUrl
            }
          }
        }
      }
    }
    title
  }
}
`

export const GET_CAREER_PAGE = gql`
query GET_CAREER_PAGE($page: ID = "",$taxQuery: TaxQuery = {}) {
  page(id: $page, idType: URI) {
    template {
      templateName
      ... on Template_Career {
        culturePageOptions {
          bannerHeading
          introSectionHeading
          introImage {
            sourceUrl
          }
          introVideoUrl
          introHeading
          introDescription
          introButtonText
          pathSectionHeading
          pathInfo {
            heading
            description
            backgroundColor
          }
          pathImagesInfo {
            image {
              sourceUrl
            }
          }
          benefitsSectionHeading
          benefitsHeading
          benefitsInfo {
            info
          }
          formHeading
          firstNameHeading
          lastNameHeading
          emailHeading
          phoneHeading
          resumeHeading
          coverLetterHeading
          checkboxText
          privacyPolicyInfo{
            title
            url
            target
          }
          submitButtonText
        }
      }
    }
    title
  }
  allCareers(where: {taxQuery: $taxQuery}, first: 4, after: "") {
    nodes {
      databaseId
      title
      excerpt
      content
      careerLocationCategories {
        nodes {
          name
        }
      }
      careerDepartmentCategories {
        nodes {
          name
        }
      }
      careerFields {
        otherInformation {
          heading
          content
        }
        experience
      }
    }
    pageInfo {
      hasNextPage
      endCursor
    }
  }
}
`

export const GET_ALL_CAREER_POSTS = gql`
  query ALL_CAREERS_POSTS($taxQuery: TaxQuery = {},$after: String = "") {
    allCareers(where: {taxQuery: $taxQuery}, first: 4, after: $after) {
      nodes {
        databaseId
        title
        excerpt
        content
        careerLocationCategories {
          nodes {
            name
          }
        }
        careerDepartmentCategories {
          nodes {
            name
          }
        }
        careerFields {
          otherInformation {
            heading
            content
          }
          experience
        }
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
`

export const GET_ALL_CAREER_DEPARTMENT_CATEGORIES = gql`
  query ALL_CAREER_DEPARTMENT_CATEGORIES {
    careerDepartmentCategories(first: 10000, where: {hideEmpty: true}) {
      nodes {
        name
        databaseId
        count
      }
    }
  }
`

export const GET_ALL_CAREER_LOCATION_CATEGORIES = gql`
  query ALL_CAREER_LOCATION_CATEGORIES {
    careerLocationCategories(first: 10000, where: {hideEmpty: true}) {
      nodes {
        name
        databaseId
        count
      }
    }
  }
`

export const GET_INFRASTRUCTURE_PAGE = gql`
  query GET_INFRASTRUCTURE_PAGE($page: ID = "") {
    page(id: $page, idType: URI) {
      template {
        templateName
        ... on Template_Infrastructure {
          templateName
          infrastructurePageOptions {
            bannerHeading
            introSectionHeading
            introHeading
            introDescription
            introVideoImage {
              sourceUrl
            }
            introVideoUrl
            infrastructureSectionHeading
            infrastructureHeading
            infrastructureInfo {
              heading
              description
              imagesInfo {
                image {
                  sourceUrl
                }
              }
            }
            advantagesSectionHeading
            advantagesHeading
            advantagesInfo {
              description
              image {
                sourceUrl
              }
            }
          }
        }
      }
      title
    }
  }
`

export const GET_EVENTS_PAGE = gql`
  query GET_EVENTS_PAGE($page: ID = "") {
    page(id: $page, idType: URI) {
      template {
        templateName
        ... on Template_Events {
          templateName
          eventsPage {
            bannerHeading
            upcomingSectionHeading
            upcomingHeading
            pastSectionHeading
            pastHeading
            pastReadMoreButtonText
          }
        }
      }
      title
    }
    eventsFuture : events(
      where: {taxQuery: {taxArray: {taxonomy: EVENTSCATEGORY, terms: "329", operator: NOT_IN, field: TAXONOMY_ID}}}
    ) {
      nodes {
        title
        slug
        uri
        excerpt
        featuredImage {
          node {
            sourceUrl
          }
        }
        eventsPostTypeOptions {
          eventEndDate
          eventStartDate
          eventType
          backgroundColorForPastEventBox
          joinNowLink{
            title
            target
            url
          }
        }
      }
    }
  }
`

export const GET_PAST_EVENTS = gql`
  query GET_PAST_EVENTS($offset: Int = 0, $size: Int = 0) {
    eventsPast : events(
      where: {offsetPagination: {offset: $offset, size: $size}, taxQuery: {taxArray: {field: ID, operator: IN, taxonomy: EVENTSCATEGORY, terms: "329"}}}
    ) {
      nodes {
        title
        slug
        uri
        excerpt
        featuredImage {
          node {
            sourceUrl
          }
        }
        eventsPostTypeOptions {
          eventEndDate
          eventStartDate
          eventType
          backgroundColorForPastEventBox
          joinNowLink{
            title
            target
            url
          }
        }
      }
      pageInfo {
        offsetPagination {
          hasMore
          hasPrevious
          total
        }
      }
    }
  }
`
export const GET_ALL_PAGES_SLUG = gql`
  query GET_ALL_PAGES_SLUG {
    pages(first: 100, where: {notIn: ["5","36","3619"],status:PUBLISH}) {
      nodes {
        slug
      }
    }
  }
`
export const GET_ALL_EVENTS_SLUG = gql`
  query GET_ALL_EVENTS_SLUG {
    events(first: 100,where: {status:PUBLISH}) {
      nodes {
        slug
      }
    }
  }
`

export const GET_ALL_NEWS_SLUG = gql`
  query GET_ALL_NEWS_SLUG {
    allNews(first: 100,where: {status:PUBLISH}) {
      nodes {
        slug
      }
    }
  }
`
// export const GET_ALL_PRODUCT_CATEGORY_SLUG = gql`
//   query GET_ALL_PRODUCT_CATEGORY_SLUG {
//     productCategories(first: 100, where: {termTaxonomId: ["16"]}) {
//       nodes {
//         uri
//       }
//     }
//   }
// `
export const GET_ALL_PRODUCT_CATEGORY_SLUG = gql`
  query GET_ALL_PRODUCT_CATEGORY_SLUG {
    productCategories(first: 100) {
      nodes {
        uri
      }
    }
  }
`

// export const GET_ALL_PRODUCT_SLUG = gql`
//   query GET_ALL_PRODUCT_SLUG {
//     products(first: 600, where: {status: "PUBLISH", include: 5261}) {
//       nodes {
//         ... on SimpleProduct {
//           uri
//         }
//       }
//     }
//   }
// `
export const GET_ALL_PRODUCT_SLUG = gql`
  query GET_ALL_PRODUCT_SLUG {
    products(first: 10, where: {status: "PUBLISH"}) {
      nodes {
        ... on SimpleProduct {
          uri
        }
      }
    }
  }
`


export const GET_SUSTAINABILITY_PAGE = gql`
query GET_SUSTAINABILITY_PAGE($page: ID = "") {
  page(id: $page, idType: URI) {
    template {
      templateName
      ... on Template_Sustainability {
        sustainabilityOptionsNew {
          introSectionHeading
          introHeading
          introDescription
          counterBackgroundImage {
            sourceUrl
          }
          counterInfo {
            counterValue
            afterCounterText
            description
          }
          aboutSectionHeading
          aboutHeading
          aboutContent
          aboutInfo {
            column1
            column2
            column3
          }
          achievementssectionHeading
          achievementsHeading
          achievementsContent
          achievementsImageInfo {
            image {
              sourceUrl
            }
          }
          sustainabilitySectionHeading
          sustainabilityContent
          sustainabilityName
          sustainabilityPost
          insightsSectionHeading
          insightsHeading
          insightsButtonInfo {
            target
            title
            url
          }
          selectRelatedBlogs {
            ... on Post {
              id
              title
              date
              featuredImage {
                node {
                  sourceUrl
                }
              }
              categories {
                nodes {
                  name
                }
              }
              slug
            }
          }
        }
      }
    }
    title
  }
}
`

export const GET_BLOG_LISTING_PAGE = gql`
query BLOG_LISTING_PAGE($page: ID = "") {
  page(id: $page, idType: URI) {
    template {
      ... on Template_BlogLanding {
        blogLandingNew {
          bannerHeading
          latestSectionHeading
          latestHeading
          toppicksSectionHeading
          toppicksHeading
          selectLatestBlogs {
            ... on Post {
              id
              categories {
                nodes {
                  name
                }
              }
              excerpt
              date
              title
              slug
              uri
              featuredImage {
                node {
                  sourceUrl
                  description
                }
              }
            }
          }
          otherBlogsSectionHeading
          otherBlogsHeading
          otherBlogsFilterByText
          otherBlogsLoadMoreText
          exploreHeading
          exploreDescription
          exploreButtonInfo {
            title
            target
            url
          }
          exploreImage {
            sourceUrl
          }
        }
      }
    }
    title
  }
  latestPost: posts(first: 1, where: {orderby: {field: DATE, order: DESC}}) {
    nodes {
      title
      categories {
        nodes {
          name
        }
      }
      featuredImage {
        node {
          sourceUrl
        }
      }
      excerpt
      date
      slug
      uri
      content
    }
  }
  allposts: posts(first: 6) {
    nodes {
      title
      categories {
        nodes {
          name
        }
      }
      featuredImage {
        node {
          sourceUrl
        }
      }
      excerpt
      date
      slug
      uri
      content
    }
    pageInfo {
      endCursor
      hasNextPage
      hasPreviousPage
      startCursor
    }
  }
}
`


export const GET_ALL_BLOG_POSTS = gql`
query BLOG_POSTS($where: RootQueryToPostConnectionWhereArgs = {}, $after: String = "") {
  allposts :posts(where: $where, after: $after, first: 6) {
    nodes {
      title
      categories {
        nodes {
          name
        }
      }
      featuredImage {
        node {
          sourceUrl
        }
      }
      excerpt
      date
      slug
      uri
    }
    pageInfo {
      endCursor
      hasNextPage
      hasPreviousPage
      startCursor
    }
  }
}
`

export const GET_ALL_BLOG_CATEGORIES = gql`
  query ALL_BLOG_CATEGORIES {
    categories(first: 10000, where: {hideEmpty: true}) {
      nodes {
        name
        databaseId
        count
      }
    }
  }
`

export const GET_NEWS_LANDING_PAGE = gql`
query GE_NEWS_PAGE($page: ID = "") {
  page(id: $page, idType: URI) {
    title
    template {
      ... on Template_NewsLanding {
        newsPageOptionsNew {
          bannerHeading
          latestHeading
          latestSectionHeading
          otherNewsSectionHeading
          otherNewsHeading
          otherNewsSortByText
          otherNewsFilterByText
          otherNewsLoadMoreButtonText
        }
      }
    }
  }
  latestNews: allNews(first: 1, where: {orderby: {field: DATE, order: DESC}}) {
    nodes {
      title
      newsCategories {
        nodes {
          name
        }
      }
      featuredImage {
        node {
          sourceUrl
        }
      }
      excerpt
      date
      slug
      uri
      content
    }
  }
}
`

export const GET_ALL_NEWS = gql`
query ALL_NEWS($after: String = "", $order: OrderEnum = DESC) {
  allNews(after: $after, first: 6,where: {orderby: {field: DATE, order: $order}}) {
    nodes {
      title
      newsCategories {
        nodes {
          name
        }
      }
      featuredImage {
        node {
          sourceUrl
        }
      }
      excerpt
      date
      slug
      uri
    }
    pageInfo {
      endCursor
      hasNextPage
      hasPreviousPage
      startCursor
    }
  }
}
`

export const GET_ALL_NEWS_OF_SPECIFIC_CATEGORY = gql`
query ALL_NEWS($after: String = "", $terms: [String] = "",$order: OrderEnum = DESC) {
  allNews(
    where: {taxQuery: {taxArray: {taxonomy: NEWSCATEGORY, field: TAXONOMY_ID, terms: $terms, operator: IN}},orderby: {field: DATE, order: $order}}
    after: $after
    first: 6
  ) {
    nodes {
      title
      newsCategories {
        nodes {
          name
        }
      }
      featuredImage {
        node {
          sourceUrl
        }
      }
      excerpt
      date
      slug
      uri
    }
    pageInfo {
      endCursor
      hasNextPage
      hasPreviousPage
      startCursor
    }
  }
}
`

export const GET_ALL_NEWS_CATEGORIES = gql`
  query ALL_NEWS_CATEGORIES {
    newsCategories(first: 10000, where: {hideEmpty: true}) {
      nodes {
        name
        databaseId
        count
      }
    }
  }
`

export const GET_CATEGORY_DETAIL_PAGE = gql`
query CATEGORY_DETAIL_PAGE($id: ID = "", $category: String = "") {
  productCategory(id: $id, idType: SLUG) {
    name
    description
    image {
      sourceUrl
    }
    uri
    count
    ancestors {
      nodes {
        count
        name
        slug
        uri
      }
    }
    children {
      nodes {
        count
        name
        slug
        description
        image {
          sourceUrl
        }
        uri
      }
    }
    categoryOptions {
      categoryType
      videoUrl
      typesOfSectionHeading
      typesOfHeading
      featuresSectionHeading
      featuresHeading
      featuresFeaturesInfo {
        info
      }
      benefitsSectionHeading
      benefitsHeading
      benefitsInfo {
        info
      }
      usesSectionHeading
      usesHeading
      usesDesription
      usesImage{
        sourceUrl
      }
      usesInfo
      whyChooseSectionHeading
      whyChooseHeading
      whyChooseDescription
      keyProductSectionHeading
      keyProductHeading
      customizeSectionHeading
      customizeHeading
      customizeInfo {
        heading
        description
        image
      }
      insightsSectionHeading
      insightsHeading
      productCtaSelectSectionLayout
      productCtaSelectBackgroundColor
      productCtaTitle
      productCtaHeading
      productCtaDescription
      productCtaImage {
        sourceUrl
      }
      productCtaButtonInfo {
        url
        title
        target
      }
      productCtaInfo {
        selectBackgroundColor
        title
        heading
        description
        buttonInfo {
          target
          title
          url
        }
        image {
          sourceUrl
        }
      }
      advantageSectionHeading
      advantageHeading
      advantagesInfo {
        heading
        description
        image {
          sourceUrl
        }
      }
      productCtaSelectSectionLayout2
      productCtaSelectBackgroundColor2
      productCtaTitle2
      productCtaHeading2
      productCtaDescription2
      productCtaImage2 {
        sourceUrl
      }
      productCtaButtonInfo2 {
        url
        title
        target
      }
      productCtaInfo2 {
        selectBackgroundColor
        title
        heading
        description
        buttonInfo {
          target
          title
          url
        }
        image {
          sourceUrl
        }
      }
      certificationSectionHeading
      certificationHeading
      certificationDescription
      certificationButtonInfo {
        target
        title
        url
      }
      certificationSelectCertifications {
        certificationsTaxonomyFields {
          image {
            sourceUrl
          }
        }
      }
      pduTypesOfSectionHeading
      pduTypesOfHeading
      pduTypesOfDescription
      pduTypesOfLearnMoreButtonText
      pduTypesOfBuildYourPduButton {
        target
        title
        url
      }
      pduCustomizeSectionHeading
      pduCustomizeHeading
      pduCustomizeDescription
      pduCustomizeInfo {
        heading
        description
      }
      pduCustomizeImage {
        sourceUrl
      }
      pduPerformanceSectionHeading
      pduPerformanceFeaturesInfo {
        heading
        tabInfo {
          tabHeading
          heading
          description
          image {
            sourceUrl
          }
        }
      }
      pduCertificationSectionHeading
      pduCertificationHeading
      pduCertificationDescription
      pduSelectCertifications {
        certificationsTaxonomyFields {
          image {
            sourceUrl
          }
        }
      }
      sliderInfo{
        backgroundImage{
          sourceUrl
        }
        heading
        subheading
        description
      }
    }
    ${SEOQUERY}
  }
  certifications {
    nodes {
      name
      certificationsTaxonomyFields {
        image{
          sourceUrl
        }
      }
    }
  }
  themeGeneralSettings{
    theme_settings{
      productCatBannerButtonInfo{
        title
        url
        target
      }
      categoryKeyProductButtonInfo{
        title
        url
        target
      }
      categoryCustomizePduButtonInfo{
        title
        url
        target
      }
      categoryInsightsButtonInfo{
        title
        url
        target
      }
    }
  }
  products(first: 200, where: {category: $category, status: "publish"}) {
    nodes {
      ... on SimpleProduct {
        id
        name
        slug
        image {
          sourceUrl
        }
        uri
      }
    }
    found
  }
}
`

export const GET_PRODUCT_DETAIL_PAGE = gql`
query PRODUCT_DETAIL_PAGE($id: ID = "") {
  product(id: $id, idType: SLUG) {
    name
    databaseId
    slug
    status
    title
    content
    featuredImage {
      node {
        sourceUrl
      }
    }
    galleryImages {
      nodes {
        sourceUrl
      }
    }
    productCategories {
      nodes {
        ancestors {
          nodes {
            name
            uri
          }
        }
        name
        uri
      }
    }
    productDetail {
      certificationsSecHeading
      productInfo{
        heading
        value
      }
      specificationSectionTitle
      characteristics {
        icon {
          sourceUrl
        }
        title
        columnOneHeading
        columnTwoHeading
        specifications {
          parameter
          specification
        }
      }
      featuresSectionHeading
      featuresHeading
      featuresInfo {
        info
      }
      benefitsSectionHeading
      benefitsHeading
      benefitsInfo {
        info
      }
      annexureSectionHeading
      annexureInfo{
        heading
        column1Heading
        column2Heading
        column3Heading
        info{
          column1
          column2
          column3
        }
      }
      downloadSectionTitle
      downloadInfo {
        fileName
        selectFile {
          title
          mediaItemUrl
          sourceUrl
          fileSize
          mimeType
        }
      }
      keyProductSectionHeading
      keyProductHeading
      insightsSectionHeading
      insightsHeading
    }
    certifications {
      nodes {
        name
        certificationsTaxonomyFields{
          image{
            sourceUrl
          }
        }
      }
    }
    ${SEOQUERY}
  }
  themeGeneralSettings{
    theme_settings{
      productDetailBannerButtonInfo{
        title
        url
        target
      }
      keyProductSectionButton{
        title
        url
        target
      }
      relatedBlogsButton{
        title
        url
        target
      }
      stickyBarButtonInfo{
        title
        url
        target
      }
    }
  }
}
`
export const GET_DEALERS_PAGE = gql`
query GET_Dealers_PAGE($page: ID = "") {
  page(id: $page, idType: URI) {
    title
    template {
      ... on Template_DealersAndDistributors {
        distributorsAndChannelPartnersNew {
          bannerHeading
          indiaHeading
          indiaSectionHeading
          indiaInfo {
            address
            direction
            email {
              emailAddress
            }
            name
            phone {
              phone
            }
            extraText
          }
          displayDealersCount
          loadMoreButtonText
          worldwideSectionHeading
          worldwideHeading
          worldwideInfo {
            countryName
            dealersInfo {
              address
              email {
                email
              }
              name
              phone {
                phone
              }
              extraText
            }
          }
          phoneText
          emailText
          exploreSectionHeading
          exploreHeading
          exploreImage{
            sourceUrl
          }
          exploreButtonInfo{
            title
            target
            url
          }
        }
      }
    }
  }
}
`
export const GET_HISTORY_PAGE = gql`
query GET_HISTORY_PAGE($page: ID = "") {
  page(id: $page, idType: URI) {
    title
    template {
      ... on Template_History {
        historyPageOptions {
          bannerHeading
          introductionSectionHeading
          introductionHeading
          introductionContent
          founderSectionHeading
          founderName
          founderPost
          founderContent
          founderImage {
            sourceUrl
          }
          timelineSectionHeading
          timelineHeading
          historySliderNew{
            sliderImage{
              sourceUrl
            }
            historyList{
              historyYear
              historyDescription
              historyCity
            }
          }
        }
      }
    }
  }
}
`

export const GET_BLOG_DETAIL_PAGE = gql`
query GET_BLOG_DETAIL_PAGE($page: ID = "") {
  post(id: $page, idType: URI) {
    title
    excerpt
    content
    author {
      node {
        firstName
      }
    }
    categories {
      nodes {
        name
      }
    }
    featuredImage {
      node {
        sourceUrl
      }
    }
    date
    blogPostOptions {
      blogData {
        ... on Post_Blogpostoptions_BlogData_BlogInfo {
          fieldGroupName
          heading
          info {
            description
            fieldGroupName
            heading
          }
        }
        ... on Post_Blogpostoptions_BlogData_ShortDescription {
          description
          fieldGroupName
        }
        ... on Post_Blogpostoptions_BlogData_RelatedBlogs {
          fieldGroupName
          heading
          buttonInfo {
            target
            title
            url
          }
          sectionHeading
          selectBlogs {
            ... on Post {
              id
              categories {
                nodes {
                  name
                }
              }
              excerpt
              date
              title
              slug
              uri
              featuredImage {
                node {
                  sourceUrl
                }
              }
            }
          }
        }
        ... on Post_Blogpostoptions_BlogData_ImageVideoSection{
          selectImage{
            sourceUrl
          }
          videoUrl
          fieldGroupName
        }
      }
    }
  }
}
`

export const GET_EVENT_DETAIL_PAGE = gql`
query GET_EVENT_DETAIL_PAGE($id: ID = "") {
  event(id: $id, idType: SLUG) {
    title
    date
    featuredImage {
      node {
        sourceUrl
      }
    }
    excerpt
    content
    eventsPostTypeOptions {
      eventType
      eventStartDate
      eventEndDate
      backgroundColorForPastEventBox
      eventInfo {
        __typename
        ... on Event_Eventsposttypeoptions_EventInfo_HeadingWithDescription {
          fieldGroupName
          headingDescriptionInfo {
            description
            fieldGroupName
            heading
          }
        }
        ... on Event_Eventsposttypeoptions_EventInfo_ShortDescription {
          description
          fieldGroupName
        }
        ... on Event_Eventsposttypeoptions_EventInfo_ImageVideoSection{
          selectImage{
            sourceUrl
          }
          videoUrl
          fieldGroupName
        }
      }
    }
    ${SEOQUERY}
  }
}
`

export const GET_NEWS_DETAIL_PAGE = gql`
query GET_NEWS_DETAIL_PAGE($id: ID = "") {
  news(id: $id, idType: URI) {
    title
    date
    featuredImage {
      node {
        sourceUrl
      }
    }
    newsCategories{
      nodes{
        name
      }
    }
    excerpt
    content
    newsPostOptions {
      newsData {
        ... on News_Newspostoptions_NewsData_NewsInfo {
          fieldGroupName
          heading
          info {
            description
            heading
            fieldGroupName
          }
        }
        ... on News_Newspostoptions_NewsData_ShortDescription {
          description
          fieldGroupName
        }
        ... on News_Newspostoptions_NewsData_RelatedNews {
          fieldGroupName
          heading
          sectionHeading
          selectNews {
            ... on News {
              id
              title
              uri
              slug
              featuredImage {
                node {
                  sourceUrl
                }
              }
              date
              newsCategories {
                nodes {
                  name
                }
              }
            }
          }
          buttonInfo {
            target
            title
            url
          }
        }
        ... on News_Newspostoptions_NewsData_ImageVideoSection{
          selectImage{
            sourceUrl
          }
          videoUrl
          fieldGroupName
        }
      }
    }
    ${SEOQUERY}
  }
}
`

export const GET_BUILDYOURPDU_PAGE = gql`
query GET_BUILDYOURPDU_PAGE($page: ID = "") {
  page(id: $page, idType: URI) {
    title
    template {
      ... on Template_BuildYourPDU {
        buildYourPdu {
          certificationsRequiredHeading
          displayTypeHeading
          inputCordLengthMetresHeading
          inputCurrentHeading
          inputPlugTypeHeading
          mainTitleBanner
          mountingHeading
          otherSpecificRequirementsHeading
          pduTypeHeading
          quantityOfPdusRequiredHeading
          powerConfigurationHeading
          socketDetailsHeading
          specifyInputCableEntryNeededHeading
          specifyTheHeightLimitationHeading
          formCompanyHeading
          formCityAndCountryText
          formEmailHeading
          formMessageHeading
          formMobileHeading
          formNameHeading
          formPrivacyHeading
          formPrivacyButtonInfo{
            title
            url
            target
          }
          formSubmitButtonText
          formTitleHeading
          requireFieldErrorMessage
          invalidEmailErrorMessage
          mailSentFailedMessage
          mailSentSuccessMessage
        }
      }
    }
  }
}
`

export const GET_REQUEST_QUOTE_PAGE = gql`
query GET_REQUEST_QUOTE_PAGE($page: ID = "") {
  page(id: $page, idType: URI) {
    title
    template {
      ... on Template_Requestaquote {
        requestAQuoteFields {
          formHeading
          checkboxTitle
          privacyPolicyPage{
            target
            title
            url
          }
          cityTitle
          compnayTitle
          emailTitle
          formSuccessMessage
          invalidEmailMessage
          invalidPhoneMessage
          nameTitle
          numberTitle
          messageTitle
          jobTitle
          productNameTitle
          quantityTitle
          requiredFieldErrorMessage
          submitButtonTitle
        }
      }
    }
  }
}
`

export const GET_ALL_PRODUCTS = gql`
  query GET_ALL_PRODUCTS {
    products(first: 450, where: {status: "publish"}) {
      nodes {
        databaseId
        name
      }
      found
    }
  }
`