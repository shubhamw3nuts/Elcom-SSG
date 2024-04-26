import Image from 'next/image';
import Link from 'next/link';
import minusicon from "@/asset/images/minusicon.svg";
import Search from '@/component/Svgs/Search';
import proimg from '@/asset/images/proimg.png';
import React, { useEffect, useRef, useState } from 'react';
import plus from '@/asset/images/plus.svg';
import ReactPaginate from 'react-paginate';
// import listimg from '@/asset/images/listimg.png';
import productplaceholder from '@/asset/images/productplaceholder.png';
import filter from '@/asset/images/filter.svg';
import Modal from 'react-bootstrap/Modal';
import FiltermodalSec from '@/component/FiltermodalSec';
import { decodeHTMLString } from '@/utils/utils';
import axios from 'axios';
import Addsqusre from '@/component/Svgs/Addsqusre';
import Imageview from '@/component/Svgs/Imageview';
import Select from "react-select";
import LoaderSec from '@/component/LoaderSec';
import { from } from '@apollo/client';

const CheckBox = ({ id, categoryChangeHandler, category, selectedCategories, parentIDs, mainCategory, leval }) => {
    let isChecked = false;
    if (selectedCategories.includes(category.id)) {
        isChecked = true;
    }
    return (
        <input type="checkbox" className='checkinput' id={`cb-${id}`} checked={isChecked} onChange={() => categoryChangeHandler(category, isChecked, parentIDs, mainCategory, leval)} />
    )
}

