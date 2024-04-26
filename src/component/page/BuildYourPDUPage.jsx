import InnerBanner from '@/component/InnerBanner';
import { Formik, Form, Field, ErrorMessage } from "formik";
import Link from 'next/link';
import { useState } from "react";
import { CountryList, isValidEmail } from '@/utils/utils';
import axios from 'axios';
import SeoData from '../SeoData';

const BuildYourPDUPage = ({ buildPDUData,pageTitle,seodata }) => {
    const [Country, setSelectedOption] = useState(null);
    const {
        certificationsRequiredHeading, displayTypeHeading, formCompanyHeading, formCityAndCountryText, formEmailHeading,
        formMessageHeading, formMobileHeading, formNameHeading, formPrivacyHeading,formPrivacyButtonInfo, formSubmitButtonText, formTitleHeading, inputCordLengthMetresHeading,
        inputCurrentHeading, inputPlugTypeHeading, mainTitleBanner, mountingHeading, otherSpecificRequirementsHeading, pduTypeHeading, powerConfigurationHeading,
        quantityOfPdusRequiredHeading, socketDetailsHeading, specifyInputCableEntryNeededHeading, specifyTheHeightLimitationHeading,
        requireFieldErrorMessage, invalidEmailErrorMessage, mailSentFailedMessage, mailSentSuccessMessage
    } = buildPDUData?.page.template.buildYourPdu;

    const [submitButtonText, setSubmitButtonText] = useState(formSubmitButtonText || "Submit");
    const [mailStatus, setMailStatus] = useState("");

    let requiredFieldText = requireFieldErrorMessage || 'This field is required';
    const options = CountryList();

    const handleKeyDown = (event) => {
        // Prevent the default behavior if the pressed key is "e"
        if (event.keyCode === 69 || event.keyCode == 189 || event.keyCode == 107) {
            event.preventDefault();
        }
    };
    return (
        <>
            <SeoData seodata={seodata} pageTitle={pageTitle}/>
            <InnerBanner heading={mainTitleBanner || "Build Your PDU"} />
            <div className='buildpduwrap'>
                <div className='container'>
                    <div className='buildwrapper'>
                        <Formik
                            initialValues={{
                                pduType: "",
                                mounting: "",
                                mountingHeight: "",
                                mountingCableEntry: "",
                                mountingHeightOther: "",
                                powerConfiguration: "",
                                inputPlugType: "",
                                inputCurrent: "",
                                mountingHeightOther: "",
                                socket: "",
                                displayType: "",
                                inputCordLength: "",
                                certification: "",
                                specificRequirement: "",
                                qtyOfPDUs: "",
                                username: "",
                                company: "",
                                email: "",
                                mobile: "",
                                // country: "",
                                // city: "",
                                cityAndCountry: "",
                                messageAndComments: "",
                                privacyCB: "",
                            }}
                            validate={values => {
                                const errors = {};
                                if (!values.pduType) {
                                    errors.pduType = requiredFieldText;
                                }
                                if (!values.mounting) {
                                    errors.mounting = requiredFieldText;
                                }
                                if (values.mounting == 'Horizontal') {
                                    if (!values.mountingHeight) {
                                        errors.mountingHeight = requiredFieldText;
                                    }
                                }
                                if (values.mounting == 'Vertical') {
                                    if (!values.mountingCableEntry) {
                                        errors.mountingCableEntry = requiredFieldText;
                                    }
                                }
                                if (!values.powerConfiguration) {
                                    errors.powerConfiguration = requiredFieldText;
                                }
                                if (!values.inputPlugType) {
                                    errors.inputPlugType = requiredFieldText;
                                }
                                if (!values.inputCurrent) {
                                    errors.inputCurrent = requiredFieldText;
                                }
                                if (values.socket.length == 0) {
                                    errors.socket = requiredFieldText;
                                }
                                if (!values.displayType) {
                                    errors.displayType = requiredFieldText;
                                }
                                if (!values.certification) {
                                    errors.certification = requiredFieldText;
                                }
                                if (!values.qtyOfPDUs) {
                                    errors.qtyOfPDUs = requiredFieldText;
                                }
                                if (values.username.trim() == '') {
                                    errors.username = requiredFieldText;
                                }
                                if (values.company.trim() == '') {
                                    errors.company = requiredFieldText;
                                }
                                if (values.email.trim() == '') {
                                    errors.email = requiredFieldText;
                                } else {
                                    if (!isValidEmail(values.email)) {
                                        errors.email = invalidEmailErrorMessage;
                                    }
                                }
                                if (values.mobile == '') {
                                    errors.mobile = requiredFieldText;
                                }
                                // if (!values.country) {
                                //     errors.country = requiredFieldText;
                                // }
                                // if (values.city.trim() == '') {
                                //     errors.city = requiredFieldText;
                                // }
                                if (values.cityAndCountry.trim() == '') {
                                    errors.cityAndCountry = requiredFieldText;
                                }
                                if (!values.privacyCB) {
                                    errors.privacyCB = requiredFieldText;
                                }

                                return errors;
                            }}
                            onSubmit={(values, actions) => {
                                setSubmitButtonText('Loading...');
                                const formDataForMail = new FormData();
                                //adding all filled data to FormData()
                                for (const key in values) {
                                    if (key == 'socket') {
                                        formDataForMail.append(key, values[key].join(', '));
                                    } else {
                                        formDataForMail.append(key, values[key]);
                                    }
                                }
                                
                                const url_2 = `${process.env.NEXT_PUBLIC_WORDPRESS_SITE_URL}/wp-json/wp/v2/buildYourPDU`;
                                axios.post(url_2, formDataForMail, {
                                    headers: {
                                        'Content-Type': 'multipart/form-data',
                                    },
                                })
                                .then(response => {
                                    if(response.data.email_sent){
                                        actions.resetForm();
                                        setMailStatus('sent')
                                        setSubmitButtonText(formSubmitButtonText);
                                    }else{
                                        setMailStatus('error')
                                        setSubmitButtonText(formSubmitButtonText);
                                    }
                                })
                                .catch(error => {
                                    console.error('Error:', error);
                                    setMailStatus('error');
                                    setSubmitButtonText(formSubmitButtonText);
                                });
                            }}
                        >
                            {({ values, setFieldValue }) => (
                                <Form>
                                    <div className='buildbriefdetail'>
                                        <div className='builddetail'>
                                            <div className='row'>
                                                <div className='col-lg-12'>
                                                    <div className='row'>
                                                        <div className='col-lg-3'>
                                                            <div className='buildtitle'>
                                                                <h6>{pduTypeHeading}</h6>
                                                            </div>
                                                        </div>
                                                        <div className='col-lg-9'>
                                                            <div className='buildfrom'>
                                                                <div className='row'>
                                                                    <div className='col-lg-4'>
                                                                        <div role="group" aria-labelledby="pduType">
                                                                            <label>
                                                                                <Field type="radio" name="pduType" value="basic" />
                                                                                <span>Basic</span>
                                                                            </label>
                                                                        </div>
                                                                    </div>
                                                                    <div className='col-lg-4'>
                                                                        <div role="group" aria-labelledby="pduType">
                                                                            <label>
                                                                                <Field type="radio" name="pduType" value="AM (Aggregate Metering)" />
                                                                                <span>AM (Aggregate Metering)</span>
                                                                            </label>
                                                                        </div>
                                                                    </div>
                                                                    <div className='col-lg-4'>
                                                                        <div role="group" aria-labelledby="pduType">
                                                                            <label>
                                                                                <Field type="radio" name="pduType" value="IM (Individual Metering)" />
                                                                                <span>IM (Individual Metering)</span>
                                                                            </label>
                                                                        </div>
                                                                    </div>
                                                                    <div className='col-lg-4'>
                                                                        <div role="group" aria-labelledby="pduType">
                                                                            <label>
                                                                                <Field type="radio" name="pduType" value="AMIS" />
                                                                                <span>AMIS (Aggregate Metering, Individual Switching)</span>
                                                                            </label>
                                                                        </div>
                                                                    </div>
                                                                    <div className='col-lg-4'>
                                                                        <div role="group" aria-labelledby="pduType">
                                                                            <label>
                                                                                <Field type="radio" name="pduType" value="IMIS" />
                                                                                <span>IMIS (Individual Metering, Individual Switching)</span>
                                                                            </label>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <ErrorMessage name="pduType" component="div" className='errormess' />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='builddetail'>
                                            <div className='row'>
                                                <div className='col-lg-12'>
                                                    <div className='buildmain'>
                                                        <div className='row'>
                                                            <div className='col-lg-3'>
                                                                <div className='buildtitle'>
                                                                    <h6>{mountingHeading}</h6>
                                                                </div>
                                                            </div>
                                                            <div className='col-lg-9'>
                                                                <div className='buildfrom'>
                                                                    <div className='row'>
                                                                        <div className='col-lg-4'>
                                                                            <div role="group" aria-labelledby="mounting">
                                                                                <label>
                                                                                    <Field type="radio" name="mounting" value="Horizontal" />
                                                                                    <span>Horizontal</span>
                                                                                </label>
                                                                            </div>
                                                                        </div>
                                                                        <div className='col-lg-4'>
                                                                            <div role="group" aria-labelledby="mounting">
                                                                                <label>
                                                                                    <Field type="radio" name="mounting" value="Vertical" />
                                                                                    <span>Vertical</span>
                                                                                </label>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <ErrorMessage name="mounting" component="div" className='errormess' />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        {(values.mounting == 'Horizontal') &&
                                                            <div className='row'>
                                                                <div className='col-lg-3'>
                                                                    <div className='buildtitle'>
                                                                        <h6>{specifyTheHeightLimitationHeading}</h6>
                                                                    </div>
                                                                </div>
                                                                <div className='col-lg-9'>
                                                                    <div className='buildfrom'>
                                                                        <div className='row'>
                                                                            <div className='col-lg-4'>
                                                                                <div role="group" aria-labelledby="mountingHeight">
                                                                                    <label>
                                                                                        <Field type="radio" name="mountingHeight" value="1U" />
                                                                                        <span>1U</span>
                                                                                    </label>
                                                                                </div>
                                                                            </div>
                                                                            <div className='col-lg-4'>
                                                                                <div role="group" aria-labelledby="mountingHeight">
                                                                                    <label>
                                                                                        <Field type="radio" name="mountingHeight" value="2U" />
                                                                                        <span>2U</span>
                                                                                    </label>
                                                                                </div>
                                                                            </div>
                                                                            <div className='col-lg-4'>
                                                                                <div role="group" aria-labelledby="mountingHeight">
                                                                                    <label>
                                                                                        <Field type="radio" name="mountingHeight" value="Other" />
                                                                                        <span>Other</span>
                                                                                    </label>
                                                                                </div>
                                                                            </div>

                                                                            {(values.mountingHeight == 'Other') && <div className='col-lg-12'>
                                                                                <div className='col-lg-6'>
                                                                                    <div className='buildtext'>
                                                                                        <div role="group" aria-labelledby="mountingHeight">
                                                                                            <Field type="textarea" name="mountingHeightOther" placeholder="Other" />
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>}
                                                                        </div>
                                                                        <ErrorMessage name="mountingHeight" component="div" className='errormess' />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        }
                                                        {(values.mounting == 'Vertical') &&
                                                            <div className='row'>
                                                                <div className='col-lg-3'>
                                                                    <div className='buildtitle'>
                                                                        <h6>{specifyInputCableEntryNeededHeading}</h6>
                                                                    </div>
                                                                </div>
                                                                <div className='col-lg-9'>
                                                                    <div className='buildfrom'>
                                                                        <div className='row'>
                                                                            <div className='col-lg-4'>
                                                                                <div role="group">
                                                                                    <label>
                                                                                        <Field type="radio" name="mountingCableEntry" value="Top" />
                                                                                        <span>Top</span>
                                                                                    </label>
                                                                                </div>
                                                                            </div>
                                                                            <div className='col-lg-4'>
                                                                                <div role="group">
                                                                                    <label>
                                                                                        <Field type="radio" name="mountingCableEntry" value="Bottom" />
                                                                                        <span>Bottom</span>
                                                                                    </label>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <ErrorMessage name="mountingCableEntry" component="div" className='errormess' />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        }
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='builddetail'>
                                            <div className='row'>
                                                <div className='col-lg-12'>
                                                    <div className='row'>
                                                        <div className='col-lg-3'>
                                                            <div className='buildtitle'>
                                                                <h6>{powerConfigurationHeading}</h6>
                                                            </div>
                                                        </div>
                                                        <div className='col-lg-9'>
                                                            <div className='buildfrom'>
                                                                <div className='row'>
                                                                    <div className='col-lg-4'>
                                                                        <div role="group">
                                                                            <label htmlFor="120v">
                                                                                <Field id="120v" type="radio" name="powerConfiguration" value="120v" />
                                                                                <span>120 V; 1-Phase (L-N)</span>
                                                                            </label>
                                                                        </div>
                                                                    </div>
                                                                    <div className='col-lg-4'>
                                                                        <div role="group">
                                                                            <label htmlFor='208v'>
                                                                                <Field id="208v" type="radio" name="powerConfiguration" value="208v1phase" />
                                                                                <span>208 V; 1-Phase (L-L)</span>
                                                                            </label>
                                                                        </div>
                                                                    </div>
                                                                    <div className='col-lg-4'>
                                                                        <div role="group">
                                                                            <label htmlFor='230v1phase'>
                                                                                <Field id='230v1phase' type="radio" name="powerConfiguration" value="230v1phase" />
                                                                                <span>230 V; 1-Phase (L-N)</span>
                                                                            </label>
                                                                        </div>
                                                                    </div>
                                                                    <div className='col-lg-4'>
                                                                        <div role="group">
                                                                            <label htmlFor='208v3phase'>
                                                                                <Field id="208v3phase" type="radio" name="powerConfiguration" value="208v3phase" />
                                                                                <span>208 V; 3-Phase (L-L)</span>
                                                                            </label>
                                                                        </div>
                                                                    </div>
                                                                    <div className='col-lg-4'>
                                                                        <div role="group">
                                                                            <label htmlFor="230v3phase">
                                                                                <Field id="230v3phase" type="radio" name="powerConfiguration" value="230v3phase" />
                                                                                <span>230/440 V; 3-Phase (L-N)</span>
                                                                            </label>
                                                                        </div>
                                                                    </div>
                                                                    <div className='col-lg-4'>
                                                                        <div role="group">
                                                                            <label htmlFor="240v">
                                                                                <Field id="240v" type="radio" name="powerConfiguration" value="240v" />
                                                                                <span>240/415 V; 3-Phase (L-N)</span>
                                                                            </label>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <ErrorMessage name="powerConfiguration" component="div" className='errormess' />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='builddetail'>
                                            <div className='row'>
                                                <div className='col-lg-12'>
                                                    <div className='row'>
                                                        <div className='col-lg-3'>
                                                            <div className='buildtitle'>
                                                                <h6>{inputPlugTypeHeading}</h6>
                                                            </div>
                                                        </div>
                                                        <div className='col-lg-9'>
                                                            <div className='buildfrom'>
                                                                <div className='row'>
                                                                    <div className='col-lg-4'>
                                                                        <div role="group">
                                                                            <label htmlFor='IEC'>
                                                                                <Field id="IEC" type="radio" name="inputPlugType" value="IEC" />
                                                                                <span>IEC</span>
                                                                            </label>
                                                                        </div>
                                                                    </div>
                                                                    <div className='col-lg-4'>
                                                                        <div role="group">
                                                                            <label htmlFor='NEMA'>
                                                                                <Field id="NEMA" type="radio" name="inputPlugType" value="NEMA" />
                                                                                <span>NEMA</span>
                                                                            </label>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <ErrorMessage name="inputPlugType" component="div" className='errormess' />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='builddetail'>
                                            <div className='row'>
                                                <div className='col-lg-12'>
                                                    <div className='row'>
                                                        <div className='col-lg-3'>
                                                            <div className='buildtitle'>
                                                                <h6>{inputCurrentHeading}</h6>
                                                            </div>
                                                        </div>
                                                        <div className='col-lg-9'>
                                                            <div className='buildfrom'>
                                                                <div className='row'>
                                                                    <div className='col-lg-4'>
                                                                        <div role="group">
                                                                            <label htmlFor='5Amp'>
                                                                                <Field id="5Amp" type="radio" name="inputCurrent" value="5 Amp" />
                                                                                <span>5 Amp</span>
                                                                            </label>
                                                                        </div>
                                                                    </div>
                                                                    <div className='col-lg-4'>
                                                                        <div role="group">
                                                                            <label htmlFor='15Amp'>
                                                                                <Field id="15Amp" type="radio" name="inputCurrent" value="15 Amp" />
                                                                                <span>15 Amp</span>
                                                                            </label>
                                                                        </div>
                                                                    </div>
                                                                    <div className='col-lg-4'>
                                                                        <div role="group">
                                                                            <label htmlFor='16Amp'>
                                                                                <Field id="16Amp" type="radio" name="inputCurrent" value="16 Amp" />
                                                                                <span>16 Amp</span>
                                                                            </label>
                                                                        </div>
                                                                    </div>
                                                                    <div className='col-lg-4'>
                                                                        <div role="group">
                                                                            <label htmlFor='32Amp'>
                                                                                <Field id="32Amp" type="radio" name="inputCurrent" value="32 Amp" />
                                                                                <span>32 Amp</span>
                                                                            </label>
                                                                        </div>
                                                                    </div>
                                                                    <div className='col-lg-4'>
                                                                        <div role="group">
                                                                            <label htmlFor='Other'>
                                                                                <Field id="Other" type="radio" name="inputCurrent" value="Other" />
                                                                                <span>Other</span>
                                                                            </label>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <ErrorMessage name="inputCurrent" component="div" className='errormess' />
                                                            </div>
                                                            <div className='buildinner'>
                                                                <div className='row'>
                                                                    {(values.inputCurrent == 'Other') &&
                                                                        <div className='col-lg-6'>
                                                                            <div className='buildtext'>
                                                                                <div role="group">
                                                                                    <Field type="text" name="inputCurrentOther" placeholder="Other (Amp)" />
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    }
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='builddetail'>
                                            <div className='row'>
                                                <div className='col-lg-12'>
                                                    <div className='row'>
                                                        <div className='col-lg-3'>
                                                            <div className='buildtitle'>
                                                                <h6>{socketDetailsHeading}</h6>
                                                            </div>
                                                        </div>
                                                        <div className='col-lg-9'>
                                                            <div className='buildfrom'>
                                                                <div className='row'>
                                                                    <div className='col-lg-4'>
                                                                        <div role="group">
                                                                            <label htmlFor='C13'>
                                                                                <Field id="C13" type="checkbox" name="socket" value="C 13" />
                                                                                <span>C 13</span>
                                                                            </label>
                                                                        </div>
                                                                    </div>
                                                                    <div className='col-lg-4'>
                                                                        <div role="group">
                                                                            <label htmlFor='C19'>
                                                                                <Field id="C19" type="checkbox" name="socket" value="C 19" />
                                                                                <span>C 19</span>
                                                                            </label>
                                                                        </div>
                                                                    </div>
                                                                    <div className='col-lg-4'>
                                                                        <div role="group">
                                                                            <label htmlFor='UK'>
                                                                                <Field id="UK" type="checkbox" name="socket" value="UK" />
                                                                                <span>UK</span>
                                                                            </label>
                                                                        </div>
                                                                    </div>
                                                                    <div className='col-lg-4'>
                                                                        <div role="group">
                                                                            <label htmlFor='Schuko'>
                                                                                <Field id="Schuko" type="checkbox" name="socket" value="Schuko" />
                                                                                <span>Schuko</span>
                                                                            </label>
                                                                        </div>
                                                                    </div>
                                                                    <div className='col-lg-4'>
                                                                        <div role="group">
                                                                            <label htmlFor='Indian'>
                                                                                <Field id="Indian" type="checkbox" name="socket" value="Indian" />
                                                                                <span>Indian</span>
                                                                            </label>
                                                                        </div>
                                                                    </div>
                                                                    <div className='col-lg-4'>
                                                                        <div role="group">
                                                                            <label htmlFor='Universal'>
                                                                                <Field id="Universal" type="checkbox" name="socket" value="Universal" />
                                                                                <span>Universal</span>
                                                                            </label>
                                                                        </div>
                                                                    </div>
                                                                    <div className='col-lg-4'>
                                                                        <div role="group">
                                                                            <label htmlFor='Others'>
                                                                                <Field id="Others" type="checkbox" name="socket" value="Others" />
                                                                                <span>Others</span>
                                                                            </label>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <ErrorMessage name="socket" component="div" className='errormess' />
                                                            </div>
                                                            <div className='buildinner'>
                                                                <div className='row'>
                                                                    {(values.socket.includes("C 13")) &&
                                                                        <>
                                                                            <div className='col-lg-6'>
                                                                                <div className='buildtext'>
                                                                                    <div role="group">
                                                                                        <Field type="number" name="socketC13" min="0" placeholder="C 13 Qty" onKeyDown={handleKeyDown}/>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                            <div className="offset-lg-6"></div>
                                                                        </>
                                                                    }
                                                                    {(values.socket.includes('C 19')) &&
                                                                        <>
                                                                            <div className='col-lg-6'>
                                                                                <div className='buildtext'>
                                                                                    <div role="group">
                                                                                        <Field type="number" name="socketC19" min="0" placeholder="C 19 Qty" onKeyDown={handleKeyDown}/>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                            <div className="offset-lg-6"></div>
                                                                        </>
                                                                    }
                                                                    {(values.socket.includes('UK')) &&
                                                                        <>
                                                                            <div className='col-lg-6'>
                                                                                <div className='buildtext'>
                                                                                    <div role="group">
                                                                                        <Field type="number" name="socketUK" min="0" placeholder="UK Qty" onKeyDown={handleKeyDown}/>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                            <div className="offset-lg-6"></div>
                                                                        </>
                                                                    }
                                                                    {(values.socket.includes('Schuko')) &&
                                                                        <>
                                                                            <div className='col-lg-6'>
                                                                                <div className='buildtext'>
                                                                                    <div role="group">
                                                                                        <Field type="number" name="socketSchuko" min="0" placeholder="Schuko Qty" onKeyDown={handleKeyDown}/>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                            <div className="offset-lg-6"></div>
                                                                        </>
                                                                    }
                                                                    {(values.socket.includes('Indian')) &&
                                                                        <>
                                                                            <div className='col-lg-6'>
                                                                                <div className='buildtext'>
                                                                                    <div role="group">
                                                                                        <Field type="number" name="socketIndian" min="0" placeholder="Indian Qty" onKeyDown={handleKeyDown}/>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                            <div className="offset-lg-6"></div>
                                                                        </>
                                                                    }
                                                                    {(values.socket.includes('Universal')) &&
                                                                        <>
                                                                            <div className='col-lg-6'>
                                                                                <div className='buildtext'>
                                                                                    <div role="group">
                                                                                        <Field type="number" name="socketUniversal" min="0" placeholder="Universal Qty" onKeyDown={handleKeyDown}/>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                            <div className="offset-lg-6"></div>
                                                                        </>
                                                                    }
                                                                    {(values.socket.includes('Others')) &&
                                                                        <>
                                                                            <div className='col-lg-6'>
                                                                                <div className='buildtext'>
                                                                                    <div role="group">
                                                                                        <Field type="text" name="socketOthersType" placeholder="Others Type" />
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                            <div className='col-lg-6'>
                                                                                <div className='buildtext'>
                                                                                    <div role="group">
                                                                                        <Field type="number" name="socketOthersQty" min="0" placeholder="Others Qty" onKeyDown={handleKeyDown}/>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </>
                                                                    }
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='builddetail'>
                                            <div className='row'>
                                                <div className='col-lg-12'>
                                                    <div className='row'>
                                                        <div className='col-lg-3'>
                                                            <div className='buildtitle'>
                                                                <h6>{displayTypeHeading}</h6>
                                                            </div>
                                                        </div>
                                                        <div className='col-lg-9'>
                                                            <div className='buildfrom'>
                                                                <div className='row'>
                                                                    <div className='col-lg-4'>
                                                                        <div role="group">
                                                                            <label htmlFor='LED'>
                                                                                <Field id="LED" type="radio" name="displayType" value="LED" />
                                                                                <span>LED</span>
                                                                            </label>
                                                                        </div>
                                                                    </div>
                                                                    <div className='col-lg-4'>
                                                                        <div role="group">
                                                                            <label htmlFor='LCD'>
                                                                                <Field id="LCD" type="radio" name="displayType" value="LCD" />
                                                                                <span>LCD</span>
                                                                            </label>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <ErrorMessage name="displayType" component="div" className='errormess' />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='builddetail'>
                                            <div className='row'>
                                                <div className='col-lg-12'>
                                                    <div className='row'>
                                                        <div className='col-lg-3'>
                                                            <div className='buildtitle'>
                                                                <h6>{inputCordLengthMetresHeading}</h6>
                                                            </div>
                                                        </div>
                                                        <div className='col-lg-9'>
                                                            <div className='buildfrom'>
                                                                <div className='row'>
                                                                    <div className='col-lg-6'>
                                                                        <div className='buildtext'>
                                                                            <div role="group">
                                                                                <Field type="number" name="inputCordLength" placeholder="Input Cord length (metres)"  onKeyDown={handleKeyDown} />
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='builddetail'>
                                            <div className='row'>
                                                <div className='col-lg-12'>
                                                    <div className='row'>
                                                        <div className='col-lg-3'>
                                                            <div className='buildtitle'>
                                                                <h6>{certificationsRequiredHeading}</h6>
                                                            </div>
                                                        </div>
                                                        <div className='col-lg-9'>
                                                            <div className='buildfrom'>
                                                                <div className='row'>
                                                                    <div className='col-lg-4'>
                                                                        <div role="group">
                                                                            <label htmlFor='CE'>
                                                                                <Field id="CE" type="radio" name="certification" value="CE" />
                                                                                <span>CE</span>
                                                                            </label>
                                                                        </div>
                                                                    </div>
                                                                    <div className='col-lg-4'>
                                                                        <div role="group">
                                                                            <label htmlFor='CEUL'>
                                                                                <Field id="CEUL" type="radio" name="certification" value="CE + UL" />
                                                                                <span>CE + UL</span>
                                                                            </label>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <ErrorMessage name="certification" component="div" className='errormess' />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='builddetail'>
                                            <div className='row'>
                                                <div className='col-lg-12'>
                                                    <div className='row'>
                                                        <div className='col-lg-3'>
                                                            <div className='buildtitle'>
                                                                <h6>{otherSpecificRequirementsHeading}</h6>
                                                            </div>
                                                        </div>
                                                        <div className='col-lg-9'>
                                                            <div className='buildfrom'>
                                                                <div className='row'>
                                                                    <div className='col-lg-12'>
                                                                        <div className='buildtext'>
                                                                            <div role="group">
                                                                                <Field type="text" name="specificRequirement" placeholder="" />
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='builddetail'>
                                            <div className='row'>
                                                <div className='col-lg-12'>
                                                    <div className='row'>
                                                        <div className='col-lg-3'>
                                                            <div className='buildtitle'>
                                                                <h6>{quantityOfPdusRequiredHeading}</h6>
                                                            </div>
                                                        </div>
                                                        <div className='col-lg-9'>
                                                            <div className='buildfrom'>
                                                                <div className='row'>
                                                                    <div className='col-lg-12'>
                                                                        <div className='buildtext'>
                                                                            <div role="group">
                                                                                <Field type="number" min="0" name="qtyOfPDUs" placeholder="" onKeyDown={handleKeyDown}/>
                                                                            </div>
                                                                            <ErrorMessage name="qtyOfPDUs" component="div" className='errormess' />
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='buildcontact'>
                                        <div className='buildcontacttitle'>
                                            <h6>{formTitleHeading}</h6>
                                        </div>
                                        <div className='row'>
                                            <div className='col-lg-6 col-md-6'>
                                                <div className="contactInner">
                                                    <Field type="text" name="username" placeholder={formNameHeading} />
                                                    <ErrorMessage name="username" component="div" className='errormess' />
                                                </div>
                                            </div>
                                            <div className='col-lg-6 col-md-6'>
                                                <div className="contactInner">
                                                    <Field type="text" name="company" placeholder={formCompanyHeading} />
                                                    <ErrorMessage name="company" component="div" className='errormess' />
                                                </div>
                                            </div>
                                            <div className='col-lg-6 col-md-6'>
                                                <div className="contactInner">
                                                    <Field type="email" name="email" placeholder={formEmailHeading} />
                                                    <ErrorMessage name="email" component="div" className='errormess' />
                                                </div>
                                            </div>
                                            <div className='col-lg-6 col-md-6'>
                                                <div className="contactInner">
                                                    <Field type="number" name="mobile" placeholder={formMobileHeading} onKeyDown={handleKeyDown}/>
                                                    <ErrorMessage name="mobile" component="div" className='errormess' />
                                                </div>
                                            </div>
                                            <div className='col-lg-12 col-md-12'>
                                                <div className="contactInner">
                                                    <Field type="text" name="cityAndCountry" placeholder={formCityAndCountryText} />
                                                    <ErrorMessage name="cityAndCountry" component="div" className='errormess' />
                                                </div>
                                            </div>

                                            <div className='col-lg-12 col-md-12'>
                                                <div className="contactInner">
                                                    <Field type="text" name="messageAndComments" placeholder={formMessageHeading} />
                                                </div>
                                            </div>
                                            <div className='col-lg-12 col-md-12'>
                                                <div className="checkbox_wrap">
                                                    <label>
                                                        <Field type="checkbox" name="privacyCB" /><span>{formPrivacyHeading} {formPrivacyButtonInfo && <Link href={formPrivacyButtonInfo.url} target={formPrivacyButtonInfo.target}>{formPrivacyButtonInfo.title}</Link>}</span>
                                                    </label>
                                                    <ErrorMessage name="privacyCB" component="div" className='errormess' />
                                                </div>
                                            </div>
                                            <div className="btnbox">
                                                <Field className="elcom-btn primary-black-btn" type="submit" value={submitButtonText} />
                                            </div>
                                            {mailStatus != '' && <div className='col-lg-12 col-md-12'>
                                                <div className={`buildYourPDUFormMessage ${mailStatus == 'sent' ? 'success' : 'error'}`}>
                                                    <p><strong>{
                                                        mailStatus == 'sent' ? mailSentSuccessMessage : mailSentFailedMessage
                                                    }</strong></p>
                                                </div>
                                            </div>}
                                        </div>
                                    </div>
                                </Form>
                            )}
                        </Formik>
                    </div>
                </div>
            </div>
        </>
    )
}

export default BuildYourPDUPage