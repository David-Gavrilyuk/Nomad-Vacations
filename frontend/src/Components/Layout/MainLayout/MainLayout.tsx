import "./MainLayout.css";
import MainRoute from "../../../Routes/MainRoute/MainRoute";
import SnackBarNotes from "../../../Utils/SnackBarNotes";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";

function MainLayout(): JSX.Element {
  return (
    <div className="MainLayout">
      <header>
        <Header />
      </header>
      <main>
        <SnackBarNotes />
        <MainRoute />
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}

export default MainLayout;
