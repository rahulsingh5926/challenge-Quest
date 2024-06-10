import React, { useState } from 'react'
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
const auth=getAuth();
function Authethication() {
  const navigate = useNavigate();
  const[mail,setMail]=useState("");
  const[password,setPassword]=useState("");
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
      const [userId, setUserId] = useState("");
const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    // create a new user with mail and password
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      mail,
      password
    )

    // Pull out user's data from the userCredential property
    // setMail("");
    // setPassword("");
    // const user = userCredential.user;
    //  setUserId(user.uid);
   alert("success");
   navigate("/");
    
    
  } catch (err) {
    // Handle errors here
    const errorMessage = err.message;
    const errorCode = err.code;

    setError(true);

    switch (errorCode) {
      case "auth/weak-password":
        setErrorMessage("The password is too weak.");
        break;
      case "auth/mail-already-in-use":
        setErrorMessage(
          "This mail address is already in use by another account."
        );
      case "auth/invalid-mail":
        setErrorMessage("This mail address is invalid.");
        break;
      case "auth/operation-not-allowed":
        setErrorMessage("mail/password accounts are not enabled.");
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
      <section class="vh-100 ">
        <div class="container py-5 h-100">
          <div class="row d-flex justify-content-center align-items-center h-100">
            <div class="col-12 col-md-8 col-lg-6 col-xl-5">
              <div class="card bg-dark text-white">
                <div class="card-body p-5 text-center">
                  <div class="mb-md-5 mt-md-4 pb-5">
                    <h2 class="fw-bold mb-2 text-uppercase">sign-up</h2>
                    <p class="text-white-50 mb-5">
                      Please enter your sign-up and password!
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
                          setMail(e.target.value);
                        }}
                        value={mail}
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
                      sign-up
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

                <div>
                    <p class="mb-0">
                      Do you have an account?{" "}
                      <Link to="/login" class="text-white-50 fw-bold">
                        login
                      </Link>
                    </p>
                  </div> 
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {}
    </div>
  );
}

export default Authethication