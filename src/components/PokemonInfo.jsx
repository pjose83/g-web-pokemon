
const info = ["Name", "Image", "Attack", "Defense", "Actions"]

export const PokemonInfo = () => {
  return (
    info.map(item => <p key={item}>{item}</p>)
  )
}
