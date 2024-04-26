const { Fragment } = require("react")
import Image from "next/image"
import Link from 'next/link';
import SplitText from "./SplitText";

const LookFHelp = ({heading,description,buttonInfo,bgImage}) => {
    return (
        <div className="lfhsec">
            {bgImage && <div className="ifhtriangle">
                <Image src={bgImage.sourceUrl} width={883} height={312} alt='tringle'></Image>
            </div>}
            <div className="container">
                <div className="lfhdtl">
                    <div className="row">
                        <div className="col-lg-9">
                            <div className="ifhgrp">

                                <div className="lfhtext">
                                    {heading && <h2><SplitText copy={heading} role="heading" /></h2>}
                                    {description && <p>{description}</p>}
                                </div>
                            {
                                buttonInfo 
                                    && 
                                <div className="btnbox"><Link href={buttonInfo.url} className="elcom-btn primary-btn"  target={buttonInfo.target}>{buttonInfo.title}</Link></div>
                            }
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default LookFHelp;