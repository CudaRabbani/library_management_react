import React, {Component} from 'react';
import ListGroup from "../../common/listgroup";
import axios from 'axios';

import CatchError from "../../common/catcherror";

class BookCategory extends Component {
    state={
        categories: [],
        errors:[]
    };
    async componentDidMount() {
        try {
            //const response = await axios.get('http://localhost:4044/api/category');
            const {data: categories} = await axios.get('http://localhost:4044/api/category');
            this.setState({categories});
        }
        catch(err) {
            console.log(err.message);
            const {errors} = this.state;
            const newError = errors.push(err.message);
            this.setState({errors: newError});
        }

    }

    render() {
        const {errors} = this.state;
        return (
            <div>
                <ListGroup listItems={this.state.categories}/>
                {errors.length > 0 ? <CatchError errors={errors}/> : null}
            </div>
        );
    }
}


export default BookCategory;
