import React from "react";
import "./Home.css";
import teamImage from "../assets/Toma-Fisica-de-Inventario.png";
import missionImage from "../assets/mision.png";
import quienesSomosImage from "../assets/quienes-somos.jpg";


const Home = () => {
  return (
    <div className="container">
      {/* Sección: ¿Quiénes Somos? */}
      <div className="card">
        <img src={quienesSomosImage} alt="Quienes somos?" className="img-small" />
        <div>
          <h1>¿Quiénes Somos?</h1>
          <p>
            Somos una empresa comprometida con ofrecer{" "}
            <span className="highlight">soluciones de calidad</span> y generar un
            impacto positivo en la comunidad.
          </p>
        </div>
      </div>

      {/* Sección: Nuestra Historia */}
      <div className="card">
        <div>
          <h2>Nuestra Historia</h2>
          <p>
            Desde nuestra fundación, hemos trabajado arduamente para construir
            una organización que no solo se enfoque en resultados, sino que
            también valore a las personas y el impacto que generamos en el
            mundo.
          </p>
        </div>
        <img src={teamImage} alt="Nuestro equipo" className="img-small" />
      </div>

      {/* Sección: Nuestra Misión */}
      <div className="card">
        <img src={missionImage} alt="Nuestra misión" className="img-small" />
        <div>
          <h2>Nuestra Misión</h2>
          <p>
            Ser líderes en nuestro sector, comprometidos con la excelencia y la
            sostenibilidad, ofreciendo productos y servicios que marquen la
            diferencia.
          </p>
        </div>
      </div>

      {/* Sección: Únete a Nosotros */}
      <div className="card">
        <div>
          <h2>Únete a Nosotros</h2>
          <p>
            Estamos buscando personas apasionadas y talentosas para formar parte
            de nuestro equipo y crecer juntos.
          </p>
        <button className="button-primary">Contáctanos</button>
        </div>
      </div>
    </div>
  );
};

export default Home;
