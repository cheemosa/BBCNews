import MoreNews from "../components/MoreNews";
import OnlyFromBBC from "../components/OnlyFromBBC";
import PodcastCard from "../components/PodcastCard";
import TopStories from "../components/TopStories";

export const HomePage = () => {
  return (
    <div>
      <TopStories />
      <OnlyFromBBC />
      {/* <PodcastCard /> */}
      <MoreNews />
    </div>
  );
};
