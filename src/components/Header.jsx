import { NewPokemonBtn } from "./NewPokemonBtn"
import { Searcher } from "./Searcher"

export const Header = () => {
  return (
    <header>
      <h1>Pokemon list</h1>
      <div className="search-addBtn-wrapper">
        <Searcher />
        <NewPokemonBtn />
      </div>
    </header>
  )
}
