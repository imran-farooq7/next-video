import { getUserVideos } from "@/actions/video";
import DashboardPlayer from "@/remotion/dashboard-player";
import Link from "next/link";

const Dashboard = async () => {
  const { data } = await getUserVideos();
  return (
    <div className="container mx-auto pt-20">
      <div className="flex justify-between my-5">
        <h2 className="text-2xl font-bold">Dashboard</h2>
        <Link
          href={"/dashboard/create-video"}
          className={`rounded-sm  cursor-pointer bg-emerald-500 py-3 px-10 text-base font-semibold text-white shadow-xs hover:bg-emerald-600 focus-visible:outline-2 focus-visible:outline-offset-2 `}
        >
          Create Video
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {data?.map((video: any) => (
          <DashboardPlayer video={video} key={video.id} />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
