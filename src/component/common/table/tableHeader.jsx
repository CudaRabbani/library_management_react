import React from 'react';

const TableHeader = (props) => {
    const {headerText} = props;
    return (
        <thead>
        <tr>
            {headerText.map(header => (
                <th key={header.id} scope="col">{header.label}</th>
            ))}
        </tr>
        </thead>
    );
};

export default TableHeader;
