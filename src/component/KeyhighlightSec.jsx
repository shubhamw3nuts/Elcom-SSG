import Image from "next/image"
import SectiontitleFull from "./layouts/SectiontitleFull";

const KeyHighlight = ({ sectionHeading, heading, info }) => {
    return (
        <>
            <div className="keyhighwrap infrapage">
                <SectiontitleFull
                    sectionHeading={sectionHeading}
                    heading={heading}
                />
                {info &&
                    <div className="container">
                        <div className="keyNotes">
                            {info.map((highlight, index) => {
                                const { description, image } = highlight;
                                if(description){
                                    return (
                                        <div className="khnotes" key={index}>
                                            <div className="khdtl">
                                                {image &&
                                                    <div className="khnotesimg">
                                                        <Image src={image.sourceUrl} width={96} height={96} alt="starIcon" />
                                                    </div>
                                                }
                                                {description &&
                                                    <div className="khtext">
                                                        <p>{description}</p>
                                                    </div>
                                                }
                                            </div>
                                        </div>
                                    )
                                }
                            })}
                        </div>
                    </div>
                }
            </div>
        </>
    )
}

export default KeyHighlight;