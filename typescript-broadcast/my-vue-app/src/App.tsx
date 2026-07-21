import { useState } from "react";
import "./App.css"; 
import useChannel from "./Broadcast"; 

// Define the types for login and logout messages
type AuthMessage = { type: "login" | "logout" };

// Define the main App component
function App() {
  // State to store the login status
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  // Use the custom hook with channel name and message handler
  const { broadcast } = useChannel<AuthMessage>({
    channelName: "auth-channel", // Name of the broadcast channel
    messageHandler: (message: MessageEvent<AuthMessage>) => { // Function to handle incoming messages
      console.log("Received message:", message.data); // Log the received message
      if (message.data.type === "login") {
        setIsLoggedIn(true); // Set login state to true
      } else if (message.data.type === "logout") {
        setIsLoggedIn(false); // Set login state to false
      }
    },
  });

  // Function to handle login and broadcast the login message
  const handleLogin = () => {
    setIsLoggedIn(true); // Set login state to true
    broadcast({ type: "login" }); // Broadcast the login message
  };

  // Function to handle logout and broadcast the logout message
  const handleLogout = () => {
    setIsLoggedIn(false); // Set login state to false
    broadcast({ type: "logout" }); // Broadcast the logout message
  };

  // Render the component
  return (
    <>
      <div className="card">
        {isLoggedIn ? (
          <button onClick={handleLogout}>Logout</button> // Button to logout
        ) : (
          <button onClick={handleLogin}>Login</button> // Button to login
        )}
      </div>
    </>
  );
}

export default App;
