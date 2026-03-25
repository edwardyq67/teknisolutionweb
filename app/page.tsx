import Inicio from "./components/Inicio"
import Nosotros from "./components/Nosotros"
import Carrusel from "./components/Carrusel"
import Productos from "./components/Productos"
import Contacto from "./components/Contacto"

export default function Home() {
  return (
    <div >
      <Inicio />
      <Nosotros/>
      <Carrusel/>
      <Productos/>
      <Contacto/>
    </div>
  );
}
