import { useBroadcastChannel } from "use-broadcast-channel";

function Subscriber() {
  useBroadcastChannel("userId", (e) => alert(e.data));
  return null;
}

export default Subscriber;