import React from 'react';

const TextInput = (props) => {
    const {fieldLabel, fieldId, placeHolder, fieldValue, onInputChange} = props;
    return (
        <div className="form-group">
            <label>{fieldLabel}</label>
            <input type="text" className="form-control" id={fieldId} name={fieldId}
                   placeholder={placeHolder ? placeHolder : ''}
                   value={fieldValue ? fieldValue : ''}
                   onChange={(e)=>onInputChange(e)}
            />
        </div>
    );
};

export default TextInput;
