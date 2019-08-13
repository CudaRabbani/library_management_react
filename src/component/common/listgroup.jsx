import React from 'react';

const ListGroup = (props) => {
    const {listItems, selectedItem, onHandleSideBar} = props;
    return (
        <ul className="list-group">
            {listItems.map((item)=>(
                <li key={item.id}
                    onClick={()=>onHandleSideBar(item)}
                    className={item === selectedItem ? "list-group-item active" : "list-group-item"}
                >{item.name}</li>
            ))}
        </ul>
    );
};

export default ListGroup;
