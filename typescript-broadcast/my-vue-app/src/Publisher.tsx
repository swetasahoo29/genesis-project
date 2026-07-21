import { useBroadcastChannel } from "use-broadcast-channel";

function Publisher() {
  const postUserId = useBroadcastChannel("userId", (e) => alert(e.data));
  return <button onClick={() => postUserId("ABC123")}>Send UserId</button>;
}

export default Publisher