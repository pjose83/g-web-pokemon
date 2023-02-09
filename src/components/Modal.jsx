export const Modal = ({ children, showModal }) => {
  return (
    showModal && (
      <div className='modal-bg'>
        {children}
      </div>
    )
  )
}