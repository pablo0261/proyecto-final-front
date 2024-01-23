import { useEffect, useState } from "react";
import axios from 'axios';

const Home = () => {
  const [users, setUsers] = useState([]);


  //* Aqui va a guardar el get en el estado local para renderizar hasta que se vea si estos valores van a ser pasados al global
  // useEffect(async () => {
  //   const url = '/algunaruta';
  //   const res = await axios.get(url);
  //   setUsers(res.data);
  // }, []);


  return (
    <>
      <h1>Nav</h1>
      <div className="flex">
        <div >
          <h2 className="text-3xl font-bold">Buscar en el mapa</h2>
          <div className="w-96 h-96">490*490</div>
        </div>
        <div>
          <div>
            <button>Filtrar</button>
            <button>Ordenar</button>
          </div>
          <div>
            <h3>card</h3>
            <h3>card</h3>
            <h3>card</h3>
          </div>
        </div>
      </div>
      <h1>Footer</h1>
    </>
  );
};

export default Home;