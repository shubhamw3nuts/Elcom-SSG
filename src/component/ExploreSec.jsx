import Image from 'next/image';
import Link from 'next/link';

const ExploreSec = ({sectionHeading,heading,image,buttonInfo}) => {
    return (
        <>
        {(sectionHeading || heading || image || buttonInfo) && 
        <div className="exploreWrap">
            <div className="container">
                <div className="explorProduct blackbg">
                    <div className="exploreText">
                        {sectionHeading && <h6 className="label-text ">{sectionHeading}</h6>}
                        {heading && <h5 className='fadeInUp'>{heading}</h5>}
                        {buttonInfo && 
                        <div className="btnbox fadeInUp-btn"><Link className="elcom-btn primary-btn" href={buttonInfo.url} target={buttonInfo.target}>{buttonInfo.title}</Link></div>
                        }
                    </div>
                    {image && 
                    <div className='exploreImg flex-shrink-0'>
                        <Image src={image.sourceUrl} width={349} height={211} alt='exploreImg'/>
                    </div>
                    }
                </div>
            </div>
        </div>
        }
        </>
    )
}

export default ExploreSec;