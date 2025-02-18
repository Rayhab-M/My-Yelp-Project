// import { createContext, useContext, useEffect, useState } from "react";
// import { Amplify } from "aws-amplify";
// import { Auth } from "aws-amplify/auth";
// import awsExports from "../aws-exports"; // Ensure the correct path


// Amplify.configure(awsExports);


// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     Auth.currentAuthenticatedUser()
//       .then(setUser)
//       .catch(() => setUser(null));
//   }, []);

//   const signOut = async () => {
//     await Auth.signOut();
//     setUser(null);
//   };

//   return <AuthContext.Provider value={{ user, signOut }}>{children}</AuthContext.Provider>;
// };

// export const useAuth = () => {
//   return useContext(AuthContext);
// };



// src/pages/AuthPage.js
import React from 'react';
import { Authenticator } from '@aws-amplify/ui-react';

const AuthPage = () => {
  return (
    <Authenticator>
      {({ signOut, user }) => (
        <div>
          <h1>Welcome {user?.username}</h1>
          <button onClick={signOut}>Sign Out</button>
        </div>
      )}
    </Authenticator>
  );
};

export default AuthPage;

