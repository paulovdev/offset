import Nav from "@/components/layout/navigation/nav";
import Transition from "@/components/layout/transition";
import Hero from "@/features/home/hero";
import { client } from "@/lib/sanity.client";
import { LABS_QUERY } from "@/lib/sanity.queries";

export default async function Page() {
  const labs = await client.fetch(LABS_QUERY);

  return (
    <Transition>
      <Nav />
      <main className="min-h-screen">
        <Hero labs={labs} />
      </main>
    </Transition>
  );
}
