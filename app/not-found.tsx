import Header from "./components/Header/Header";
import Navbar from "./components/Navbar/Navbar";

export default function NotFound() {
  return (
    <div>
      <Header />
      <Navbar />
      <section className="max-w-screen-sm bg-white mx-auto px-4 py-6">
        <p className="text-center text-neutral-400">Page not found.</p>
      </section>
    </div>
  );
}
