import PerfectScrollbar from 'perfect-scrollbar';

let scrollbar;
const modalRoot = document.querySelector('#modal-root');

const modal = document.createElement('div');
modal.setAttribute('class', 'modal');

const modalBody = document.createElement('div');
modalBody.setAttribute('class', 'modal__body');

const modalHeader = document.createElement('div');
modalHeader.setAttribute('class', 'modal__header');
modalHeader.innerHTML = `<svg class="close-icon" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" 
                              x="0px" y="0px" viewBox="0 0 50 50" xml:space="preserve">
                                    <circle style="fill:#D4D4D4;" cx="25" cy="25" r="25"/>
                                    <polyline style="fill:none;stroke:#FFFFFF;stroke-width:4;stroke-linecap:round;stroke-miterlimit:10;" points="16,34 25,25 34,16"/>
                                    <polyline style="fill:none;stroke:#FFFFFF;stroke-width:4;stroke-linecap:round;stroke-miterlimit:10;" points="16,16 25,25 34,34"/>
                        </svg>`;
modal.appendChild(modalHeader);


modalHeader.querySelector('.close-icon').addEventListener('click', (e) => {
    modalRoot.classList.remove('modal--open');
    modalRoot.removeChild(modal);
    modal.removeChild(modalBody);
    modalBody.innerHTML = '';
    scrollbar = null;
    modalRoot.style.height = null;
});

const DomModal = {
    init(element) {
        modalRoot.classList.add('modal--open');
        modalRoot.style.height = `${document.documentElement.scrollHeight + 200}px`;
        modalRoot.appendChild(modal);
        modal.appendChild(modalBody);
        modalBody.appendChild(element);
        scrollbar = new PerfectScrollbar(modalBody);   
    }
};

export default DomModal;