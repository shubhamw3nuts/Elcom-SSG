import Select from "react-select";
import { useEffect, useState } from "react";

const NiceselectorSection = ({ dropdownHeading, categories, selectedCategory, dropdownType, defaultLable }) => {
    let defaultLabelText = 'Select...';
    if (defaultLable) {
        defaultLabelText = defaultLable
    }
    let options = categories.map((category, index) => {
        return { value: category.value, label: category.label }
    })
    options = [{ value: "", label: defaultLabelText }, ...options];
    const [selectedOption, setSelectedOption] = useState(null);
    useEffect(() => {
        if (selectedOption) {
            selectedCategory(selectedOption, dropdownType);
        }
    }, [selectedOption]);
    return (
        <>
            <div className="col-lg-3 col-6">
                <div className="blogselector">
                    <div className="niceselect">
                        {dropdownHeading && <span>{dropdownHeading}</span>}

                        <div className="selector">
                            <Select
                                placeholder={defaultLabelText}
                                defaultValue={selectedOption}
                                onChange={setSelectedOption}
                                options={options}
                                isSearchable={false}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default NiceselectorSection; 