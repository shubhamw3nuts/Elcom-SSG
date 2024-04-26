import Link from 'next/link';
import SectitleNiceselect from "./layouts/SectitleNiceselect";
import NiceselectorSection from "./layouts/NiceselectorSection";
import { useInView } from 'react-intersection-observer';
import DefaultBlogBox from "./layouts/DefaultBlogBox";
import { useEffect, useState } from 'react';
import { GET_ALL_BLOG_POSTS } from '@/queries/graphql_queries';
import { useQuery } from '@apollo/client';

const useBlogPosts = (endCursor, clicked, categoryId) => {
    return useQuery(GET_ALL_BLOG_POSTS, {
        variables: { "after": endCursor, where: { "categoryIn": categoryId } },
        skip: !clicked
    });
};

const OtherblogSec = ({ sectionHeading, heading, filterText, loadMoreButtonText, posts, allpostsPageInfo, categories }) => {
    const [clicked, setClicked] = useState(false);
    const [endCursor, setEndCursor] = useState(allpostsPageInfo.endCursor);
    const [allPosts, setAllPosts] = useState(posts);
    const [showLoadMoreButton, setShowLoadMoreButton] = useState(allpostsPageInfo.hasNextPage);
    const [categoryId, setCategoryId] = useState([]);
    const [isLoadMore, setIsLoadMore] = useState(false);

    const loadMoreHandler = (endCursorVal) => {
        setClicked(true);
        setIsLoadMore(true);
    }

    const selectedCategory = (cat) => {
        setEndCursor("");
        setCategoryId(cat.value == '' ? [] : [cat.value]);
        setClicked(true);
    }

    const { loading, error, data, refetch } = useBlogPosts(endCursor, clicked, categoryId);

    useEffect(() => {
        if (!loading && data) {
            if ((Array.isArray(categoryId) && categoryId.length >= 0 && !isLoadMore)) {
                setAllPosts(data.allposts.nodes);
            } else {
                setAllPosts(prevPosts => [...prevPosts, ...data.allposts.nodes]);
            }
            setShowLoadMoreButton(data.allposts.pageInfo.hasNextPage);
            setEndCursor(data.allposts.pageInfo.endCursor);
            setClicked(false);
            setIsLoadMore(false);
        }
    }, [loading, data]);

    const CategoryOptions = categories.map((category, index) => {
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
            <div className={`othblogwrap ${addClass ? 'visible' : ''}`} ref={inViewRef}>
                <div className="othwrap">
                    <div className="container">
                        <div className="lineEl"></div>
                        <div className="row">
                            <SectitleNiceselect sectionHeading={sectionHeading} heading={heading} />
                            {categories && <NiceselectorSection dropdownHeading={filterText} categories={CategoryOptions} selectedCategory={selectedCategory} />}
                        </div>
                        {(allPosts || allPosts.length > 0) &&
                            <>
                                <div className="defblog">
                                    <div className="row">
                                        {allPosts.map((post, index) => {
                                            const { title, slug, featuredImage, date, categories } = post;
                                            return <DefaultBlogBox key={index} title={title} slug={slug} featuredImage={featuredImage} date={date} categories={categories} />
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

export default OtherblogSec;