import Image from 'next/image';
import Link from 'next/link';
import SectiontitleSwitch from './SectiontitleSwitch';

const PduSection = ({ sectionHeading, heading, buttonInfo, info }) => {
    if (info) {
        return (
            <>
                <div className='pduwrap'>
                    <SectiontitleSwitch sectionHeading={sectionHeading} heading={heading} buttonInfo={buttonInfo} />
                    <div className='commWrap'>
                        <div className='container'>
                            <div className='commDtl'>
                                <div className='row'>
                                    {info.map((box, index) => {
                                        if (box.heading) {
                                            return <div className='col-lg-4' key={index}>
                                                <div className='commgrp'>
                                                    {box.heading &&
                                                        <div className='commttl'>
                                                            <h6 className='label-text'>{box.heading}</h6>
                                                        </div>}
                                                    {box.image && <div className='commImg'>
                                                        <div dangerouslySetInnerHTML={{ __html: box.image }} className="custom_html"></div>
                                                    </div>}
                                                    {box.description && <div className='commtext'>
                                                        <p>{box.description}</p>
                                                    </div>}
                                                </div>
                                            </div>
                                        }
                                    })}
                                </div>
                                <div className="btnbox mobilescreen">
                                    <Link className="elcom-btn primary-black-btn" href={buttonInfo.url} target={buttonInfo.target}>{buttonInfo.title}</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div >
            </>
        )
    }
    return '';
}

export default PduSection;