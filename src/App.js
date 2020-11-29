import React from "react";

import Routes from "./Routes";
import ScrollToTop from "./ScrollToTop";

const App = () => {
  return (
    <React.Fragment>
      <ScrollToTop />
      <Routes />
    </React.Fragment>
  );
};

export default App;
