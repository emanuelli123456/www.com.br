import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios'


function App() {
  const [count, setCount] = useState(0);
  const [perfil, setPerfil] = useState({});
  const [loading, setLoading] = useState(true);
  const [pokemon, setPokemon] = useState({});
  const [dragonBall, setDragaboll] = useState({});
  const [error, setError] = useState(false);
  const [filme, setFilme] = useState({});
  const [nome, setNome] = useState("");

  useEffect(() => {
    const getData = async () => {//oq queremos executar está aqui dentro das{}
      //async faz ser mais rapida a resposta
      try {
        const response = await axios.get("https://6a79e554674f43f4db11ebc8.mockapi.io/api/users/5")
        setPerfil(response.data)
        console.log("perfil: ", perfil)

        const response2 = await axios.get("https://dragonball-api.com/api/characters/4")
        setDragaboll(response2.data)
        console.log("dragonBall", dragonBall)

        const response3 = await axios.get("https://www.omdbapi.com/?i=tt0844993&apikey=8481927e")
        setFilme(response3.data)
        console.log("filme", filme)


        const response4 = await axios.get("https://pokeapi.co/api/v2/pokemon/incineroar")
        setPokemon(response4.data)
        console.log("pokemon", pokemon)
        setLoading(false)


      }
      catch (error) {
        console.error("Erro:", error)
        setError(true)
        setLoading(false)
      }
    }
    getData();
  }, [])

  const manipularNome = (e) => {
    setNome(e.target.value);
  };
  const manipularBotao = async () => {
    setLoading(true)
    try {
      const res = await axios.put("https://6a79e554674f43f4db11ebc8.mockapi.io/api/users/5", {
        "nome": nome
      })
      console.log(res.data)
      setLoading(false)
      wimdow.location.reload();
    } catch (error) {
      setError(true)
    }

    if (loading) return <div>Carregando</div>;
    if (error) return <div>erro</div>;

    return (
      <>
        <section id="center">
          <div className="hero">

            <img src={pokemon.sprites.front_default}  height="100" alt="" />
            <p>{pokemon.name}</p>

            <img src={dragonBall.image}  height="150" alt="" />
            <p>{dragonBall.name}</p>

            <img src={filme.Poster}  height="179" alt="" />
            <p>{filme.Title}</p>

          </div>
          <div>
            <h1>{perfil.nome}</h1>

            <form>
              <label>NOME</label>
              <input  onChange={manipularNome} />
              <button onClick={manipularBotao}>ENVIA AE</button>
            </form>

            <h2> hobbies</h2>
            <ul>
              {perfil.hobbies.map((hobby, index) => (
                <li key={index}>{hobby},</li>

              ))}</ul>
          </div>
        </section>

        <div className="ticks"></div>
        <section id="spacer"></section>
      </>
    )
  }
}

export default App
