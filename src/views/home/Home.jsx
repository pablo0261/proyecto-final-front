import Card from "../../components/CardHomeProveedor/CardHomeProveedor";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
import styles from "../home/Home.module.sass"


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
      <h1 className="h-24">Nav</h1>
      <div className={styles.container}>
        <div className={styles.mapContainer}>
          <h2 className>Buscar en el mapa</h2>
          <div className={styles.map}>490*490</div>
        </div>

        <div className={styles.servicesContainer}>
          <div className={styles.filtersContainer}>
          <button class="overflow-hidden relative w-36	 bg-red-400 text-gray-900 py-2 px-4 rounded-xl font-bold uppercase transition-all duration-100 -- hover:shadow-md border border-stone-100 hover:bg-gradient-to-t hover:from-red-500 before:to-stone-50 hover:-translate-y-[3px]">
              <span class="relative">Filtrar</span>
            </button>
            <button class="overflow-hidden relative w-36	 bg-red-400 text-gray-900 py-2 px-4 rounded-xl font-bold uppercase transition-all duration-100 -- hover:shadow-md border border-stone-100 hover:bg-gradient-to-t hover:from-red-500 before:to-stone-50 hover:-translate-y-[3px]">
              <span class="relative">Ordenar</span>
            </button>
          </div>
          <div className={styles.cardContainer}>
            <Card/>
            <Card/>
            <Card/>
          </div>
        </div>
      </div>
      <h1>Footer</h1>
    </>
  );
};

export default Home;