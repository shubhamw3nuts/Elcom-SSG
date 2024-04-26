import SectiontitleFull from "./SectiontitleFull";

const FutureBlog = ({ sectionHeading, heading, info }) => {
    if (info) {

        const renderColumn = (column, isOdd) => {
            return column.map((obj, index) => {
                if ((isOdd && index % 2 === 0) || (!isOdd && index % 2 !== 0)) {
                    if(obj.info){
                        return <li key={index}><p>{obj.info}</p></li>;
                    }
                }
                return null; // Render nothing for the condition that doesn't match
            }).filter(item => item !== null); // Remove null values from the array
        };

        const column1Content = renderColumn(info, true);  // Pass true for odd items
        const column2Content = renderColumn(info, false); // Pass false for even items
        return (
            <>
                <div className="futureWrap">
                    <SectiontitleFull sectionHeading={sectionHeading} heading={heading} />
                    {(column1Content || column2Content) &&
                        <div className="container">
                            <div className="futuredtl">
                                <div className="row">
                                    {column1Content.length != 0 && <div className="col-lg-6">
                                        <div className="flexbox">
                                            <div className="futuretext">
                                                <ul>{column1Content}</ul>
                                            </div>
                                        </div>
                                    </div>}
                                    {column2Content.length != 0 && <div className="col-lg-6">
                                        <div className="flexbox">
                                            <div className="futuretext">
                                                <ul>{column2Content}</ul>
                                            </div>
                                        </div>
                                    </div>}
                                </div>
                            </div>
                        </div>
                    }
                </div >
            </>
        )
    }
    return '';
}

export default FutureBlog;