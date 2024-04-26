import Select from "react-select";
import { useState } from "react";

const options = [
    { value: 'India', label: 'India' },
    { value: 'Australia', label: 'Australia' },
    { value: 'Canada', label: 'Canada' },
];

const NiceSelect = () => {
    const [selectedOption, setSelectedOption] = useState(null);
    return (
        <>
        <div className="NiceSelect">
            <div className="container">
                <div className="row">
                    <div className="col-lg-3">
                        <div className="selectWrap">
                        <span>Filter by:</span>
                            <Select
                                defaultValue={selectedOption}
                                onChange={setSelectedOption}
                                options={options}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}

export default NiceSelect;