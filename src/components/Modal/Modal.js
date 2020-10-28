import React, { userState } from 'react'
import ModuleCSS from './Modal.module.css'

function Modal({
  closeModal,
  playAgain,
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
          onClick={playAgain}
        >
          Play Again
        </button>
      </section>
    </div>
  )
}

export default Modal
