import Head from 'next/head'
import Image from 'next/image';
import innerimg from "@/asset/images/innerimg.webp";
import Slider from "react-slick"
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const InnersliderSec = ({ imagesInfo }) => {
    const settings = {
        infinite: true,
        dots: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        lazyLoad: true,
        autoplay: true,
        autoplaySpeed: 1500,
    };
    if(imagesInfo){
        return (
            <>
                <div className='innerslider'>
                    <div className="imgslider">
                        <Slider {...settings}>
                            {imagesInfo.map((img, index) => {
                                if (img?.image) {
                                    return <div className="innerimg flex-shrink-0" key={'  '}>
                                        <Image src={img?.image?.sourceUrl} alt="innerimg" width={1440} height={456} />
                                    </div>
                                }
                            })}
                        </Slider>
                    </div>
                </div>
            </>
        )
    }
}

export default InnersliderSec;