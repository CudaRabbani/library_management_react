import React from 'react';

/*
options should be formatted as:
sex=[
        {_id: 0, name: 'Male'},
        {_id: 1, name: 'Female'}
    ];
//inside the array each object should carry _id and name property

 */

const CustomSelect = (props) => {
    const {fieldLabel, fieldId, options, fieldValue, onChange, sendBack} = props;
    return (
        <div className="form-group">
            <label>{fieldLabel}</label>
            <div className="input-group mb-3">
                <select className="custom-select" id={fieldId} name={fieldId} onChange={(e)=>onChange(e)}>
                    <option value="">Select One</option>
                    {options.map(a =>{
                        if (fieldValue) {
                            if (sendBack === 'name') {
                                if (a.name === fieldValue.name) {
                                    return <option selected key={a._id} value={a.name}>{a.name}</option>
                                }
                                else {
                                    return <option key={a._id} value={a.name}>{a.name}</option>
                                }
                            }
                            else {
                                if (a._id === fieldValue._id) {
                                    return <option selected key={a._id} value={a._id}>{a.name}</option>
                                }
                                else {
                                    return <option key={a._id} value={a._id}>{a.name}</option>
                                }
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

