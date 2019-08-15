import React from 'react';

const SubmitButton = (props) => {
    const {buttonClass, buttonLabel, onSubmit} = props;
    return (
        <button type="submit"
                className={buttonClass}
                onClick={(e)=>onSubmit(e)}>
            {buttonLabel}
        </button>
    );
};

export default SubmitButton;
