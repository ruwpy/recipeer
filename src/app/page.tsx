import { getCurrentUser } from "@/lib/session";
import { redirect } from "next/navigation";

const Home = async () => {
  const user = await getCurrentUser();
  console.log(user);

  if (!user) redirect("/login");

  return <div>Home</div>;
};

export default Home;