const ProductFilters = ({ pageData, fromPDUPage, slug }) => {
    // if (pageData) {
    // let selectedProductIdFromLocalStorage = localStorage.getItem("selected_prodducts");
    // selectedProductIdFromLocalStorage = selectedProductIdFromLocalStorage ? JSON.parse(selectedProductIdFromLocalStorage) : "";
    const [productCategories, setProductCategories] = useState(pageData?.category_array); // for products categories from api
    const [attributes, setAttributes] = useState(pageData?.attributes); // for product attributes from api
    const [products, setProducts] = useState(pageData?.products); // for products from api
    const [totalProducts, setTotalProducts] = useState(pageData?.total_products); // for total products count
    const [totalPages, setTotalPages] = useState(pageData?.total_pages); // for total pages count for pagination

    // const [active, setActive] = useState("")
    const [currentView, setCurrentView] = useState(fromPDUPage ? "list" : "image"); // for products view image or list
    const [currentElement, setCurrentElement] = useState([]); // for 
    // const [activeProductsIds, setActiveProductIds] = useState(selectedProductIdFromLocalStorage ? selectedProductIdFromLocalStorage : []); // for selected products by user using + icon on each product box
    const [activeProductsIds, setActiveProductIds] = useState([]); // for selected products by user using + icon on each product box
    const [show, setShow] = useState(false);  // for filter popup on mobile screen
    const handleClose = (e) => {
        e.preventDefault();
        setShow(false)
    }; // for filter popup on mobile screen
    const handleShow = (e) => {
        e.preventDefault();
        setShow(true)
    }; // for filter popup on mobile screen

    const [selectedCategories, setSelectedCategories] = useState([]); //for store selected categories by user
    const [selectedCategoriesForAPI, setSelectedCategoriesForAPI] = useState([]); //for store selected categories by user to send in api
    const [selectedAttributes, setSelectedAttributes] = useState({}); //for store selected attributes
    const [parentCategoryIds, setParentCategoryIds] = useState([]); // to get parent category ids of each category

    const [searchValue, setSearchValue] = useState("");
    const [paginationPage, setPaginationPage] = useState(1);
    const [loader, setLoader] = useState(false);

    const options = [
        { value: 'date', label: 'New Releases' },
        { value: 'a-z', label: 'Alphabetical (A-Z)' },
    ];
    const [selectedSortingOption, setSelectedSortingOption] = useState(options[0]);

    // console.log("activeProductsIds :  ", activeProductsIds)
    // const handleButtonClick = (iscls) => {
    //     setActive(iscls != '' ? '' : 'active')
    // };

    const changeViewHandler = (e, val) => {
        e.preventDefault();
        setCurrentView(val)
    };

    const activeProduct = (e, productId, productName) => {
        e.preventDefault();
        let selectedProducts = [...activeProductsIds];
        // if (arr.includes(value)) {
        //     const index = arr.indexOf(value);
        //     arr.splice(index, 1);
        //     localStorage.setItem("selected_prodducts", JSON.stringify(arr))
        //     setActiveProductIds(arr);
        // } else {
        //     localStorage.setItem("selected_prodducts", JSON.stringify([...activeProductsIds, value]))
        //     setActiveProductIds([...activeProductsIds, value]);
        // }
        // console.log("selectedProducts : ",selectedProducts)
        const isSelected = selectedProducts.some(product => product.productId === productId);
        if (isSelected) {
            const updatedProducts = selectedProducts.filter(product => product.productId !== productId);
            localStorage.setItem(fromPDUPage ? "pdu_selected_prodducts" : "selected_prodducts", JSON.stringify(updatedProducts))
            setActiveProductIds(updatedProducts);
        } else {
            localStorage.setItem(fromPDUPage ? "pdu_selected_prodducts" : "selected_prodducts", JSON.stringify([...selectedProducts, { productId, productName }]))
            setActiveProductIds([...selectedProducts, { productId, productName }]);
        }
    }

    const filterClickHandler = (e, number, active) => {
        e.preventDefault();
        let currentElementArr = [...currentElement];
        if (currentElementArr.includes(number)) {
            currentElementArr = currentElementArr.filter(ele => ele != number)
        } else {
            currentElementArr.push(number)
        }
        setCurrentElement(currentElementArr)
    };

    // To Display Category Parent To Child
    const displayCategoryLevels = (category) => {
        {/* NOTE :  IF YOU CHANGE ANYTHING HERE PLEASE ALSO CHANGE IN FiltermodalSec.jsx file */}
        const { name, count, id: category_id, slug, children } = category;
        let parentIDs = [];
        const renderCategoryLevels = (categories, id, leval = 1) => {
            {/* NOTE :  IF YOU CHANGE ANYTHING HERE PLEASE ALSO CHANGE IN FiltermodalSec.jsx file */}
            if (categories.children.length > 0) {
                return (
                    <>
                        {categories.children.map((cat, index) => {
                            if (leval == 1) {
                                parentIDs = [];
                            }
                            if (!parentIDs.includes(id)) {
                                parentIDs.push(id);
                            }
                            if (cat.found_posts > 0) {
                                return (
                                    <React.Fragment key={index}>
                                        <div className={`innersubsec leval-${leval} ${selectedCategories.includes(cat.id) ? 'active' : ''}`}>
                                            <div className='innerlist' >
                                                <CheckBox id={cat.id} categoryChangeHandler={categoryChangeHandler} category={cat} selectedCategories={selectedCategories} parentIDs={JSON.stringify(parentIDs)} mainCategory={categories} leval={leval} />
                                                <label htmlFor={`cb-${cat.id}`}>{cat.name} <span>({cat.found_posts && cat.found_posts})</span></label>
                                            </div>
                                            {/* NOTE :  IF YOU CHANGE ANYTHING HERE PLEASE ALSO CHANGE IN FiltermodalSec.jsx file */}
                                            {renderCategoryLevels(cat, cat.id, leval + 1)}
                                        </div>
                                    </React.Fragment>
                                )
                            }
                            return ''
                        })}
                    </>
                );
            }
            return null;
        };

        return (
            <>
                {/* NOTE :  IF YOU CHANGE ANYTHING HERE PLEASE ALSO CHANGE IN FiltermodalSec.jsx file */}
                {renderCategoryLevels(category, category_id)}
            </>
        );
    }

    /* when user click on any category then get that 
    category id and all sub categories id 
    of that category for select that sub categories automatically */
    const getAllCategoriesIds = (cat, getAllCat) => {
        getAllCat.push(cat.id); // this is for add catetory it self to arr

        // if category has children mease if category has child categories
        if (cat?.children) {
            cat.children.map((data, index) => {
                getAllCat.push(data.id);
                getAllCategoriesIds(data, getAllCat); // for infinite level to get child categories id
            });
        }
        return getAllCat;
    };

    /* When User Check or Uncheck Category Checkbox */
    const categoryChangeHandler = (cat, isChecked, parentIDs, mainCategory, leval) => {
        let parentIDsUpdate = parentIDs.length > 0 ? JSON.parse(parentIDs) : []; // convert to array 
        let removeThisParentCategoryID = [];
        let isAnySiblingCategoryExist = false;
        let getAllCat = [...selectedCategories];
        if (isChecked) {
            getAllCat = getAllCat.filter(rm => rm != cat.id)
            // console.log("leval", leval)
            // if(cat.parent_id != 0){
            if (leval == 1 || leval == 0) {
                let removeThisCategories = [...new Set(getAllCategoriesIds(cat, []))];
                getAllCat = getAllCat.filter(
                    (el) => !removeThisCategories.includes(el)
                );
                // console.log("mainCategory ", mainCategory)
                mainCategory.children.map(maincat => {
                    if (getAllCat.includes(maincat.id)) {
                        isAnySiblingCategoryExist = true;
                    }
                })

                if (!isAnySiblingCategoryExist) {
                    removeThisParentCategoryID.push(cat.parent_id);
                    removeThisParentCategoryID.push(cat.id);
                } else {
                    removeThisParentCategoryID.push(cat.id);
                }
            } else {
                mainCategory.children.map(maincat => {
                    if (getAllCat.includes(maincat.id)) {
                        isAnySiblingCategoryExist = true;
                    }
                })
                // leval 0 =  category is main/parent
                // leval 1 =  category is sub category
                // leval 2 =  category is sub sub category
                if (!isAnySiblingCategoryExist && leval != 1) {
                    removeThisParentCategoryID.push(cat.parent_id);
                }
            }
            // }else{
            //     removeThisParentCategoryID.push(cat.id);
            // }
        } else {
            getAllCat.push(cat.id)
        }
        let parentCategoriesIds = [...parentCategoryIds, parentIDsUpdate]; // merge both array  
        parentCategoriesIds = [...new Set(parentCategoriesIds.flat(1))]; // remove sub array using flat and remove duplicate items using Set
        setSelectedCategories(getAllCat);
        setParentCategoryIds(parentCategoriesIds.filter(rm => !removeThisParentCategoryID.includes(rm)));
        setPaginationPage(1)
        // setSelectedCategoriesForAPI(getAllCat.filter(rm => !parentIDs.includes(rm)))
        // if (isChecked) {
        //     let removeThisCategories = [...new Set(getAllCategoriesIds(cat, []))];
        //     removeThisCategories = getAllCat.filter(
        //         (el) => !removeThisCategories.includes(el)
        //     );
        //     setSelectedCategories(removeThisCategories);
        // } else {
        //     let uniqueArray = [...new Set(getAllCategoriesIds(cat, getAllCat))];
        //     setSelectedCategories(uniqueArray);
        // }
    }

    const handleAttributeChange = (category, attributeName, isChecked) => {
        setSelectedAttributes((prevAttributes) => {
            const updatedAttributes = { ...prevAttributes };
            if (isChecked) {
                updatedAttributes[category] = [
                    ...(updatedAttributes[category] || []),
                    attributeName,
                ];
            } else {
                updatedAttributes[category] = (updatedAttributes[category] || []).filter(
                    (attr) => attr !== attributeName
                );

                // If all checkboxes for a category are unchecked, remove the category key from state
                if (updatedAttributes[category]?.length === 0) {
                    delete updatedAttributes[category];
                }
            }
            return updatedAttributes;
        });
        setPaginationPage(1)
    };

    const pageClickHandler = (page) => {
        let selectedPage = page.selected + 1;
        setPaginationPage(selectedPage);
    }

    // Search Code Start
    const searchHandler = (e) => {
        let searchVal = e.target.value;
        setSearchValue(searchVal.trim())
    }

    const clearSearchHandler = () => {
        setSearchValue("")
    }

    // For Sort Dropdown
    const handleSelectChange = (selectedOption) => {
        setSelectedSortingOption(selectedOption)
    }

    useEffect(() => {
        let selectedProductIdFromLocalStorage = localStorage.getItem(fromPDUPage ? "pdu_selected_prodducts" : "selected_prodducts");
        selectedProductIdFromLocalStorage = selectedProductIdFromLocalStorage ? JSON.parse(selectedProductIdFromLocalStorage) : "";
        setActiveProductIds(selectedProductIdFromLocalStorage ? selectedProductIdFromLocalStorage : [])
    }, []);

    // Use a ref to track if it's the first render
    const firstRenderRef = useRef(true);
    useEffect(() => {
        // Check if it's not the first render
        // Create an AbortController instance
        const abortController = new AbortController();
        if (!firstRenderRef.current) {
            setLoader(true)
            const signal = abortController.signal;
            // if (selectedCategories.length > 0) {
            let categoriesData = selectedCategories.filter(ctid => !parentCategoryIds.includes(ctid));
            const url = `${process.env.NEXT_PUBLIC_WORDPRESS_SITE_URL}/wp-json/wp/v2/productFinder`;
            axios({
                method: 'post',
                url: url,
                data: JSON.stringify({ "selectedCategories": categoriesData, "selectedAttributes": selectedAttributes, "search": searchValue, "selectedPage": paginationPage, "sorting": selectedSortingOption.value, "fromPDUPage": fromPDUPage, "slug": slug }),
                headers: {
                    'Content-Type': 'application/json'
                },
                signal,
            }).then(response => {
                const result = response.data;
                if (result.products) {
                    setProducts(result.products);
                    setTotalPages(result.total_pages);
                    setTotalProducts(result.total_products);
                    setLoader(false)
                }
                // console.log("RESPONSEs", result)
            }).catch(error => { console.error('Error:', error); });

            const url_filter = `${process.env.NEXT_PUBLIC_WORDPRESS_SITE_URL}/wp-json/wp/v2/productFinderFilterData`;
            axios({
                method: 'post',
                url: url_filter,
                data: JSON.stringify({ "selectedCategories": categoriesData, "selectedAttributes": selectedAttributes, "fromPDUPage": fromPDUPage, "slug": slug ? slug : "" }),
                headers: {
                    'Content-Type': 'application/json'
                },
                signal,
            }).then(response => {
                const result = response.data;
                console.log("RESULT : ", result)
                setAttributes(result.attributes);
                setProductCategories(result.category_array);
                setCurrentElement(currentElement.filter(ele => selectedAttributes.hasOwnProperty(ele) || ele == 1 && (selectedCategories.length > 0 ? true :false) ))
                // if (result.products) {
                //     setProducts(result.products);
                //     setTotalPages(result.total_pages);
                //     setTotalProducts(result.total_products);
                //     setLoader(false)
                // }
                // console.log("RESPONSEs", result)
            }).catch(error => { console.error('Error:', error); });
            // }
        } else {
            // On the first render, set the ref to false
            firstRenderRef.current = false;
        }
        return () => {
            abortController.abort();
        };

    }, [selectedCategories, selectedAttributes, searchValue, paginationPage, selectedSortingOption]);

    useEffect(() => {
        // Your JavaScript code here
        if (loader) {
            document.body.classList.add('product_loader');
        } else {
            document.body.classList.remove('product_loader');
        }
    }, [loader]);

    // if(loader){
    //     document.body.classList.add('product_loader');
    // }else{
    //     document.body.classList.remove('product_loader');
    // }
    // console.log("SET SELECTED ATTRIBUTES",selectedAttributes);
    // console.log("pa_current",selectedAttributes?.pa_current);
    // let val = "pa_current";
    // console.log("pa_current has ",selectedAttributes.hasOwnProperty(val));
    return (
        <>
            <div className='productfinder'>
                {loader && <LoaderSec />}
                <div className="commonselector">
                    <div className="container">
                        <div className="commonselect">
                            <div className="titleheader">
                                <div className="row">
                                    <div className="col-lg-3">
                                        <div className="filterheading">
                                            <h6>Filter</h6>
                                        </div>
                                    </div>
                                    <div className="col-lg-4">
                                        <div className="shortsec">
                                            <div className="recentsec">
                                                {/* <Link href={"#"}>
                                                        <span>Sort by: Most recent</span>
                                                        <i><Image src={downerrow} alt="downerrow" /></i>
                                                    </Link> */}
                                                {/* <DropdownSec/> */}
                                                <div className='filterttl'>
                                                    <span>Sort by:</span>
                                                </div>
                                                <div className='filtersel'>
                                                    <Select
                                                        value={selectedSortingOption}
                                                        onChange={handleSelectChange}
                                                        options={options}
                                                        isSearchable={false}
                                                    />
                                                </div>
                                            </div>
                                            <div className="filterimg">
                                                <Link href={"#"} onClick={(e) => changeViewHandler(e, "list")} className={`${currentView == 'list' ? 'active' : ''}`}><Addsqusre /></Link>
                                                <Link href={"#"} onClick={(e) => changeViewHandler(e, "image")} className={`${currentView == 'image' ? 'active' : ''}`}><Imageview /></Link>
                                            </div>
                                            <div className='mobilefilter'>
                                                <Modal show={show} onHide={handleClose} className={"filtermodel"}>
                                                    <FiltermodalSec change={handleClose} productCategories={productCategories} displayCategoryLevels={displayCategoryLevels} filterClickHandler={filterClickHandler} selectedCategories={selectedCategories} categoryChangeHandler={categoryChangeHandler} attributes={attributes} handleAttributeChange={handleAttributeChange} currentElement={currentElement} setCurrentElement={setCurrentElement} loader={loader}/>
                                                </Modal>
                                                <div className='imgfilter'>
                                                    <Link href="#" onClick={(e) => handleShow(e)}><Image src={filter} alt='filter' /></Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='col-lg-5'>
                                        <div className='btnbox'>
                                            {/* <Link className='elcom-btn primary-black-btn' href={"#"}>request a sample</Link> */}
                                            <Link className='elcom-btn primary-black-btn' href={`/request-quote?category=${fromPDUPage ? 'pdu' : 'simple'}`}>request a quote</Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* {loader && <LoaderSec />} */}
                <div className='productfilter'>
                    <div className='container'>
                        <div className='filterwrap'>
                            <div className='row'>
                                {totalProducts > 0 &&
                                    <div className='col-lg-3'>
                                        <div className='filterlist'>
                                            <div className='filterlistsec'  >
                                                {productCategories.length > 0 &&
                                                    <div className={`filtermain ${currentElement.includes(1) ? 'active' : ''}`} >
                                                        <div className='mainttllist' >
                                                            <Link href={"#"} onClick={(e) => filterClickHandler(e, 1)}>
                                                                <span>Product Categories</span>
                                                                <div className='plusminus'>
                                                                    <div className='minusicon'>
                                                                        <Image src={minusicon} alt='minusicon' />
                                                                    </div>
                                                                    <div className='plusicon'>
                                                                        <Image src={plus} alt='plus' />
                                                                    </div>
                                                                </div>
                                                            </Link>
                                                        </div>
                                                        <div className={`filtercat`}>
                                                            <div className='filtercatlist'>
                                                                {/* NOTE :  IF YOU CHANGE ANYTHING HERE PLEASE ALSO CHANGE IN FiltermodalSec.jsx file */}
                                                                {productCategories.map((category, index) => {
                                                                    const { name, count, id, children, parent_id, found_posts } = category;
                                                                    if (found_posts > 0) {
                                                                        return (
                                                                            <div className={`categoryWrap ${selectedCategories.includes(id) ? 'active' : ''}`} key={index}>
                                                                                <div className='filtersublist'>
                                                                                    <CheckBox id={id} categoryChangeHandler={categoryChangeHandler} category={category} selectedCategories={selectedCategories} parentIDs={[]} leval={0} mainCategory={category} />
                                                                                    <label htmlFor={`cb-${id}`} >{decodeHTMLString(name)} <span>({found_posts && found_posts})</span></label>
                                                                                </div>
                                                                                {/* NOTE :  IF YOU CHANGE ANYTHING HERE PLEASE ALSO CHANGE IN FiltermodalSec.jsx file */}
                                                                                {displayCategoryLevels(category)}
                                                                            </div>
                                                                        )
                                                                    }
                                                                    return ''
                                                                })}
                                                                {/* NOTE :  IF YOU CHANGE ANYTHING HERE PLEASE ALSO CHANGE IN FiltermodalSec.jsx file */}
                                                            </div>
                                                        </div>
                                                    </div>
                                                }
                                                {/* NOTE :  IF YOU CHANGE ANYTHING HERE PLEASE ALSO CHANGE IN FiltermodalSec.jsx file */}
                                                {attributes &&
                                                    attributes.map((attribute, index) => {
                                                        // console.log("attribute : ",attribute)
                                                        {/* NOTE :  IF YOU CHANGE ANYTHING HERE PLEASE ALSO CHANGE IN FiltermodalSec.jsx file */}
                                                        let indexForActive = index + 2;
                                                        if (attribute["attributesCount"] > 0) {
                                                            return (
                                                                <div className={`filtermain ${currentElement.includes(attribute["attributeType"]) ? 'active' : ''}`} key={index}>
                                                                    <div className='mainttllist'>
                                                                        <Link href={"#"} onClick={(e) => filterClickHandler(e, attribute["attributeType"])}>
                                                                            <span>{attribute["attribute_name"]}</span>
                                                                            <div className='plusminus'>
                                                                                <div className='minusicon'>
                                                                                    <Image src={minusicon} alt='minusicon' />
                                                                                </div>
                                                                                <div className='plusicon'>
                                                                                    <Image src={plus} alt='plus' />
                                                                                </div>
                                                                            </div>
                                                                        </Link>
                                                                    </div>
                                                                    {/* NOTE :  IF YOU CHANGE ANYTHING HERE PLEASE ALSO CHANGE IN FiltermodalSec.jsx file */}
                                                                    {attribute["attributeInfo"].length > 0 &&
                                                                        <div className='filtercat'>
                                                                            <div className='filtercatlist'>
                                                                                {attribute["attributeInfo"].map((att, index) => {
                                                                                    if (att.newTotal > 0) {
                                                                                        return (
                                                                                            <div className='filtersublist' key={index}>
                                                                                                <input
                                                                                                    type="checkbox"
                                                                                                    className='checkinput'
                                                                                                    id={`cb_${index}_${att.term_id}`}
                                                                                                    onChange={(e) => handleAttributeChange(att.taxonomy, att.term_id, e.target.checked)}
                                                                                                />
                                                                                                <label htmlFor={`cb_${index}_${att.term_id}`}>{decodeHTMLString(att.name)} <span>({att.newTotal})</span></label>
                                                                                            </div>
                                                                                        )
                                                                                    }
                                                                                    return ''
                                                                                })}
                                                                            </div>
                                                                        </div>
                                                                    }
                                                                    {/* NOTE :  IF YOU CHANGE ANYTHING HERE PLEASE ALSO CHANGE IN FiltermodalSec.jsx file */}
                                                                </div>
                                                            )
                                                        }
                                                    })
                                                }
                                            </div>
                                        </div>
                                    </div>
                                }
                                {/* NOTE :  IF YOU CHANGE ANYTHING HERE PLEASE ALSO CHANGE IN FiltermodalSec.jsx file */}
                                <div className={`col-lg-${totalProducts > 0 ? '9' : '12'} ${totalProducts == 0 && 'noproducts'}`}>
                                    <div className='imageviewsec'>
                                        <div className='row'>
                                            <div className='col-lg-6'>
                                                <div className='proquantity'>
                                                    <h6><span>{totalProducts} </span>products</h6>
                                                </div>
                                            </div>
                                            <div className='col-lg-6'>
                                                <div className='serchsec'>
                                                    <div className='productserchbox'>
                                                        <input type="text" placeholder='Search any product here...' onChange={searchHandler} value={searchValue} />
                                                        <button>
                                                            <Search />
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                            {(activeProductsIds.length > 0) &&
                                                <div className="col-lg-12">
                                                    <ul className='productSelected'>
                                                        {activeProductsIds.map((p) => {
                                                            return <li key={p.productId}>{decodeHTMLString(p.productName)} <Link href="#" onClick={(e) => activeProduct(e, p.productId, p.productName)}><svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <path d="M24 8L8 24" stroke="#101010" strokeLinecap="round" strokeLinejoin="round" />
                                                                <path d="M8 8L24 24" stroke="#101010" strokeLinecap="round" strokeLinejoin="round" />
                                                            </svg>
                                                            </Link></li>
                                                        })}
                                                    </ul>
                                                </div>
                                            }
                                        </div>
                                        <div className={`imagesec ${currentView == 'image' ? 'active' : ''}`}>
                                            <div className='row'>
                                                {products.map((product, index) => {
                                                    return (
                                                        <div className='col-lg-4 col-xl-4 col-6 col-xxl-3' key={product.id}>
                                                            <div className={`proimgdtl ${activeProductsIds.some(p => p.productId === product.id) ? 'active' : ''}`}>

                                                                <Link href={product.product_url}>
                                                                    <div className='fullimgview'>
                                                                        <Image src={product.image || proimg} width={218} height={225} alt='proimg' />

                                                                        <div className='pmgroup' onClick={(e) => activeProduct(e, product.id, product.title)}>
                                                                            <div className='plusminus'>
                                                                                <input type="checkbox" />
                                                                                <label htmlFor="a">
                                                                                    <span></span>
                                                                                    <span></span>
                                                                                </label>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </Link>

                                                                <Link href={product.product_url} >
                                                                    <div className='imgdtl'>
                                                                        <span>{decodeHTMLString(product.title)}</span>
                                                                    </div>
                                                                </Link>
                                                            </div>
                                                        </div>
                                                    )
                                                })}
                                                {products.length == 0 &&
                                                    <div style={{ textAlign: 'center' }}>
                                                        <h4>No Products Found</h4>
                                                    </div>
                                                }
                                            </div>
                                        </div>
                                        <div className={`listviewsec ${currentView == 'list' ? 'active' : ''}`}>
                                            {products.length > 0 &&
                                                <div className='row'>
                                                    <div className='col-lg-1 col-md-1'>
                                                        <div className='imgsec'>
                                                            <span>Image</span>
                                                        </div>
                                                    </div>
                                                    <div className='col-lg-4 col-md-3'>
                                                        <div className='modelcodesec'>
                                                            <span>Model code</span>
                                                        </div>
                                                    </div>
                                                    <div className='col-lg-3 col-md-2'>
                                                        <div className='typesec'>
                                                            <span>Current (A)</span>
                                                        </div>
                                                    </div>
                                                    {/* <div className='col-lg-3 col-md-3'>
                                                        <div className='outletsec'>
                                                            <span>Total Outlets</span>
                                                        </div>
                                                    </div> */}
                                                    <div className='col-lg-4 col-md-2'>
                                                        <div className='voltagesec'>
                                                            <span>Voltage (V)</span>
                                                        </div>
                                                    </div>

                                                </div>
                                            }
                                            {products.map((product, index) => {
                                                return (
                                                    <div key={index} className={`listviewsubcat ${activeProductsIds.some(p => p.productId === product.id) ? 'active' : ''}`}>
                                                        <div className='row'>
                                                            <div className='col-lg-1 col-md-1'>
                                                                <div className='listimgsec'>
                                                                    <Link href={product.product_url}>
                                                                        <Image src={product?.image ? product?.image : productplaceholder} width={64} height={64} alt='listimg' />
                                                                    </Link>
                                                                </div>
                                                            </div>
                                                            <div className='col-lg-4 col-md-3'>
                                                                <div className='modellist'>
                                                                    <Link href={product.product_url}>
                                                                        <span>{decodeHTMLString(product.title)}</span>
                                                                    </Link>
                                                                </div>
                                                            </div>
                                                            <div className='col-lg-3 col-md-2'>
                                                                <div className='typelist'>
                                                                    <span>{product?.pa_current?.length > 0 ? product?.pa_current.join(",") : "-"}</span>
                                                                </div>
                                                            </div>
                                                            <div className='col-lg-4 col-md-2'>
                                                                <div className='voltagelist'>
                                                                    <span>{product?.pa_input_voltage?.length > 0 ? product?.pa_input_voltage.join(",") : "-"}</span>
                                                                    <Link href={"#"} onClick={(e) => activeProduct(e, product.id, product.title)} >
                                                                        <div className='plusminus'>
                                                                            <input type="checkbox" />
                                                                            <label htmlFor="a">
                                                                                <span></span>
                                                                                <span></span>
                                                                            </label>
                                                                        </div>
                                                                    </Link>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )
                                            })}
                                            {products.length == 0 &&
                                                <div style={{ textAlign: 'center' }}>
                                                    <h4>No Products Found</h4>
                                                </div>
                                            }
                                        </div>
                                        <div className={`mobileList ${currentView == 'list' ? 'active' : ''}`}>
                                            {products.map((product, index) => {
                                                return (
                                                    <div key={index} className={`listviewMobile ${activeProductsIds.some(p => p.productId === product.id) ? 'active' : ''}`}>
                                                        <div className='listimgsec'>
                                                            <div className='imgsec'>
                                                                <div className='voltagelist'>
                                                                    <Link href={"#"} onClick={(e) => activeProduct(e, product.id, product.title)}>
                                                                        <div className='plusminus'>
                                                                            <input type="checkbox" />
                                                                            <label htmlFor="a">
                                                                                <span></span>
                                                                                <span></span>
                                                                            </label>
                                                                        </div>
                                                                    </Link>
                                                                </div>
                                                                <div className='imgpro'>
                                                                    <Link href={product.product_url}>
                                                                        <Image src={product?.image ? product?.image : productplaceholder} width={161} height={161} alt='listimg'></Image>
                                                                    </Link>
                                                                </div>
                                                            </div>
                                                            <div className='listdetail'>
                                                                <Link href={product.product_url}>
                                                                    <div className='listhead'>
                                                                        <h6>{decodeHTMLString(product.title)}</h6>
                                                                    </div>
                                                                    <div className='listprodet'>
                                                                        <ul>
                                                                            <li><span>Current (A):</span>{product?.pa_current?.length > 0 ? product?.pa_current.join(",") : "-"}</li>
                                                                            {/* <li><span>Total Outlets:</span>{product?.pa_total_outlets?.length > 0 ? product?.pa_total_outlets.join(",") : "-"}</li> */}
                                                                            <li><span>Voltage (V):</span>{product?.pa_input_voltage?.length > 0 ? product?.pa_input_voltage.join(",") : "-"}</li>
                                                                        </ul>
                                                                    </div>
                                                                </Link>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )
                                            })}
                                        </div>
                                    </div>
                                    {products.length != 0 &&
                                        <div className='pagination'>
                                            <ReactPaginate
                                                breakLabel="..."
                                                nextLabel=">"
                                                onPageChange={(e) => pageClickHandler(e)}
                                                pageRangeDisplayed={1}
                                                marginPagesDisplayed={2}
                                                pageCount={totalPages}
                                                previousLabel="<"
                                                renderOnZeroPageCount={null}
                                                forcePage={paginationPage - 1}
                                            />
                                        </div>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div >
            </div >

        </>
    )
    // }
}

export default ProductFilters