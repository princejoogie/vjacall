import React, { useEffect, useState } from "react";
import Webcam from "react-webcam";

const videoConstraints = {
  width: 1280,
  height: 720,
  facingMode: "user",
};

const WebcamCapture = () => {
  const webcamRef = React.useRef(null);
  const [sc, setSc] = useState(null);

  const capture = React.useCallback(() => {
    setSc(webcamRef.current.getScreenshot());
  }, [webcamRef]);

  useEffect(() => {
    console.log({ webcamRef });
  }, []);

  return (
    <div className="flex w-1/2">
      <div className="flex-1">
        <Webcam
          audio={true}
          height={720}
          width={1280}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          videoConstraints={videoConstraints}
        />
        <button onClick={capture}>Capture photo</button>
      </div>
      <div className="flex-1">{sc && <img src={sc} alt="sc" />}</div>
    </div>
  );
};

export default WebcamCapture;
