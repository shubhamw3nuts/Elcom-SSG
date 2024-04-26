import React from 'react'
import InnerBanner from '../InnerBanner'
import DistributorSec from '../DistributorsSec'
import SeoData from '../SeoData';

const DistributorPartners = ({ data,pageTitle,seodata }) => {
    const {
        bannerHeading
    } = data;
    return (
        <>
            <SeoData seodata={seodata} pageTitle={pageTitle}/>
            <InnerBanner heading={bannerHeading.trim() != '' ? bannerHeading : pageTitle} />
            <DistributorSec data={data} />
        </>
    )
}

export default DistributorPartners