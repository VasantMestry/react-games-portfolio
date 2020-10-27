import React, { userState } from 'react'
import ModuleCSS from './Modal.module.css'

function Modal({
  closeModal,
  show,
  children,
}) {

  const classNames = show ? 'displayBlock' : 'displayNone';


  return (
    <div
      className={`${ModuleCSS.modal} ${classNames} `}
    >
      <section
        className={ModuleCSS.main}
      >
        {children}
        <button
        className={ModuleCSS.closeBtn}
        onClick={closeModal}
        >
          Close
        </button>
        <button
          className={ModuleCSS.restartBtn}
          onClick={closeModal}
        >
          Restart
        </button>
      </section>
    </div>
  )
}

export default Modal
