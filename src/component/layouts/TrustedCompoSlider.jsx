import Slider from "react-slick";
import Image from "next/image";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const TrustedCompoSlider = ({heading,imagesInfo}) => {
    if(imagesInfo){
        var settings = {
            dots: false,
            arrows: false,
            infinite: true,
            speed: 500,
            slidesToShow: imagesInfo.length > 7 ? 7 :  imagesInfo.length,
            slidesToScroll: 1,
            autoplay: true,
            autoplaySpeed: 0,
            speed: 8000,
            pauseOnHover: false,
            cssEase: 'linear',
            responsive: [
                {
                    breakpoint: 767,
                    settings: { slidesToShow : imagesInfo.length > 2 ? 2 :  imagesInfo.length }
                },
                {
                    breakpoint: 991,
                    settings: { slidesToShow : imagesInfo.length > 4 ? 4 :  imagesInfo.length }
                },
                {
                    breakpoint: 1199,
                    settings: { slidesToShow : imagesInfo.length > 6 ? 6 :  imagesInfo.length }
                }
            ]
          };
        return (
            <div className="truecomp-sec">
                <div className="truecompWrapper">
                    {heading && <h5>{heading}</h5>}
                    {imagesInfo && imagesInfo.length > 0 && <div className="slider-wrap">
                        <Slider {...settings}>
                            {imagesInfo.map((logo,index) => {
                                const image = logo?.image?.sourceUrl;
                                if(image){
                                    return (<div className="logo-box" key={index}>
                                        <Image width={138} height={67} src={image} alt="Trusted Image"/>
                                    </div>)
                                }
                                return ''
                            })}
                        </Slider>
                    </div>}
                </div>
            </div>
        )
    }else{
        return '';
    }
}
export default TrustedCompoSlider;