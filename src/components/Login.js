import {React,useState} from 'react'
import { signInWithEmailAndPassword, getAuth } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
  
function Login() {
  const navigate = useNavigate();
     const [email, setEmail] = useState("");
     const [password, setPassword] = useState("");
     const [error, setError] = useState(false);
     const [errorMessage, setErrorMessage] = useState("");
     const[userId,setUserId]=useState("");
     // Instantiate the auth service SDK
     const auth = getAuth();

     const handleChange = (e) => {
       const { name, value } = e.target;

       if (name === "email") setEmail(value);
       if (name === "password") setPassword(value);
     };

     const handleSubmit = async (e) => {
       e.preventDefault();

       try {
         // Sign in with email and password in firebase auth service
         const userCredential = await signInWithEmailAndPassword(
           auth,
           email,
           password
         ).then(async (value) => {
           await alert("success");
           navigate("/")
          //  const user = userCredential.user;
          //  setUserId(user.uid);
          //  console.log(userId);
         });;

         // The signed-in user info
         const user = userCredential.user;
       } catch (err) {
         // Handle Errors here.
         const errorMessage = err.message;
         const errorCode = err.code;

         setError(true);
         console.log(errorCode);

         switch (errorCode) {
           case "auth/invalid-email":
             setErrorMessage("This email address is invalid.");
             break;
           case "auth/user-disabled":
             setErrorMessage(
               "This email address is disabled by the administrator."
             );
             break;
           case "auth/user-not-found":
             setErrorMessage("This email address is not registered.");
             break;
           case "auth/wrong-password":
             setErrorMessage(
               "The password is invalid or the user does not have a password."
             );
             break;
           default:
             setErrorMessage(errorMessage);
             break;
         }
         alert(errorMessage);
       }
     };

  return (
    <div>
      <section class="vh-100  ">
        <div class="container py-5 h-50">
          <div class="row d-flex justify-content-center align-items-center h-100">
            <div class="col-12 col-md-8 col-lg-6 col-xl-5">
              <div class="card bg-dark text-white">
                <div class="card-body p-5 text-center">
                  <div class="mb-md-5 mt-md-4 pb-5">
                    <h2 class="fw-bold mb-2 text-uppercase">login</h2>
                    <p class="text-white-50 mb-5">
                      Please enter your login and password!
                    </p>

                    <div
                      data-mdb-input-init
                      class="form-outline form-white mb-4"
                    >
                      <input
                        type="mail"
                        id="typemailX"
                        class="form-control form-control-lg"
                        onChange={(e) => {
                          setEmail(e.target.value);
                        }}
                        value={email}
                      />
                      <label class="form-label" for="typemailX">
                        mail
                      </label>
                    </div>

                    <div
                      data-mdb-input-init
                      class="form-outline form-white mb-4"
                    >
                      <input
                        type="password"
                        id="typePasswordX"
                        class="form-control form-control-lg"
                        onChange={(e) => {
                          setPassword(e.target.value);
                        }}
                        value={password}
                      />
                      <label class="form-label" for="typePasswordX">
                        Password
                      </label>
                    </div>

                    {/* <p class="small mb-5 pb-lg-2">
                      <a class="text-white-50" href="#!">
                        Forgot password?
                      </a>
                    </p> */}

                    <button
                      data-mdb-button-init
                      data-mdb-ripple-init
                      class="btn btn-outline-light btn-lg px-5"
                      type="submit"
                      onClick={handleSubmit}
                    >
                      login
                    </button>
                    {/* {error && <p>{errorMessage}</p>} */}

                    <div class="d-flex justify-content-center text-center mt-4 pt-1">
                      <a href="#!" class="text-white">
                        <i class="fab fa-facebook-f fa-lg"></i>
                      </a>
                      <a href="#!" class="text-white">
                        <i class="fab fa-twitter fa-lg mx-4 px-2"></i>
                      </a>
                      <a href="#!" class="text-white">
                        <i class="fab fa-google fa-lg"></i>
                      </a>
                    </div>
                  </div>

                  <div></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Login