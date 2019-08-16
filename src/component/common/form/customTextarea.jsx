import React from 'react';

const CustomTextarea = (props) => {
    const {fieldLabel, fieldId, placeHolder, fieldValue, onInputChange} = props;
    return (
        <div className="form-group">
            <label htmlFor="exampleFormControlTextarea1">{fieldLabel}</label>
            <textarea className="form-control"
                      id={fieldId}
                      name={fieldId}
                      value={fieldValue}
                      placeholder= {placeHolder ? placeHolder : ''}
                      onChange={(e)=>onInputChange(e)}
                      rows="3"></textarea>
        </div>
    );
};

export default CustomTextarea;