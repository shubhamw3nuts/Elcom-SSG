import React, { useState } from "react";
import Link from 'next/link';
import Popupform from './PopupformSec';
import Modal from 'react-bootstrap/Modal';

const JobdetailSec = ({ careerData, applicationFormOptions, serialData }) => {
    const [show, setShow] = useState(false);
    const handleClose = (e) => {
        e.preventDefault();
        setShow(false)
    };
    const handleShow = (e) => {
        e.preventDefault();
        setShow(true);
    }

    const {
        title, excerpt, content, careerLocationCategories, careerDepartmentCategories, careerFields: { experience },
    } = careerData;

    let commaSeparatedLocations = '';
    if (careerLocationCategories?.nodes.length > 0) {
        const categoryNames = careerLocationCategories?.nodes.map(category => category.name);
        commaSeparatedLocations = categoryNames.join(', ');
    }

    let commaSeparatedDepartment = '';
    if (careerDepartmentCategories?.nodes.length > 0) {
        const categoryNames = careerDepartmentCategories?.nodes.map(category => category.name);
        commaSeparatedDepartment = categoryNames.join(', ');
    }
    return (
        <>
            <div className="jobdetailWrap">
                <Modal show={show} onHide={() => setShow(false)} className={"jobmodel"}>
                    <Popupform change={handleClose} careerData={careerData} applicationFormOptions={applicationFormOptions} />
                </Modal>
                <div className="container">
                    <div className='jbgrp'>
                        <div className="jobbody">
                            <div className="jobList">
                                <div className="row">
                                    <div className="col-lg-1 col-md-1">
                                        <div className="jobtype">
                                            <span className="srno">{serialData + 1}</span>
                                        </div>
                                    </div>
                                    <div className="col-lg-2 col-md-2">
                                        <div className="jobtype">
                                            <span>{title}</span>
                                        </div>
                                    </div>
                                    <div className="col-lg-2 col-md-2">
                                        <div className="jobtype">
                                            <span>{experience ? experience : '-'}</span>
                                        </div>
                                    </div>
                                    <div className="col-lg-3 col-md-3">
                                        <div className="jobtype">
                                            {commaSeparatedDepartment ? <span>{commaSeparatedDepartment}</span> : <span>-</span>}
                                        </div>
                                    </div>
                                    <div className="col-lg-2 col-md-2">
                                        <div className="jobtype">
                                            {commaSeparatedLocations ? <span>{commaSeparatedLocations}</span> : <span>-</span>}
                                        </div>
                                    </div>
                                    <div className="col-lg-2 col-md-2">
                                        <div className="jobtype">
                                            <span><Link href={"#"} onClick={handleShow}>Apply now</Link></span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="mobilejobbody">
                            <div className="mobilejoblist">
                                <div className="headdingmobile">
                                    <h6>{title}</h6>
                                </div>
                                <div className="jobdetaillist">
                                    <ul>
                                        {experience && <li><span>Experience: </span>{experience ? experience : '-'}</li>}
                                        {commaSeparatedDepartment && <li><span>Key Skills: </span>{commaSeparatedDepartment}</li>}
                                        {commaSeparatedLocations && <li><span>Location: </span>{commaSeparatedLocations}</li>}
                                    </ul>
                                </div>
                                <div className="jobtype">
                                    <span><Link href={"#"} onClick={handleShow}>Apply now</Link></span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default JobdetailSec;