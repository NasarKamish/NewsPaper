import React from "react";

export default function Categories(url) {
  return (
    <button
      className="btn-categories"
      onClick={url.changeURL}
      value={url.url.id}
    >
      {url.url.name}
    </button>
  );
}
