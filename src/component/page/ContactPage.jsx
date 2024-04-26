import AddressSec from "../AddressSec"
import BrackerBox from "../BrackerBox"
import InnerBanner from "../InnerBanner"
import PowerStrip from "../PowerStrip"
import SeoData from "../SeoData"

const ContactPage = ({ data, pageTitle, seodata }) => {
    const {
        bannerHeading,
        productCtaSelectSectionLayout, productCtaSelectBackgroundColor, productCtaTitle, productCtaHeading, productCtaDescription, productCtaImage, productCtaButtonInfo, productCtaInfo
    } = data;
    return (
        <>
            <SeoData pageTitle={pageTitle} seodata={seodata} />
            <InnerBanner heading={bannerHeading.trim() != '' ? bannerHeading : pageTitle} />
            <div className="contactWrapper">
                {data &&
                    <>
                        <AddressSec data={data} />
                        {(productCtaSelectSectionLayout == 'full') &&
                            <>
                                <PowerStrip
                                    key="1"
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
                            <>
                                <div className="contactstrip">
                                    <BrackerBox
                                        layout={productCtaSelectSectionLayout}
                                        productCtaInfo={productCtaInfo}
                                    />
                                </div>
                            </>
                        }
                    </>
                }
            </div>
        </>
    )
}

export default ContactPage