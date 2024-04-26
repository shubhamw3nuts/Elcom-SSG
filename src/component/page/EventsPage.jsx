import InnerBanner from "@/component/InnerBanner";
import NeweventSec from "@/component/NeweventSec";
import PasteventSec from "@/component/PasteventSec";
import SectiontitleFull from "@/component/layouts/SectiontitleFull";
import SeoData from "../SeoData";
import React from "react";

function isDatePast(targetDate) {
    // Create a Date object for the current date 
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);

    // Parse the target date from the input format (e.g., "2023-12-15")
    const [year, month, day] = targetDate.split('-').map(Number);
    const targetDateObj = new Date(year, month - 1, day); // Month is 0-based (0-11)

    // Compare the current date with the target date
    // return currentDate > targetDateObj;
    if (currentDate.getTime() > targetDateObj.getTime()) {
        return true; // Target date is in the past
    } else if (currentDate.getTime() < targetDateObj.getTime()) {
        return false; // Target date is in the future
    } else {
        return false; // Target date is today
    }

}

const EventsPage = ({ data, eventsFuture, pageTitle, seodata, pastEvents }) => {
    const {
        bannerHeading,
        upcomingSectionHeading, upcomingHeading,
        pastSectionHeading, pastHeading, pastReadMoreButtonText,
    } = data;
    // console.log("eventsFuture : ",eventsFuture)
    // console.log("pastEvents : ",pastEvents)


    let events = [];
    let events_future = [];
    // if (eventsData) {
    //     eventsData.nodes.map(event => {
    //         if (event.eventsPostTypeOptions) {
    //             let eventStartDate = event.eventsPostTypeOptions.eventStartDate;
    //             let eventEndDate = event.eventsPostTypeOptions.eventEndDate;
    //             const isPast = isDatePast(eventEndDate);
    //             if (isPast) {
    //                 events.push(event);
    //             }else{
    //                 events_future.push(event);
    //             }
    //         }
    //     })
    // }

    // console.log("events_future : ",events_future)
    return (
        <>
            <SeoData seodata={seodata} pageTitle={pageTitle} />
            {bannerHeading && <InnerBanner heading={bannerHeading.trim() != '' ? bannerHeading : pageTitle} />}
            <div className="eventWrap">
                {eventsFuture?.nodes.length > 0 && (upcomingSectionHeading || upcomingHeading) ? <SectiontitleFull sectionHeading={upcomingSectionHeading} heading={upcomingHeading} /> : ''}
                {eventsFuture?.nodes.length > 0 &&
                    eventsFuture?.nodes?.map((event, index) => {
                        if (event) {
                            return (
                                <React.Fragment key={index}>
                                    <NeweventSec eventData={event} />
                                </React.Fragment>
                            )
                        }
                    })
                }
                {pastEvents?.nodes.length > 0 && (pastSectionHeading || pastHeading) ? <SectiontitleFull sectionHeading={pastSectionHeading} heading={pastHeading} /> : ''}
                {pastEvents?.nodes.length > 0 && <PasteventSec eventsData={pastEvents} key={1} />}
                {(eventsFuture?.nodes.length == 0 && pastEvents?.nodes.length == 0) && <h4 className="text-center">No Events Found.</h4>}
            </div >
        </>
    )

}
export default EventsPage;