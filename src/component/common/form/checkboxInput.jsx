import React from 'react';

const CheckboxInput = (props) => {
    const {fieldLabel, fieldId, fieldValue, onCheck} = props;
    return (
        <div className="form-group">
            <div className="col-sm-10">
                <div className="form-check">
                    <input className="form-check-input" type="checkbox" id={fieldId} name={fieldId}
                           onChange={(e)=>onCheck(e)}
                           checked={fieldValue ? 'checked':''} />
                    <label className="form-check-label" htmlFor={fieldLabel}>
                        {fieldLabel}
                    </label>
                </div>
            </div>
        </div>
    );
};

export default CheckboxInput;
