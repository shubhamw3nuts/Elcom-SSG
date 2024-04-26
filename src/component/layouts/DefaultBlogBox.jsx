import Image from "next/image"
import Link from 'next/link';
import blogimg from '@/asset/images/blogimg.webp';
import productplaceholder from '@/asset/images/productplaceholder.png';
import { removeHTMLTags, formatDate, decodeHTMLString } from '@/utils/utils';


const DefaultBlogBox = ({ title, slug, featuredImage, date, categories, dataFromCustomAPI }) => {
    let commaSeparatedNames = '';

    if (dataFromCustomAPI) {
        if (categories.length > 0) {
            const categoryNames = categories.map(category => decodeHTMLString(category.name));
            commaSeparatedNames = categoryNames.join(', ');
        }
        return (
            <div className="col-lg-4 col-md-6 ">
                <div className="blogbox">
                    <div className="blogimgbox">
                        <Link href={`${slug}`}>
                            <div className="blogimg flxfix ">
                                {/* {featuredImage && */}
                                    <Image src={featuredImage ? featuredImage :  productplaceholder} width={414} height={279} alt="blogimg"></Image>
                                {/* } */}
                            </div>
                            <div className="blogdtl flxflexi">
                                <div className="bloglable flxfix">
                                    {commaSeparatedNames && <span className="very-small-text">{commaSeparatedNames}</span>}
                                    {date && <span className="small-text">{formatDate(date)}</span>}
                                </div>
                                <div className="blogttl flxflexi">
                                    {title && <h6>{removeHTMLTags(title)}</h6>}
                                    <div className="btnbox">
                                        <p className="tertiary-btn">Read More</p>
                                    </div>
                                </div>
                            </div>
                        </Link>


                    </div>
                </div>
            </div>
        )
    } else {
        if (categories?.nodes.length > 0) {
            const categoryNames = categories?.nodes.map(category => category.name);
            commaSeparatedNames = categoryNames.join(', ');
        }
        return (
            <div className="col-lg-4 col-md-6">
                <div className="blogbox">
                    <div className="blogimgbox">
                        <Link href={`${slug}`}>
                            <div className="blogimg flxfix">
                                {/* {featuredImage?.node.sourceUrl && */}
                                    <Image src={featuredImage?.node.sourceUrl ? featuredImage?.node.sourceUrl : productplaceholder} width={414} height={279} alt="blogimg"></Image>
                                {/* } */}
                            </div>
                            <div className="blogdtl flxflexi">
                                <div className="bloglable flxfix">
                                    {commaSeparatedNames && <span className="very-small-text">{commaSeparatedNames}</span>}
                                    {date && <span className="small-text">{formatDate(date)}</span>}
                                </div>
                                <div className="blogttl flxflexi">
                                    {title && <h6>{removeHTMLTags(title)}</h6>}
                                    <div className="btnbox">
                                        <p className="tertiary-btn">Read More</p>
                                    </div>
                                </div>
                            </div>
                        </Link>


                    </div>
                </div>
            </div>
        )
    }
}
export default DefaultBlogBox;