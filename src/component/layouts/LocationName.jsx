
import Image from 'next/image';
import Link from "next/link";
import cross from '@/asset/images/cross.svg';

const LocationName = ({ markerInfo, closeMarkerInfoBox, markerInfoLink }) => {
    return (
        <>
            <div className="locationname">
                <div className='loctwrapper'>
                    <div className="locationdtl">
                        {markerInfo.distributorsLocation && <h6>{markerInfo.distributorsLocation}</h6>}
                        {markerInfo.distributorsLocation == 'India' && <p>Number of Distributors:</p>}
                        {(markerInfo.distributorsLocation == 'India' && markerInfo.numberOfDistributors) && <h6>{markerInfo.numberOfDistributors}</h6>}
                        {(markerInfo.distributorsLocation == 'India' && markerInfoLink) && <Link href={`${markerInfoLink.url}?country=${markerInfo.distributorsLocation.replace(/\s+/g, '_').toLowerCase()}`} target={markerInfoLink.target} >{markerInfoLink.title}</Link>}
                    </div>
                    <div className="closebtn">
                        <Link className="close" href='#' onClick={(e) => closeMarkerInfoBox(e)}><Image src={cross} alt="cross" /></Link>
                    </div>
                </div>

            </div>
        </>
    )
}

export default LocationName;