import { Icon } from "@iconify/react"
import axios from "axios"
import { useContext, useState } from "react"
import { store } from "../context/store"

const URL = `https://tribu-ti-staffing-desarrollo-afangwbmcrhucqfh.z01.azurefd.net/pkm-msa-evaluation/pokemon/?idAuthor=1`

export const AddPokemonForm = ({ saveInfo, editInfo, cancel }) => {
  const { inputs, pokemonData, effects: { setPokemonData } } = useContext(store)

  const handleChange = ({ target }) => {
    setPokemonData({
      ...pokemonData,
      [target.name]: target.value
    })
  }

  return (
    <form onSubmit={saveInfo || editInfo} className='form'>
      <h3>New Pokemon</h3>
      {/* <div> */}
        {inputs.map(({ label, type, step, name }) => (
            <label key={label} className="input">
              {label}
              {type === "range" ? ` ${pokemonData[name]}` : ""}
              <input
                type={type}
                step={step}
                min={0}
                max={100}
                name={name}
                value={pokemonData[name]}
                onChange={handleChange}
                // required
              />
            </label>
        ))}
      {/* </div> */}
      <div className="modalBtn-wrapper">
        <button className="modalBtn-cancel" onClick={cancel}>
          <Icon icon="fluent-mdl2:cancel" width="20px"/>
          Cancel
        </button>
        <button className="modalBtn-accept" type="submit">
          <Icon icon="ri:save-3-line" width="20px"/>
          Save
        </button>
      </div>
    </form>
  )
}
