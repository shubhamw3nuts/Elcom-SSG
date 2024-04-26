import Image from "next/image"
import Link from 'next/link';
import React, { useState } from "react";
import SectionTitle from "./layouts/SectionTitle";

const ProductSec = ({ sectionHeading, heading, description, buttonInfo, categoriesInfo }) => {
    const [hoverImage, setHoverImage] = useState('');
    const [currentProductIndex, setCurrentProductIndex] = useState('');
    const chnageImage = (image,index) => {
        if (image) {
            setHoverImage(image.sourceUrl)
            setCurrentProductIndex(index == currentProductIndex ? '' : index );
        } else {
            setHoverImage('')
        }
    }
    return (
        <>
            <div className="productwrap">
                <SectionTitle sectionHeading={sectionHeading} heading={heading} description={description} buttonInfo={buttonInfo} />
                {(categoriesInfo && categoriesInfo.length > 0) &&
                    <div className="productdtl">
                        <div className="container">
                            {categoriesInfo.map((category, index) => {
                                const { name,uri, image, children, description } = category;
                                return (
                                    <div className={`producttext ${currentProductIndex === index ? 'active' : ''}`} key={index} onMouseEnter={() => chnageImage(image)} onClick={() => chnageImage(image,index)}>
                                        <div className="productttl">
                                        <Link href={uri}><h6>{name}</h6></Link>
                                        </div>
                                        <div className="productinner">
                                            <div className="row">
                                                <div className="col-lg-7">
                                                    <div className="innerdtl">
                                                        {(children && children.nodes.length > 0) ?
                                                            <ul>
                                                                {children.nodes.map((subcat, index) => {
                                                                    const { name, uri, image, description } = subcat;
                                                                    return (
                                                                        <li key={index}><Link href={uri} onMouseEnter={() => chnageImage(image)}>{name}</Link></li>
                                                                    )
                                                                })}
                                                            </ul>
                                                            :
                                                            (description ? <p>{description}</p> : '')
                                                        }
                                                    </div>
                                                </div>
                                                {hoverImage &&
                                                    <div className="col-lg-5">
                                                        <div className="productimg">
                                                            {hoverImage ? <Image src={hoverImage} width={130} height={120} alt="productimg"></Image> : ''}
                                                        </div>
                                                    </div>
                                                }
                                            </div>
                                        </div>

                                    </div>
                                )
                            })}
                        </div>
                    </div>
                }
            </div>
        </>
    )
}

export default ProductSec;