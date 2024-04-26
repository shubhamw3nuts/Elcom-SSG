import CareerpathSec from "@/component/CareerpathSec";
import NiceselectorSection from "./layouts/NiceselectorSection";
import JobdetailSec from "@/component/JobdetailSec";
import Link from 'next/link';
import { useEffect, useState } from "react";
import { GET_ALL_CAREER_POSTS } from "@/queries/graphql_queries";
import { useQuery } from "@apollo/client";


const useBlogPosts = (endCursor, clicked, whereQuery) => {
    return useQuery(GET_ALL_CAREER_POSTS, {
        variables: { "after": endCursor, "taxQuery": whereQuery },
        skip: !clicked
    });
};

const JoblistSec = ({ careerPosts, departmentCategories, locationCategories, applicationFormOptions }) => {
    const [allPosts, setAllPosts] = useState(careerPosts.nodes);
    const [showLoadMoreButton, setShowLoadMoreButton] = useState(careerPosts.pageInfo.hasNextPage);
    const [endCursor, setEndCursor] = useState(careerPosts.pageInfo.endCursor);
    const [showMoreBtnText, setShowMoreBtnText] = useState("View More");
    const [clicked, setClicked] = useState(false);
    const [whereQuery, setWhereQuery] = useState({});
    const [isLoadMore, setIsLoadMore] = useState(false);
    const [selectedDepartment, setSelectedDepartment] = useState('');
    const [selectedLocation, setSelectedLocation] = useState('');

    const loadMoreHandler = (e) => {
        e.preventDefault();
        setClicked(true);
        setIsLoadMore(true);
        setShowMoreBtnText("Loading...")
    }

    const { loading, error, data, refetch } = useBlogPosts(endCursor, clicked, whereQuery);

    useEffect(() => {
        if (!loading && data) {
            if ((selectedDepartment || selectedLocation) && !isLoadMore) {
                setAllPosts(data.allCareers.nodes);
            } else if (selectedDepartment == '' && selectedLocation == '' && !isLoadMore) {
                setAllPosts(data.allCareers.nodes);
            } else {
                setAllPosts(prevPosts => [...prevPosts, ...data.allCareers.nodes]);
            }
            setShowLoadMoreButton(data.allCareers.pageInfo.hasNextPage);
            setEndCursor(data.allCareers.pageInfo.endCursor);
            setClicked(false);
            setIsLoadMore(false);
            setShowMoreBtnText("View More")
        }
    }, [loading, data]);

    let departmentOptions = '';
    if (departmentCategories.length > 0) {
        departmentOptions = departmentCategories.map((category, index) => {
            return { value: category.databaseId, label: category.name }
        })
    }
    let locationOptions = '';
    if (locationCategories.length > 0) {
        locationOptions = locationCategories.map((category, index) => {
            return { value: category.databaseId, label: category.name }
        })
    }

    const selectedDepartmentHandler = (department) => {
        if (department.value != '') {
            setWhereQuery({
                "relation": "AND", "taxArray":
                    selectedLocation ?
                        [
                            { "field": "ID", "operator": "IN", "taxonomy": "CAREERDEPARTMENTCATEGORY", "terms": [`${department.value}`] },
                            { "field": "ID", "operator": "IN", "taxonomy": "CAREERLOCATIONCATEGORY", "terms": [`${selectedLocation}`] }
                        ]
                        :
                        [
                            { "field": "ID", "operator": "IN", "taxonomy": "CAREERDEPARTMENTCATEGORY", "terms": [`${department.value}`] }
                        ]
            })
        } else if (department.value == '' && selectedLocation != '') {
            setWhereQuery({
                "relation": "AND", "taxArray": [{ "field": "ID", "operator": "IN", "taxonomy": "CAREERLOCATIONCATEGORY", "terms": [`${selectedLocation}`] }]
            })
        } else {
            setWhereQuery({})
        }
        setEndCursor("");
        setClicked(true);
        setIsLoadMore(false);
        setSelectedDepartment(department.value);
        setSelectedLocation(selectedLocation)
    }

    const selectedLocationHandler = (location) => {

        if (location.value != '') {
            setWhereQuery({
                "relation": "AND", "taxArray":
                    selectedDepartment ?
                        [
                            { "field": "ID", "operator": "IN", "taxonomy": "CAREERLOCATIONCATEGORY", "terms": [`${location.value}`] },
                            { "field": "ID", "operator": "IN", "taxonomy": "CAREERDEPARTMENTCATEGORY", "terms": [`${selectedDepartment}`] },
                        ]
                        :
                        [
                            { "field": "ID", "operator": "IN", "taxonomy": "CAREERLOCATIONCATEGORY", "terms": [`${location.value}`] }
                        ]
            })
        } else if (location.value == '' && selectedDepartment != '') {
            setWhereQuery({
                "relation": "AND", "taxArray": [{ "field": "ID", "operator": "IN", "taxonomy": "CAREERDEPARTMENTCATEGORY", "terms": [`${selectedDepartment}`] }]
            })
        } else {
            setWhereQuery({});
        }
        setEndCursor("");
        setClicked(true);
        setIsLoadMore(false);
        setSelectedLocation(location.value);
    }

    return (
        <>
            <div className="jobProfile" id="jobProfile">
                <CareerpathSec sectionHeading={'Open positions'} />
                {(departmentCategories.length > 0 || locationCategories.length > 0) &&
                    <div className="jobSelect">
                        <div className="container">
                            <div className="jobWrap">
                                <div className="row">
                                    {departmentCategories.length > 0 && <NiceselectorSection dropdownHeading={""} categories={departmentOptions} selectedCategory={selectedDepartmentHandler} defaultLable="DEPARTMENT" />}
                                    {locationCategories.length > 0 && <NiceselectorSection dropdownHeading={""} categories={locationOptions} selectedCategory={selectedLocationHandler} defaultLable="LOCATION" />}
                                </div>
                            </div>
                        </div>
                    </div>
                }

                <div className="jobhead">
                    <div className="container">
                    <div className="row">
                        <div className="col-lg-1 col-md-1">
                            <div className="jobjeading">
                                <span>Sr.no</span>
                            </div>
                        </div>
                        <div className="col-lg-2 col-md-2">
                            <div className="jobjeading">
                                <span>Position</span>
                            </div>
                        </div>
                        <div className="col-lg-2 col-md-2">
                            <div className="jobjeading">
                                <span>Experience</span>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-3">
                            <div className="jobjeading">
                                <span>Key Skills</span>
                            </div>
                        </div>
                        <div className="col-lg-2 col-md-2">
                            <div className="jobjeading">
                                <span>Location</span>
                            </div>
                        </div>
                        <div className="col-lg-2 col-md-2">
                            <div className="jobjeading">
                                <span>Apply Now</span>
                            </div>
                        </div>
                    </div>
                    </div>
                </div>
                {allPosts.length > 0 ? allPosts.map((career, index) => {
                    return (
                        <JobdetailSec key={index} serialData={index} careerData={career} applicationFormOptions={applicationFormOptions} />
                    )
                }) : <div className="no_position_found">
                    <div className="container">
                        <h5>NO Positions Found</h5>
                    </div>
                </div>}
                {showLoadMoreButton &&
                    <div className="btnbox">
                        <Link className="elcom-btn" href="#" onClick={(e) => loadMoreHandler(e, endCursor)}>{showMoreBtnText}</Link>
                    </div>
                }
            </div>
        </>
    )
}

export default JoblistSec;