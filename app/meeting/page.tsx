import Header from "../components/Header";
import Navbar from "../components/Navbar";
import FeedList from "../components/FeedList";

export default function MeetingsPage() {
  return (
    <div>
      <Header />
      <Navbar />
      <FeedList filterType="Meeting" />
    </div>
  );
}
