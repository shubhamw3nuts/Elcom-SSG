import Image from "next/image"
import Link from 'next/link';

const PowerunitSec = ({ title, categories, image, date, excerpt, slug }) => {
    return (
        <>
            <div className="col-lg-6">
                <div className="puwrap">
                    {categories && <h6 className="small-text">{categories}</h6>}
                    <div className="puttl fadeInUp">
                        <div className="pugrp">
                            <div className="pudtl">
                                {title && <h6>{title}</h6>}
                            </div>
                            <div className="puimg flex-shrink-0">
                                <Image src={image.node.sourceUrl} width={237} height={178} alt="puimg" />
                            </div>
                        </div>
                        <div className="btnbox">
                            <Link className="elcom-btn tertiary-btn" href={`${slug}`}>Read More</Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default PowerunitSec;