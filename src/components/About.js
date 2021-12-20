import { Link } from "react-router-dom";

const About = () => {
    return (
        <div>
            <h4>Version 1.0.0 | Built by <a target="_blank" href="https://cleibertmora.com">Cleibert Mora</a></h4>
            <Link to="/">Go Back</Link>
        </div>
    )
}

export default About