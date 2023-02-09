import axios from 'axios'
import { createContext, useEffect, useState } from 'react'

export const store = createContext()

const URL = `https://tribu-ti-staffing-desarrollo-afangwbmcrhucqfh.z01.azurefd.net/pkm-msa-evaluation/pokemon/`

export const ContextProvider = ({ children }) => {
  const [pokemonList, setPokemonList] = useState([])
  const [loading, setLoading] = useState(false)
  const [isFound, setIsFound] = useState(false)
  const [pokemonData, setPokemonData] = useState({
    name: "",
    image: "",
    attack: 0,
    defense: 0
  })

  const getPokemons = async () => {
    try {
      setLoading(true)
      const rawData = await axios.get(`${URL}?idAuthor=1`)
      setPokemonList(rawData?.data)
      setLoading(false)
    } catch(error) {
      console.log("Error on getPokemons: ", error)
    }
  }

  const addPokemon = async (e) => {
    try {
      e.preventDefault()
      await axios.post(`${URL}?idAuthor=1`, {...pokemonData, idAuthor: 1})
      await getPokemons()
    } catch(error) {
      console.log("Error on addPokemon: ", error)
    }
  }

  const filterById = async (id) => {
    try {
      const { data } = await axios.get(`${URL}${id}`)
      setPokemonList([data])
      setIsFound(false)
      return data
    } catch (error) {
      console.log("Error on filterById :", error),
      setIsFound(true)
    }
  }

  useEffect(() => {
    getPokemons()
  }, [])

	const inputs = [
    {
      label: "Name",
      type: "text",
      name: "name"
    },
    {
      label: "Attack",
      type: "range",
      name: "attack",
      step: 5
    },
    {
      label: "Image url",
      type: "text",
      name: "image"
    },
    {
      label: "Defense",
      type: "range",
      name: "defense",
      step: 5
    },
  ]

	const initialState = {
		pokemonList,
    pokemonData,
		inputs,
    URL,
    loading,
    isFound
	}

	const setStates = () => {
		return {
			setPokemonList,
      setPokemonData,
			addPokemon,
      getPokemons,
      setLoading,
      filterById,
      setIsFound
		}
	}

	const state = {
		...initialState,
		effects: {
			...setStates()
		}
	}

	return <store.Provider value={state}>{children}</store.Provider>
}