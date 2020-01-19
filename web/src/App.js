import React, { useEffect, useState } from 'react';
import api from './services/api'
import DevItem from './components/DevItem/index'
import DevForm from './components/DevForm/index'

import './global.css'
import './app.css'
import './Sidebar.css'
import './Main.css'

//useEffect Estudar isso

//pelo que entendi ele executa uma função sempre que alguma informação for alterada
//essa informção é passado no parametro como variavel
//se não passar nada ele executa uma unica vez

//3 conceitos o react
//Componente: Bloco isolado de HTMl, CSS e JS, o qual não interfere no restante da aplicação
//Propriedade: Informações que um componente PAI passa o componente FILHO
//Estado:Informações mantidas pelo componente (Lembrar: imutabilidade)


//App é um componente
function App() {

  //o useState() possui uma string vazia '' poi inicialmente ele é iniciado de forma vazia
const [devs, setDevs] = useState([]);

  //mas como o use effect está dentro do componente
  //ele executa toda vez que o componente for iniciado

  async function apagarDev(dado){

    await api.delete(`/devs/${dado}`)
   
    loadDevs();

   }
   async function loadDevs(){

    const response = await api.get('/devs');

    setDevs(response.data)
  }

  useEffect(()=>{
  
    loadDevs();
  },[]);

   async function HandleAddDev(data){


    //conexão com a api utilizando o axios
    const response = await api.post('/devs/', data)

 
    //quando vc coloca um dev novo ele n atualliza na lista
    //então é adicionado o dev criado no estado que é mostrado
    setDevs([...devs, response.data]);
    

   }
  return (
    <div id="app">
      <aside>
          <strong>Cadastrar</strong>
          <DevForm onSubmit={HandleAddDev} />
      </aside>

      <main>
          <ul>
          {devs.map(dev => {
            return <DevItem apagarDev={apagarDev} dev={dev} key={dev._id}/>

})}
              

          </ul>
      </main>
    </div>
  );
}



export default App;
