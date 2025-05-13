import { Player } from "@remotion/player";
import RemotionVideo from "./remotion-video";
const RemotionPlayer = () => {
  return (
    <Player
      component={RemotionVideo}
      durationInFrames={120}
      fps={30}
      inputProps={{}}
      compositionWidth={350}
      compositionHeight={400}
      controls
    />
  );
};

export default RemotionPlayer;
