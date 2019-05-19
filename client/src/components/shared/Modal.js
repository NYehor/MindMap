import React from 'react';
import ReactDOM from 'react-dom';

const Modal = ({ onClose, content: Component, title}) => {
  return (
      ReactDOM.createPortal(
        <div className='modal-overlay'>
          <div className='modal'>
            <div className='modal__title'>
              {title}
              <div className='modal__close' onClick={onClose}>&times;</div>
            </div>
            <div className='modal__content'>
                <Component onCloseModal={onClose} />
            </div>
          </div>
        </div>,
        document.body
      ) 
  )
}

export default Modal;
