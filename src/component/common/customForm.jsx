import React, {Component} from 'react';

class MyForm extends Component {



    render() {
        const {formElements, existingValue, onChange, onSubmit} = this.props;
        console.log(existingValue);
        return (
            <form>
                {this.props.formElements.map(element=>(
                    <div className="form-group" key={element.id}>
                        <label>{element.label}</label>
                        <input type={element.type}
                               className="form-control"
                               id={element.name}
                               name={element.name}
                               placeholder={existingValue ? existingValue.name : ''}
                               onChange={(e)=>onChange(e)}
                        />
                    </div>
                ))}

                <button type="submit" className="btn btn-primary" onClick={(e)=>onSubmit(e)}>Save</button>
            </form>
        );
    }
}


export default MyForm;