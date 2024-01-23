import { Link } from 'react-router-dom';

const Landing = () => {

    return (
        <div>

            <Link to="/home">
                <h1>Landing</h1>
                <button>Home</button>
            </Link>

        </div>
    );
};

export default Landing;