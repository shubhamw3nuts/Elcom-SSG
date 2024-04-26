import Link from 'next/link';
import React from 'react';

const WorldaddressSec = ({ number, handleCountryClick, currentElement, info, phoneText, emailText, countrySelected }) => {
    if (info.dealersInfo) {
        let countryNameInLowerCase = info.countryName.replace(/\s+/g, '_').toLowerCase();
        return (
            <>
                <div className="worldaddWrap " id={countryNameInLowerCase}>
                    <div className="worldaddress">
                        <div className="container">
                            <div className="worldaddlist">
                                <div className="worldaddGrp" >
                                    <div className={`worldaddTtl ${number === currentElement || countrySelected == countryNameInLowerCase ? 'active' : ''}`} onClick={() => handleCountryClick(number, number == currentElement || countrySelected == countryNameInLowerCase ? 'active' : '')}>
                                        <h5>{info.countryName}</h5>
                                    </div>
                                    <div className="row">
                                        {info.dealersInfo.map((item, index) => {
                                            return (
                                                <div className="col-lg-4 col-md-6" key={index}>
                                                    <div className="innerdtl">
                                                        <h6>{item.name}</h6>
                                                        <p>{item.address}</p>
                                                        {item.phone && <span className='pnum'>{phoneText}: {item.phone.map((phone, index) => {
                                                            return (
                                                                <React.Fragment key={index}>
                                                                    <Link href={`tel:${phone.phone}`}>{phone.phone}</Link>
                                                                    {index !== item.phone.length - 1 ? ' / ' : ''}
                                                                </React.Fragment>
                                                            )
                                                        })}</span>}
                                                        {item.email && <span>{emailText}: {item.email.map((email, index) => {
                                                            return (
                                                                <React.Fragment key={index}>
                                                                    <Link href={`mailto:${email.email}`}>{email.email}</Link>
                                                                    {index !== item.email.length - 1 ? ', ' : ''}
                                                                </React.Fragment>
                                                            )
                                                        })}</span>}
                                                        {item.extraText && <p>{item.extraText}</p>}
                                                    </div>
                                                </div>
                                            )
                                        })}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>

        )
    }
    return ''
}


export default WorldaddressSec;