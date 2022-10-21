import express from "express";
import dotenv from "dotenv";
import axios from "axios";
import request from "request";
import { parse } from "node-html-parser";
import ReactDOMServer from "react-dom/server";
import { Header } from "./components/Header";
import replaces from "./replaces";

const app = express();
const config = { PORT: 3000, REPLACE: "", ...dotenv.config().parsed };

const proxyUrls = ["/repo-avatars", "/assets", "/css", "/img", "/js"];

app.use("/rcstatic", express.static("public"));

app.get("*", async (req, res, next) => {
  if (req.path.indexOf("/rcstatic") !== -1) {
    return next();
  }

  if (proxyUrls.some((sUrl) => req.path.indexOf(sUrl) !== -1)) {
    return req.pipe(request(`${config.REPLACE}${req.path}`)).pipe(res);
  }
  const html: any = await axios
    .get(`${config.REPLACE}${req.path}`)
    .then((res) => res.data);
  const root = parse(html);
  replaces.forEach((replace) => {
    const el = root.querySelector(replace.selector);
    if (el) {
      el.setAttribute("id", replace.id);
      el.removeAttribute("class");
      el.innerHTML = ReactDOMServer.renderToStaticMarkup(<Header />);
    }
  });
  root
    .querySelector("body")!
    .appendChild(
      parse('<link rel="stylesheet" type="text/css" href="/rcstatic/main.css"/>')
    )
    .appendChild(parse(`<script src="/rcstatic/main.js"></script>`));
  return res.send(root.toString());
});

app.listen(config.PORT, () => {
  console.log(`server listen port ${config.PORT}`);
});
