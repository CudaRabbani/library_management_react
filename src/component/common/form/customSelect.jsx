import React from 'react';

const CustomSelect = (props) => {
    const {fieldLabel, fieldId, options, fieldValue, onChange} = props;
    return (
        <div className="form-group">
            <label>{fieldLabel}</label>
            <div className="input-group mb-3">
                <select className="custom-select" id={fieldId} name={fieldId} onClick={(e)=>onChange(e)}>
                    <option value="">Select One</option>
                    {options.map(a =>{
                        if (fieldValue) {
                            if (a._id === fieldValue._id ? 'selected' : '') {
                                return <option selected key={a._id} value={a._id}>{a.name}</option>
                            }
                            else {
                                return <option key={a._id} value={a._id}>{a.name}</option>
                            }
                        }
                        else {
                            return <option key={a._id} value={a._id}>{a.name}</option>
                        }

                    }
                    )}
                </select>
            </div>
        </div>
    );
};

export default CustomSelect;

