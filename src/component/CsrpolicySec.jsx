import React,{Fragment} from "react";
import SectionTitle from "./layouts/SectionTitle";
import TitlecsrDetail from "./layouts/TitlecsrDetail";

const CsrpolicySec = ({ sectionHeading, heading, description, info }) => {
    return (
        <>
            <div className="csrWrapper">
                <SectionTitle sectionHeading={sectionHeading} heading={heading} description={description} buttonInfo='' />
                {info &&
                    <div className="csrwrap">
                        {info.map((csrinfo, index) => {
                            const { heading, description } = csrinfo;
                            return (
                                <React.Fragment key={index}>
                                    {(heading || description) &&
                                        <TitlecsrDetail heading={heading} description={description} />
                                    }
                                </React.Fragment>
                            )
                        })}
                    </div>
                }
            </div>
        </>
    )
}

export default CsrpolicySec;