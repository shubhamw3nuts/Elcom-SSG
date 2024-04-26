import SectionTitle from "./layouts/SectionTitle";
import blankimg from "@/asset/images/blankimg.png";
import Image from 'next/image';

const UsappSec = ({ sectionHeading, heading, description, image, usesInfo }) => {
    if (sectionHeading || heading || description) {
        return (
            <>
                <div className="usesWrap">
                    <SectionTitle sectionHeading={sectionHeading} heading={heading} description={description} />
                    {(usesInfo || image) &&
                        <div className="container">
                            <div className="usesappDtl">
                                <div className="row">
                                    {image &&
                                        <div className="col-lg-6">
                                            <div className="usesimg">
                                                <Image src={image.sourceUrl} alt="blankimg" width={575} height={328} />
                                            </div>
                                        </div>
                                    }
                                    {usesInfo &&
                                        <div className="col-lg-6">
                                            <div className="usapplist">
                                                <div dangerouslySetInnerHTML={{ __html: usesInfo }} className="custom_html"></div>
                                            </div>
                                        </div>
                                    }
                                </div>
                            </div>
                        </div>
                    }
                </div>
            </>
        )
    }
    return ''
}

export default UsappSec;