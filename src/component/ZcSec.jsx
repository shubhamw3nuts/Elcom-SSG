import SectionTitle from "./layouts/SectionTitle";

const ZcSec = ({ sectionHeading, heading, description, aboutInfo }) => {
    return (
        <>
            <SectionTitle sectionHeading={sectionHeading} heading={heading} description={description} buttonInfo='' />
            {aboutInfo &&
                <div className='emissionwrap'>
                    <div className='container'>
                        <div className='emissiondtl'>
                            <div className='emissintext'>
                                {aboutInfo.map((info, index) => {
                                    if (info.column1 != '' || info.column2 != '' || info.column3 != '') {
                                        return (
                                            <div className='row' key={index}>
                                                <div className='col-lg-6 col-md-4 col-6'>
                                                    {index == 0 ? <h6>{info.column1}</h6> : <p>{info.column1}</p>}
                                                </div>
                                                <div className='col-lg-3 col-md-4 col-3'>
                                                    {index == 0 ? <h6>{info.column2}</h6> : <p>{info.column2}</p>}
                                                </div>
                                                <div className='col-lg-3 col-md-4 col-3'>
                                                    {index == 0 ? <h6>{info.column3}</h6> : <p>{info.column3}</p>}
                                                </div>
                                            </div>
                                        )
                                    }
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            }
        </>
    )
}


export default ZcSec;