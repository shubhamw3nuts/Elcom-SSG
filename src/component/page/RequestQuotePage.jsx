import Link from 'next/link';
import { useState, useEffect } from 'react';
import Select from "react-select";
import { isValidEmail, isValidPhoneNumber } from '@/utils/utils';
import axios from 'axios';
import { useRouter } from 'next/router';
import SeoData from '../SeoData';
import InnerBanner from '../InnerBanner';

const RequestQuotePage = ({ change, allProducts, quotepageData, pageTitle, seodata }) => {
    // if (allProducts && quotepageData) {
    // const products = allProducts.products.nodes;
    // let selectedProductIdFromLocalStorage = localStorage.getItem("selected_prodducts");
    // selectedProductIdFromLocalStorage = selectedProductIdFromLocalStorage ? JSON.parse(selectedProductIdFromLocalStorage) : "";
    // products.map((product, index) => {
    //     const { databaseId, name } = product;
    //     if (selectedProductIdFromLocalStorage && selectedProductIdFromLocalStorage.includes(product.databaseId)) {
    //         defaultOptions.push({ value: databaseId, label: name, id: databaseId });
    //     }
    //     options.push({ value: databaseId, label: name, id: databaseId });
    // })
    const { checkboxTitle, privacyPolicyPage, cityTitle, compnayTitle, emailTitle, formHeading, formSuccessMessage, invalidEmailMessage, invalidPhoneMessage, jobTitle,
        messageTitle, nameTitle, numberTitle, productNameTitle, quantityTitle, requiredFieldErrorMessage, submitButtonTitle
    } = quotepageData?.page?.template?.requestAQuoteFields;


    const [selectedOption, setSelectedOption] = useState(null);
    const [options, setOptions] = useState();
    const [focused, setFocused] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [formData, setFormData] = useState({
        product: "",
        fullname: "",
        company: "",
        emailAddress: "",
        city: "",
        phoneNumber: "",
        message: "",
        privacyStatement: ""
    });
    const [formErrors, setFormErrors] = useState({});
    const [submitBtnText, setSubmitBtnText] = useState(submitButtonTitle || "SUBMIT");
    const [isMailSent, setIsMailSent] = useState(""); // to check if form submit with mail or not 
    const [formSubmitError, setFormSubmitError] = useState('');

    let hasErrors = false;
    let errors = {}
    let emptyFieldErrorMessage = requiredFieldErrorMessage || "Kindly fill this field";

    const handleChange = (event) => {
        const { name, value, checked } = event.target;
        setFormData((prevFormData) => ({ ...prevFormData, [name]: name == 'privacyStatement' ? checked : value }));
    };

    const handleFocus = (input) => {
        setFocused(input);
    }

    const handleBlur = () => {
        setFocused(false);
    }

    const handleSelectChange = (selectedOption) => {
        setSelectedOption(selectedOption)
        setFormData((prevFormData) => ({ ...prevFormData, ['product']: selectedOption.length > 0 ? selectedOption.map(obj => obj.label).join(', ') : '' }))
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        // Validate empty fields
        for (const key in formData) {
            if (key != 'privacyStatement' && formData[key].trim() == '') {
                errors[key] = emptyFieldErrorMessage;
                hasErrors = true;
            } else if (key == 'emailAddress') {
                if (!isValidEmail(formData[key])) {
                    hasErrors = true;
                    errors[key] = invalidEmailMessage || "Please Enter Valid Email Address";
                }
            } else if (key == 'phoneNumber') {
                if (!isValidPhoneNumber(formData[key])) {
                    hasErrors = true;
                    errors[key] = invalidPhoneMessage || "Please Enter Valid Phone Number";
                }
            } else if (key == 'privacyStatement') {
                if (!formData[key]) {
                    hasErrors = true;
                    errors[key] = emptyFieldErrorMessage;
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

            const url_2 = `${process.env.NEXT_PUBLIC_WORDPRESS_SITE_URL}/wp-json/wp/v2/requestQuote`;
            axios.post(url_2, formDataForMail, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })
                .then(response => {
                    if (response.data.email_sent) {
                        setIsMailSent("Yes");
                        setFormSubmitError(formSuccessMessage);
                        setSubmitBtnText(submitBtnText);
                        setSelectedOption("");
                        Object.keys(formData).map((key, index) => (key == 'privacyStatement' ? formData[key] = false : formData[key] = ''))
                        localStorage.setItem("selected_prodducts", "")
                        localStorage.setItem("pdu_selected_prodducts", "")

                        const formSection = document.getElementById('formSection');
                        if (formSection) {
                            formSection.scrollIntoView({ behavior: 'smooth' });
                        }
                    } else {
                        setFormSubmitError("Something went wrong! Plese try again.");
                        setSubmitBtnText(submitBtnText);
                        setIsMailSent("No");
                    }
                })
                .catch(error => {
                    setFormSubmitError('Error : There was an error trying to send your message. Please try again later.');
                    setSubmitBtnText(submitBtnText);
                    setIsMailSent("No");
                    console.error('Error:', error);
                });

            setFormErrors({}) // make all field error empty
        }
    }

    if (isMailSent != '') {
        setTimeout(() => {
            setIsMailSent("");
        }, 5000);
    }
    const router = useRouter();

    useEffect(() => {
        let defaultOptions = [];
        const options_data = [];
        const products = allProducts.products.nodes;
        let selectedProductIdFromLocalStorage = localStorage.getItem(router.query?.category ? (router.query?.category == 'pdu' ? "pdu_selected_prodducts" : "selected_prodducts") : "selected_prodducts");
        selectedProductIdFromLocalStorage = selectedProductIdFromLocalStorage ? JSON.parse(selectedProductIdFromLocalStorage) : "";
        products.map((product, index) => {
            const { databaseId, name } = product;
            if (selectedProductIdFromLocalStorage && selectedProductIdFromLocalStorage.some(p => p.productId === product.databaseId)) {
                defaultOptions.push({ value: databaseId, label: name, id: databaseId });
            }
            options_data.push({ value: databaseId, label: name, id: databaseId });
        })
        setSelectedOption(defaultOptions);
        setOptions(options_data);
        setFormData(prevFormData => ({
            ...prevFormData,
            product: (defaultOptions.length > 0 ? defaultOptions.map(obj => obj.label).join(', ') : "")
        }));

    }, []);

    return (
        <>
            <SeoData seodata={seodata} pageTitle={pageTitle} />
            <InnerBanner heading={pageTitle} />
            <div className='requestform newQuote'>
                <div className="container">
                    <div className='requestformdtl'>
                        <div className="requestdtl">

                            <div className="formDtl">
                                <form onSubmit={handleSubmit}>
                                    <div className='quotedtl'>
                                        <div className='row'>
                                            <div className="col-lg-12">
                                                <div className={`contactInner dropd focused ${selectedOption ? '' : ''}`}>
                                                    <label>{productNameTitle}</label>
                                                    <Select
                                                        onChange={handleSelectChange}
                                                        options={options}
                                                        isMulti
                                                        className="react-select-container"
                                                        classNamePrefix="react-select"
                                                        openMenuOnClick={true}
                                                        value={selectedOption}
                                                    />
                                                    {formErrors?.product && <div className="errormess">{formErrors.product}</div>}
                                                </div>
                                            </div>
                                            <div className='requestFormWrapper'>
                                                {formHeading && <div className='requestttl'>
                                                    <h6>{formHeading}</h6>
                                                </div>}
                                                <div className='row'>
                                                    <div className="col-lg-6">
                                                        <div className={`contactInner dtlplace ${focused == 'fullname' || formData.fullname ? 'focused' : ''}`}>
                                                            <label>{nameTitle}</label>
                                                            <input type="text" name="fullname" onFocus={() => handleFocus('fullname')} onBlur={handleBlur} onChange={handleChange} value={formData.fullname} />
                                                            {formErrors?.fullname && <div className="errormess">{formErrors.fullname}</div>}
                                                        </div>
                                                    </div>
                                                    <div className='col-lg-6'>
                                                        <div className={`contactInner dtlplace ${focused == 'company' || formData.company ? 'focused' : ''}`}>
                                                            <label>{compnayTitle}</label>
                                                            <input type="text" name="company" onFocus={() => handleFocus('company')} onBlur={handleBlur} onChange={handleChange} value={formData.company} />
                                                            {formErrors?.company && <div className="errormess">{formErrors.company}</div>}
                                                        </div>
                                                    </div>
                                                    <div className='col-lg-6'>
                                                        <div className={`contactInner dtlplace ${focused == 'emailAddress' || formData.emailAddress ? 'focused' : ''}`}>
                                                            <label>{emailTitle}</label>
                                                            <input type="email" name="emailAddress" onFocus={() => handleFocus('emailAddress')} onBlur={handleBlur} onChange={handleChange} value={formData.emailAddress} />
                                                            {formErrors?.emailAddress && <div className="errormess">{formErrors.emailAddress}</div>}
                                                        </div>
                                                    </div>
                                                    <div className='col-lg-6'>
                                                        <div className={`contactInner dtlplace ${focused == 'phoneNumber' || formData.phoneNumber ? 'focused' : ''}`}>
                                                            <label>{numberTitle}</label>
                                                            <input type="tel" name="phoneNumber" onFocus={() => handleFocus('phoneNumber')} onBlur={handleBlur} onChange={handleChange} value={formData.phoneNumber} />
                                                            {formErrors?.phoneNumber && <div className="errormess">{formErrors.phoneNumber}</div>}
                                                        </div>
                                                    </div>
                                                    <div className='col-lg-12'>
                                                        <div className={`contactInner dtlplace ${focused == 'city' || formData.city ? 'focused' : ''}`}>
                                                            <label>{cityTitle}</label>
                                                            <input type="text" name="city" onFocus={() => handleFocus('city')} onBlur={handleBlur} onChange={handleChange} value={formData.city} />
                                                            {formErrors?.city && <div className="errormess">{formErrors.city}</div>}
                                                        </div>
                                                    </div>

                                                    <div className='col-lg-12'>
                                                        <div className={`contactInner ${focused == 'message' || formData.message ? 'focused' : ''}`}>
                                                            <label>{messageTitle}</label>
                                                            <input type="text" name="message" onFocus={() => handleFocus('message')} onBlur={handleBlur} onChange={handleChange} value={formData.message} />
                                                        </div>
                                                        {formErrors?.message && <div className="errormess">{formErrors.message}</div>}
                                                        {/* <div className='errormess'>
                                                            <span>This field is required</span>
                                                        </div> */}
                                                    </div>
                                                    <div className='col-lg-12'>
                                                        <div className="checkbox_wrap">
                                                            <label>
                                                                <input type="checkbox" className='check' name='privacyStatement' onChange={handleChange} checked={formData.privacyStatement} />
                                                                <span>{checkboxTitle} {privacyPolicyPage ? <Link href={privacyPolicyPage.url} target={privacyPolicyPage.target}>{privacyPolicyPage.title}</Link> : ''}</span>
                                                            </label>
                                                            {formErrors?.privacyStatement && <div className="errormess">{formErrors.privacyStatement}</div>}
                                                        </div>
                                                    </div>
                                                    <div className="btnbox">
                                                        <Link className="elcom-btn primary-black-btn" href='javascript:void(0)' onClick={handleSubmit}>{submitBtnText}</Link>
                                                    </div>
                                                    {isMailSent != '' && <div className='col-lg-12 col-md-12'>
                                                        <div className={`buildYourPDUFormMessage ${isMailSent == 'Yes' ? 'success' : 'error'}`}>
                                                            <p><strong>{formSubmitError}</strong></p>
                                                        </div>
                                                    </div>}
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
    // }
}

export default RequestQuotePage