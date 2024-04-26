import Link from "next/link";

function formatDate(inputDate) {
    const date = new Date(inputDate);
    const day = date.getDate();
    const month = date.toLocaleString('default', { month: 'long' });
    const year = date.getFullYear();

    let suffix = 'th';
    if (day === 1 || day === 21 || day === 31) {
        suffix = 'st';
    } else if (day === 2 || day === 22) {
        suffix = 'nd';
    } else if (day === 3 || day === 23) {
        suffix = 'rd';
    }

    return `${day}${suffix} ${month} ${year}`;
}

const EventcompSec = (props) => {
    const { title, featuredImage, excerpt, eventsPostTypeOptions, uri } = props.eventData;
    let bgColor = '';
    if (eventsPostTypeOptions?.backgroundColorForPastEventBox == 'Dark') {
        bgColor = '#343434';
    }
    return (
        <>
            <div className="col-lg-6">
                <div className='pasteventbox'>
                    <div className="pastevent fadeInUp" style={{ backgroundColor: bgColor }}>
                        {eventsPostTypeOptions && <h6 className="small-text bg-green">{eventsPostTypeOptions.eventType}</h6>}
                        <h4>{title}</h4>
                        {
                            eventsPostTypeOptions && (
                                eventsPostTypeOptions.eventStartDate == eventsPostTypeOptions.eventEndDate ?
                                    <h6>{eventsPostTypeOptions.eventStartDate && formatDate(eventsPostTypeOptions.eventStartDate)}</h6>
                                    :
                                    <h6>{eventsPostTypeOptions.eventStartDate && formatDate(eventsPostTypeOptions.eventStartDate)} -   {eventsPostTypeOptions.eventEndDate && formatDate(eventsPostTypeOptions.eventEndDate)}</h6>
                            )
                        }
                        {excerpt && <div dangerouslySetInnerHTML={{ __html: excerpt }} className="custom_html"></div>}
                        <div className="btnbox">
                            <Link className="elcom-btn tertiary-btn" href={uri}>Read More</Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default EventcompSec;