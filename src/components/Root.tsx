import React from "react";

import Todos from "./Todos";
import Doggos from "./Doggos";

export default function Root() {
  return (
    <div style={{ display: "flex", padding: 20 }}>
      <div style={{ display: "flex", flexGrow: 1, flexBasis: "50%" }}>
        <Todos />
      </div>

      <div style={{ display: "flex", flexGrow: 1, flexBasis: "50%" }}>
        <Doggos />
      </div>
    </div>
  );
}
