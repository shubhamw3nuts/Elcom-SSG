import InnerBanner from "@/component/InnerBanner"
import SeoData from "@/component/SeoData";

const RequestQuoteData = ({data}) => {
    const {product_names,sample_quantity,phone_number,name,message,job_title,email_address,date_two,date_one,date,company,city} = data;
    return (
        <>
        <SeoData pageTitle={"Request A Quote Result"} seodata=""/>
        <InnerBanner heading={"Request A Quote Result"}/>
        <div className='requestform' style={{paddingTop:"50px"}}>
            <div className="container">
                <div className='requestformdtl'>
                    <div className="requestdtl">
                        <div className="formDtl">
                            <form>
                                <div className='quotedtl'>
                                    <div className='row'>
                                        <div className="col-lg-12">
                                            <div className={`contactInner dropd focused`}>
                                                <label>{"Products"}</label>
                                                <input type="text" name="productnames" value={product_names} disabled />
                                            </div>
                                        </div>
                                        <div className="col-lg-6">
                                            <div className={`contactInner dtlplace focused`}>
                                                <label>{"Name"}</label>
                                                <input type="text" name="fullname" value={name} disabled/>
                                            </div>
                                        </div>
                                        <div className='col-lg-6'>
                                            <div className={`contactInner dtlplace focused`}>
                                                <label>{"Company"}</label>
                                                <input type="text" name="company" value={company} disabled/>
                                            </div>
                                        </div>
                                        <div className='col-lg-6'>
                                            <div className={`contactInner dtlplace focused`}>
                                                <label>{"Email"}</label>
                                                <input type="email" name="emailAddress" value={email_address} disabled/>
                                            </div>
                                        </div>
                                        <div className='col-lg-6'>
                                            <div className={`contactInner dtlplace focused`}>
                                                <label>{"City"}</label>
                                                <input type="text" name="city"  value={city} disabled/>
                                            </div>
                                        </div>
                                        <div className='col-lg-12'>
                                            <div className={`contactInner dtlplace focused`}>
                                                <label>{"Phone Number"}</label>
                                                <input type="tel" name="phoneNumber" value={phone_number} disabled/>
                                            </div>
                                        </div>
                                        <div className='col-lg-12'>
                                            <div className={`contactInner focused`}>
                                                <label>{"Message"}</label>
                                                <input type="text" name="message" value={message} disabled/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}

export default RequestQuoteData;

export async function getServerSideProps(context) {
    const { query } = context;
    const key = query.key || ''; // Default value if 'search' is not present

    const url = `${process.env.NEXT_PUBLIC_WORDPRESS_SITE_URL}/wp-json/wp/v2/requestQuoteData`;
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ "key": key })
    });
    const data = await response.json();
    let result = '';
    if (data) {
        result = data.result;
    }
    return {
        props: {
            data: result,
            headerClass: 'header-v2',
        }
    }
}
