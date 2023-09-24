import { useContext, useState } from "react";
import { database, auth, providerGoogle } from "../firebase_config";
import googleImage from "../static/google.png";
import githubImage from "../static/github.png";
import facebookImage from "../static/facebook.jpeg";
import { UserContext } from "../context/UserContext";
import logo from "../static/logo.jpeg"

export default function LoginPage() {
  const [showLogin, setShowLogin] = useState(false);
  const [user, setUser] = useContext(UserContext);

  const [values, setValues] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };
  // Authentication Functions
  const signInGoogle = (e) => {
    e.preventDefault();
    auth.signInWithPopup(providerGoogle).then((result) => {
      console.log(result);
      setUser(result.additionalUserInfo.profile.name);
    });
  };

  // const signInGitHub = (e) => {
  //   e.preventDefault();
  //   auth
  //     .signInWithPopup(providerGitHub)
  //     .then((result) => {

  //       var docRef = database.collection('users').doc(result.user.uid);

  //       docRef.get()
  //         .then((docSnapshot) => {
  //           if (!docSnapshot.exists) {
  //             docRef.set(FirebaseUserDefaultData)
  //               .then(() => {
  //                 console.log(result)
  //                 setUser(result.additionalUserInfo.username)
  //               })
  //           }
  //         });
  //     })
  // }

  const SignInUser = (e) => {
    e.preventDefault();
    auth
      .signInWithEmailAndPassword(values.email.trim(), values.password)
      .then((userCredential) => {
        var userLoggedIn = userCredential.user;
        console.log("Loggedin user", userLoggedIn)
        setUser(userLoggedIn.email)
        alert('User Logged in')
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode)
        console.log(errorMessage)
        alert(errorMessage)
      })
    setValues({
      email: '',
      password: '',
      confirmPassword: '',
    })
  }

  const CreateUser = (e) => {
    e.preventDefault();
    if (values.password !== values.confirmPassword) {
      alert("Password are not matching");
    } else {
      auth
        .createUserWithEmailAndPassword(values.email, values.password)
        .then((userCredential) => {
          var userCreated = userCredential.user;
          console.log("User Created: ", userCreated);
        })
        .catch((error) => {
          var errorCode = error.code;
          var errorMessage = error.message;
          console.log(errorCode);
          console.log(errorMessage);
          alert(errorMessage);
        });
      setValues({
        email: '',
        password: '',
        confirmPassword: '',
      });
    }
  };

  return (
    <>
      {!showLogin ? (
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <img
              className="mx-auto h-24 w-auto"
              src={logo}
              alt="Your Company"
            />
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Sign in to your account
            </h2>
          </div>

          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form className="space-y-6" action="#" method="POST">
              <div>
                <label
                  htmlFor="email"
                  className="flex text-sm font-medium leading-6 text-gray-900"
                >
                  Email address
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={values.email}
                    onChange={handleChange("email")}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Password
                  </label>
                  <div className="text-sm">
                    <a
                      href="#"
                      className="font-semibold text-indigo-600 hover:text-indigo-500"
                    >
                      Forgot password?
                    </a>
                  </div>
                </div>
                <div className="mt-2">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    value={values.password}
                    onChange={handleChange("password")}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  onClick={SignInUser}
                >
                  Sign in
                </button>
              </div>
            </form>

            <p className="mt-10 text-center text-sm text-gray-500">
              Not a member?{" "}
              <button
                href="#"
                className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
                onClick={() => setShowLogin(!showLogin)}
              >
                Register Today
              </button>
            </p>
          </div>
        </div>
      ) : (
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <img
              className="mx-auto h-24 w-auto"
              src={logo}
              alt="Your Company"
            />
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Create a new account
            </h2>
          </div>

          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form className="space-y-6" action="#" method="POST">
              <div>
                <label
                  htmlFor="email"
                  className="flex text-sm font-medium leading-6 text-gray-900"
                >
                  Email address
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={values.email}
                    onChange={handleChange("email")}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Password
                  </label>
                </div>
                <div className="mt-2">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    value={values.password}
                    onChange={handleChange("password")}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Confirm Passoword
                  </label>
                </div>
                <div className="mt-2">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    value={values.confirmPassword}
                    onChange={handleChange("confirmPassword")}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div>
                <button
                  type="submit"
                  onClick={CreateUser}
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Register
                </button>
              </div>
            </form>

            <p className="mt-10 text-center text-sm text-gray-500">
              Already a member?{" "}
              <button
                href="#"
                className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
                onClick={() => setShowLogin(!showLogin)}
              >
                Login
              </button>
            </p>
          </div>
        </div>
      )}

      <br />

      <div className="flex justify-center align-middle gap-10">
        <img className="w-16 h-16" src={googleImage} onClick={signInGoogle} />
        <img className="w-16 h-16" src={githubImage} />
        <img className="w-16 h-16" src={facebookImage} />
      </div>
    </>
  );
}
