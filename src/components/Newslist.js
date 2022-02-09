import React from "react";
import "../styles/Newslist.css";

export default function Newslist(news) {
  return (
    <div id={news.id} onClick={news.onClick} className="news">
      <h3 className="news-title">{news.news.title}</h3>
      <p className="news-description">{news.news.description}</p>
    </div>
  );
}
