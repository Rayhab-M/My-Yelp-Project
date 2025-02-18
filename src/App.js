import { useState, useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { Amplify } from "aws-amplify";
import { signUp, signIn, signOut, getCurrentUser, confirmSignUp } from "aws-amplify/auth";
import awsExports from "./aws-exports";

Amplify.configure(awsExports);

const App = () => {
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmCode, setConfirmCode] = useState(""); // For email verification
  const [error, setError] = useState("");
  const [isSignUp, setIsSignUp] = useState(false); // Toggle between sign up and sign in
  const [isConfirming, setIsConfirming] = useState(false); // Track if waiting for code

  useEffect(() => {
    getCurrentUser()
      .then(setUser)
      .catch(() => setUser(null));
  }, []);

  // Handles User Sign Up
  const handleSignUp = async () => {
    try {
      await signUp({
        username: email.trim(), // Email as username
        password,
        options: {
          userAttributes: { email },
        },
      });
      setIsConfirming(true); // Show confirmation field
    } catch (err) {
      setError(err.message);
    }
  };

  // Handles Email Confirmation (Verification Code)
  const handleConfirmSignUp = async () => {
    try {
      await confirmSignUp({ username: email.trim(), confirmationCode: confirmCode });
      setIsConfirming(false);
      setIsSignUp(false);
    } catch (err) {
      setError(err.message);
    }
  };

  // Handles User Sign In
  const handleSignIn = async () => {
    try {
      const authUser = await signIn({ username: email.trim(), password });
      setUser(authUser);
    } catch (err) {
      setError(err.message);
    }
  };

  // Handles User Sign Out
  const handleSignOut = async () => {
    await signOut();
    setUser(null);
  };

  return (
    <Router>
      <div style={{ textAlign: "center", marginTop: "20vh" }}>
        {user ? (
          // Home Page (After Login)
          <div>
            <h2>Welcome, {user.signInDetails?.loginId || "User"}!</h2>
            <button onClick={handleSignOut}>Sign Out</button>
          </div>
        ) : isConfirming ? (
          // Confirmation Page (After Sign Up)
          <div>
            <h2>Confirm Your Email</h2>
            <input
              type="text"
              placeholder="Enter verification code"
              value={confirmCode}
              onChange={(e) => setConfirmCode(e.target.value)}
            />
            <br />
            {error && <p style={{ color: "red" }}>{error}</p>}
            <button onClick={handleConfirmSignUp}>Confirm</button>
          </div>
        ) : (
          // Sign In / Sign Up Page
          <div>
            <h2>{isSignUp ? "Sign Up" : "Sign In"}</h2>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <br />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <br />
            {error && <p style={{ color: "red" }}>{error}</p>}
            {isSignUp ? (
              <button onClick={handleSignUp}>Create Account</button>
            ) : (
              <button onClick={handleSignIn}>Sign In</button>
            )}
            <p>
              {isSignUp ? "Already have an account?" : "Need an account?"}{" "}
              <button onClick={() => setIsSignUp(!isSignUp)}>
                {isSignUp ? "Sign In" : "Sign Up"}
              </button>
            </p>
          </div>
        )}
      </div>
    </Router>
  );
};

export default App;