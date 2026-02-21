import Header from "../components/Header";
import Navbar from "../components/Navbar";
import FeedList from "../components/FeedList";

export default function EventsPage() {
  return (
    <div>
      <Header />
      <Navbar />
      <FeedList filterType="Event" />
    </div>
  );
}
