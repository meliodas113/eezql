import "./App.css";
import { Switch, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import Loader from "./Components/Loader/Loader";
const Home = lazy(() => import("./Screens/Home/Home"));
const WorkSpace = lazy(() => import("./Screens/WorkSpace/WorkSpace"));
const Avatar = lazy(() => import("./Screens/avatar/Avatar"));
const Dashboard = lazy(() => import("./Screens/DashBoard/Dashboard"));
const renderLoader = () => <Loader />;

function App() {
  return (
    <Suspense fallback={renderLoader()}>
      <div className="App">
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/workspace" component={WorkSpace} />
          <Route path="/avatar" component={Avatar} />
          <Route path="/dashboard" component={Dashboard} />
        </Switch>
      </div>
    </Suspense>
  );
}

export default App;
