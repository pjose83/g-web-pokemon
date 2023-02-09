import axios from "axios"
import { useContext, useState } from "react"
import { Icon } from "@iconify/react"
import { store } from "../context/store"
import { PokemonInfo } from "./PokemonInfo"
import { Modal } from "./Modal";
import { AddPokemonForm } from "./AddPokemonForm";
import { Spinner } from "./spinner/Spinner"
import { NotFound } from "./NotFound"

export const PokemonList = () => {
  const { isFound, URL, pokemonData, pokemonList, loading ,effects: { getPokemons } } = useContext(store)
  const [openEdit, setOpenEdit] = useState(false)
  const [editItem, setEditItem] = useState(0)

  console.log(isFound)

  if (loading) return <Spinner />
  if(isFound) return <NotFound />

  const openEditModal = (id) => {
    setOpenEdit(true)
    setEditItem(id)
  }

  const handleEdit = async (e) => {
    try {
      e.preventDefault()
      const newPokemonData = { id: editItem, ...pokemonData, idAuthor: 1 }
      await axios.put(`${URL}${editItem}`, newPokemonData )
      await getPokemons()
      setOpenEdit(false)
    } catch (error) {
      console.log("Error on handleEdit :", error)
    }
  }

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${URL}${id}`)
      await getPokemons()
    } catch(error) {
      console.log("Error on handleDelete :", error)
    }
  }

  const cancelEdit = (e) => {
    e.preventDefault()
    setOpenEdit(false)
  }

  return (
    <ul className="pokemon-list">
      {pokemonList?.map(({ id, name, image, attack, defense }) => (
        <li key={id} className="pokemon-item">
          <div className="pokemon-labels">
            <PokemonInfo />
          </div>
          <div className="pokemon-values">
            <p>{name}</p>
            <a href={image || "#"} target="_blank" className="image-link">View image here</a>
            <p>{attack}</p>
            <p>{defense}</p>
            <div className="icons-wrapper">
              <Icon
                icon="ri:edit-line"
                color="#800080"
                width="24px"
                className="icon"
                onClick={() => openEditModal(id)}
              />
              <Icon
                icon="material-symbols:delete-forever-rounded"
                color="#800080"
                width="24px"
                className="icon"
                onClick={() => handleDelete(id)}
              />
            </div>
          </div>
        </li>
      ))}
      <Modal showModal={openEdit}>
        <AddPokemonForm editInfo={handleEdit} cancel={cancelEdit}/>
      </Modal>
    </ul>
  )
}
