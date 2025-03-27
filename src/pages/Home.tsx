import { useEffect, useState } from "react"
import Text from "../components/Text"

const Home = () => {
  const [cep, setCep] = useState("")
  const [address, setAddress] = useState({
    logradouro: "",
    bairro: "",
    localidade: "",
    estado: "",
  })

  function getCep() {
    fetch(`https://viacep.com.br/ws/${cep}/json/`)
      .then((response) => response.json())
      .then((data) => {
        if (!data.erro) {
          setAddress({
            logradouro: data.logradouro || "Não encontrado",
            bairro: data.bairro || "Não encontrado",
            localidade: data.localidade || "Não encontrado",
            estado: data.uf || "Não encontrado",
          })
        } else {
          setAddress({
            logradouro: "CEP inválido",
            bairro: "CEP inválido",
            localidade: "CEP inválido",
            estado: "CEP inválido",
          })
        }
      })
      .catch(() => {
        setAddress({
          logradouro: "Erro ao buscar",
          bairro: "Erro ao buscar",
          localidade: "Erro ao buscar",
          estado: "Erro ao buscar",
        })
      })
  }
  
  useEffect(() => {
    if(cep.length == 8){
      getCep()
    }
  }, [cep])

  return ( 
    <>
      <section className="flex flex-col justify-center items-center h-screen w-screen p-4 md:p-0 bg-preto">
        <h1 className="text-3xl font-bold text-azul mb-8">
          Buscador CEP
        </h1>
        <div className="rounded-xl p-12 bg-cinza">
          <div className="flex flex-col justify-around items-center w-full">
            <div className="rounded-xl bg-cinza">
              <input 
                type="text" 
                id="input" 
                placeholder="Digite o CEP..."
                maxLength={8}
                onChange={(event) => setCep(event.target.value)}
                className="w-full text-md rounded-xl px-4 py-2 border-2 text-azul border-azul focus:border-azul focus:outline-none" 
              />
            </div>
            <span className="w-full border-1 border-azul my-6"></span>
          </div>
          <div className="flex flex-col items-start gap-2">
            <Text 
              title="Rua/Av:"
              data={address.logradouro}
            />
            <Text 
              title="Bairro:"
              data={address.bairro}
            />
            <Text 
              title="Cidade:"
              data={address.localidade}
            />
            <Text 
              title="Estado:"
              data={address.estado}
            />
          </div>
        </div>
      </section>
    </>
   );
}
 
export default Home;