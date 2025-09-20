import HomePage from "@/components/HomePage";
import { DataProvider } from "@/context/DataContext";

export default function Home() {
  return (
    <DataProvider>
      <HomePage/>
    </DataProvider>

  );
}
