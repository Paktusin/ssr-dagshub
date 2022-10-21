import React from "react";
import { Header } from "./components/Header";

export interface Replace {
  component: React.ElementType;
  selector: string;
  id: string;
}

export default [
  { component: Header, selector: "body > .pusher .bar", id: "header" },
] as Replace[];
