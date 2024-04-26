import Image from 'next/image';
import Link from 'next/link';
import Location from "../component/Svgs/Location";
import SectionTitlewhite from './layouts/SectionTitlewhite';
import LocationName from './layouts/LocationName';
import { useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

let isFirstTime = true;
const GloblemapSec = ({ sectionHeading, heading, description, mapImage, markerInfo, markerInfoLink }) => {

    let activeMarkerOnPageLoad = '';
    let makeThisMarkerActive = '';
    if (markerInfo) {
        activeMarkerOnPageLoad = markerInfo.find(marker => marker.makeThisMarkerActive);
    }
    const [marker, setMarker] = useState(activeMarkerOnPageLoad || '');
    const [activeMarkerIndex, setActiveMarkerIndex] = useState(null);

    const handleSetMarker = (marker, index) => {
        setMarker(marker);
        setActiveMarkerIndex(index);
        makeThisMarkerActive = false;
        isFirstTime = false;
    }

    const closeMarkerInfoBox = (e) => {
        e.preventDefault();
        setMarker('');
    }

    const [addClass, setAddClass] = useState(false);

    const [inViewRef, inView] = useInView({
        triggerOnce: true,
    });

    useEffect(() => {
        if (inView && !addClass) {
            // Add a delay of 1000 milliseconds (1 second) before adding the class
            const delayTimeout = setTimeout(() => {
                setAddClass(true);
            }, 500);

            // Clear the timeout if the component goes out of view before the delay
            return () => clearTimeout(delayTimeout);
        }
    }, [inView, addClass]);

    let activeMarker = '';
    return (
        <>
            <div className='gmapWrap'>
                <SectionTitlewhite sectionHeading={sectionHeading} heading={heading} description={description} buttonInfo="" />
                <div className='container'>
                    <div className='globleMap'>
                        {mapImage &&
                            <div className={`mapImg ${addClass ? 'visible' : ''}`} ref={inViewRef}>
                                <Image src={mapImage.sourceUrl} width={993} height={580} alt='globlemapimg' />
                            </div>
                        }
                        {markerInfo.map((marker, index) => {
                            makeThisMarkerActive = marker.makeThisMarkerActive;
                            if(marker.distributorsLocation){
                                // if(marker.distributorsLocation == 'India'){
                                    return (
                                        <div className={`location-${index + 1} ${makeThisMarkerActive && isFirstTime ? 'active' : ''} ${index == activeMarkerIndex ? 'active' : ''}`} key={index} onMouseEnter={() => handleSetMarker(marker, index)} onClick={() => handleSetMarker(marker, index)} >
                                            {/* <div className={`location-${index + 1} ${makeThisMarkerActive && isFirstTime ? 'active' : ''}`} key={index} onMouseEnter={() => handleSetMarker(marker)} onClick={() => handleSetMarker(marker)} onMouseLeave={() => setMarker('')}> */}
                                            <Link href="#" onClick={e => e.preventDefault()}><Location /></Link>
                                        </div>
                                    )
                                // }
                                // return ''
                            }
                        })}
                    </div>
                </div>
                {(marker) &&
                    <div className="locwrap">
                        <LocationName markerInfo={marker} closeMarkerInfoBox={closeMarkerInfoBox} markerInfoLink={markerInfoLink} />
                    </div>
                }
            </div>
        </>
    )
}

export default GloblemapSec;