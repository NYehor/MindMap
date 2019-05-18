import React from 'react';
import ReactDOM from 'react-dom';

const Modal = ({isOpen, onClose, content}) => {
  return (
      isOpen ?
      ReactDOM.createPortal(
        <div className='react-modal'>
            <div className='react-modal__close' onClick={onClose}>&times;</div>
            <div className='react-modal__content'>
                {content}
            </div>
        </div>,
        document.body
      ) 
      : null
  )
}

export default Modal;
