import { useContext, useState } from 'react'
import { Icon } from '@iconify/react'
import { AddPokemonForm } from './AddPokemonForm'
import { Modal } from './Modal'
import { store } from '../context/store'

export const NewPokemonBtn = () => {
  const { effects: { addPokemon } } = useContext(store)
  const [showModal, setShowModal] = useState()

  const openModalForm = () => setShowModal(true)

  const handleAddPokemon = async (e) => {
    await addPokemon(e)
    setShowModal(false)
  }

  const cancelNewPokemon = (e) => {
    e.preventDefault()
    setShowModal(false)
  }

  return (
    <>
      <button className="add-btn" onClick={openModalForm}>
        <Icon
          icon="ic:baseline-plus"
          color="white"
          width="22px"
        />
        New
      </button>
      <Modal showModal={showModal}>
        <AddPokemonForm saveInfo={handleAddPokemon} cancel={cancelNewPokemon} />
      </Modal>
    </>
  )
}
