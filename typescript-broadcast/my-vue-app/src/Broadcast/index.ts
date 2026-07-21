// Import necessary hooks from React
import { useEffect, useState, useCallback } from "react";

// Define the interface for the hook's props
interface UseChannelProps<T> {
  channelName: string; // Name of the broadcast channel
  messageHandler: (message: MessageEvent<T>) => void; // Function to handle incoming messages
}

// Define the useChannel custom hook
const useChannel = <T>({ channelName, messageHandler }: UseChannelProps<T>) => {
  const [broadcastChannel, setBroadcastChannel] = useState<BroadcastChannel | null>(null); // State to store the broadcast channel instance

  // useEffect to set up the broadcast channel when the component mounts
  useEffect(() => {
    const channel = new BroadcastChannel(channelName); // Create a new BroadcastChannel
    setBroadcastChannel(channel); // Save the channel instance in state

    // Set up the message event handler
    channel.onmessage = (event: MessageEvent<T>) => {
      messageHandler(event); // Call the provided message handler
    };

    // Clean up the channel when the component unmounts
    return () => {
      channel.close(); // Close the broadcast channel
    };
  }, [channelName, messageHandler]); // Depend on channelName and messageHandler

  // Function to broadcast a message using useCallback to memoize the function
  const broadcast = useCallback((message: T) => {
    if (broadcastChannel) { // Check if the broadcast channel is available
      console.log("Broadcasting message:", message); // Log the message to be broadcasted
      broadcastChannel.postMessage(message); // Post the message to the broadcast channel
    }
  }, [broadcastChannel]); // Depend on broadcastChannel

  // Return the broadcast function
  return { broadcast };
};

export default useChannel;
