import CsrpolicySec from "@/component/CsrpolicySec";
import InnerBanner from "@/component/InnerBanner"
import SeoData from "../SeoData";

const CsrPolicyPage = ({ data,pageTitle,seodata}) => {
    const {
        bannerHeading,
        csrInfoSectionHeading, csrInfoHeading, csrInfoDescription, csrPolicyInfo
    } = data;
    return (
        <>
            <SeoData seodata={seodata} pageTitle={pageTitle}/>
            {bannerHeading && <InnerBanner heading={bannerHeading.trim() != '' ? bannerHeading : pageTitle} />}
            <CsrpolicySec sectionHeading={csrInfoSectionHeading} heading={csrInfoHeading} description={csrInfoDescription} info={csrPolicyInfo} />
        </>
    )
}

export default CsrPolicyPage