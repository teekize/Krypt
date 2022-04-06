import {
  Navbar,
  Welcome,
  Services,
  Loader,
  Footer,
  Transactions,
} from "./components";

export default function App() {
  return (
    <div className="min-h-screen">
      <div className="gradient-bg-welcome">
        <Navbar />
        <Welcome />
      </div>
      {/* <Services />
      <Transactions />
      <Footer /> */}
    </div>
  );
}
