import React from 'react';

const ListGroup = (props) => {
    const {listItems, selectedItem, onSelect} = props;
    return (
        <ul className="list-group">
            {listItems.map(item=>(
                <li key={item._id}
                    className={selectedItem === item ? "list-group-item active" : "list-group-item"}
                    onClick={()=>onSelect(item)}
                >{item.name}</li>
            ))}
        </ul>
    );
};

export default ListGroup;
