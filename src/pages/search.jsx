import Link from 'next/link';
import React, { useContext, useEffect, useState } from 'react';
import Search from '@/component/Svgs/Search';
import ReactPaginate from 'react-paginate';
import axios from 'axios';
import { decodeHTMLString } from '@/utils/utils';
import AppContext from "@/context/AppContext";
import { useRouter } from 'next/router';
import SeoData from '@/component/SeoData';


const SearchPage = ({ searchText, searchResult, searchTotalCount }) => {
    const router = useRouter();
    let searchTextUpdated = router.query.s || searchText;
    const app = useContext(AppContext);
    const { searchInputPlaceholderText, searchProductLink } = app.theme_settings;
    const [search, setSearch] = useState(searchTextUpdated.trim() != '' ? searchTextUpdated : "");
    const [searchResults, setSearchResults] = useState(searchResult || null);
    const [totalPostsCount, setTotalPostsCount] = useState(searchTotalCount || 0);
    const [searchType, setSearchType] = useState("search"); // what user doing like searcing or chagne page on pagination

    const [postPagedCount, setPostPagedCount] = useState(1);
    const [pagePagedCount, setPagePagedCount] = useState(1);
    const [productPagedCount, setProductPagedCount] = useState(1);

    const [currentPageForProduct, setCurrentPageForProduct] = useState(0); // for pagination 
    const [currentPageForPage, setCurrentPageForPage] = useState(0);// for pagination 
    const [currentPageForPost, setCurrentPageForPost] = useState(0);// for pagination 

    const handlePageClick = (event, postType) => {
        const selectedPage = (event.selected + 1);

        if (postType == 'product') {
            setProductPagedCount(selectedPage)
            setCurrentPageForProduct(selectedPage - 1) // for pagination
            setSearchType('pagination');
        } else if (postType == 'page') {
            setPagePagedCount(selectedPage)
            setCurrentPageForPage(selectedPage - 1) // for pagination 
            setSearchType('pagination');
        } else if (postType == 'post') {
            setPostPagedCount(selectedPage)
            setCurrentPageForPost(selectedPage - 1) // for pagination 
            setSearchType('pagination');
        }
    };

    useEffect(() => {
        let timeoutId;
        const fetchData = async () => {
            const formData = new FormData();
            formData.append("search", search);
            // formData.append("postType", postType);

            if (searchType == 'search') {
                formData.append("postPagedCount", 1);
                formData.append("pagePagedCount", 1);
                formData.append("productPagedCount", 1);
            } else if (searchType == 'pagination') {
                formData.append("postPagedCount", postPagedCount);
                formData.append("pagePagedCount", pagePagedCount);
                formData.append("productPagedCount", productPagedCount);
            }

            const url = `${process.env.NEXT_PUBLIC_WORDPRESS_SITE_URL}/wp-json/wp/v2/search`;
            axios.post(url, formData, { headers: { 'Content-Type': 'multipart/form-data', }, })
                .then(response => {
                    const result = response.data.result;
                    if (searchType == 'search') {
                        setSearchResults(result);
                        setTotalPostsCount(result.posts_total_count + result.pages_total_count + result.product_total_count)
                        setCurrentPageForPage(0); // for pagination 
                        setCurrentPageForPost(0); // for pagination 
                        setCurrentPageForProduct(0); // for pagination 
                    } else if (searchType == 'pagination') {
                        setSearchResults(result);
                        setTotalPostsCount(result.posts_total_count + result.pages_total_count + result.product_total_count)
                    }
                })
                .catch(error => {
                    console.error('Error:', error);
                });
        }

        const delayedFetch = () => {
            timeoutId = setTimeout(() => {
                fetchData();
            }, 500); // Adjust the delay time (e.g., 500ms) as needed
        };

        // Clear previous timeout on dependency change
        clearTimeout(timeoutId);

        if (search && search.trim() !== '' && searchType == 'search') {
            delayedFetch();
        } else {
            fetchData();
        }

        return () => {
            clearTimeout(timeoutId); // Clean up timeout on unmount or dependency change
        };
        // }
    }, [postPagedCount, pagePagedCount, productPagedCount, search])

    useEffect(() => {
        setSearch(router.query.s)
    },[router.query.s]);

    const searchChangeHandler = (event) => {
        setSearch(event.target.value.trim());
        setSearchType('search');
    }

    const removeSearch = () => {
        setSearch("");
    }

    return (
        <>
            <SeoData pageTitle={'Search'} seodata=""/>
            <div className="searchwrap">
                <div className="container">
                    <div className="searchsec">
                        <form action="" onSubmit={e => { e.preventDefault(); }}>
                            <div className="searchbox">
                                <input type="text" value={search} onChange={searchChangeHandler} placeholder={searchInputPlaceholderText} />
                                <button>
                                    <Search />
                                </button>
                                {search &&
                                    <div className='pmgroup'>
                                        <div className='plusminus' onClick={() => removeSearch()}>
                                            <input type="checkbox" />
                                            <label htmlFor="a">
                                                <span></span>
                                                <span></span>
                                            </label>
                                        </div>
                                    </div>
                                }
                            </div>
                        </form>
                        <div className='querymess'>
                            {search && search.trim() != '' &&
                                <span className='firstmess'>Showing <strong>{totalPostsCount}</strong> results for <strong>{`"${search}"`}</strong></span>
                            }
                        </div>
                    </div>
                </div>
                {(searchResults?.product?.length > 0) &&
                    <div className='serchProduct'>
                        <div className='container'>
                            <div className='searchProdetail'>
                                <div className='row'>
                                    <div className='col-lg-6'>
                                        <div className='searchproTitle'>
                                            <h3>{searchResults.product_total_count == 0 ? 'Recommended' : ''} Products</h3>
                                        </div>
                                    </div>
                                    {searchProductLink &&
                                        <div className='col-lg-6'>
                                            <div className='btnbox'>
                                                <Link href={searchProductLink.url} target={searchProductLink.target} className='elcom-btn primary-black-btn'>{searchProductLink.title}</Link>
                                            </div>
                                        </div>
                                    }
                                </div>
                            </div>

                            <div className='proinner'>
                                <ul>
                                    {searchResults.product.map((product, index) => {
                                        return <li key={index}>
                                            <Link href={product.url}>
                                                <h6>{decodeHTMLString(product.title)}</h6>
                                                {product.categories && <span className='label-text'>{decodeHTMLString(product.categories)}</span>}
                                            </Link>
                                        </li>
                                    })}
                                </ul>
                            </div>
                            {searchResults.product_total_count != 0 &&
                                <Pagination pageClickHandler={handlePageClick} postCount={searchResults.product_total_count} perPage={searchResults.result_per_page} postType="product" currentPage={currentPageForProduct} />
                            }
                        </div>
                    </div>
                }
                {(searchResults?.pages?.length > 0) &&
                    <div className='serchPages'>
                        <div className='container'>
                            <div className='searchProdetail'>
                                <div className='row'>
                                    <div className='col-lg-6'>
                                        <div className='searchproTitle'>
                                            <h3>{searchResults.pages_total_count == 0 ? 'Recommended' : ''} Pages </h3>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='proinner'>
                                <ul>
                                    {searchResults.pages.map((page, index) => {
                                        return <li key={index}>
                                            <Link href={page.url}>
                                                <h6>{decodeHTMLString(page.title)}</h6>
                                                {page.categories && <span className='label-text'>{decodeHTMLString(page.categories)}</span>}
                                            </Link>
                                        </li>
                                    })}
                                </ul>
                            </div>
                            {searchResults.pages_total_count != 0 &&
                                <Pagination pageClickHandler={handlePageClick} postCount={searchResults.pages_total_count} perPage={searchResults.result_per_page} postType="page" currentPage={currentPageForPage} />
                            }
                        </div>
                    </div>
                }
                {(searchResults?.posts?.length > 0) &&
                    <div className='serchPost'>
                        <div className='container'>
                            <div className='searchProdetail'>
                                <div className='row'>
                                    <div className='col-lg-6'>
                                        <div className='searchproTitle'>
                                            <h3>{searchResults.posts_total_count == 0 ? 'Recommended' : ''} Posts </h3>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='proinner'>
                                <ul>
                                    {searchResults.posts.map((post, index) => {
                                        return <li key={index}>
                                            <Link href={post.url}>
                                                <h6>{decodeHTMLString(post.title)}</h6>
                                                {post.categories && <span className='label-text'>{decodeHTMLString(post.categories)}</span>}
                                            </Link>
                                        </li>
                                    })}
                                </ul>
                            </div>
                            {searchResults.posts_total_count != 0 &&
                                <div className='pagination'>
                                    <Pagination pageClickHandler={handlePageClick} postCount={searchResults.posts_total_count} perPage={searchResults.result_per_page} postType="post" currentPage={currentPageForPost} />
                                </div>
                            }
                        </div>
                    </div>
                }
                {(searchResults?.product?.length == 0 && searchResults?.pages?.length == 0 && searchResults?.posts?.length == 0) && 
                    <div className='noresultfound'>
                        <h2>No Results Found</h2>
                    </div>
                }
            </div>

        </>
    )
}

