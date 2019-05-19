import PerfectScrollbar from 'perfect-scrollbar';

let scrollbar;
const modalRoot = document.querySelector('#modal-root');

const modal = document.createElement('div');
modal.setAttribute('class', 'snippet-modal');

const modalBody = document.createElement('div');
modalBody.setAttribute('class', 'snippet-modal__body');

const modalHeader = document.createElement('div');
modalHeader.setAttribute('class', 'snippet-modal__header');
modalHeader.innerHTML = `<svg class="close-icon" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" 
                              x="0px" y="0px" viewBox="0 0 50 50" xml:space="preserve">
                                    <circle style="fill:#D4D4D4;" cx="25" cy="25" r="25"/>
                                    <polyline style="fill:none;stroke:#FFFFFF;stroke-width:4;stroke-linecap:round;stroke-miterlimit:10;" points="16,34 25,25 34,16"/>
                                    <polyline style="fill:none;stroke:#FFFFFF;stroke-width:4;stroke-linecap:round;stroke-miterlimit:10;" points="16,16 25,25 34,34"/>
                        </svg>`;
modal.appendChild(modalHeader);


modalHeader.querySelector('.close-icon').addEventListener('click', (e) => {
    modalRoot.classList.remove('snippet-modal--open');
    modalRoot.removeChild(modal);
    modal.removeChild(modalBody);
    scrollbar = null;
    modalBody.innerHTML = '';
    modal.style = null;
    modalRoot.style = null;
});

const SnippetModal = {
    init(element) {
        modalRoot.classList.add('snippet-modal--open');
        modalRoot.appendChild(modal);
        modal.appendChild(modalBody);
        modalBody.appendChild(element);    
        scrollbar = new PerfectScrollbar(modalBody);       

        if (modalBody.offsetHeight + 200 < document.documentElement.scrollHeight) {
            modalRoot.style.position = 'fixed';
            modal.style.height = `${modalBody.offsetHeight}px`;
        }
        else {
            modalRoot.style.position = 'absolute';
            modalRoot.style.height = `${modalBody.offsetHeight + 200}px`;
        }
    }
};

export default SnippetModal;