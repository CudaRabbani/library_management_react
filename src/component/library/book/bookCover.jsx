import React from 'react';

const BookCover = (props) => {
    return (
        <div className="card mt-4">
            <img className="card-img-top img-fluid" src="http://placehold.it/900x400" alt=""/>
                <div className="card-body">
                    <div className="row">
                        <div className="col-sm-8">
                            <h3 className="card-title">{props.title}</h3>
                            <h4>{props.author}</h4>
                        </div>
                        <div className="col-sm-3 pull-right">
                            <h5>Daily Rate: ${props.rentalRate}</h5>
                            <button className="btn btn-primary">Add To Cart</button>
                        </div>
                    </div>
                    <p className="card-text">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sapiente dicta
                        fugit fugiat hic aliquam itaque facere, soluta. Totam id dolores, sint aperiam sequi pariatur
                        praesentium animi perspiciatis molestias iure, ducimus!</p>
                </div>
        </div>
    );
};

export default BookCover;
