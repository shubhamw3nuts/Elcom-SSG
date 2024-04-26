import { useState, useContext } from "react";
import Image from "next/image"
import Link from 'next/link';
import React from 'react';
import Twitter from "../Svgs/Twitter";
import Linkedin from "../Svgs/Linkedin";
import Facebook from "../Svgs/Facebook";
import Instagram from "../Svgs/Instagram";
import Logo from "../Svgs/Logo";
import AppContext from "@/context/AppContext";
import LookFHelp from "./LookFHelp";
import Youtube from "../Svgs/Youtube";
import { decodeHTMLString } from "@/utils/utils";

const options = [
    { value: 'India', label: 'India' },
    { value: 'Australia', label: 'Australia' },
    { value: 'Canada', label: 'Canada' },
];


const Footer = () => {
    const app = useContext(AppContext);
    let {
        footerLogo,
        footerRegisteredWithText,
        footerRegisteredWithImage,
        footerContactInfoHeading,
        footerPhoneOne,
        footerPhoneTwo,
        footerEmailInfo,
        footerAddressInfoHeading,
        footerAddressInfo,
        footerSocialHeading,
        instagramUrl,
        linkedinUrl,
        twitterUrl,
        facebookUrl,
        youtubeUrl,
        footerMenuOneHeading,
        footerMenuOneInfo,
        footerMenuTwoInfo,
        footerMenuThreeInfo,
        footerConsumerProductsInfo,
        footerCtaHeading,
        footerCtaDescription,
        footerCtaButtonInfo,
        footerCtaBackgroundImage,
        footerCopyrightInfo,
        footerSiteMadeByInfo,
        footerSiteMadeByLink
    } = app.theme_settings;

    const [selectedOption, setSelectedOption] = useState(null);
    const [footerProductClass, setFooterProductClass] = useState(false);
    return (
        <>
            <LookFHelp heading={footerCtaHeading} description={footerCtaDescription} buttonInfo={footerCtaButtonInfo} bgImage={footerCtaBackgroundImage} />
            <footer>
                <div className="footersec">
                    <div className="container">
                        <div className="row py-xxl">
                            <div className="col-lg-3">
                                <div className="footerlogo">
                                    {footerLogo &&
                                        <div className="logoimg">
                                            <Link href="/">
                                                <Logo logo_svg={footerLogo} />
                                            </Link>
                                        </div>
                                    }

                                    {footerRegisteredWithText ?
                                        <div className="regitext">
                                            <h6 className="small-text">{footerRegisteredWithText}</h6>
                                        </div> : ''}

                                    {footerRegisteredWithImage &&
                                        <div className="iconregi">
                                            <Image src={footerRegisteredWithImage.sourceUrl} width={69} height={60} alt='iconregi'></Image>
                                        </div>
                                    }

                                </div>
                            </div>
                            <div className="col-lg-9">
                                <div className="row">
                                    <div className="col-lg-4">
                                        {
                                            (footerMenuOneHeading || footerMenuOneInfo) &&
                                            <div className={`productfooter ${footerProductClass ? 'show' : '' }`}>
                                                 {footerMenuOneHeading && <h6 onClick={() => setFooterProductClass(!footerProductClass)}>{footerMenuOneHeading}</h6>}
                                                {footerMenuOneInfo.length > 0 &&
                                                    <ul>
                                                        {footerMenuOneInfo.map((menuOne, index) => {
                                                            if (menuOne?.selectPage) {
                                                                let { title, url, target } = menuOne.selectPage;
                                                                return <li key={index}><Link href={url} target={target}>{decodeHTMLString(title)}</Link></li>
                                                            }
                                                        })}
                                                    </ul>
                                                }
                                            </div>
                                        }
                                        {footerConsumerProductsInfo &&
                                            <div className="consuprod">
                                                <span><Link href={footerConsumerProductsInfo.url} target={footerConsumerProductsInfo.target}>{footerConsumerProductsInfo.title}</Link></span>
                                            </div>
                                        }
                                    </div>
                                    <div className="col-lg-4">
                                        {footerMenuTwoInfo.length > 0 &&
                                            <div className="otmenu">
                                                <ul>
                                                    {footerMenuTwoInfo.map((menuTwo, index) => {
                                                        if (menuTwo?.selectPage) {
                                                            let { title, url, target } = menuTwo.selectPage;
                                                            return <li key={index}><Link href={url.trim()} target={target}>{title}</Link></li>
                                                        }
                                                    })}
                                                </ul>
                                            </div>
                                        }


                                    </div>
                                    <div className="col-lg-4">
                                        {footerMenuThreeInfo.length > 0 &&
                                            <div className="otsecmenu">
                                                <ul>
                                                    {footerMenuThreeInfo.map((menuThree, index) => {
                                                        // console.log("URLR:",url.trim())
                                                        if (menuThree?.selectPage) {
                                                            let { title, url, target } = menuThree.selectPage;
                                                            return <li key={index}><Link href={url.trim()} target={target}>{title}</Link></li>
                                                        }
                                                    })}
                                                </ul>
                                            </div>
                                        }

                                    </div>
                                    <div className="col-lg-4">
                                        {
                                            (footerContactInfoHeading || footerPhoneOne || footerPhoneTwo) &&
                                            <div className="contact">
                                                {footerContactInfoHeading && <span>{footerContactInfoHeading}</span>}
                                                <div className="phonecontact">
                                                    {footerPhoneOne && <Link href={`tel:${footerPhoneOne}`}>{footerPhoneOne}</Link>}
                                                    {footerPhoneTwo && <> / <Link href={`tel:${footerPhoneTwo}`}>{footerPhoneTwo}</Link></>}
                                                </div>
                                                {footerEmailInfo && <div className="emilcontact">
                                                    <Link href={`mailto:${footerEmailInfo}`}>{footerEmailInfo}</Link>
                                                </div>}
                                            </div>
                                        }
                                    </div>
                                    <div className="col-lg-4">
                                        {(footerAddressInfoHeading || footerAddressInfo) &&
                                            <div className="address">
                                                {footerAddressInfoHeading && <span>{footerAddressInfoHeading}</span>}
                                                {footerAddressInfo && <p>{footerAddressInfo}</p>}
                                            </div>}
                                    </div>
                                    <div className="col-lg-4">
                                        {
                                            (footerSocialHeading || twitterUrl || linkedinUrl || facebookUrl || instagramUrl) &&
                                            <div className="social">
                                                {footerSocialHeading && <span>{footerSocialHeading}</span>}
                                                <div className="socialicon">
                                                    {twitterUrl && <Link href={twitterUrl} target="_blank" rel="noopener noreferrer"><Twitter /></Link>}
                                                    {linkedinUrl && <Link href={linkedinUrl} target="_blank" rel="noopener noreferrer"><Linkedin /></Link>}
                                                    {facebookUrl && <Link href={facebookUrl} target="_blank" rel="noopener noreferrer"><Facebook /></Link>}
                                                    {instagramUrl && <Link href={instagramUrl} target="_blank" rel="noopener noreferrer"><Instagram /></Link>}
                                                    {youtubeUrl && <Link href={youtubeUrl} target="_blank" rel="noopener noreferrer"><Youtube /></Link>}
                                                </div>
                                            </div>
                                        }
                                    </div>
                                </div>


                            </div>
                        </div>
                    </div>
                    {(footerCopyrightInfo || footerSiteMadeByInfo || footerSiteMadeByLink) &&
                        <div className="copyright_wrapper">
                            <div className="container">
                                <div className="copyright_info">
                                    {footerCopyrightInfo && <p>{footerCopyrightInfo} {new Date().getFullYear()}</p>}
                                    {(footerSiteMadeByInfo || footerSiteMadeByLink) && <p>{footerSiteMadeByInfo} {footerSiteMadeByLink && <Link href={footerSiteMadeByLink?.url} target={footerSiteMadeByLink?.target}>{footerSiteMadeByLink?.title}</Link>}</p>}
                                </div>
                            </div>
                        </div>
                    }
                </div>
            </footer>
        </>
    )
}

export default Footer;