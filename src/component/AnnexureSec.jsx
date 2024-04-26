const AnnexureSec = ({ info }) => {
    const { heading, column1Heading, column2Heading, column3Heading } = info;
    if (info.info) {
        return (
            <>
                <div className="annexurewrap">
                    <div className="container">
                        <div className="annexuregrp">
                            {heading && <div className="annexuremain">
                                <h4>{heading}</h4>
                            </div>}
                            <div className="annexureblock">
                                <div className="row">
                                    <div className="col-lg-3">
                                        <div className="annexureprolist">
                                            <div className="annexuretitle">
                                                <h6>{column1Heading || "Sr. no."}</h6>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-3">
                                        <div className="annexureprolist">
                                            <div className="annexuretitle">
                                                <h6>{column2Heading || "With reference to"}</h6>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-6">
                                        <div className="annexureprolist">
                                            <div className="annexuretitle">
                                                <h6>{column3Heading || "Recent Year 2022"}</h6>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {info.info.map((table, index) => {
                                    const { column1, column2, column3 } = table;
                                    if (column1 || column2 || column3) {
                                        return (
                                            <div className="annexuresublist" key={index}>
                                                <div className="row">
                                                    <div className="col-lg-3">
                                                        <div className="annexlist">
                                                            {column1 && <span>{column1}</span>}
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-3">
                                                        <div className="annexlist">
                                                            {column2 && <span>{column2}</span>}
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-6">
                                                        <div className="annexlist">
                                                            <div dangerouslySetInnerHTML={{ __html: column3 }} className="custom_html"></div>
                                                            <ul style={{ display: "none" }}>
                                                                <li>{column3}</li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    }
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

export default AnnexureSec;