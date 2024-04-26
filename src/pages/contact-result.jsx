import InnerBanner from "@/component/InnerBanner"
import SeoData from "@/component/SeoData";
import Select from "react-select";

const ContactResult = ({data}) => {
    let formData = data ? JSON.parse(data?.form_data) : "";
    const {annualQuantity,category,city,company,country,emailAddress,firstName,lastName,natureOfEnquiry,phone,pinCode,usageApplicationDescription} = formData;
    let focused = true;
    return (
        <>
        <SeoData pageTitle={"Contact Result"} seodata=""/>
        <InnerBanner heading={formData ? "Contact Result" : "404: Page Not Found"}/>
        {formData && <div className='requestform' style={{paddingTop:"50px"}}>
            <div className="container">
                <div className='requestformdtl'>
                    <div className="requestdtl">
                        <div className="formDtl">
                        <form>
                            <div className='contactWrap'>
                                <div className='detailContact'>
                                    <div className='row'>
                                        <div className='col-lg-6 col-md-6'>
                                            <div className={`contactInner ${focused == 'category' || formData.category ? 'focused' : ''}`}>
                                                <label>Category</label>
                                                <input type="text" name="category"
                                                    value={formData.category}
                                                    disabled
                                                />
                                            </div>
                                        </div>
                                        <div className='col-lg-6 col-md-6'>
                                            <div className={`contactInner ${focused == 'usageApplicationDescription' || formData.usageApplicationDescription ? 'focused' : ''}`}>
                                                <label>Description and Usage Application</label>
                                                <input type="text" name="usageApplicationDescription"
                                                    value={formData.usageApplicationDescription}
                                                    disabled
                                                />
                                            </div>
                                        </div>
                                        <div className='col-lg-6 col-md-6'>
                                            <div className={`contactInner ${focused == 'annualQuantity' || formData.annualQuantity ? 'focused' : ''}`}>
                                                <label>Annual Quantity Units</label>
                                                <input type="number" name="annualQuantity"
                                                    value={formData.annualQuantity}
                                                    disabled
                                                />
                                            </div>
                                        </div>
                                        <div className='col-lg-6 col-md-6'>
                                            <div className={`contactInner ${focused == 'natureOfEnquiry' || formData.natureOfEnquiry ? 'focused' : ''}`}>
                                                <label>Nature of enquiry</label>
                                                <input type="text" name="natureOfEnquiry"
                                                    value={formData.natureOfEnquiry}
                                                    disabled
                                                />
                                            </div>
                                        </div>
                                        <div className='col-lg-6 col-md-6'>
                                            <div className={`contactInner ${focused == 'firstName' || formData.firstName ? 'focused' : ''}`}>
                                                <label>First Name</label>
                                                <input type="text" name="firstName"
                                                    value={formData.firstName}
                                                    disabled
                                                />
                                            </div>
                                        </div>
                                        <div className='col-lg-6 col-md-6'>
                                            <div className={`contactInner ${focused == 'lastName' || formData.lastName ? 'focused' : ''}`}>
                                                <label>Last Name</label>
                                                <input type="text" name="lastName"
                                                    value={formData.lastName}
                                                    disabled
                                                />
                                            </div>
                                        </div>
                                        <div className='col-lg-6 col-md-6'>
                                            <div className={`contactInner ${focused == 'emailAddress' || formData.emailAddress ? 'focused' : ''}`}>
                                                <label>Email</label>
                                                <input type="email" name="emailAddress"
                                                    value={formData.emailAddress}
                                                    disabled
                                                />
                                            </div>
                                        </div>
                                        <div className='col-lg-6 col-md-6'>
                                            <div className={`contactInner ${focused == 'country' || formData.country ? 'focused' : ''}`}>
                                                <label>Country</label>
                                                <input type="text" name="country"
                                                    value={formData.country}
                                                    disabled
                                                />
                                            </div>
                                        </div>
                                        <div className='col-lg-6 col-md-6'>
                                            <div className={`contactInner ${focused == 'city' || formData.city ? 'focused' : ''}`}>
                                                <label>City</label>
                                                <input type="text" name="city"
                                                    value={formData.city}
                                                    disabled
                                                />
                                            </div>
                                        </div>
                                        <div className='col-lg-6 col-md-6'>
                                            <div className={`contactInner ${focused == 'pinCode' || formData.pinCode ? 'focused' : ''}`}>
                                                <label>Pin code</label>
                                                <input type="number" name="pinCode"
                                                    value={formData.pinCode}
                                                    disabled
                                                />
                                            </div>
                                        </div>
                                        <div className='col-lg-6 col-md-6'>
                                            <div className={`contactInner ${focused == 'phone' || formData.phone ? 'focused' : ''}`}>
                                                <label>Phone</label>
                                                <input type="number" name="phone"
                                                    value={formData.phone}
                                                    disabled
                                                />
                                            </div>
                                        </div>
                                        <div className='col-lg-6 col-md-6'>
                                            <div className={`contactInner ${focused == 'company' || formData.company ? 'focused' : ''}`}>
                                                <label>Company</label>
                                                <input type="text" name="company"
                                                    value={formData.company}
                                                    disabled
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>}
        </>
    )
}

export default ContactResult;

export async function getServerSideProps(context) {
    const { query } = context;
    const key = query.key || ''; // Default value if 'search' is not present

    const url = `${process.env.NEXT_PUBLIC_WORDPRESS_SITE_URL}/wp-json/wp/v2/contactFormData`;
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
