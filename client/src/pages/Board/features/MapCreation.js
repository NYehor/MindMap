import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as treeActions from '../../../store/actions/tree';
import Select from 'react-select';


class MapCreation extends Component {

  state = {
    categoryName: '',
    mapName: ''
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
    const { mapName, categoryName } = this.state;
    this.props.addTree(mapName, categoryName);
    this.props.onCloseModal();
    this.setState({
      categoryName: '',
      mapName: ''  
    });
  }

  render() {

    const { caregoryOptions } = this.props;

     return (
      <div className='map-creation'>

        <label>Collection</label>
        
        {
          caregoryOptions.length !== 0 &&
            <Fragment>
              <Select
                className='category-select'
                maxMenuHeight={150}
                onChange={this.handleSelect}
                options={caregoryOptions}
              />
              <span className='text'>or</span>
          </Fragment>
        }

        <input 
          name='categoryName' 
          value={this.state.categoryName}
          className='map-creation__category map-creation__input'
          onChange={this.onInputChange} 
          placeholder='Type...'
          autoComplete='off' />

        <label>Map</label>        
        <input 
          name='mapName'  
          value={this.state.mapName}
          className='map-creation__name map-creation__input' 
          onChange={this.onInputChange} 
          placeholder='Type...'
          autoComplete='off' />

          <button onClick={this.onMapCreation}>Create</button>

      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators(treeActions, dispatch);
}

function mapStateToProps(state) {
  const categories = state.treeList.length !== 0 ?
                    [...new Set(state.treeList.map(tree => tree.category))]
                    : [];

  const options = [...categories || state.tree.category];

	return { 
      caregoryOptions: options.map(i => ({value: i, label: i}))
  };
}

export default connect(mapStateToProps,	mapDispatchToProps)(MapCreation);

