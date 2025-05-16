import { getUserVideos } from "@/actions/video";

const Dashboard = async () => {
  const { data } = await getUserVideos();
  return <div>{JSON.stringify(data)}</div>;
};

export default Dashboard;
