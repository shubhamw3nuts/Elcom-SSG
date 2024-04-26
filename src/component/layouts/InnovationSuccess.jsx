
import innoImg from '@/asset/images/innoImg.png';
import Image from 'next/image';
import Link from 'next/link';
import SectiontitleSwitch from './SectiontitleSwitch';
import { decodeHTMLString } from '@/utils/utils';

const InnovationSuccess = ({ sectionHeading, heading, buttonInfo, products, idprop }) => {
    if (products.length > 0) {
        return (
            <>
                <div className="iswrap subimg" id={idprop}>
                    <SectiontitleSwitch sectionHeading={sectionHeading} heading={heading} buttonInfo={buttonInfo} />
                    <div className="container">
                        <div className="iswrapper">
                            <div className="row">
                                {products.map((product, index) => {
                                    const { image, uri, slug, title } = product;
                                    if (index <= 3) {
                                        return (
                                            <div className="col-lg-3 col-md-6" key={index}>
                                                <div className='productbox'>
                                                    <Link href={uri}>
                                                        <div className="electroImg">
                                                            <Image src={image ? (image.sourceUrl ? image.sourceUrl : image) : innoImg} alt="innoImg" width={304} height={304} />
                                                        </div>
                                                        <div className='electroTtl'>
                                                            <span>{decodeHTMLString(title)}</span>
                                                        </div>
                                                    </Link>
                                                </div>
                                            </div>
                                        )
                                    }
                                })}
                            </div>
                        </div>
                    </div>
                </div>

            </>
        )
    }
    return ''
}

export default InnovationSuccess;