import Image from "next/image"
import Slider from "react-slick"
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import SplitText from '@/component/layouts/SplitText'


const EsoperationBox = ({ heading, description, imagesInfo }) => {

    const settings = {
        infinite: true,
        dots: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        lazyLoad: true,
        autoplay: true,
        // autoplaySpeed: 4200,
        // autoplaySpeed: 'sliderTimer',
        speed: 1500,
        arrows: true,
        // prevArrow: <ArrowLeft />,
		// nextArrow: <ArrowRight />,
    };
    return (
        <>
            {(heading || description || imagesInfo) &&
                <div className="esoperation">
                    <div className="esobox">
                        <div className="row">
                            {(heading || description) &&
                                <div className={`col-lg-${imagesInfo ? '7' : '12'}`}>
                                    <div className="esodtl">
                                        {heading && <h4><SplitText copy={heading} role="heading" /></h4>}
                                        {description && <p className="fadeInUp">{description}</p>}
                                    </div>
                                </div>
                            }
                            {imagesInfo &&
                                <div className="col-xl-5 col-lg-5 col-xxl-4">
                                    <div className="imgslider">
                                        <Slider {...settings}>
                                            {imagesInfo.map((img, index) => {
                                                if (img) {
                                                    if (img.image) {
                                                        return (
                                                            <div className="esoimg flex-shrink-0" key={index}>
                                                                <Image src={img.image.sourceUrl} width={416} height={256} alt="esoimg" />
                                                            </div>
                                                        )
                                                    }
                                                }
                                            })}
                                        </Slider>
                                    </div>
                                </div>
                            }
                        </div>
                    </div>    
                </div>
            }
        </>
    )
}

export default EsoperationBox;