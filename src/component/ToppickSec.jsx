import Link from 'next/link';
import PowerunitSec from "./PowerunitSec";
import SectiontitleFull from "./layouts/SectiontitleFull";
import { formatDate } from '@/utils/utils';

const ToppickSec = ({ sectionHeading, heading, posts }) => {
    return (
        <>
            {(posts) &&
                <div className="toppickwrap">
                    <div className="toppickbox">
                        <SectiontitleFull sectionHeading={sectionHeading} heading={heading} />
                        <div className="tpbox">
                            <div className="container">
                                <div className="tpleft">
                                    <div className="row">
                                        {posts.map((post, index) => {
                                            const { title, slug, featuredImage, date, categories, excerpt } = post;
                                            let commaSeparatedNames = '';
                                            if (categories?.nodes.length > 0) {
                                                const categoryNames = categories?.nodes.map(category => category.name);
                                                commaSeparatedNames = categoryNames.join(', ');
                                            }
                                            const limit = 150;
                                            const truncatedContent = excerpt.length > limit ? excerpt.substring(0, limit) + '...' : excerpt;
                                            if (featuredImage) {
                                                return <PowerunitSec title={title} categories={commaSeparatedNames} image={featuredImage} date={formatDate(date)} excerpt={truncatedContent} slug={slug} key={index} />
                                            } else {
                                                return (
                                                    <div className="col-lg-6" key={index}>
                                                        <div className="tplblue">
                                                            <div className="tplttl">
                                                                {commaSeparatedNames && <h6 className="small-text">{commaSeparatedNames}</h6>}
                                                                {date && <span>{formatDate(date)}</span>}
                                                            </div>
                                                            {title && <h6>{title}</h6>}
                                                            {excerpt && <div dangerouslySetInnerHTML={{ __html: truncatedContent }} className="custom_html"></div>}
                                                            <div className="btnbox">
                                                                <Link className="elcom-btn tertiary-btn" href={`${slug}`}>Read More</Link>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )
                                            }
                                        })}

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </>
    )
}

export default ToppickSec;