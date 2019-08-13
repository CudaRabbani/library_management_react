import React from 'react';

const MyButton = (props) => {
    const {label, type, size} = props;
    let buttonClass = 'btn';

    switch (type) {
        case  'add':
            buttonClass += ' btn-primary';
            break;
        case 'edit':
            buttonClass += ' btn-warning';
            break;
        case 'delete':
            buttonClass += ' btn-danger';
            break;
        default:
            buttonClass += ' btn-secondary';
            break;
    }

    switch (size) {
        case 1:
            buttonClass += ' btn-sm';
            break;
        case 2:
            buttonClass += ' btn-md';
            break;
        case 3:
            buttonClass += ' btn-lg';
            break;
        default:
            buttonClass += ' btn-md';
            break;
    }

    return (
        <button
            className={buttonClass}>{label}
        </button>
    );
};

export default MyButton;
