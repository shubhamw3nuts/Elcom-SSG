import client from '@/apollo_client/client'
import InnerBanner from '@/component/InnerBanner'
import SeoData from '@/component/SeoData';
import { GET_BUILDYOURPDU_PAGE } from '@/queries/graphql_queries'
import { Formik, Form, Field, ErrorMessage } from "formik";
import React from 'react'

const BuildYourPduResult = ({ data, buildPDUdata }) => {
    let formData = data ? JSON.parse(data.form_data) : "";
    let socketData = "";
    if (formData.socket) {
        socketData = formData.socket.split(", ");
    }
    const {
        certificationsRequiredHeading, displayTypeHeading, formCompanyHeading, formCityAndCountryText, formEmailHeading,
        formMessageHeading, formMobileHeading, formNameHeading, formPrivacyHeading, formSubmitButtonText, formTitleHeading, inputCordLengthMetresHeading,
        inputCurrentHeading, inputPlugTypeHeading, mainTitleBanner, mountingHeading, otherSpecificRequirementsHeading, pduTypeHeading, powerConfigurationHeading,
        quantityOfPdusRequiredHeading, socketDetailsHeading, specifyInputCableEntryNeededHeading, specifyTheHeightLimitationHeading,
        requireFieldErrorMessage, invalidEmailErrorMessage, mailSentFailedMessage, mailSentSuccessMessage
    } = buildPDUdata?.page.template.buildYourPdu;
    return (
        <>
            <SeoData pageTitle={"Build Your PDU Result"} seodata=""/>
            <InnerBanner heading={formData ? "Build Your PDU Result" : "404: Page Not Found"} />
            {formData && <div className='buildpduwrap'>
                <div className='container'>
                    <div className='buildwrapper'>
                        <Formik
                            initialValues={{
                                pduType: formData?.pduType ? formData.pduType : "",
                                mounting: formData?.mounting ? formData.mounting : "",
                                mountingHeight: formData?.mountingHeight ? formData.mountingHeight : "",
                                mountingCableEntry: formData?.mountingCableEntry ? formData.mountingCableEntry : "",
                                mountingHeightOther: formData?.mountingHeightOther ? formData.mountingHeightOther : "",
                                powerConfiguration: formData?.powerConfiguration ? formData.powerConfiguration : "",
                                inputPlugType: formData?.inputPlugType ? formData.inputPlugType : "",
                                inputCurrent: formData?.inputCurrent ? formData.inputCurrent : "",
                                socket: formData?.socket ? formData.socket : "",
                                displayType: formData?.displayType ? formData.displayType : "",
                                inputCordLength: formData?.inputCordLength ? formData.inputCordLength : "",
                                certification: formData?.certification ? formData.certification : "", 
                                specificRequirement: formData?.specificRequirement ? formData.specificRequirement : "",
                                qtyOfPDUs: formData?.qtyOfPDUs ? formData.qtyOfPDUs : "",
                                username: formData?.username ? formData.username : "",
                                company: formData?.company ? formData.company : "",
                                email: formData?.email ? formData.email : "",
                                mobile: formData?.mobile ? formData.mobile : "",
                                // country: formData?.pduType ? formData.pduType : "",
                                // city: formData?.pduType ? formData.pduType : "",
                                cityAndCountry: formData?.cityAndCountry ? formData.cityAndCountry : "",
                                messageAndComments: formData?.messageAndComments ? formData.messageAndComments : "",
                                privacyCB: formData?.privacyCB ? formData.privacyCB : "",
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
                                                                    {formData?.pduType == 'basic' &&
                                                                        <div className='col-lg-4'>
                                                                            <div role="group" aria-labelledby="pduType">
                                                                                <label>
                                                                                    <Field type="radio" name="pduType" value="basic" />
                                                                                    <span>Basic</span>
                                                                                </label>
                                                                            </div>
                                                                        </div>
                                                                    }
                                                                    {formData?.pduType == 'AM (Aggregate Metering)' &&
                                                                        <div className='col-lg-4'>
                                                                            <div role="group" aria-labelledby="pduType">
                                                                                <label>
                                                                                    <Field type="radio" name="pduType" value="AM (Aggregate Metering)" />
                                                                                    <span>AM (Aggregate Metering)</span>
                                                                                </label>
                                                                            </div>
                                                                        </div>
                                                                    }
                                                                    {formData?.pduType == 'IM (Individual Metering)' &&
                                                                        <div className='col-lg-4'>
                                                                            <div role="group" aria-labelledby="pduType">
                                                                                <label>
                                                                                    <Field type="radio" name="pduType" value="IM (Individual Metering)" />
                                                                                    <span>IM (Individual Metering)</span>
                                                                                </label>
                                                                            </div>
                                                                        </div>
                                                                    }
                                                                    {formData?.pduType == 'AMIS' &&
                                                                        <div className='col-lg-4'>
                                                                            <div role="group" aria-labelledby="pduType">
                                                                                <label>
                                                                                    <Field type="radio" name="pduType" value="AMIS" />
                                                                                    <span>AMIS (Aggregate Metering, Individual Switching)</span>
                                                                                </label>
                                                                            </div>
                                                                        </div>
                                                                    }
                                                                    {formData?.pduType == 'IMIS' &&
                                                                        <div className='col-lg-4'>
                                                                            <div role="group" aria-labelledby="pduType">
                                                                                <label>
                                                                                    <Field type="radio" name="pduType" value="IMIS" />
                                                                                    <span>IMIS (Individual Metering, Individual Switching)</span>
                                                                                </label>
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
                                                                        {formData?.mounting == 'Horizontal' &&
                                                                            <div className='col-lg-4'>
                                                                                <div role="group" aria-labelledby="mounting">
                                                                                    <label>
                                                                                        <Field type="radio" name="mounting" value="Horizontal" />
                                                                                        <span>Horizontal</span>
                                                                                    </label>
                                                                                </div>
                                                                            </div>
                                                                        }
                                                                        {formData?.mounting == 'Vertical' &&
                                                                            <div className='col-lg-4'>
                                                                                <div role="group" aria-labelledby="mounting">
                                                                                    <label>
                                                                                        <Field type="radio" name="mounting" value="Vertical" />
                                                                                        <span>Vertical</span>
                                                                                    </label>
                                                                                </div>
                                                                            </div>
                                                                        }
                                                                    </div>
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
                                                                            {formData?.mountingHeight == "1U" &&
                                                                                <div className='col-lg-4'>
                                                                                    <div role="group" aria-labelledby="mountingHeight">
                                                                                        <label>
                                                                                            <Field type="radio" name="mountingHeight" value="1U" />
                                                                                            <span>1U</span>
                                                                                        </label>
                                                                                    </div>
                                                                                </div>
                                                                            }
                                                                            {formData?.mountingHeight == "2U" &&
                                                                                <div className='col-lg-4'>
                                                                                    <div role="group" aria-labelledby="mountingHeight">
                                                                                        <label>
                                                                                            <Field type="radio" name="mountingHeight" value="2U" />
                                                                                            <span>2U</span>
                                                                                        </label>
                                                                                    </div>
                                                                                </div>
                                                                            }
                                                                            {formData?.mountingHeight == "Other" &&
                                                                                <div className='col-lg-4'>
                                                                                    <div role="group" aria-labelledby="mountingHeight">
                                                                                        <label>
                                                                                            <Field type="radio" name="mountingHeight" value="Other" />
                                                                                            <span>Other</span>
                                                                                        </label>
                                                                                    </div>
                                                                                </div>
                                                                            }

                                                                            {(values.mountingHeight == 'Other') && <div className='col-lg-12'>
                                                                                <div className='col-lg-6'>
                                                                                    <div className='buildtext'>
                                                                                        <div role="group" aria-labelledby="mountingHeight">
                                                                                            <Field type="textarea" name="mountingHeightOther" placeholder="Other" disabled/>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>}
                                                                        </div>
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
                                                                            {formData?.mountingCableEntry == "Top" &&
                                                                                <div className='col-lg-4'>
                                                                                    <div role="group">
                                                                                        <label>
                                                                                            <Field type="radio" name="mountingCableEntry" value="Top" />
                                                                                            <span>Top</span>
                                                                                        </label>
                                                                                    </div>
                                                                                </div>
                                                                            }
                                                                            {formData?.mountingCableEntry == "Bottom" &&
                                                                                <div className='col-lg-4'>
                                                                                    <div role="group">
                                                                                        <label>
                                                                                            <Field type="radio" name="mountingCableEntry" value="Bottom" />
                                                                                            <span>Bottom</span>
                                                                                        </label>
                                                                                    </div>
                                                                                </div>
                                                                            }
                                                                        </div>
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
                                                                    {formData?.powerConfiguration == "120v" &&
                                                                        <div className='col-lg-4'>
                                                                            <div role="group">
                                                                                <label htmlFor="120v">
                                                                                    <Field id="120v" type="radio" name="powerConfiguration" value="120v" />
                                                                                    <span>120 V; 1-Phase (L-N)</span>
                                                                                </label>
                                                                            </div>
                                                                        </div>
                                                                    }
                                                                    {formData?.powerConfiguration == "208v1phase" &&
                                                                        <div className='col-lg-4'>
                                                                            <div role="group">
                                                                                <label htmlFor='208v'>
                                                                                    <Field id="208v" type="radio" name="powerConfiguration" value="208v1phase" />
                                                                                    <span>208 V; 1-Phase (L-L)</span>
                                                                                </label>
                                                                            </div>
                                                                        </div>
                                                                    }
                                                                    {formData?.powerConfiguration == "230v1phase" &&
                                                                        <div className='col-lg-4'>
                                                                            <div role="group">
                                                                                <label htmlFor='230v1phase'>
                                                                                    <Field id='230v1phase' type="radio" name="powerConfiguration" value="230v1phase" />
                                                                                    <span>230 V; 1-Phase (L-N)</span>
                                                                                </label>
                                                                            </div>
                                                                        </div>
                                                                    }
                                                                    {formData?.powerConfiguration == "208v3phase" &&
                                                                        <div className='col-lg-4'>
                                                                            <div role="group">
                                                                                <label htmlFor='208v3phase'>
                                                                                    <Field id="208v3phase" type="radio" name="powerConfiguration" value="208v3phase" />
                                                                                    <span>208 V; 3-Phase (L-L)</span>
                                                                                </label>
                                                                            </div>
                                                                        </div>
                                                                    }
                                                                    {formData?.powerConfiguration == "230v3phase" &&
                                                                        <div className='col-lg-4'>
                                                                            <div role="group">
                                                                                <label htmlFor="230v3phase">
                                                                                    <Field id="230v3phase" type="radio" name="powerConfiguration" value="230v3phase" />
                                                                                    <span>230/440 V; 3-Phase (L-N)</span>
                                                                                </label>
                                                                            </div>
                                                                        </div>
                                                                    }
                                                                    {formData?.powerConfiguration == "240v" &&
                                                                        <div className='col-lg-4'>
                                                                            <div role="group">
                                                                                <label htmlFor="240v">
                                                                                    <Field id="240v" type="radio" name="powerConfiguration" value="240v" />
                                                                                    <span>240/415 V; 3-Phase (L-N)</span>
                                                                                </label>
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
                                                                <h6>{inputPlugTypeHeading}</h6>
                                                            </div>
                                                        </div>
                                                        <div className='col-lg-9'>
                                                            <div className='buildfrom'>
                                                                <div className='row'>
                                                                    {formData?.inputPlugType == "IEC" &&
                                                                        <div className='col-lg-4'>
                                                                            <div role="group">
                                                                                <label htmlFor='IEC'>
                                                                                    <Field id="IEC" type="radio" name="inputPlugType" value="IEC" />
                                                                                    <span>IEC</span>
                                                                                </label>
                                                                            </div>
                                                                        </div>
                                                                    }
                                                                    {formData?.inputPlugType == "NEMA" &&
                                                                        <div className='col-lg-4'>
                                                                            <div role="group">
                                                                                <label htmlFor='NEMA'>
                                                                                    <Field id="NEMA" type="radio" name="inputPlugType" value="NEMA" />
                                                                                    <span>NEMA</span>
                                                                                </label>
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
                                                                <h6>{inputCurrentHeading}</h6>
                                                            </div>
                                                        </div>
                                                        <div className='col-lg-9'>
                                                            <div className='buildfrom'>
                                                                <div className='row'>
                                                                    {formData?.inputCurrent == "5 Amp" &&
                                                                        <div className='col-lg-4'>
                                                                            <div role="group">
                                                                                <label htmlFor='5Amp'>
                                                                                    <Field id="5Amp" type="radio" name="inputCurrent" value="5 Amp" />
                                                                                    <span>5 Amp</span>
                                                                                </label>
                                                                            </div>
                                                                        </div>
                                                                    }
                                                                    {formData?.inputCurrent == "15 Amp" &&
                                                                        <div className='col-lg-4'>
                                                                            <div role="group">
                                                                                <label htmlFor='15Amp'>
                                                                                    <Field id="15Amp" type="radio" name="inputCurrent" value="15 Amp" />
                                                                                    <span>15 Amp</span>
                                                                                </label>
                                                                            </div>
                                                                        </div>
                                                                    }
                                                                    {formData?.inputCurrent == "16 Amp" &&
                                                                        <div className='col-lg-4'>
                                                                            <div role="group">
                                                                                <label htmlFor='16Amp'>
                                                                                    <Field id="16Amp" type="radio" name="inputCurrent" value="16 Amp" />
                                                                                    <span>16 Amp</span>
                                                                                </label>
                                                                            </div>
                                                                        </div>
                                                                    }
                                                                    {formData?.inputCurrent == "32 Amp" &&
                                                                        <div className='col-lg-4'>
                                                                            <div role="group">
                                                                                <label htmlFor='32Amp'>
                                                                                    <Field id="32Amp" type="radio" name="inputCurrent" value="32 Amp" />
                                                                                    <span>32 Amp</span>
                                                                                </label>
                                                                            </div>
                                                                        </div>
                                                                    }
                                                                    {formData?.inputCurrent == "Other" &&
                                                                        <div className='col-lg-4'>
                                                                            <div role="group">
                                                                                <label htmlFor='Other'>
                                                                                    <Field id="Other" type="radio" name="inputCurrent" value="Other" />
                                                                                    <span>Other</span>
                                                                                </label>
                                                                            </div>
                                                                        </div>
                                                                    }
                                                                </div>
                                                            </div>
                                                            <div className='buildinner'>
                                                                <div className='row'>
                                                                    {(formData?.inputCurrent == 'Other') &&
                                                                        <div className='col-lg-6'>
                                                                            <div className='buildtext'>
                                                                                <div role="group">
                                                                                    <Field type="text" name="inputCurrentOther" placeholder="Other" value={formData?.inputCurrentOther} />
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
                                                                    {socketData.includes("C 13") &&
                                                                        <div className='col-lg-4'>
                                                                            <div role="group">
                                                                                <label htmlFor='C13'>
                                                                                    <Field id="C13" type="checkbox" name="socket" value="C 13" checked />
                                                                                    <span>C 13</span>
                                                                                </label>
                                                                            </div>
                                                                        </div>
                                                                    }
                                                                    {socketData.includes("C 19") &&
                                                                        <div className='col-lg-4'>
                                                                            <div role="group">
                                                                                <label htmlFor='C19'>
                                                                                    <Field id="C19" type="checkbox" name="socket" value="C 19" checked />
                                                                                    <span>C 19</span>
                                                                                </label>
                                                                            </div>
                                                                        </div>
                                                                    }
                                                                    {socketData.includes("UK") &&
                                                                        <div className='col-lg-4'>
                                                                            <div role="group">
                                                                                <label htmlFor='UK'>
                                                                                    <Field id="UK" type="checkbox" name="socket" value="UK" checked />
                                                                                    <span>UK</span>
                                                                                </label>
                                                                            </div>
                                                                        </div>
                                                                    }
                                                                    {socketData.includes("Schuko") &&
                                                                        <div className='col-lg-4'>
                                                                            <div role="group">
                                                                                <label htmlFor='Schuko'>
                                                                                    <Field id="Schuko" type="checkbox" name="socket" value="Schuko" checked />
                                                                                    <span>Schuko</span>
                                                                                </label>
                                                                            </div>
                                                                        </div>
                                                                    }
                                                                    {socketData.includes("Indian") &&
                                                                        <div className='col-lg-4'>
                                                                            <div role="group">
                                                                                <label htmlFor='Indian'>
                                                                                    <Field id="Indian" type="checkbox" name="socket" value="Indian" checked />
                                                                                    <span>Indian</span>
                                                                                </label>
                                                                            </div>
                                                                        </div>
                                                                    }
                                                                    {socketData.includes("Universal") &&
                                                                        <div className='col-lg-4'>
                                                                            <div role="group">
                                                                                <label htmlFor='Universal'>
                                                                                    <Field id="Universal" type="checkbox" name="socket" value="Universal" checked />
                                                                                    <span>Universal</span>
                                                                                </label>
                                                                            </div>
                                                                        </div>
                                                                    }
                                                                    {socketData.includes("Others") &&
                                                                        <div className='col-lg-4'>
                                                                            <div role="group">
                                                                                <label htmlFor='Others'>
                                                                                    <Field id="Others" type="checkbox" name="socket" value="Others" checked />
                                                                                    <span>Others</span>
                                                                                </label>
                                                                            </div>
                                                                        </div>
                                                                    }
                                                                </div>
                                                            </div>
                                                            <div className='buildinner'>
                                                                <div className='row'>
                                                                    {(socketData.includes("C 13")) &&
                                                                        <>
                                                                            <div className='col-lg-6'>
                                                                                <div className='buildtext'>
                                                                                    <div role="group">
                                                                                        <Field type="text" name="socketC13" min="0" placeholder="C 13 Qty" value={`C 13 Qty : ${formData.socketC13}`} />
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                            <div className="offset-lg-6"></div>
                                                                        </>
                                                                    }
                                                                    {(socketData.includes('C 19')) &&
                                                                        <>
                                                                            <div className='col-lg-6'>
                                                                                <div className='buildtext'>
                                                                                    <div role="group">
                                                                                        <Field type="text" name="socketC19" min="0" placeholder="C 19 Qty" value={`C 19 Qty : ${formData?.socketC19 ? formData?.socketC19 : ''}`} />
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                            <div className="offset-lg-6"></div>
                                                                        </>
                                                                    }
                                                                    {(socketData.includes('UK')) &&
                                                                        <>
                                                                            <div className='col-lg-6'>
                                                                                <div className='buildtext'>
                                                                                    <div role="group">
                                                                                        <Field type="text" name="socketUK" min="0" placeholder="UK Qty" value={`UK Qty : ${formData?.socketUK ? formData?.socketUK : ""}`} />
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                            <div className="offset-lg-6"></div>
                                                                        </>
                                                                    }
                                                                    {(socketData.includes('Schuko')) &&
                                                                        <>
                                                                            <div className='col-lg-6'>
                                                                                <div className='buildtext'>
                                                                                    <div role="group">
                                                                                        <Field type="text" name="socketSchuko" min="0" placeholder="Schuko Qty" value={`Schuko Qty : ${formData?.socketSchuko ? formData?.socketSchuko : ""}`} />
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                            <div className="offset-lg-6"></div>
                                                                        </>
                                                                    }
                                                                    {(socketData.includes('Indian')) &&
                                                                        <>
                                                                            <div className='col-lg-6'>
                                                                                <div className='buildtext'>
                                                                                    <div role="group">
                                                                                        <Field type="text" name="socketIndian" min="0" placeholder="Indian Qty" value={`Indian Qty : ${formData?.socketIndian ? formData?.socketIndian : ''}`} />
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                            <div className="offset-lg-6"></div>
                                                                        </>
                                                                    }
                                                                    {(socketData.includes('Universal')) &&
                                                                        <>
                                                                            <div className='col-lg-6'>
                                                                                <div className='buildtext'>
                                                                                    <div role="group">
                                                                                        <Field type="text" name="socketUniversal" min="0" placeholder="Universal Qty" value={`Universal Qty : ${formData?.socketUniversal ? formData?.socketUniversal : ''}`} />
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                            <div className="offset-lg-6"></div>
                                                                        </>
                                                                    }
                                                                    {(socketData.includes('Others')) &&
                                                                        <>
                                                                            <div className='col-lg-6'>
                                                                                <div className='buildtext'>
                                                                                    <div role="group">
                                                                                        <Field type="text" name="socketOthersType" placeholder="Others Type" value={`Others Type : ${formData?.socketOthersType ? formData?.socketOthersType : ""}`} />
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                            <div className='col-lg-6'>
                                                                                <div className='buildtext'>
                                                                                    <div role="group">
                                                                                        <Field type="text" name="socketOthersQty" min="0" placeholder="Others Qty" value={`Others Qty : ${formData?.socketOthersQty ? formData?.socketOthersQty : ''}`} />
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
                                                                    {formData?.displayType == "LED" &&
                                                                        <div className='col-lg-4'>
                                                                            <div role="group">
                                                                                <label htmlFor='LED'>
                                                                                    <Field id="LED" type="radio" name="displayType" value="LED" />
                                                                                    <span>LED</span>
                                                                                </label>
                                                                            </div>
                                                                        </div>
                                                                    }
                                                                    {formData?.displayType == "LCD" &&
                                                                        <div className='col-lg-4'>
                                                                            <div role="group">
                                                                                <label htmlFor='LCD'>
                                                                                    <Field id="LCD" type="radio" name="displayType" value="LCD" />
                                                                                    <span>LCD</span>
                                                                                </label>
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
                                                                <h6>{inputCordLengthMetresHeading}</h6>
                                                            </div>
                                                        </div>
                                                        <div className='col-lg-9'>
                                                            <div className='buildfrom'>
                                                                <div className='row'>
                                                                    <div className='col-lg-6'>
                                                                        <div className='buildtext'>
                                                                            <div role="group">
                                                                                <Field type="number" name="inputCordLength" placeholder="Input Cord length (metres)" disabled/>
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
                                                                    {formData?.certification == "CE" &&
                                                                        <div className='col-lg-4'>
                                                                            <div role="group">
                                                                                <label htmlFor='CE'>
                                                                                    <Field id="CE" type="radio" name="certification" value="CE" />
                                                                                    <span>CE</span>
                                                                                </label>
                                                                            </div>
                                                                        </div>
                                                                    }
                                                                    {formData?.certification == "CE + UL" &&
                                                                        <div className='col-lg-4'>
                                                                            <div role="group">
                                                                                <label htmlFor='CEUL'>
                                                                                    <Field id="CEUL" type="radio" name="certification" value="CE + UL" />
                                                                                    <span>CE + UL</span>
                                                                                </label>
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
                                                                <h6>{otherSpecificRequirementsHeading}</h6>
                                                            </div>
                                                        </div>
                                                        <div className='col-lg-9'>
                                                            <div className='buildfrom'>
                                                                <div className='row'>
                                                                    <div className='col-lg-12'>
                                                                        <div className='buildtext'>
                                                                            <div role="group">
                                                                                <Field type="text" name="specificRequirement" placeholder="" disabled/>
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
                                                                                <Field type="number" min="0" name="qtyOfPDUs" placeholder="" disabled />
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
                                    </div>
                                    <div className='buildcontact'>
                                        <div className='buildcontacttitle'>
                                            <h6>{formTitleHeading}</h6>
                                        </div>
                                        <div className='row'>
                                            <div className='col-lg-6 col-md-6'>
                                                <div className="contactInner">
                                                    <Field type="text" name="username" value={`Name :- ${formData.username}`} disabled/>
                                                </div>
                                            </div>
                                            <div className='col-lg-6 col-md-6'>
                                                <div className="contactInner">
                                                    <Field type="text" name="company" value={`Company :- ${formData.company}`} disabled/>
                                                </div>
                                            </div>
                                            <div className='col-lg-6 col-md-6'>
                                                <div className="contactInner">
                                                    <Field type="email" name="email" value={`Email :- ${formData.email}`} disabled/>
                                                </div>
                                            </div>
                                            <div className='col-lg-6 col-md-6'>
                                                <div className="contactInner">
                                                    <Field type="text" name="mobile" value={`Mobile :- ${formData.mobile}`} disabled/>
                                                </div>
                                            </div>
                                            <div className='col-lg-12 col-md-12'>
                                                <div className="contactInner">
                                                    <Field type="text" name="cityAndCountry" value={`City & Country :- ${formData.cityAndCountry}`} disabled/>
                                                </div>
                                            </div>

                                            <div className='col-lg-12 col-md-12'>
                                                <div className="contactInner">
                                                    <Field type="text" name="messageAndComments" value={`Message :- ${formData.messageAndComments}`} disabled/>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Form>
                            )}
                        </Formik>
                    </div>
                </div>
            </div>}
        </>
    )
}

export default BuildYourPduResult

export async function getServerSideProps(context) {
    const { query } = context;
    const key = query.key || ''; // Default value if 'search' is not present

    const url = `${process.env.NEXT_PUBLIC_WORDPRESS_SITE_URL}/wp-json/wp/v2/buildYourPDUData`;
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ "key": key })
    });

    const { data: buildPDUdata, loading, networkStatus } = await client.query({
        query: GET_BUILDYOURPDU_PAGE,
        variables: { page: 'build-your-pdu' },
    });

    const data = await response.json();
    let result = '';
    if (data) {
        result = data.result;
    }
    return {
        props: {
            data: result,
            buildPDUdata: buildPDUdata,
            headerClass: 'header-v2',
        }
    }
}