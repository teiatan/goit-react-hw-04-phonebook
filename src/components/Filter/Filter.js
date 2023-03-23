import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { Label, Input } from "./Filter.styled";

export function Filter ({getFilterRequest}) {

    const [value, setValue] = useState("");

    useEffect(()=>{
        getFilterRequest(value);
    }, [value, getFilterRequest]);

    const onChange = e => {
        setValue(e.currentTarget.value);
    };

    return (
        <Label>
            Find contacts by name
            <Input
                type="text"
                name="filter"
                value={value}
                onChange={onChange}
            />
        </Label>
    );
};

Filter.propTypes = { 
    getFilterRequest: PropTypes.func,
};
