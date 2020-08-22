import React, { useEffect, useState, useCallback } from "react";

//UI imports
import { VideoCallPopup, Container, RemoteStream, ButtonsRow } from "./styles";

import { Fab } from "@rmwc/fab";

// CSS imports
import "@rmwc/menu/styles";
import "@rmwc/fab/styles";

// API-related imports
import { startCall, rtc } from "../../services/agora";

function findGetParameter(parameterName: string) {
  var result = null,
    tmp = [];
  var items = window.location.search.substr(1).split("&");
  for (var index = 0; index < items.length; index++) {
    tmp = items[index].split("=");
    if (tmp[0] === parameterName) result = decodeURIComponent(tmp[1]);
  }
  return result;
}
// @ts-ignore
const Home: React.FC = () => {
  const [isCredsValid, setIsCredsValid] = useState(false);
  const [audioEnable, setAudioEnable] = useState(true);
  const [videoEnable, setVideoEnable] = useState(true);
  useEffect(() => {
    const channel = findGetParameter("channel");
    const apiKey = findGetParameter("apiKey");

    if (channel && apiKey) {
      startCall(channel);

      setIsCredsValid(true);
    } else {
      setIsCredsValid(false);
    }
  }, []);

  return (
    <VideoCallPopup id="local-stream" className="local-stream">
      <RemoteStream id="remote-stream"></RemoteStream>
      <ButtonsRow id="buttons-row">
        <Fab
          icon={audioEnable ? "volume_up" : "volume_off"}
          id="stop-call"
          onClick={() => {
            //@ts-ignore
            if (audioEnable) {
              //@ts-ignore
              rtc.localAudioTrack.stop();
              setAudioEnable(false);
            } else {
              //@ts-ignore
              rtc.localAudioTrack.on();
              setAudioEnable(true);
            }
          }}
          style={{
            bottom: "30px",
            zIndex: 999,
            backgroundColor: "white",
            color: "blue"
          }}
        ></Fab>
        <Fab
          icon="call_end"
          id="stop-call"
          onClick={() => (window.location.href = "https://www.google.com")}
          style={{ bottom: "30px", zIndex: 999, backgroundColor: "red" }}
        ></Fab>
        <Fab
          icon={audioEnable ? "videocam" : "videocam_off"}
          id="stop-call"
          onClick={() => {
            //@ts-ignore
            if (videoEnable) {
              //@ts-ignore
              rtc.localVideoTrack.setEnabled(false);
              //@ts-ignore

              rtc.localVideoTrack.stop();
              setVideoEnable(false);
            } else {
              //@ts-ignore
              rtc.localVideoTrack.setEnabled(true);
              //@ts-ignore
              rtc.localVideoTrack.play("local-stream");
              setVideoEnable(true);
            }
          }}
          style={{
            bottom: "30px",
            zIndex: 999,
            backgroundColor: "white",
            color: "blue"
          }}
        ></Fab>
      </ButtonsRow>
    </VideoCallPopup>
  );
};

export default Home;
