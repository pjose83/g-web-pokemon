import { PokemonList } from "./components/PokemonList"
import { Header } from "./components/Header";
import "./styles.css"

export const App = () => {
  return (
    <div className="container">
      <Header />
      <main>
        <PokemonList />
      </main>
    </div>
  )
}