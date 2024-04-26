import Image from 'next/image';
import InnerBanner from "@/component/InnerBanner";
import SectionTitle from '@/component/layouts/SectionTitle';
import LogoSlider from '@/component/layouts/LogoSlider';
import SplitText from '@/component/layouts/SplitText';
import { useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import SeoData from '../SeoData';

const CertiFication = ({ data,pageTitle,seodata }) => {
    const {
        bannerHeading,
        introSectionHeading, introHeading, introDescription, introEnterVideoUrl, introVideoImage,
        certificationsSectionHeading, certificationsHeading, certificationsDescription,
        certificationsLogosRowOne, certificationsLogosRowTwo,
        certificationsList
    } = data;


    const [inViewRef, inView] = useInView({
        triggerOnce: true,
    });

    const [addClass, setAddClass] = useState(false);


    useEffect(() => {
        if (inView && !addClass) {
            // Add a delay of 1000 milliseconds (1 second) before adding the class
            const delayTimeout = setTimeout(() => {
                setAddClass(true);
            }, 500);

            // Clear the timeout if the component goes out of view before the delay
            return () => clearTimeout(delayTimeout);
        }
    }, [inView, addClass]);
    return (
        <>
            <SeoData pageTitle={pageTitle} seodata={seodata}/>
            {bannerHeading && <InnerBanner heading={bannerHeading.trim() != '' ? bannerHeading : pageTitle} />}
            {(introSectionHeading || introHeading || introDescription || introVideoImage || introVideoImage) &&
                <div className={`certificationWrapper introWrap ${addClass ? 'visible' : ''}`} ref={inViewRef}>
                    <div className="container">
                    <div className="lineEl"></div>
                        <div className="introWapper">
                            {introSectionHeading &&
                                <div className="introTtl">
                                    <h6 className="label-text">{introSectionHeading}</h6>
                                </div>
                            }
                            <div className='row'>
                                {introVideoImage &&
                                    <div className="col-lg-6">
                                        <div className="introVideo">
                                            <div className="videoFram">
                                                <Image src={introVideoImage.sourceUrl} width={601} height={335} alt="videoImg" />
                                            </div>
                                        </div>
                                    </div>
                                }
                                {
                                    (introHeading || introDescription) &&
                                    <div className={`col-lg-${introVideoImage ? '6' : '12'}`}>
                                        <div className="introText">
                                            <div className="textFram">
                                                {introHeading && <h3><SplitText copy={introHeading} role="heading"/></h3>}
                                                {introDescription && <p className='fadeInUp'>{introDescription}</p>}
                                            </div>
                                        </div>
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            }
            <div className='certiWrap'>
                <SectionTitle sectionHeading={certificationsSectionHeading} heading={certificationsHeading} description={certificationsDescription} />
            </div>
            <div className='certiSlider'>
                {certificationsLogosRowOne.length > 0 && <LogoSlider logosInfo={certificationsLogosRowOne} />}
                {certificationsLogosRowTwo.length > 0 && <LogoSlider logosInfo={certificationsLogosRowTwo} />}
            </div>
            {(certificationsList.length > 0) &&
                <div className='productCertification'>
                    <div className="productwrap">
                    <div className="productdtl">
                        <div className="container">
                            {certificationsList.map((data,index) => {
                            const {certificationTitle,certificationsDescriptions,certificationsImages} = data;
                            return (
                                <div className="producttext" key={index}>
                                    {certificationTitle && 
                                    <div className="productttl">
                                        <h6>{certificationTitle}</h6>
                                    </div>
                                    }
                                    {(certificationsDescriptions || certificationsImages) && 
                                    <div className="productinner">
                                        <div className="row">
                                            {certificationsDescriptions && 
                                            <div className="col-lg-7">
                                                <div className="innerdtl custom_html" dangerouslySetInnerHTML={{__html:certificationsDescriptions}}></div>
                                            </div>
                                            }
                                            {certificationsImages && 
                                            <div className="col-lg-5">
                                                <div className="productimg">
                                                    {certificationsImages.map((img,index) => {
                                                        const {certificationImage} = img;
                                                        return <Image src={certificationImage.sourceUrl} width={131} height={120} alt="productimg" key={index}></Image>
                                                    })}
                                                </div>
                                            </div>
                                            }
                                        </div>
                                    </div>
                                    }
                                </div>
                            )
                            })}
                        </div>
                    </div>
                </div>
                   
                </div>
            }
        </>
    )
}

export default CertiFication;