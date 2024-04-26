import ReactPaginate from 'react-paginate';
import EventcompSec from './EventcompSec';
import { useEffect, useState } from 'react';
import { GET_PAST_EVENTS } from '@/queries/graphql_queries';
import { useQuery } from '@apollo/client';
import LoaderSec from './LoaderSec';

const useBlogPosts = (clicked,currentPage) => {
    return useQuery(GET_PAST_EVENTS, {
        variables: { page : "events",offset : (currentPage * 4 - 4) ,size:4 },
        skip: !clicked
    });
};

const PasteventSec = ({ eventsData }) => {
    const {hasMore,hasPrevious,total} = eventsData?.pageInfo?.offsetPagination;
    const events_per_page = 4;
    const totalPage = Math.ceil(total/events_per_page);
    const [currentPage,setCurrentPage] = useState(0);
    const [clicked, setClicked] = useState(false);
    const [eventsDataArr, setEventsData] = useState(eventsData);


    const { loading, error, data, refetch } = useBlogPosts(clicked,currentPage);
    

    const eventPaginationClick = (e) => {
        setCurrentPage(e.selected + 1);
        setClicked(true);
    }

    useEffect(() => {
        if (!loading && data) {
            console.log("data",data)
            setEventsData(data?.eventsPast)
            setClicked(false);
        }
    }, [loading, data]);

    useEffect(() => {
        // Your JavaScript code here
        if (loading) {
            document.body.classList.add('product_loader');
        } else {
            document.body.classList.remove('product_loader');
        }
    }, [loading]);
    
    
    return (
        <div className="pastwrap">
            {loading && <LoaderSec />}
            <div className="container">
                <div className="pastwrapper">
                    <div className="row">
                        {eventsDataArr?.nodes.map((event, index) => {
                            return (
                                <EventcompSec key={index} eventData={event} />
                            )
                        })}
                    </div>
                </div>
                <div className='pagination'>
                    <ReactPaginate
                        breakLabel="..."
                        nextLabel=">"
                        onPageChange={(e) => eventPaginationClick(e)}
                        pageRangeDisplayed={1}
                        marginPagesDisplayed={2}
                        pageCount={totalPage}
                        previousLabel="<"
                        renderOnZeroPageCount={null}
                        forcePage={currentPage == 0 ? 0  : currentPage - 1}
                    />
                </div>
            </div>
        </div>
    )
}
export default PasteventSec;