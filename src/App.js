
import api from './api'
import { useState } from 'react'
import { FiSearch } from 'react-icons/fi'
import "./styles.css"

function App() {

  // Processador
  const [input, setInput] = useState('')
  const [cep, setCep] = useState({});

  async function handleSearch()
  {
    if (input === ''){ alert("Digite algum CEP..."); return; }
    try
    {
      const response = await api.get(`${input}/json`)
      setCep(response.data)
      setInput('')
    }
    catch
    {
      alert("Ops, não conseguimos buscar este numero de CEP!")
      setInput('')
    }
  }
  return (

    // Interface grafica

    <div className="container">

      <h1 className="title">Busca CEP</h1>

      <div className="containerInput">

        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          type="text"
          placeholder="Digite seu CEP aqui..."
        />

        <button className="buttonSearch" onClick={handleSearch} >
          <FiSearch size={25} color="#fff" />
        </button>
      </div>

      {
        Object.keys(cep).length > 0 &&
        (
          <main className='main'>

            <h2>CEP: {cep.cep}</h2>

            <span>Logradouro: {cep.logradouro}</span>
            <span>Complemento: {cep.complemento}</span>
            <span>Bairro: {cep.bairro}</span>
            <span>Cidade: {cep.localidade} - {cep.uf}</span>
            <span>DDD: {cep.ddd}</span>

          </main>
        )
      }

    </div>
  );
}

export default App;