import { Composition } from "remotion";
import RemotionVideo from "./remotion-video";
const RemotionRoot = () => {
  return (
    <Composition
      id="empty"
      component={RemotionVideo}
      width={1280}
      height={720}
      durationInFrames={60}
      fps={30}
    />
  );
};

export default RemotionRoot;
