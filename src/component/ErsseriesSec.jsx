import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import SplitText from "./layouts/SplitText";
import { useRouter } from "next/router";

const ErsseriesSec = ({ title, content, galleryImages, featuredImage, categories, productInfo, certifications, certificationsSecHeading,databaseId,buttonInfo}) => {

    const [showquote, setShowquote] = useState(false);
    const handleClosequote = () => setShowquote(false);
    const handleShowquote = () => setShowquote(true);
    const [showrequest, setShowrequest] = useState(false);
    const handleCloserequest = () => setShowrequest(false);
    const handleShowrequest = () => setShowrequest(true);

    const [mainImage, setMainImage] = useState(featuredImage?.node?.sourceUrl)
    const changeImage = (img) => {
        setMainImage(img)
    }

    const router = useRouter();

    //set in localstorage to get by default selected item in "Request Quote" page
    const requestQuoteHandler = (e) => {
        e.preventDefault();
        let lsname = "selected_prodducts";
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
        router.push('/request-quote');
    }


    const categoryWithLongestAncestors = categories.nodes.reduce((max, category) => {
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
        ancestorsHtml.push(<React.Fragment key="unique123"><Link className="current" href={categoryWithLongestAncestors.uri}>{categoryWithLongestAncestors.name}</Link></React.Fragment>)
    } else if (categories?.nodes?.length > 0) {
        ancestorsHtml = categories?.nodes?.map((cat, index) => {
            return (<React.Fragment key={index}><Link className="current" href={cat.uri}>{cat.name}</Link></React.Fragment>)
        })
    }
    return (
        <>
            <div className="erswrap">

                <div className="erssec">
                    <div className="container">
                        <div className="ersgrp">
                            <div className="erslabel">
                                {/* <span>{"products>Electromechanical>Components>Switches>Rotary switches>"}<Link href={"#"}>ERS-2 Series</Link></span> */}
                                {ancestorsHtml && <span>{"products>"}{ancestorsHtml}</span>}
                            </div>
                            <div className="ersslidergrp">
                                <div className="row">
                                    {featuredImage?.node?.sourceUrl &&
                                        <div className="col-lg-5">
                                            <div className="erssliderimg flex-shrink-0">
                                                <Image src={mainImage} alt="esrseries" width={527} height={525}></Image>
                                            </div>
                                            {(galleryImages.nodes.length > 0) &&
                                                <div className="erssmallimg">
                                                    <ul>
                                                        {galleryImages.nodes.map((img, index) => {
                                                            return <li key={index}><Image src={img.sourceUrl} alt={`image${index}`} width={76} height={76} onClick={() => changeImage(img.sourceUrl)}></Image></li>
                                                        })}
                                                    </ul>
                                                </div>
                                            }
                                        </div>
                                    }
                                    <div className={`col-lg-6  ${featuredImage ? 'offset-lg-1' : ''}`}>
                                        <div className="esrdtl">
                                            <div className="esrttl">
                                                <h3>
                                                    <SplitText copy={title} role="test" /></h3>
                                                {content && <div dangerouslySetInnerHTML={{ __html: content }} className="fadeInUp custom_html"></div>}
                                            </div>
                                            {buttonInfo && <div className="btnbox fadeInUp-btn">
                                                {/* <Link href={"javascript:void(0)"} className="elcom-btn primary-black-btn">request a sample</Link> */}
                                                <Link href={"#"} onClick={(e) => requestQuoteHandler(e)} className="elcom-btn primary-btn">{buttonInfo.title}</Link>
                                            </div>}
                                            {(certifications.nodes.length > 0) &&
                                                <div className="certidtl">
                                                    <div className="certittl">
                                                        <h6>{certificationsSecHeading || "Certifications"}</h6>
                                                    </div>
                                                    <div className="certiimg">
                                                        {certifications.nodes.map((certificate, index) => {
                                                            const { certificationsTaxonomyFields } = certificate;
                                                            if (certificationsTaxonomyFields.image.sourceUrl) {
                                                                return (
                                                                    <div className="certiimgone" key={index}>
                                                                        <Image src={certificationsTaxonomyFields.image.sourceUrl} width={116} height={88} alt="certiicon1" />
                                                                    </div>
                                                                )
                                                            }
                                                        })}
                                                    </div>
                                                </div>
                                            }
                                            {(productInfo) &&
                                                <div className="pcbrief">
                                                    <ul>
                                                        {productInfo.map((product, index) => {
                                                            const { heading, value } = product;
                                                            if (heading || value) {
                                                                return (
                                                                    <li key={index}>
                                                                        <span>{heading}</span>
                                                                        <p>{value}</p>
                                                                    </li>
                                                                )
                                                            }
                                                        })}
                                                    </ul>
                                                </div>
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ErsseriesSec;