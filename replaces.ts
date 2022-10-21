import React from "react";
import { Header } from "./components/Header";

export interface Replace {
  component: React.ElementType;
  selector: string;
}

export default [
  { component: Header, selector: "body > .pusher .bar" },
] as Replace[];
