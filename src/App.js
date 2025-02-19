import React, { useState, useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { Amplify } from "aws-amplify";
import { signUp, signIn, signOut, getCurrentUser, confirmSignUp } from "aws-amplify/auth";
import awsExports from "./aws-exports";
import "bootstrap/dist/css/bootstrap.min.css";
import Dashboard from "./Dashboard"; // Import the new Dashboard component

Amplify.configure(awsExports);

const App = () => {
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmCode, setConfirmCode] = useState("");
  const [error, setError] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [isConfirming, setIsConfirming] = useState(false);

  useEffect(() => {
    getCurrentUser()
      .then(setUser)
      .catch(() => setUser(null));
  }, []);

  const handleSignUp = async () => {
    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }
    try {
      await signUp({
        username: email.trim(),
        password,
        options: { userAttributes: { email } },
      });
      setIsConfirming(true);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleConfirmSignUp = async () => {
    try {
      await confirmSignUp({ username: email.trim(), confirmationCode: confirmCode });
      setIsConfirming(false);
      setIsSignUp(false);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleSignIn = async () => {
    try {
      const authUser = await signIn({ username: email.trim(), password });
      setUser(authUser);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleSignOut = async () => {
    await signOut();
    setUser(null);
  };

  return (
    <Router>
      <div className="container-fluid vh-100">
        {user ? (
          <Dashboard user={user} handleSignOut={handleSignOut} />
        ) : (
          // Authentication Page
          <div className="d-flex justify-content-center align-items-center vh-100">
            <div className="card p-4 shadow-lg text-center" style={{ width: "400px" }}>
              {isConfirming ? (
                <>
                  <h2>Confirm Your Email</h2>
                  <input
                    type="text"
                    className="form-control my-2"
                    placeholder="Enter verification code"
                    value={confirmCode}
                    onChange={(e) => setConfirmCode(e.target.value)}
                  />
                  {error && <p className="text-danger">{error}</p>}
                  <button className="btn btn-success w-100 mt-3" onClick={handleConfirmSignUp}>
                    Confirm
                  </button>
                </>
              ) : (
                <>
                  <h2>{isSignUp ? "Sign Up" : "Sign In"}</h2>
                  <input
                    type="email"
                    className="form-control my-2"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <input
                    type="password"
                    className="form-control my-2"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  {isSignUp && (
                    <input
                      type="password"
                      className="form-control my-2"
                      placeholder="Confirm Password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                  )}
                  {error && <p className="text-danger">{error}</p>}
                  {isSignUp ? (
                    <button className="btn btn-success w-100 mt-3" onClick={handleSignUp}>
                      Create Account
                    </button>
                  ) : (
                    <button className="btn btn-success w-100 mt-3" onClick={handleSignIn}>
                      Sign In
                    </button>
                  )}
                  <p className="mt-3">
                    {isSignUp ? "Already have an account?" : "Need an account?"}{" "}
                    <button className="btn btn-link" onClick={() => setIsSignUp(!isSignUp)}>
                      {isSignUp ? "Sign In" : "Sign Up"}
                    </button>
                  </p>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </Router>
  );
};

export default App;
