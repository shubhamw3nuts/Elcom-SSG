import React, { useState } from "react";
import Image from 'next/image';
import Link from 'next/link';
import minusicon from "@/asset/images/minusicon.svg";
import plus from '@/asset/images/plus.svg';
import Closepopup from '@/asset/images/Closepopup.svg';
import { decodeHTMLString } from "@/utils/utils";

const CheckBox = ({ id, categoryChangeHandler, category, selectedCategories, parentIDs, mainCategory, leval }) => {
    let isChecked = false;
    if (selectedCategories.includes(category.id)) {
        isChecked = true;
    }
    return (
        <input type="checkbox" className='checkinput' id={`cb-${id}`} checked={isChecked} onChange={() => categoryChangeHandler(category, isChecked, parentIDs, mainCategory, leval)} />
    )
}
const FiltermodalSec = ({ change, productCategories, displayCategoryLevels, selectedCategories, categoryChangeHandler, attributes, handleAttributeChange,currentElement,setCurrentElement,loader }) => {
    // const [currentElement, setCurrentElement] = useState([]);
    const handleCountryClick = (number, active) => {
        if (active) {
            setCurrentElement("");
        } else {
            setCurrentElement(number);
        }
    };

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
    return (
        <>
            <div className='filterlist filtermodalsec'>
                <div className='filterlistsec' >
                    <div className="mobilehead">
                        <div className="filterheading">
                            <h6>Filter</h6>
                        </div>
                        <div className="closebtn">
                            <Link href="#" onClick={(e) => change(e)}><Image src={Closepopup} alt="closepopup" /></Link>
                        </div>
                    </div>
                    
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
                                    {productCategories.map((category, index) => {
                                        const { name, count, id, children, parent_id, found_posts } = category;
                                        if (found_posts > 0) {
                                            return (
                                                <div className={`categoryWrap ${selectedCategories.includes(id) ? 'active' : ''}`} key={index}>
                                                    <div className='filtersublist'>
                                                        <CheckBox id={id} categoryChangeHandler={categoryChangeHandler} category={category} selectedCategories={selectedCategories} parentIDs={[]} leval={0} mainCategory={category} />
                                                        <label htmlFor={`cb-${id}`} >{decodeHTMLString(name)} ({found_posts && found_posts})</label>
                                                    </div>
                                                    {displayCategoryLevels(category)}
                                                </div>
                                            )
                                        }
                                    })}
                                </div>
                            </div>
                        </div>
                    }
                    {attributes &&
                        attributes.map((attribute, index) => {
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
                                                                        id={`cb-${index}-${att.term_id}`}
                                                                        onChange={(e) => handleAttributeChange(att.taxonomy, att.term_id, e.target.checked)}
                                                                    />
                                                                    <label htmlFor={`cb-${index}-${att.term_id}`}>{decodeHTMLString(att.name)} <span>({att.newTotal})</span></label>
                                                                </div>
                                                            )
                                                        }
                                                    })}
                                                </div>
                                            </div>
                                        }
                                    </div>
                                )
                            }
                        })
                    }
                </div>
                {<div class="mobileFilterBtn"><div class="filterbtnbox"><Link onClick={(e) => change(e)} class="elcom-btn primary-btn" href="#">See Products</Link></div></div>}
            </div>
        </>
    )
}
export default FiltermodalSec;