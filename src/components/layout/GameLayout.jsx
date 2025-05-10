import Header from "./Header";
import GameContainer from "../game/GameContainer";
import Footer from "./Footer";

export default function MainLayout() {
  return (
    <div>
      <Header />
      <GameContainer />
      <Footer />
    </div>
  );
}
