
import Link from 'next/link';
import Image from 'next/image';
import SectiontitleFull from './layouts/SectiontitleFull';
import Phone from '@/asset/images/Phone.svg';
import Mail from '@/asset/images/Mail.svg';
import Mappin from '@/asset/images/Mappin.svg';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { isValidEmail, isValidPhoneNumber } from '@/utils/utils';
import Select from "react-select";

const AddressSec = ({ data }) => {
    const {
        bannerHeading,
        contactAddressHeading, contactAddressInfo, contactEmailHeading, contactEmailInfo, contactFactoryHeading, contactHeading, contactMapIframe, contactOfficeHeading, contactPhoneHeading, contactPhoneOneInfo, contactPhoneTwoInfo, contactSectionHeading, emptyFieldErrorMessage, enquiryFormSubmitButtonText, enquiryHeading, enquirySectionHeading, factoryAddressHeading, factoryAddressInfo, factoryPhoneHeading, factoryPhoneOneInfo, factoryPhoneTwoInfo, thankYouMessage, formResetButtonText
    } = data;

    let hasErrors = false;
    let errors = {}

    const [focused, setFocused] = useState(false);
    const [formErrors, setFormErrors] = useState({});
    const [submitBtnText, setSubmitBtnText] = useState(enquiryFormSubmitButtonText);
    const [isMailSent, setIsMailSent] = useState(false); // to check if form submit with mail or not 
    const [formSubmitError, setFormSubmitError] = useState('');
    const [formData, setFormData] = useState(
        {
            category: "",
            usageApplicationDescription: "",
            annualQuantity: "",
            natureOfEnquiry: "",
            firstName: "",
            lastName: "",
            emailAddress: "",
            country: "",
            city: "",
            pinCode: "",
            phone: "",
            company: ""
        });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
    };

    const handleFocus = (input) => {
        setFocused(input);
    }

    const handleBlur = () => {
        setFocused(false);
    }

    const handleKeyDown = (event) => {
        // Prevent the default behavior if the pressed key is "e"
        if (event.keyCode === 69 || event.keyCode == 189 || event.keyCode == 107) {
            event.preventDefault();
        }
    };
    const handleKeyDownForPhone = (event) => {
        // Prevent the default behavior if the pressed key is "e"
        if (event.keyCode === 69) {
            event.preventDefault();
        }
    };


    const handleSubmit = (e) => {
        e.preventDefault();

        // Validate empty fields
        for (const key in formData) {
            if (formData[key].trim() === '' && key != 'category' && key != 'natureOfEnquiry') {
                errors[key] = emptyFieldErrorMessage;
                hasErrors = true;
            } else if (key == 'emailAddress') {
                if (!isValidEmail(formData[key])) {
                    hasErrors = true;
                    errors[key] = "Please Enter Valid Email Address";
                }
            } else if (key == 'phone') {
                if (!isValidPhoneNumber(formData[key])) {
                    hasErrors = true;
                    errors[key] = "Please Enter Valid Phone Number";
                }
            }
        }

        if (hasErrors) {
            setFormErrors(errors);
        } else {
            setSubmitBtnText('Loading...');
            const formDataForMail = new FormData();

            //adding all filled data to FormData()
            for (const key in formData) {
                formDataForMail.append(key, formData[key]);
            }

            const url_2 = `${process.env.NEXT_PUBLIC_WORDPRESS_SITE_URL}/wp-json/wp/v2/contactForm`;
            axios.post(url_2, formDataForMail, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })
                .then(response => {
                    if (response.data.email_sent) {
                        setIsMailSent(true);
                        setFormSubmitError('');
                        setSubmitBtnText(enquiryFormSubmitButtonText);
                        Object.keys(formData).map((key, index) => (formData[key] = ''))

                        const formSection = document.getElementById('formSection');
                        if (formSection) {
                            formSection.scrollIntoView({ behavior: 'smooth' });
                        }
                    } else {
                        setFormSubmitError("Error : There was an error trying to send your message. Please try again later.");
                        setSubmitBtnText(enquiryFormSubmitButtonText);
                    }
                })
                .catch(error => {
                    console.error('Error:', error);
                    setFormSubmitError('Error : There was an error trying to send your message. Please try again later.');
                    setSubmitBtnText(enquiryFormSubmitButtonText);
                });

            setFormErrors({}) // make all field error empty
        }
    }

    useEffect(() => {
        if (isMailSent) {
            setTimeout(() => {
                setIsMailSent(false);
            }, 3000);
        }
    }, [isMailSent]);

    const categoryChange = (e) => {
        setFormData((prevFormData) => ({ ...prevFormData, ['category']: e.value }));
    }

    const natureOfEnquiryChange = (e) => {
        setFormData((prevFormData) => ({ ...prevFormData, ['natureOfEnquiry']: e.value }));
    }
    // console.log("Formdata ; ",formData)

    const options = formData.category ? [
        { label: "None", value: '' },
        { label: "Electromechanical Components", value: "Electromechanical Components" },
        { label: "Power Distribution Unit", value: "Power Distribution Unit" },
        { label: "EMI EMC Products", value: "EMI EMC Products" },
        { label: "Solar Connectors", value: "Solar Connectors" },
        { label: "Wiring Harness", value: "Wiring Harness" },
    ] : [
        { label: "Electromechanical Components", value: "Electromechanical Components" },
        { label: "Power Distribution Unit", value: "Power Distribution Unit" },
        { label: "EMI EMC Products", value: "EMI EMC Products" },
        { label: "Solar Connectors", value: "Solar Connectors" },
        { label: "Wiring Harness", value: "Wiring Harness" },
    ];

    const natureOfEnquiryOptions = formData.natureOfEnquiry ? [
        { label: "None", value: '' },
        { label: "Sample Request", value: "Sample Request" },
        { label: "Repeat Purchase", value: "Repeat Purchase" },
        { label: "New Purchase", value: "New Purchase" },
    ] : [
        { label: "Sample Request", value: "Sample Request" },
        { label: "Repeat Purchase", value: "Repeat Purchase" },
        { label: "New Purchase", value: "New Purchase" },
    ];

    // console.log("category : ",formData)

    const customStyles = {
        option: (provided, state) => ({
            ...provided,
            backgroundColor: state.isSelected ? '#005ABB' : state.isFocused ? '#005ABB' : '#F2F2F2',
            color: state.isSelected ? '#FFF' : state.isFocused ? '#fff' : '#000',
            ':active': {
                backgroundColor: '#F2F2F2',
                color: '#7B7B7B'
            },
            ':hover': {
                color: '#fff'
            }
        }),
        menuList: (provided, state) => ({
            ...provided,
            paddingTop: 0,
            paddingBottom: 0,
            overflow: 'hidden',
        }),
    };
    return (
        <>
            <div className='addressWrap'>
                <SectiontitleFull heading={contactHeading} sectionHeading={contactSectionHeading} />
                <div className='addressWrapper'>
                    <div className='container'>
                        <div className='addressMap '>
                            <div className='row'>
                                {contactMapIframe &&
                                    <div className='col-lg-6'>
                                        <div className='addressImg'>
                                            {/* <Image src={mapsiclemap} alt='mapsiclemap' /> */}
                                            <div dangerouslySetInnerHTML={{ __html: contactMapIframe }} className="custom_html"></div>
                                        </div>
                                    </div>
                                }
                                {(contactPhoneOneInfo || contactPhoneTwoInfo || contactEmailInfo || contactAddressInfo) &&
                                    <div className={`col-lg-${contactMapIframe ? '6' : '12'}`}>
                                        {(contactPhoneOneInfo || contactPhoneTwoInfo || contactEmailInfo || contactAddressInfo) &&
                                            <div className='addressDtl fadeInUp'>
                                                {contactOfficeHeading && <div className='addressTtl'>
                                                    <h6>{contactOfficeHeading}</h6>
                                                </div>}
                                                <div className='officeAddress'>
                                                    <ul>
                                                        {(contactPhoneOneInfo || contactPhoneTwoInfo) &&
                                                            <li>
                                                                <Image src={Phone} alt='Phone' />
                                                                <span>{contactPhoneHeading} <br />
                                                                    <Link href={`tel:${contactPhoneOneInfo}`}> {contactPhoneOneInfo}</Link>
                                                                    {contactPhoneTwoInfo && (<> / <Link href={`tel:${contactPhoneTwoInfo}`}>{contactPhoneTwoInfo}</Link></>)}
                                                                </span>
                                                            </li>
                                                        }
                                                        {contactEmailInfo && <li>
                                                            <Image src={Mail} alt='Mail' />
                                                            <span>{contactEmailHeading} <br /><Link href={`mailto:${contactEmailInfo}`}>{contactEmailInfo}</Link></span>
                                                        </li>}

                                                        {contactAddressHeading && <li>
                                                            <Image src={Mappin} alt='Mappin' />
                                                            <span>{contactAddressHeading} <br />{contactAddressInfo}</span>
                                                        </li>}
                                                    </ul>
                                                </div>
                                            </div>
                                        }

                                        {(factoryPhoneOneInfo || factoryPhoneTwoInfo || factoryAddressInfo) &&
                                            <div className='addressDtl'>
                                                {contactFactoryHeading && <div className='addressTtl'>
                                                    <h6>{contactFactoryHeading}</h6>
                                                </div>}
                                                <div className='officeAddress'>
                                                    <ul>
                                                        {(factoryPhoneOneInfo || factoryPhoneTwoInfo) &&
                                                            <li>
                                                                <Image src={Phone} alt='Phone' />
                                                                <span>{factoryPhoneHeading} <br />
                                                                    <Link href={`tel:${factoryPhoneOneInfo}`}> {factoryPhoneOneInfo}</Link>
                                                                    {factoryPhoneTwoInfo && (<> / <Link href={`tel:${factoryPhoneTwoInfo}`}>{factoryPhoneTwoInfo}</Link></>)}
                                                                </span>
                                                            </li>
                                                        }
                                                        {factoryAddressInfo &&
                                                            <li>
                                                                <Image src={Mappin} alt='Mappin' />
                                                                <span>{factoryAddressHeading} <br />{factoryAddressInfo}</span>
                                                            </li>
                                                        }
                                                    </ul>
                                                </div>
                                            </div>
                                        }
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                    {isMailSent ?
                        <div className='inquerySec' id="formSection">
                            <SectiontitleFull heading={''} sectionHeading={enquirySectionHeading} />
                            <div className='contactForm thankyou'>
                                <h3>{thankYouMessage || "THANK YOU!"}</h3>
                            </div>
                        </div>
                        :
                        <div className='inquerySec' id="formSection">
                            <SectiontitleFull heading={enquiryHeading} sectionHeading={enquirySectionHeading} />
                            <div className='contactForm'>
                                <div className='container'>
                                    <form onSubmit={handleSubmit}>
                                        <div className='contactWrap'>
                                            <div className='detailContact'>
                                                <div className='row'>
                                                    <div className='col-lg-6 col-md-6'>
                                                        <div className={`contactInner ${focused == 'category' || formData.category ? 'focused' : ''}`}>
                                                            <Select
                                                                placeholder={"Category"}
                                                                defaultValue={"Category"}
                                                                onChange={categoryChange}
                                                                options={options}
                                                                styles={customStyles}
                                                                isSearchable={false}
                                                            />
                                                            {formErrors?.category && <div className="errormess">{formErrors.category}</div>}
                                                        </div>
                                                    </div>
                                                    <div className='col-lg-6 col-md-6'>
                                                        <div className={`contactInner ${focused == 'usageApplicationDescription' || formData.usageApplicationDescription ? 'focused' : ''}`}>
                                                            <label>Description and Usage Application*</label>
                                                            <input type="text" name="usageApplicationDescription"
                                                                onFocus={() => handleFocus('usageApplicationDescription')}
                                                                onBlur={handleBlur}
                                                                onChange={handleChange}
                                                                value={formData.usageApplicationDescription}
                                                            />
                                                            {formErrors?.usageApplicationDescription && <div className="errormess">{formErrors.usageApplicationDescription}</div>}
                                                        </div>
                                                    </div>
                                                    <div className='col-lg-6 col-md-6'>
                                                        <div className={`contactInner ${focused == 'annualQuantity' || formData.annualQuantity ? 'focused' : ''}`}>
                                                            <label>Annual Quantity Units*</label>
                                                            <input type="number" name="annualQuantity"
                                                                onFocus={() => handleFocus('annualQuantity')}
                                                                onBlur={handleBlur}
                                                                onChange={handleChange}
                                                                value={formData.annualQuantity}
                                                                onKeyDown={handleKeyDown}
                                                            />
                                                            {formErrors?.annualQuantity && <div className="errormess">{formErrors.annualQuantity}</div>}
                                                        </div>
                                                    </div>
                                                    <div className='col-lg-6 col-md-6'>
                                                        <div className={`contactInner ${focused == 'natureOfEnquiry' || formData.natureOfEnquiry ? 'focused' : ''}`}>
                                                            <Select
                                                                name="natureOfEnquiry"
                                                                placeholder={"Nature of enquiry"}
                                                                defaultValue={"Nature of enquiry"}
                                                                onChange={natureOfEnquiryChange}
                                                                options={natureOfEnquiryOptions}
                                                                styles={customStyles}
                                                                isSearchable={false}
                                                            />
                                                            {formErrors?.natureOfEnquiry && <div className="errormess">{formErrors.natureOfEnquiry}</div>}
                                                        </div>
                                                    </div>
                                                    <div className='col-lg-6 col-md-6'>
                                                        <div className={`contactInner ${focused == 'firstName' || formData.firstName ? 'focused' : ''}`}>
                                                            <label>First Name*</label>
                                                            <input type="text" name="firstName"
                                                                onFocus={() => handleFocus('firstName')}
                                                                onBlur={handleBlur}
                                                                onChange={handleChange}
                                                                value={formData.firstName}
                                                            />
                                                            {formErrors?.firstName && <div className="errormess">{formErrors.firstName}</div>}
                                                        </div>
                                                    </div>
                                                    <div className='col-lg-6 col-md-6'>
                                                        <div className={`contactInner ${focused == 'lastName' || formData.lastName ? 'focused' : ''}`}>
                                                            <label>Last Name*</label>
                                                            <input type="text" name="lastName"
                                                                onFocus={() => handleFocus('lastName')}
                                                                onBlur={handleBlur}
                                                                onChange={handleChange}
                                                                value={formData.lastName}
                                                            />
                                                            {formErrors?.lastName && <div className="errormess">{formErrors.lastName}</div>}
                                                        </div>
                                                    </div>
                                                    <div className='col-lg-6 col-md-6'>
                                                        <div className={`contactInner ${focused == 'emailAddress' || formData.emailAddress ? 'focused' : ''}`}>
                                                            <label>Email*</label>
                                                            <input type="email" name="emailAddress"
                                                                onFocus={() => handleFocus('emailAddress')}
                                                                onBlur={handleBlur}
                                                                onChange={handleChange}
                                                                value={formData.emailAddress}
                                                            />
                                                            {formErrors?.emailAddress && <div className="errormess">{formErrors.emailAddress}</div>}
                                                        </div>
                                                    </div>
                                                    <div className='col-lg-6 col-md-6'>
                                                        <div className={`contactInner ${focused == 'country' || formData.country ? 'focused' : ''}`}>
                                                            <label>Country*</label>
                                                            <input type="text" name="country"
                                                                onFocus={() => handleFocus('country')}
                                                                onBlur={handleBlur}
                                                                onChange={handleChange}
                                                                value={formData.country}
                                                            />
                                                            {formErrors?.country && <div className="errormess">{formErrors.country}</div>}
                                                        </div>
                                                    </div>
                                                    <div className='col-lg-6 col-md-6'>
                                                        <div className={`contactInner ${focused == 'city' || formData.city ? 'focused' : ''}`}>
                                                            <label>City*</label>
                                                            <input type="text" name="city"
                                                                onFocus={() => handleFocus('city')}
                                                                onBlur={handleBlur}
                                                                onChange={handleChange}
                                                                value={formData.city}
                                                            />
                                                            {formErrors?.city && <div className="errormess">{formErrors.city}</div>}
                                                        </div>
                                                    </div>
                                                    <div className='col-lg-6 col-md-6'>
                                                        <div className={`contactInner ${focused == 'pinCode' || formData.pinCode ? 'focused' : ''}`}>
                                                            <label>Pin code*</label>
                                                            <input type="number" name="pinCode"
                                                                onFocus={() => handleFocus('pinCode')}
                                                                onBlur={handleBlur}
                                                                onChange={handleChange}
                                                                value={formData.pinCode}
                                                                onKeyDown={handleKeyDown}
                                                            />
                                                            {formErrors?.pinCode && <div className="errormess">{formErrors.pinCode}</div>}
                                                        </div>
                                                    </div>
                                                    <div className='col-lg-6 col-md-6'>
                                                        <div className={`contactInner ${focused == 'phone' || formData.phone ? 'focused' : ''}`}>
                                                            <label>Phone*</label>
                                                            <input type="number" name="phone"
                                                                onFocus={() => handleFocus('phone')}
                                                                onBlur={handleBlur}
                                                                onChange={handleChange}
                                                                value={formData.phone}
                                                                onKeyDown={handleKeyDownForPhone}
                                                            />
                                                            {formErrors?.phone && <div className="errormess">{formErrors.phone}</div>}
                                                        </div>
                                                    </div>
                                                    <div className='col-lg-6 col-md-6'>
                                                        <div className={`contactInner ${focused == 'company' || formData.company ? 'focused' : ''}`}>
                                                            <label>Company*</label>
                                                            <input type="text" name="company"
                                                                onFocus={() => handleFocus('company')}
                                                                onBlur={handleBlur}
                                                                onChange={handleChange}
                                                                value={formData.company}
                                                            />
                                                            {formErrors?.company && <div className="errormess">{formErrors.company}</div>}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='btnbox'>
                                                <Link className="elcom-btn primary-btn" href='#' onClick={handleSubmit}>{submitBtnText || "SUBMIT"}</Link>
                                            </div>
                                            {formSubmitError && <div className="formError">
                                                <p>{formSubmitError}</p>
                                            </div>}
                                        </div>
                                    </form>

                                </div>
                            </div>
                        </div>
                    }
                </div>
            </div>
        </>
    )
}

export default AddressSec;