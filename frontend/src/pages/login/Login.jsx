import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/authContext";
import "./login.scss";

const Login = () => {

    const [inputs, setInputs] = useState({
      username:"",
      password:"",
    }) 
  
    const [err, setErr] = useState(null) 

    const navigate = useNavigate()
  
    const handleChange = (e) =>{
      setInputs(prev =>({...prev, [e.target.name]:e.target.value}))
    }

  const { login } = useContext(AuthContext);

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      await login(inputs);
      navigate("/")
    } catch (err) {
      setErr(err.response.data)
    }
  };

  return (
    <div className="login">
      <div className="card">
        <div className="left">
          <h1>Welcome Back</h1>
          <p>
          the ultimate haven where geeks unite and connect! Dive into a world of knowledge-sharing, 
          collaboration, and geeky camaraderie as we journey together through the realms of technology, 
          science, and all things geek.
          </p>
          <span>Don't you have an account?</span>
          <Link to="/register">
            <button>Register</button>
          </Link>
        </div>
        <div className="right">
          <h1>Login</h1>
          <form>
            <input type="text" placeholder="Username" name = "username" onChange={handleChange} />
            <input type="password" placeholder="Password" name = "password" onChange={handleChange} />
            {err && err}
            <button onClick={handleLogin}>Login</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
