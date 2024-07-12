import { useState } from "react";
import { useNavigate } from 'react-router-dom';

const Login = ({setUserDetails}) => {
  const [user, setUser] = useState("");
  const [pas, setPas] = useState("");
  const [userErr, setUseErr] = useState(false);
  const [pasErr, setPasErr] = useState(false);
  const navigate = useNavigate();

  const submitData= async(e) => {
    e.preventDefault();

    if(user == '' || pas == ''){
        alert('Either username or password seems empty');
        return
    }
    try {
        console.log(JSON.stringify({ user, pas }))
        const response = await fetch('https://dummyjson.com/auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username: user, password:pas,expiresInMins: 30, }),
        });
        if (response.ok) {
          const data = await response.json();
          localStorage.setItem('token', data.token); // Example: Storing token in localStorage
          setUserDetails(data.firstName)
          navigate('/productlist');
        } else {
          alert('Invalid credentials');
        }
      } catch (error) {
        console.error('Error during login:', error);
        alert('Failed to login. Please try again.');
      } finally {
        //setLoading(false); 
      }  
  }

  const userHandler = (user) => {
    let item = user.target.value;
    if (item.length < 3) {
      setUseErr(true);
    } else {
      setUseErr(false);
    }
    if (item.length == 0) {
      setUseErr(false);
    }
    setUser(item);
  };

  function pasHandler(pas) {
    let item = pas.target.value;
    if (item.length < 3) {
      setPasErr(true);
    } else {
      setPasErr(false);
    }
    if (item.length == 0) {
      setPasErr(false);
    }
    setPas(item);
  }

  return (
    <div className="container">
      <h3 style={{textAlign: "center"}}>Login</h3>
      <form onSubmit={submitData}>
        <div className="row">
            <div className="col-25">
                <label for="fname">Username: </label>
            </div>

            {/* with arrow function */}
            <div className="col-75">
                <input
                    type="text"
                    placeholder="Enter username"
                    onChange={(e) => userHandler(e)}
                ></input>{" "}
                {userErr ? <span>Username length should be more than 2 char </span> : ""}
            </div>
            
        </div>
        <div className="row">
            <div className="col-25">
                <label for="fname">Password: </label>
            </div>
            <div className="col-75">
                <input
                type="text"
                placeholder="Enter password"
                onChange={pasHandler}>
                </input>{" "}
                {pasErr ? <span>Password length should be more than 2 char </span> : ""}
            </div>
          
        </div>
        <div className="row">
            <div className="col-25">
                
            </div>
            <div className="col-75">
                <input type="submit" className="btn btn-block" value="Login">
                </input>
            </div>
       
        </div>
        
      </form>
    </div>
  );
};

export default Login;
