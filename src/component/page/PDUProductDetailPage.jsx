import Image from "next/image";
import Link from "next/link";
import ClickableElements from '@/component/ClickableElements';
import FutureBlog from '@/component/layouts/FutureBlog';
import LineList from '@/component/layouts/LineList';
import CareerpathSec from '@/component/CareerpathSec';
import AnnexureSec from '@/component/AnnexureSec';
import React, { useState, useEffect } from "react";
import SplitText from "../layouts/SplitText";
import SpecificationsSec from "../SpecificationsSec";
import DownloadSec from "../DownloadSec";
import InnovationSuccess from "../layouts/InnovationSuccess";
import CategoryblogSec from "../CategoryblogSec";
import { useRouter } from "next/router";

const PDUProductDetailPage = ({ productDetails, res }) => {
    const data = productDetails.product
    const keyProductSectionButton = productDetails?.themeGeneralSettings?.theme_settings?.keyProductSectionButton
    const relatedBlogsButton = productDetails?.themeGeneralSettings?.theme_settings?.relatedBlogsButton
    const { products, blog_posts, is_pdu_category_product } = res;
    const {
        title, content, galleryImages, featuredImage, productCategories, productDetail, certifications,databaseId
    } = data;

    const {
        productInfo, certificationsSecHeading,
        specificationSectionTitle, characteristics,
        featuresSectionHeading, featuresHeading, featuresInfo,
        benefitsSectionHeading, benefitsHeading, benefitsInfo,
        downloadSectionTitle, downloadInfo,
        keyProductSectionHeading, keyProductHeading, keyProductButtonInfo,
        insightsSectionHeading, insightsHeading, insightsButtonInfo,
        annexureSectionHeading, annexureInfo
    } = productDetail

    const [mainImage, setMainImage] = useState(featuredImage?.node?.sourceUrl)
    const changeImage = (img) => {
        setMainImage(img)
    }

    const categoryWithLongestAncestors = productCategories.nodes.reduce((max, category) => {
        if (category.ancestors && category.ancestors.nodes && category.ancestors.nodes.length > (max?.ancestors?.nodes?.length || 0)) {
            return category;
        }
        return max;
    }, null);

    let ancestorsHtml = '';

    if (categoryWithLongestAncestors) {
        let reversedArray = categoryWithLongestAncestors.ancestors.nodes.slice().reverse();
        ancestorsHtml = reversedArray.map((ancestor, index) => {
            return (<React.Fragment key={index}><Link href={ancestor.uri}>{ancestor.name}</Link>{">"}</React.Fragment>)
        })
        ancestorsHtml.push(<React.Fragment key="keyunique987"><Link className="current" href={categoryWithLongestAncestors.uri}>{categoryWithLongestAncestors.name}</Link></React.Fragment>)
    } else if (productCategories?.nodes?.length > 0) {
        ancestorsHtml = productCategories?.nodes?.map((cat, index) => {
            return (<React.Fragment key={index}><Link className="current" href={cat.uri}>{cat.name}</Link></React.Fragment>)
        })
    }

    const [scrolled, setScrolled] = useState(false)
    useEffect(() => {
        const handleScroll = e => {
            setScrolled(window.scrollY > 10)
        }
        window.addEventListener("scroll", handleScroll)
    },[])
    
    const router = useRouter();

    //set in localstorage to get by default selected item in "Request Quote" page
    const requestQuoteHandler = (e) => {
        e.preventDefault();
        let lsname = "pdu_selected_prodducts";
        let productInfo = {productId:databaseId,productName:title};
        let selected_prodducts = localStorage.getItem(lsname);
        if(!selected_prodducts){
            localStorage.setItem(lsname,JSON.stringify([productInfo]));
        }else{
            selected_prodducts = JSON.parse(selected_prodducts);
            if(!selected_prodducts.some(p => p.productId == databaseId)){
                selected_prodducts.push(productInfo)
                localStorage.setItem(lsname,JSON.stringify(selected_prodducts));
            }
        }
        router.push('/request-quote?category=pdu');
    }

    return (
        <div className="pduproductwrap">
            <div className={`getintouch ${scrolled ? 'active' : ''}`}>
                <div className='container'>
                    <div className='getnavwrap'>
                        <div className='getmain'>
                            <ul>
                                <li>{title}</li>
                            </ul>
                        </div>
                        <div className='getmiddle'>
                            <ul>
                                {(featuresInfo || benefitsInfo) && <li><ClickableElements targetSection="featandbenefi_id" textProps="Features and Benefits" /></li>}
                                {(characteristics) && <li><ClickableElements targetSection="specification_id" textProps="Specifications" /></li>}
                                {(downloadInfo) && <li><ClickableElements targetSection="download_id" textProps="Downloads" /></li>}
                                {(products.length > 0) && <li><ClickableElements targetSection="relatprod_id" textProps="Related Products" /></li>}
                            </ul>
                        </div>
                        <div className='btnbox'>
                            <Link className='elcom-btn primary-btn' href={"#"}>Get in Touch</Link>
                        </div>
                    </div>
                </div>
            </div>
            <div className='pduprolable'>
                <div className='container'>
                    <div className='pduprogrp'>
                        {ancestorsHtml &&
                            <div className='pduprolablelist'>
                                <span>{"products>"}{ancestorsHtml}</span>
                            </div>
                        }
                        {featuredImage?.node?.sourceUrl &&
                            <div className='row'>
                                <div className={`${galleryImages.nodes.length > 0 ? 'col-lg-11 col-md-10' : 'col-lg-12 col-md-12'}`}>
                                    <div className='pduproimg'>
                                        <Image src={mainImage} width={1200} height={419} alt='pduproimg' />
                                    </div>
                                </div>
                                {(galleryImages.nodes.length > 0) &&
                                    <div className='col-lg-1 col-md-2'>
                                        <div className='pduproimggrp'>
                                            {galleryImages.nodes.map((img, index) => {
                                                return <div className='pdusubimg' key={index}>
                                                    <Image src={img.sourceUrl} onClick={() => changeImage(img.sourceUrl)} alt='pduproimg' width={83} height={79} />
                                                </div>
                                            })}
                                        </div>
                                    </div>
                                }
                            </div>
                        }
                    </div>
                </div>
            </div>
            <div className='proeas'>
                <div className='container'>
                    <div className='proeaswrap'>
                        <div className='row'>
                            <div className='col-lg-6'>
                                <div className='proeasttl'>
                                    <h3><SplitText copy={title} role="test" /></h3>
                                </div>
                            </div>
                            <div className='col-lg-5'>
                                <div className='proeascontent'>
                                    {content && <div className='proeastext fadeInUp'>
                                        <div dangerouslySetInnerHTML={{ __html: content }} className="custom_html"></div>
                                    </div>}
                                    <div className='btnbox fadeInUp-btn'>
                                        <Link href={"#"} onClick={e => requestQuoteHandler(e)} className="elcom-btn primary-btn">request a quote</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {((certifications.nodes.length > 0) || productInfo) &&
                <div className='proeascerti'>
                    <div className='container'>
                        <div className='proeassec'>
                            <div className='row'>
                                {certifications.nodes &&
                                    <div className='col-lg-12'>
                                        <div className='proeascertigrp'>
                                            <div className="row align-items-center">
                                                <div className="col-lg-4">
                                                    <div className='proeascontent'>
                                                        <span>{certificationsSecHeading || "Certifications"}</span>
                                                    </div>
                                                </div>
                                                <div className="col-lg-8 ">
                                                    <div className='proeasimg'>
                                                        {certifications.nodes.map((certificate, index) => {
                                                            const { certificationsTaxonomyFields } = certificate;
                                                            if (certificationsTaxonomyFields.image.sourceUrl) {
                                                                return <div key={index} className="certiimgone"><Image src={certificationsTaxonomyFields.image.sourceUrl} width={106} height={67} alt='certiimg' /></div>
                                                            }
                                                        })}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                }
                                {(productInfo) &&
                                    productInfo.map((product, index) => {
                                        const { heading, value } = product;
                                        if (heading || value) {
                                            return <div className='col-lg-6' key={index}>
                                                <div className='proeascertistatus'>
                                                    <div className="row align-items-center">
                                                        <div className="col-lg-8 col-8">{heading && <span>{heading}</span>}</div>
                                                        <div className="col-lg-4 col-4">{value && <span>{value}</span>}</div>
                                                    </div>
                                                </div>
                                            </div>
                                        }
                                    })
                                }
                            </div>
                        </div>
                    </div>
                </div>
            }
            {(featuresInfo || benefitsHeading) &&
                <div className="featandbenefi_id" id="featandbenefi_id">
                    {featuresInfo && <FutureBlog sectionHeading={featuresSectionHeading || "FEATURES"} heading={featuresHeading || "Tailored precision and compliance"} info={featuresInfo} />}
                    {benefitsInfo && <LineList sectionHeading={benefitsSectionHeading || 'BENEFITS'} heading={benefitsHeading || "Empowering efficiency and reliability "} info={benefitsInfo}/>}
                </div>
            }
            <SpecificationsSec characteristics={characteristics} specificationSectionTitle={specificationSectionTitle} />
            {annexureInfo &&
                <div className='annexurelist'>
                    <CareerpathSec sectionHeading={annexureSectionHeading} />
                    {annexureInfo.map((info, index) => {
                        return <AnnexureSec key={index} info={info} />
                    })}
                </div>
            }
            {(downloadInfo) &&
                <div className='downloadGrp' id="download_id">
                    <CareerpathSec sectionHeading={downloadSectionTitle || "DOWNLOADS"} />
                    <div className='container'>
                        <div className='downloaddtl'>
                            <div className='row'>
                                {downloadInfo.map((download, index) => {
                                    return <DownloadSec key={index} donwloadInfo={download} />
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            }
            {(products.length > 0) && <InnovationSuccess idprop="relatprod_id" products={products} sectionHeading={keyProductSectionHeading || "Similar products"} heading={keyProductHeading || "The team that drives innovation and success"} buttonInfo={keyProductSectionButton} />}
            {(blog_posts.length > 0) && <CategoryblogSec blogs={blog_posts} sectionHeading={insightsSectionHeading || 'insights'} heading={insightsHeading || 'Related blogs'} buttonInfo={relatedBlogsButton} dataFromCustomAPI={true} />}
        </div>
    )
}

export default PDUProductDetailPage