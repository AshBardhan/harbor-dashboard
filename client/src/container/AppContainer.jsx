import SidebarContainer from "./SidebarContainer";
import ContentContainer from "./ContentContainer";
import { BrowserRouter as Router } from "react-router-dom";
import HeaderContainer from "./HeaderContainer";

export default function AppContainer() {
  return (
    <Router>
      <div className="page-layout">
        <HeaderContainer />
        <div className="page-container">
            <SidebarContainer />
            <ContentContainer />
        </div>
      </div>
    </Router>
  );
}
