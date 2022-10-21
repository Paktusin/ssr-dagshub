import express from "express";
import dotenv from "dotenv";
import axios from "axios";
import request from "request";
import { parse } from "node-html-parser";
import ReactDOMServer from "react-dom/server";
import { Header } from "./components/Header";

const app = express();
const config = { PORT: 3000, REPLACE: "", ...dotenv.config().parsed };

const proxyUrls = ["/repo-avatars", "/assets", "/css", "/img", "/js"];

app.use(express.static("public"));

app.get("*", async (req, res) => {
  if (proxyUrls.some((sUrl) => req.path.indexOf(sUrl) !== -1)) {
    return req.pipe(request(`${config.REPLACE}${req.path}`)).pipe(res);
  }
  const html: any = await axios
    .get(`${config.REPLACE}${req.path}`)
    .then((res) => res.data);
  const root = parse(html);
  const el = root.querySelector("body > .pusher .bar")!;
  el.innerHTML = ReactDOMServer.renderToStaticMarkup(<Header />);
  return res.send(root.toString());
});

app.listen(config.PORT, () => {
  console.log(`server listen port ${config.PORT}`);
});
