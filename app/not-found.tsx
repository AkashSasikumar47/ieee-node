import Header from "./components/Header";
import Navbar from "./components/Navbar";

export default function NotFound() {
  return (
    <div>
      <Header />
      <Navbar />
      <section className="mx-auto max-w-screen-sm bg-white px-4 py-6">
        <p className="text-center text-neutral-400">Page not found.</p>
      </section>
    </div>
  );
}
