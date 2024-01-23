import { Link } from 'react-router-dom';

const Landing = () => {

    return (
        <>
            <header>
                {/* Barra de navegacion */}
                <nav>
                    <img src="" alt="" />
                    <a href="#">¿Como funciona?</a>
                </nav>
            </header>

            <main>

                {/* Seccion Hero */}
                <section>
                    <h2>Cuidados para adultos mayores</h2>
                    <h1>"Amor en cada cuidado, conexiones que perduran</h1>
                    <p>Nuestra plataforma intuitiva te permite explorar perfiles detallados de cuidadores, leer reseñas auténticas y conectar con aquellos que se adaptan a las necesidades únicas de tu familia.</p>
                    <button>Busco un cuidador</button>
                    <button>Ofrecer mis servicios</button>
                    <blockquote>
                        <p>Officia quaerat itaque, obcaecati ipsam aperiam magni molestiae quisquam ad voluptatem sapiente doloremque id soluta suscipit veniam? Eligendi, esse. Aperiam, doloremque ad!</p>
                        <cite>Fulanita de Tal - Cliente</cite>
                    </blockquote>
                </section>

                {/* ¿Cómo funciona? */}
                <section>
                    <div>
                        <h2>¿Cómo funciona?</h2>
                    </div>
                    <div>
                        <a href="#">Registrate</a>
                        <i>1</i>
                        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Odio at, magnam quae repellat, repudiandae ipsa nam consequuntur.</p>
                    </div>
                    <div>
                        <iframe src="https://giphy.com/embed/QxRc8rXFB7jmHqvcNq" width="200" frameBorder="0" class="giphy-embed" allowFullScreen></iframe>
                    </div>
                </section>

                {/* ¿Cómo te gustaría registrarte? */}
                <section>
                    <h2>¿Cómo te gustaría registrarte?</h2>
                    <button>Cliente</button>
                    <button>Proveedor</button>
                </section>

            </main>

            <footer>

                <div>
                    <ul>
                        <li>
                            <a href="#">Ayuda</a>
                        </li>
                        <li>
                            <a href="#">Frequently Asked Questions</a>
                        </li>
                        <li>
                            <a href="#">Consulta/Reporte</a>
                        </li>
                        <li>
                            <a href="#">Front-End Developer</a>
                        </li>
                        <li>
                            <a href="#">Back-End Developer</a>
                        </li>
                        <li>
                            <a href="#">Linkedin - Role</a>
                        </li>
                    </ul>
                </div>

                <div>
                    <h3>Tecnologías</h3>
                </div>

            </footer>
        </>
    );
};

export default Landing;