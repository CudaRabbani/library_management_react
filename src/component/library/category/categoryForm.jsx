import React, {Component} from 'react';
import {Link} from 'react-router-dom';

class CategoryForm extends Component {

    formElements= [
        {id: '1', name: 'name', label: 'Category Name', type: 'text'},
        {id: '2', name: 'isActive', label: 'Active', type: 'text'}
    ];


    render() {
        const {name, isActive} = this.props.existingValue;
        const action = this.props.action;
        let buttonLabel='';
        let buttonClass='';

        if (action === 'create') {
            buttonLabel = 'Save';
            buttonClass = "btn btn-primary";
        }
        else {
            buttonLabel = 'Update';
            buttonClass = "btn btn-warning";
        }

        const {onInputChange, onCheck, onSubmit} = this.props;
        return (
            <form>
                <div className="form-group">
                    <label>Category Name</label>
                    <input type="text" className="form-control" id="name" name="name"
                           placeholder={name ? name : 'Enter Category Name'}
                           value={name}
                           onChange={(e)=>onInputChange(e)}
                    />
                </div>
                <div className="form-group">
                    <div className="col-sm-10">
                        <div className="form-check">
                            <input className="form-check-input" type="checkbox" id="isActive" name="isActive"
                                   onChange={(e)=>onCheck(e)}
                                   checked={isActive ? 'checked':''} />
                            <label className="form-check-label" htmlFor="isActive">
                                Active
                            </label>
                        </div>
                    </div>
                </div>

                <button type="submit" className={buttonClass} onClick={(e)=>onSubmit(e)}>{buttonLabel}</button>

                <Link to="/category" className="btn btn-secondary m-5">Cancel</Link>
            </form>
        );
    }
}


export default CategoryForm;
