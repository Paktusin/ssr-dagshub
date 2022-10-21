import React, { useState } from "react";

export const Header: React.FC = () => {
  const [state, setState] = useState("yes");
  return <div onClick={() => setState("no")}>{state}</div>;
};