const Pagination = ({ pageClickHandler, postCount, perPage, postType, currentPage }) => {
    let page = Math.ceil(postCount / perPage)
    if(postCount > perPage){
        return (
            <div className='pagination'>
                <ReactPaginate
                    breakLabel="..."
                    nextLabel=">"
                    onPageChange={(e) => pageClickHandler(e, postType)}
                    pageRangeDisplayed={1}
                    marginPagesDisplayed={2}
                    pageCount={page}
                    previousLabel="<"
                    renderOnZeroPageCount={null}
                    forcePage={currentPage}
                />
            </div>
        )
    }
    return ''
}

export default SearchPage;

export async function getServerSideProps(context) {
    const { query } = context;
    const searchText = query.s || ''; // Default value if 'search' is not present

    const url = `${process.env.NEXT_PUBLIC_WORDPRESS_SITE_URL}/wp-json/wp/v2/search`;
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ "search": searchText, "postPagedCount": 1, "pagePagedCount": 1, "productPagedCount": 1 })
    });
    const searchData = await response.json();
    let result = '';
    let totalCount = 0;
    if (searchData) {
        result = searchData.result;
        totalCount = (searchData.result.posts_total_count + searchData.result.pages_total_count + searchData.result.product_total_count)
    }
    return {
        props: {
            searchText: searchText,
            searchResult: result,
            searchTotalCount: totalCount,
            headerClass: 'header-v2',
        }
    }
}


