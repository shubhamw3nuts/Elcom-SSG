import Link from 'next/link';
import SectitleNiceselect from "./layouts/SectitleNiceselect";
import NiceselectorSection from "./layouts/NiceselectorSection";
import DefaultBlogBox from "./layouts/DefaultBlogBox";
import { useEffect, useState } from 'react';
import { GET_ALL_NEWS, GET_ALL_NEWS_OF_SPECIFIC_CATEGORY } from '@/queries/graphql_queries';
import { useQuery } from '@apollo/client';
import { useInView } from 'react-intersection-observer';

const useBlogPosts = (endCursor, clicked, categoryId, filterBy) => {
    const stringcategoryId = categoryId.map(number => String(number));
    // Define query options based on conditions
    const queryOptions = categoryId.length > 0
        ? {
            query: GET_ALL_NEWS_OF_SPECIFIC_CATEGORY,
            variables: { "after": endCursor, "terms": stringcategoryId, "order": filterBy }
        }
        : {
            query: GET_ALL_NEWS,
            variables: { "after": endCursor, "order": filterBy }
        };

    // Always call useQuery with the defined query options
    return useQuery(queryOptions.query, {
        variables: queryOptions.variables,
        skip: !clicked
    });
};


const OtherNewsSec = ({ sectionHeading, heading, filterText, loadMoreButtonText, posts, allpostsPageInfo, categories }) => {
    const [clicked, setClicked] = useState(false);
    const [endCursor, setEndCursor] = useState(allpostsPageInfo.endCursor);
    const [allPosts, setAllPosts] = useState(posts);
    const [showLoadMoreButton, setShowLoadMoreButton] = useState(allpostsPageInfo.hasNextPage);
    const [categoryId, setCategoryId] = useState([]);
    const [filterBy, setFilterBy] = useState();
    const [isLoadMore, setIsLoadMore] = useState(false);

    const loadMoreHandler = (endCursorVal) => {
        setClicked(true);
        setIsLoadMore(true);
    }

    const selectedCategory = (cat, dropdownType) => {
        if (dropdownType == 'categorySelect') {
            setCategoryId(cat.value == '' ? [] : [cat.value]);
        } else if (dropdownType == 'filter') {
            setFilterBy(cat.value == '' ? 'DESC' : cat.value);
        }
        setEndCursor("");
        setClicked(true);
    }

    const { loading, error, data, refetch } = useBlogPosts(endCursor, clicked, categoryId, filterBy);
    useEffect(() => {
        if (!loading && data) {
            if ((Array.isArray(categoryId) && categoryId.length >= 0 && !isLoadMore)) {
                setAllPosts(data.allNews.nodes);
            } else {
                setAllPosts(prevPosts => [...prevPosts, ...data.allNews.nodes]);
            }
            setShowLoadMoreButton(data.allNews.pageInfo.hasNextPage);
            setEndCursor(data.allNews.pageInfo.endCursor);
            setClicked(false);
            setIsLoadMore(false);
        }
    }, [loading, data]);


    const SortByOptions = [
        { "value": 'ASC', "label": "Date - Ascending" },
        { "value": 'DESC', "label": "Date - Descending" }
    ];

    const categoryOptions = categories.map((category, index) => {
        return { value: category.databaseId, label: category.name }
    })

    const [inViewRef, inView] = useInView({
        triggerOnce: true,
    });

    const [addClass, setAddClass] = useState(false);

    useEffect(() => {
        if (inView && !addClass) {
            // Add a delay of 1000 milliseconds (1 second) before adding the class
            const delayTimeout = setTimeout(() => {
                setAddClass(true);
            }, 500);

            // Clear the timeout if the component goes out of view before the delay
            return () => clearTimeout(delayTimeout);
        }
    }, [inView, addClass]);

    return (
        <>
            <div className={`othblogwrap  ${addClass ? 'visible' : ''}`} ref={inViewRef}>
                <div className="othwrap">
                    <div className="container">
                        <div className="lineEl"></div>
                        <div className="row">
                            <SectitleNiceselect sectionHeading={sectionHeading} heading={heading} />
                            <NiceselectorSection dropdownHeading={"Sort By..."} categories={SortByOptions} dropdownType="filter" selectedCategory={selectedCategory} />
                            {categories && <NiceselectorSection dropdownHeading={"Filter by:"} categories={categoryOptions} selectedCategory={selectedCategory} dropdownType="categorySelect" />}
                        </div>
                        {(allPosts) &&
                            <>
                                <div className="defblog">
                                    <div className="row">
                                        {allPosts.map((post, index) => {
                                            const { title,uri, slug, featuredImage, date, newsCategories } = post;
                                            return <DefaultBlogBox key={index} title={title} slug={uri} featuredImage={featuredImage} date={date} categories={newsCategories} />
                                        })}
                                    </div>
                                </div>
                                {loading &&
                                    <div className="btnbox othbtn">
                                        <Link className="elcom-btn primary-black-btn" href="javascipt:void(0)">Loading...</Link>
                                    </div>
                                }
                                {(showLoadMoreButton && !loading) &&
                                    <div className="btnbox othbtn">
                                        <Link className="elcom-btn primary-black-btn" href="javascipt:void(0)" onClick={() => loadMoreHandler(endCursor)}>{loadMoreButtonText ? loadMoreButtonText : 'Load More'}</Link>
                                    </div>
                                }
                            </>
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default OtherNewsSec;