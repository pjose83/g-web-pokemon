import { Icon } from "@iconify/react"
import { debounce } from "lodash"
import { useContext, useMemo } from "react"
import { store } from "../context/store"

export const Searcher = () => {
  const { effects: { filterById, getPokemons, setLoading, setIsFound } } = useContext(store)

  const handleChange = async ({ target }) => {
    try {
      setLoading(true)
      if(!target.value.length) return getPokemons(), setIsFound(false)
      await filterById(target.value)
      setLoading(false)
    } catch (error) {
      console.log("Error on handleChange :", error)
    }
  }

  const handleDebounce = useMemo(() => debounce(handleChange, 600), [])

  return (
    <div className="input-wrapper">
      <Icon icon="ic:baseline-search" className="search-icon" color="black" width={"24px"} />
      <input
        type="search"
        className="searcher"
        placeholder="Search by id"
        onChange={handleDebounce}
      />
    </div>
  )
}
