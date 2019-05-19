import React, { Component, Fragment } from 'react';
import Select from 'react-select';


const caregoryOptions = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' },
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' },
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' }
];


export default class MapCreation extends Component {

  state = {
    categoryName: null,
    mapName: null
  }

  handleSelect = ({value}) => {
    this.setState({ 
      categoryName: value 
    }); 
  }

  onInputChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  onMapCreation = (e) => {
    e.preventDefault();
  }

  render() {

     return (
      <div className='map-creation'>

        <label>Category name</label>
        
        {
          caregoryOptions.length !== 0 &&
            <Fragment>
              <Select
                className='category-select'
                placeholder='Select category'
                maxMenuHeight={150}
                onChange={this.handleSelect}
                options={caregoryOptions}
              />
              <span className='text'>or</span>
          </Fragment>
        }

        <input 
          placeholder='New category'
          name='categoryName' 
          className='map-creation__category map-creation__input'
          onChange={this.onInputChange} />

        <label>Map name</label>        
        <input 
          placeholder='Name'
          name='mapName'  
          className='map-creation__name map-creation__input' 
          onChange={this.onInputChange} />

          <button onClick={this.onMapCreation}>Create</button>

      </div>
    );
  }
}
