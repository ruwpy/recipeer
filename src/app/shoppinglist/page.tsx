import { getCurrentUser } from "@/lib/session";
import { redirect } from "next/navigation";

const ShoppingListPage = async () => {
  const user = await getCurrentUser();

  if (!user) redirect("/login");

  return <div>page</div>;
};

export default ShoppingListPage;
