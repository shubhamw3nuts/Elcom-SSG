import Image from "next/image";
import InnerBanner from "@/component/InnerBanner";
import SectionTitle from "@/component/layouts/SectionTitle";
import SectionTitlewhite from "@/component/layouts/SectionTitlewhite";
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import SeoData from "../SeoData";

function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
        <div onClick={onClick} className={`arrow ${className}`} >
            {/* <AiOutlineArrowLeft class="arrows" style={{color:"white"}}/> */}
        </div>
    )
}

function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
        <div onClick={onClick} className={`arrow ${className}`} >
            {/* <AiOutlineArrowRight class="arrows" style={{color:"white"}}/> */}
        </div>
    )
}

const HistoryPage = ({ data, pageTitle, seodata }) => {
    const {
        bannerHeading,
        founderImage, founderContent, founderName, founderPost, founderSectionHeading,
        introductionContent, introductionHeading, introductionSectionHeading, timelineHeading, timelineSectionHeading, historySliderNew
    } = data;

    var settings = {
        dots: false,
        // vertical: true,
        // verticalSwiping: true,
        adaptiveHeight: true,
        arrows: true,
        infinite: true,
        fade: true,
        speed: 1000,
        slidesToShow: 1,
        slidesToScroll: 1,
        cssEase: 'linear',
        nextArrow: <SampleNextArrow to="next" />,
        prevArrow: <SamplePrevArrow to="prev" />,
    };

    return (
        <>
            <SeoData seodata={seodata} pageTitle={pageTitle} />
            <InnerBanner heading={bannerHeading.trim() != '' ? bannerHeading : pageTitle} />
            <div className="historywrap">
                <div className="historyheading">
                    <SectionTitle sectionHeading={introductionSectionHeading} heading={introductionHeading} description={introductionContent} />
                </div>
                {(founderSectionHeading || founderName || founderPost || founderContent || founderImage) &&
                    <div className="directorwrap">
                        <div className="container">
                            <div className="directordtl">
                                {founderSectionHeading && <div className="dirsection">
                                    <span>{founderSectionHeading}</span>
                                </div>}
                                <div className="row">
                                    <div className={`col-lg-${founderImage ? '7' : '12'}`}>
                                        <div className="dirbrief">
                                            <div className="dirname fadeInUp">
                                                {founderName && <h5>{founderName}</h5>}
                                                {founderPost && <span>{founderPost}</span>}
                                                <div dangerouslySetInnerHTML={{ __html: founderContent }} className="custom_html"></div>
                                            </div>
                                        </div>
                                    </div>
                                    {founderImage && <div className="col-lg-5">
                                        <div className="dirimg flex-shrink: 0">
                                            <Image src={founderImage.sourceUrl} alt="chairmanimg" width={335} height={327} />
                                        </div>
                                    </div>}
                                </div>
                            </div>
                        </div>
                    </div>
                }
                {historySliderNew &&
                    <div className="journywrap">
                        <SectionTitlewhite sectionHeading={timelineSectionHeading} heading={timelineHeading} />
                        <div className="container">
                            <div className="jorunydtl">
                                <Slider {...settings}>
                                    {historySliderNew.map((history, index) => {
                                        const { sliderImage, historyList } = history;
                                        return (
                                            <div className="jourwrapper" key={index}>
                                                <div className="jorunydtl-slide" >
                                                    <div className="row">
                                                        {sliderImage && 
                                                        <div className="col-lg-6">
                                                            <div className="journyimg">
                                                                <Image src={sliderImage?.sourceUrl} width={416} height={256} alt="esoimg" />
                                                            </div>
                                                        </div>
                                                        }
                                                        {historyList && <div className="col-lg-6">
                                                            <div className="journyyears">
                                                                <ul>
                                                                    {historyList.map((list, index) => {
                                                                        const { historyDescription, historyYear, historyCity } = list;
                                                                        if (historyDescription || historyYear || historyCity) {

                                                                            return <li key={index}>
                                                                                <h5>{historyYear}</h5>
                                                                                <span>{historyDescription}</span>
                                                                            </li>
                                                                        }
                                                                    })}
                                                                </ul>
                                                            </div>
                                                        </div>}
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })}
                                </Slider>
                            </div>
                        </div>
                    </div>
                }
            </div>
        </>
    )
}

export default HistoryPage;