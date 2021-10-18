import loadable from '@loadable/component'
import { Route, BrowserRouter, Switch } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import "../css/style.css";
import Header from "./layouts/Header";

function App() {
  const abuot = loadable(() => import("../routes/about"));
  const resume = loadable(() => import("../routes/resume"));
  const contact = loadable(() => import("../routes/contact"));
  const extra = loadable(() => import("../routes/extra"));
  const login = loadable(() => import("../routes/login"));
  const messages = loadable(() => import("../routes/messages"));

  return (
    <BrowserRouter>
      <Header />
      <Switch>
        <Route path="/" component={abuot} exact />
        <Route path="/resume" component={resume} />
        <Route path="/contact" component={contact} />
        <Route path="/extra" component={extra} />
        <Route path="/login" component={login} />
        <Route path="/message" component={messages} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
