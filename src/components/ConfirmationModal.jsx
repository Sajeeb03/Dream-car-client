import React from 'react';

const ConfirmationModal = ({ title, message, closeModal, operation, modalData }) => {
    return (
        <div>
            < input type="checkbox" id="deleteModal" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">{title}</h3>
                    <p className="py-4">{message}</p>
                    <div className="modal-action">
                        <label onClick={() => operation(modalData)} htmlFor="deleteModal" className="btn btn-primary">Sure</label>
                        <button onClick={closeModal} className='btn btn-info'>Cancel</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ConfirmationModal;