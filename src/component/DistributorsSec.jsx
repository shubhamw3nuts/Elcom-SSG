import Link from "next/link";
import SectiontitleFull from './layouts/SectiontitleFull';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import ExploreSec from '@/component/ExploreSec';
import WorldaddressSec from './WorldaddressSec';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

const DistributorSec = ({ data }) => {
    const router = useRouter();
    const {
        indiaSectionHeading, indiaHeading, indiaInfo, displayDealersCount, loadMoreButtonText, worldwideSectionHeading, worldwideHeading, worldwideInfo,
        exploreSectionHeading, exploreHeading, exploreImage, exploreButtonInfo,
        phoneText, emailText
    } = data;

    const [countrySelected, setCountrySelected] = useState(router.query.country || "");
    const [currentElement, setCurrentElement] = useState(countrySelected ? "" : 1);
    const [itemsToShow, setItemsToShow] = useState({});
    const [indiaData, setIndiaData] = useState("");

    const itemsPerLoad = (displayDealersCount > 0 ? displayDealersCount : 6) || 6;
    const loadMoreBtn = loadMoreButtonText || "Load More";

    const handleCountryClick = (number, active) => {
        if (active) {
            setCurrentElement("");
            setCountrySelected("");
        } else {
            setCurrentElement(number);
            setCountrySelected("");
        }
    };

    const handleTabChange = (direction) => {
        setItemsToShow(prevItemsToShow => ({
            ...prevItemsToShow,
            // [direction]: itemsPerLoad, // on tab change set default itemsperload
            [direction]: (prevItemsToShow[direction] || itemsPerLoad),
        }));
    };

    const handleClickLoadMore = (e, direction) => {
        e.preventDefault();
        setItemsToShow(prevItemsToShow => ({
            ...prevItemsToShow,
            [direction]: (prevItemsToShow[direction] || itemsPerLoad) + itemsPerLoad,
        }));
    };

    useEffect(() => {
        if (countrySelected) {
            // Check if the query parameter exists
            const sectionToScroll = countrySelected;
            if (sectionToScroll) {
                // Find the target element within the div using its ID
                const targetElement = document.getElementById(sectionToScroll);
                const headerHeight = document.getElementById('header').offsetHeight; // Adjust with your actual header ID
                if (targetElement) {
                    setTimeout(() => {
                        // Calculate the scroll position based on the target element's offset
                        const targetOffset = (targetElement.offsetTop);
                        // Scroll to the target position
                        window.scrollTo({
                            top: targetOffset,
                            behavior: 'smooth', // Optional: Use smooth scrolling
                        });
                    }, 400);
                }
            }
        }
    }, [countrySelected]);

    useEffect(() => {
        if (indiaInfo) {
            // Grouping the data by direction using Array.reduce()
            const groupedByDirection = indiaInfo.reduce((acc, currentItem) => {
                const { direction } = currentItem;
                // Create a new array for each direction if it doesn't exist in the accumulator
                if (!acc[direction]) {
                    acc[direction] = [];
                }
                // Push the current item into the corresponding direction array
                acc[direction].push(currentItem);
                return acc;
            }, {});
            setIndiaData(groupedByDirection)
            if (Object.keys(groupedByDirection).length > 0) {
                handleTabChange(Object.keys(groupedByDirection)[0])
            }
        }
    }, [])


    return (
        <>
            {indiaData &&
                <div className='distributorsWrap'>
                    <SectiontitleFull sectionHeading={indiaSectionHeading} heading={indiaHeading} />
                    <div className='container'>
                        <div className='distributorsBox'>
                            <Tabs
                                defaultActiveKey="south"
                                id="uncontrolled-tab-example"
                                className="mb-3"
                                onSelect={handleTabChange}
                            >
                                {Object.entries(indiaData).map(([direction, items]) => (
                                    <Tab key={direction} eventKey={direction} title={direction.charAt(0).toUpperCase() + direction.slice(1)}>
                                        <div className="dpbox">
                                            <div className="row">
                                                {items.slice(0, itemsToShow[direction] || itemsPerLoad).map((item, index) => {
                                                    if(item.name || item.address){
                                                        return (
                                                            <div className='col-lg-4 col-md-6' key={index}>
                                                                <div className='dpdetails'>
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
                                                                                <Link href={`mailto:${email.emailAddress}`}>{email.emailAddress}</Link>
                                                                                {index !== item.email.length - 1 ? ', ' : ''}
                                                                            </React.Fragment>
                                                                        )
                                                                    })}</span>}
                                                                    {item.extraText && <p>{item.extraText}</p>}
                                                                </div>
                                                            </div>
                                                        )
                                                    }
                                                })}
                                            </div>
                                        </div>
                                        {itemsToShow[direction] < items.length && (
                                            <div className='btnbox'>
                                                <Link className="elcom-btn primary-black-btn" href={'#'} onClick={(e) => handleClickLoadMore(e, direction)}>{loadMoreBtn}</Link>
                                            </div>
                                        )}
                                    </Tab>
                                ))}
                            </Tabs>
                        </div>
                    </div>
                </div>
            }

            {worldwideInfo &&
                <div className='partnerWrap'>
                    <SectiontitleFull heading={worldwideHeading} sectionHeading={worldwideSectionHeading} />
                    {worldwideInfo.map((world, index) => {
                        return <WorldaddressSec
                            key={index}
                            number={index + 1}
                            handleCountryClick={handleCountryClick}
                            currentElement={currentElement}
                            info={world}
                            phoneText={phoneText}
                            emailText={emailText}
                            countrySelected={countrySelected}
                        />
                    })}
                </div>
            }
            <div className='distributorExplor'>
                <ExploreSec sectionHeading={exploreSectionHeading} heading={exploreHeading} image={exploreImage} buttonInfo={exploreButtonInfo} />
            </div>
        </>
    )
}

export default DistributorSec;