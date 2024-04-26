const InnerBanner = ({ heading }) => {
    if (heading) {
        return (
            <div className="innerWrap">
                <div className="innerBg">
                    <div className="container">
                        <div className="innerTtl">
                            <h1 dangerouslySetInnerHTML={{ __html: heading }} ></h1>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
    return '';
}
export default InnerBanner;