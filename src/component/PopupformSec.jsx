import React, { useState } from "react";
import Image from 'next/image';
import Link from 'next/link';
import Closepopup from '@/asset/images/Closepopup.svg';
import axios from "axios";
import { ShortenedFilename, isValidEmail, isValidPhoneNumber } from "@/utils/utils";

const Popupform = ({ change, careerData,applicationFormOptions }) => {
    const {
        title, excerpt, content, careerLocationCategories, careerDepartmentCategories, careerFields, databaseId
    } = careerData;

    const {
        formHeading,firstNameHeading,lastNameHeading,emailHeading,phoneHeading,resumeHeading,coverLetterHeading,checkboxText,privacyPolicyInfo,submitButtonText
    } = applicationFormOptions;

    let commaSeparatedLocations = '';
    if (careerLocationCategories?.nodes.length > 0) {
        const categoryNames = careerLocationCategories?.nodes.map(category => category.name);
        commaSeparatedLocations = categoryNames.join(', ');
    }

    const [formData, setFormData] = useState({
        id: `${databaseId}`,
        name: title,
        firstName: '',
        lastName: '',
        emailAddress: '',
        phone: '',
        privacyCB: false
    });

    let errors = {}
    let hasErrors = false;
    let emptyFieldErrorMessage = 'This field is required';

    const [selectedResume, setSelectedResume] = useState(null);
    const [resumeFileName, setResumeFileName] = useState("");
    const [resumeError, setResumeError] = useState('');
    const [selectedCV, setSelectedCV] = useState(null);
    const [cvFileName, setCVFileName] = useState("");
    const [cvError, setCVError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [formErrors, setFormErrors] = useState({});
    const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);
    const [cbError, setCBError] = useState("");
    const [formMessage, setFormMessage] = useState({ type: '', message: '' });

    function bytesToMB(bytes) {
        return (bytes / (1024 * 1024)).toFixed(2);
    }

    const removeResumeHandler = () => {
        setSelectedResume("");
        setResumeFileName('');
        setResumeError('');
    }

    const removeCvHandler = () => {
        setSelectedCV("")
        setCVFileName('');
        setCVError('');
    }

    const handleChange = (event) => {
        const { name, value } = event.target;
        if (name == 'resume') {
            let resume = event.target.files[0];
            if (resume) {
                let filesize = bytesToMB(resume.size);
                if ((resume.type != 'application/pdf') && (resume.type != 'image/png') && (resume.type != 'image/webp') && (resume.type != 'image/jpeg') && (resume.type != 'image/jpg') && (resume.type != 'application/msword') && (resume.type != 'application/doc') && (resume.type != 'application/docx') ) {
                    hasErrors = true;
                    setSelectedResume('');
                    setResumeError("Only .pdf,.png,.jpg,.jpeg,.doc,.docx Filetype allowed.");
                    setResumeFileName(ShortenedFilename(resume.name));
                }else if(filesize > 5){
                    hasErrors = true;
                    setSelectedResume('');
                    setResumeError("Filesize should be smaller then 5MB");
                    setResumeFileName(ShortenedFilename(resume.name));
                }else {
                    setSelectedResume(resume)
                    setResumeError("");
                    setResumeFileName(ShortenedFilename(resume.name));
                }
            } else {
                hasErrors = true;
                setSelectedResume('');
                setResumeError("This field is required");
                setResumeFileName("");
            }
        } else if (name == 'coverLetter') {
            let cv = event.target.files[0];
            if (cv) {
                let filesize = bytesToMB(cv.size);
                if ((cv.type != 'application/pdf') && (cv.type != 'image/png') && (cv.type != 'image/webp') && (cv.type != 'image/jpeg') && (cv.type != 'image/jpg') && (cv.type != 'application/msword') && (cv.type != 'application/doc') && (cv.type != 'application/docx')) {
                    hasErrors = true;
                    setSelectedCV('');
                    setCVError("Only .pdf,.png,.jpg,.jpeg,.doc,.docx Filetype allowed.");
                    setCVFileName(ShortenedFilename(cv.name));
                } else if(filesize > 5){
                    hasErrors = true;
                    setSelectedResume('');
                    setCVError("Filesize should be smaller then 5MB");
                    setCVFileName(ShortenedFilename(cv.name));
                }else {
                    setSelectedCV(cv)
                    setCVError("");
                    setCVFileName(ShortenedFilename(cv.name));
                }
            } else {
                hasErrors = true;
                setSelectedCV('');
                setCVError("This field is required");
                setCVFileName("");
            }
        } else if (name == 'privacyCB') {
            if (event.target.checked) {
                setIsCheckboxChecked(true);
                setFormData({
                    ...formData,
                    ["privacyCB"]: true,
                });
            } else {
                hasErrors = true;
                setIsCheckboxChecked(false);
                setFormData({
                    ...formData,
                    ["privacyCB"]: false,
                });
            }
        } else {
            setFormData({
                ...formData,
                [name]: value,
            });
        }
    };

    const formSubmitHandle = (e) => {
        e.preventDefault()
        // Validate empty fields
        for (const key in formData) {
            if (key != 'privacyCB' && formData[key].trim() === '') {
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
        if (!selectedResume) {
            hasErrors = true;
            setResumeError("This field is required");
            setResumeFileName('');
        }
        // if (!selectedCV) {
        //     hasErrors = true;
        //     setCVError("This field is required");
        //     setCVFileName('');
        // }

        if (!isCheckboxChecked && formData.privacyCB == false) {
            hasErrors = true;
            setCBError('This field is required');
        }


        const formDataForMail = new FormData();

        //adding all filled data to FormData()
        for (const key in formData) {
            if(key != "privacyCB"){
                formDataForMail.append(key, formData[key].trim());
            }
        }
        formDataForMail.append("resume", selectedResume);
        formDataForMail.append("cv", selectedCV);

        if (hasErrors) {
            setFormErrors(errors);
        } else {
            setFormErrors({});
            setIsLoading(true);
            const url = `${process.env.NEXT_PUBLIC_WORDPRESS_SITE_URL}/wp-json/wp/v2/careerapp`;
            axios.post(url, formDataForMail, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })
                .then(response => {
                    const result = response.data.result;
                    if (result == 1) {
                        for (const key in formData) {
                            if(key == 'privacyCB'){
                                formData[key] = false;
                            }else if (key != 'id' && key != 'name') {
                                formData[key] = '';
                            }
                        }
                        setFormData(formData)
                        setSelectedResume(null);
                        setResumeFileName("");
                        setCVFileName("");
                        setIsCheckboxChecked(false);
                        setCBError("");
                        setSelectedCV(null);
                        setFormMessage({ type: 'success', message: 'Data saved successfully!' })
                    } else {
                        if(key == 'privacyCB'){
                            formData[key] = false;
                        }else if (key != 'id' && key != 'name') {
                            formData[key] = '';
                        }
                        setFormData(formData)
                        setSelectedResume(null);
                        setSelectedCV(null);
                        setCVFileName("");
                        setIsCheckboxChecked(false);
                        setCBError("");
                        setResumeFileName("");
                        setFormMessage({ type: 'error', message: 'Something went wrong please try again' })
                    }
                    //If Mail Successfully Sent
                    setIsLoading(false);
                })
                .catch(error => {
                    console.error('Error:', error);
                });
        }
    }

    return (
        <>
            <div className='formWrap'>
                <div className='formDtl'>
                    <div className='formText'>
                        <div className='modalTtl'>
                            <h4>{title}</h4>
                            {commaSeparatedLocations && <span>{commaSeparatedLocations}</span>}
                            <div className="jobDiscription">
                                <div dangerouslySetInnerHTML={{ __html: content ? content : excerpt }} className="custom_html"></div>
                            </div>
                        </div>
                        {(careerFields.otherInformation.length > 0) &&
                            <>
                                {careerFields.otherInformation.map((info, index) => {
                                    const { heading, content } = info;
                                    if (heading || content) {
                                        return <div className='PostRes' key={index}>
                                            {heading && <div className="keyWrap">
                                                <h6>{heading}</h6>
                                            </div>}
                                            {content && <div className="resDtl">
                                                <div dangerouslySetInnerHTML={{ __html: content }} className="custom_html"></div>
                                            </div>}
                                        </div>
                                    }
                                    return ''
                                })}
                            </>
                        }
                        <div className="applicatonForm">
                            {formHeading && <div className='appForm'>
                                <h6>{formHeading}</h6>
                            </div>}
                            <div className="formDtl">
                                <form onSubmit={formSubmitHandle}>
                                    <div className="forminner">
                                        <div className="formPlace">
                                            <input type="text" name="firstName" placeholder={firstNameHeading} onChange={handleChange} value={formData.firstName} />
                                            {formErrors?.firstName && <div className="error" style={{ color: 'red' }}>{formErrors.firstName}</div>}
                                        </div>
                                        <div className="formPlace">
                                            <input type="text" name="lastName" placeholder={lastNameHeading} onChange={handleChange} value={formData.lastName} />
                                            {formErrors?.lastName && <div className="error" style={{ color: 'red' }}>{formErrors.lastName}</div>}
                                        </div>
                                        <div className="formPlace">
                                            <input type="email" name="emailAddress" placeholder={emailHeading} onChange={handleChange} value={formData.emailAddress} />
                                            {formErrors?.emailAddress && <div className="error" style={{ color: 'red' }}>{formErrors.emailAddress}</div>}
                                        </div>
                                        <div className="formPlace">
                                            <input type="number" name="phone" placeholder={phoneHeading} onChange={handleChange} value={formData.phone} />
                                            {formErrors?.phone && <div className="error" style={{ color: 'red' }}>{formErrors.phone}</div>}
                                        </div>
                                        <div className="upload">
                                            <span className="inputBrowser">
                                                Resume
                                                <input type="file" name="resume" placeholder={resumeHeading} className="attachment" onChange={handleChange} onClick={(e)=> {  e.target.value = null }}/>
                                                {resumeFileName && 
                                                <div className="uploadmessage">
                                                    <p>{resumeFileName}</p>
                                                    <span onClick={removeResumeHandler}>
                                                        <svg width="32" height="32" viewBox="0 0 32 32"   fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M24 8L8 24" stroke="#101010" strokeLinecap="round" strokeLinejoin="round"/>
                                                            <path d="M8 8L24 24" stroke="#101010" strokeLinecap="round" strokeLinejoin="round"/>
                                                        </svg>
                                                    </span>
                                                </div>
                                                }
                                            </span>
                                            {resumeError && <div className="error" style={{ color: 'red' }}>{resumeError}</div>}
                                        </div>
                                        <div className="upload">
                                            <span className="inputBrowser">
                                                Cover letter
                                                <input type="file" name="coverLetter" placeholder={coverLetterHeading} className="attachment" onChange={handleChange} onClick={(e)=> {  e.target.value = null }}/>
                                                {cvFileName && 
                                                <div className="uploadmessage">
                                                    <p>{cvFileName}</p>
                                                    <span onClick={removeCvHandler}>
                                                        <svg width="32" height="32" viewBox="0 0 32 32"   fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M24 8L8 24" stroke="#101010" strokeLinecap="round" strokeLinejoin="round"/>
                                                            <path d="M8 8L24 24" stroke="#101010" strokeLinecap="round" strokeLinejoin="round"/>
                                                        </svg>
                                                    </span>
                                                </div>}
                                            </span>
                                            {cvError && <div className="error" style={{ color: 'red' }}>{cvError}</div>}
                                        </div>

                                    </div>
                                    <div className="checkbox_wrap">
                                        <label>
                                            <input type="checkbox" name="privacyCB" onChange={handleChange} checked={formData.privacyCB} />
                                            <span>{checkboxText} {privacyPolicyInfo && <Link href={privacyPolicyInfo.url} target={privacyPolicyInfo.target}>{privacyPolicyInfo.title}</Link>}</span>
                                        </label>
                                        {(cbError && !isCheckboxChecked) && <div className="error" style={{ color: 'red' }}>{cbError}</div>}
                                    </div>
                                    <div className="btnbox">
                                        <Link className="elcom-btn primary-black-btn" href='#' onClick={formSubmitHandle}>{isLoading ? 'Sending...' : submitButtonText}</Link>
                                    </div>
                                    {(formMessage.message != '') &&
                                        <div className="formMessage">
                                            <p className={`${formMessage.type == 'error' ? 'error' : 'success'}`}>{formMessage.message}</p>
                                        </div>
                                    }
                                </form>
                            </div>
                        </div>
                    </div>
                    <div className="closebtn">
                        <Link href="#" onClick={(e) => change(e)}><Image src={Closepopup} alt="closepopup" /></Link>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Popupform;