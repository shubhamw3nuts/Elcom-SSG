import SectionTitle from "./layouts/SectionTitle";
import CertificationSlider from "./layouts/CertificationSlider";

const CertiSec = ({sectionHeading,heading,description,buttonInfo,logosInfo,certifications}) => {
    return (
        <>
            <div className="certificationwrap">
                <SectionTitle sectionHeading={sectionHeading} heading={heading} description={description} buttonInfo={buttonInfo}/>
                <CertificationSlider logosInfo={certifications} selectedCertifications={false} />
            </div>
        </>
    )
}
export default CertiSec;