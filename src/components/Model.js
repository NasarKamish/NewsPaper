import React from "react";
import "../styles/Model.css";

export default function Model(news) {
  return (
    <div onClick={news.hide} className="backdrop">
      <div className="model">
        <h3 className="model-header">{news.news.title}</h3>
        <p className="model-content">{news.news.content}</p>
        <div className="model-footer">
          {news.news.author && (
            <p className="model-author">Author: {news.news.author}</p>
          )}
          {!news.news.author && (
            <p className="model-author">Author: Anonymous</p>
          )}
          {news.news.source.name && (
            <p className="model-author">Source: {news.news.source.name}</p>
          )}
          {!news.news.source.name && (
            <p className="model-author">Source: Anonymous</p>
          )}
        </div>
      </div>
    </div>
  );
}
