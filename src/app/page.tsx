import { HomePageContainer } from "@/Components/HomePage/HomePageContainer";
import { getPayments } from "@/lib/db";

export default async function HomePage() {
  const allPayments = await getPayments();

  return <HomePageContainer allPayments={allPayments} />;
}
