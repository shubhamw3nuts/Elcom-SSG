import SplitText from './layouts/SplitText'
import Image from "next/image"

const BrackerBox = ({ layout, productCtaInfo }) => {
    if (productCtaInfo) {
        return (
            <div className="brackerboxwrap">
                <div className="container">
                    <div className="bboxdtl">
                        <div className="row">
                            {productCtaInfo.map((item, index) => {
                                const { title, heading, description, buttonInfo, image, selectBackgroundColor } = item;
                                let backgroundColor = '';
                                let buttonClass = '';
                                let buttonCenter = false;
                                if (selectBackgroundColor == 'light') {
                                    backgroundColor = 'lightbg';
                                    buttonClass = 'primary-black-btn';
                                    buttonCenter = true;
                                } else {
                                    buttonClass = 'primary-btn';
                                    buttonCenter = false;
                                }
                                if(title || heading || description){
                                return (<div className="col-lg-6" key={index}>
                                    <div className={`bboxfirst ${backgroundColor}`} data-bg={selectBackgroundColor}>
                                        <div className="bboxwrap">
                                            {title && <h6 className="label-text">{title}</h6>}
                                            {heading && <h2><SplitText copy={heading} role="heading" /></h2>}
                                            {description && <p className='fadeInUp'>{description}</p>}
                                            {buttonInfo && <div className={`btnbox ${buttonCenter && `justify-content-center`}`}><a className={`elcom-btn ${buttonClass}`} href={buttonInfo.url} target={buttonInfo.target}>{buttonInfo.title}</a></div>}
                                        </div>
                                        {image && layout != 'half_without_image' && <div className="bboximg">
                                            <Image src={image?.sourceUrl} width={629} height={133} alt='bbox'></Image>
                                        </div>}
                                    </div>
                                </div>)
                                }
                            })}
                        </div>
                    </div>
                </div>
            </div>
        )
    } else {
        return ''
    }
}

export default BrackerBox;