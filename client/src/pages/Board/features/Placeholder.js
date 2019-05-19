import React from 'react';
import TreePlaceholder from '../../../SVG/tree-placeholder.svg';

export default function Placeholder({title}) {
  return (
    <div className='map-placeholder'>
      <TreePlaceholder />
      <h5>{title}</h5>
    </div>
  )
}
