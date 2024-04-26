import Image from 'next/image';
import Link from "next/link";

const PduadoptSec = ({ categoryData, buttonOne, buttonTwo }) => {
    const { name, uri, image, description } = categoryData;
    return (
        <>
            <div className="adoptwrap">
                <div className='container'>
                    <div className='adoptcontent'>
                        <div className='row justify-content-between'>
                            <div className='col-lg-5'>
                                <div className='rackhead'>
                                    <h5>{name}</h5>
                                </div>
                                <div className='adoptbrief'>
                                    {description && <div className='adoptheading'>
                                        <p>{description}</p>
                                    </div>}
                                    <div className='btnbox'>
                                        <Link href={uri} className='elcom-btn primary-black-btn'>{buttonOne || 'Learn More'}</Link>
                                        {buttonTwo && <Link href={buttonTwo.url} target={buttonTwo.target} className='elcom-btn primary-btn'>{buttonTwo.title}</Link>}
                                    </div>
                                </div>
                            </div>
                            {image && <div className='col-lg-6'>
                                <div className="adoptimg_wrap">
                                    <div className='adoptimg'>
                                        <div className='adoptleft'>
                                            <Image src={image.sourceUrl} width={640} height={242} alt='adoptimg1' />
                                        </div>
                                    </div>
                                </div>
                            </div>}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default PduadoptSec;