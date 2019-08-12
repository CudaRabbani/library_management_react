import React, {Component} from 'react';

import BookCover from './bookCover';

class Book extends Component {
    book = {id: 1, title: 'Programming with C', author: 'Reza Rabbani', pages:450, rental_rate: 9.99};
    render() {
        console.log(this.book.title);
        return (
            <div className="container">
                <BookCover
                    title={this.book.title}
                    author={this.book.author}
                    pages={this.book.pages}
                    rentalRate={this.book.rental_rate}
                />
            </div>
        );
    }
}


export default Book;
