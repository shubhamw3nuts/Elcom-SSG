import InnerBanner from "@/component/InnerBanner"
import SeoData from "@/component/SeoData"
import Link from "next/link"


const CustomLink = ({ title, url }) => {
    return (
        <h6 style={{ marginBottom: "10px" }}><Link href='/'>Home</Link></h6>
    )
}

const sitemap = () => {

    return (
        <div>
            <SeoData pageTitle={"Sitemap"} seodata=""/>
            <InnerBanner heading="Sitemap" />
            <div className="sitemaps_wrapper text-center" style={{ margin: "50px 0" }}>
                <div className="container">
                    <div className="main" style={{ display: "flex", justifyContent: "space-between" }}>
                        <div className="items">
                            <h6 style={{ marginBottom: "10px" }}><Link href={`/`}>Home</Link></h6>
                            <h6 style={{ marginBottom: "10px" }}><Link href={`/about`}>About Us</Link></h6>
                            <h6 style={{ marginBottom: "10px" }}><Link href={`/certification`}>Certifications</Link></h6>
                            <h6 style={{ marginBottom: "10px" }}><Link href={`/infrastructure`}>Infrastructure</Link></h6>
                            <h6 style={{ marginBottom: "10px" }}><Link href={`/history`}>History</Link></h6>
                            <h6 style={{ marginBottom: "10px" }}><Link href={`/contact`}>Contact</Link></h6>
                            <h6 style={{ marginBottom: "10px" }}><Link href={`/blog`}>Blog Landing</Link></h6>
                            <h6 style={{ marginBottom: "10px" }}><Link href={`/news-blog`}>News Landing</Link></h6>
                            <h6 style={{ marginBottom: "10px" }}><Link href={`/events`}>Events Landing</Link></h6>
                            <h6 style={{ marginBottom: "10px" }}><Link href={`/csr-policy`}>CSR POLICY</Link></h6>
                            <h6 style={{ marginBottom: "10px" }}><Link href={`/sustainability`}>Sustainability</Link></h6>
                            <h6 style={{ marginBottom: "10px" }}><Link href={`/career`}>Career</Link></h6>
                            <h6 style={{ marginBottom: "10px" }}><Link href={`/product-category/electromechanical-components`}>Category Page</Link></h6>
                            <h6 style={{ marginBottom: "10px" }}><Link href={`/products`}>Product Finder </Link></h6>
                        </div>
                        <div className="items">
                            <h6 style={{ marginBottom: "10px" }}><Link href={`/product-category/electromechanical-components/solenoid-din-connectors`}>Sub Category Page</Link></h6>
                            <h6 style={{ marginBottom: "10px" }}><Link href={`/product-category/electromechanical-components/solenoid-din-connectors/din-plugs-flat`}>Sub-sub Category Page</Link></h6>
                            <h6 style={{ marginBottom: "10px" }}><Link href={`/distributors-and-channel-partners`}>Dealers and Distributors</Link></h6>
                            <h6 style={{ marginBottom: "10px" }}><Link href={`/importance-of-a-power-distribution-unit-in-data-center-management`}>Blog Detail</Link></h6>
                            <h6 style={{ marginBottom: "10px" }}><Link href={`/our_events/data-centre-world-3`}>Event Detail</Link></h6>
                            <h6 style={{ marginBottom: "10px" }}><Link href={`/news/elcom-international-private-limiteds-esg-efforts-featured-in-dun-bradstreet-esg-champions-of-india-2023`}>News Detail</Link></h6>
                            <h6 style={{ marginBottom: "10px" }}><Link href={`/product-category/power-distribution-unit`}>PDU Category Detail</Link></h6>
                            <h6 style={{ marginBottom: "10px" }}><Link href={`/products/electromechanical-components/switches/rotary-switch/ers-2-series/ers-2-series`}>Product detail</Link></h6>
                            <h6 style={{ marginBottom: "10px" }}><Link href={`/product-category/wiring-harness`}>Wiring Harness </Link></h6>
                            <h6 style={{ marginBottom: "10px" }}><Link href={`/product-category/power-distribution-unit/rack-pdu`}>PDU Sub Category Detail</Link></h6>
                            <h6 style={{ marginBottom: "10px" }}><Link href={`/product-category/power-distribution-unit/rack-pdu/vertical-mount`}>PDU Sub Sub Category Detail</Link></h6>
                            <h6 style={{ marginBottom: "10px" }}><Link href={`/products/power-distribution-unit/rack-pdu/eas-t627a-ee335vx`}>PDU Product Detail</Link></h6>
                            <h6 style={{ marginBottom: "10px" }}><Link href={`/build-your-pdu`}>Build You PDU</Link></h6>
                            <h6 style={{ marginBottom: "10px" }}><Link href={`/search`}>Search</Link></h6>
                            <h6 style={{ marginBottom: "10px" }}><Link href={`/request-quote`}>Request Quote</Link></h6>
                            <h6 style={{ marginBottom: "10px" }}><Link href={`/build-your-pdu-result?key=363bb7cc8958084087d8`}>BUILD PDU RESULT</Link></h6>
                            <h6 style={{ marginBottom: "10px" }}><Link href={`/request-quote-result?key=bef46c345973eaffac44`}>Request Quote RESULT</Link></h6>
                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default sitemap