import React from "react";

export default function Input(value) {
  return (
    <input
      className="search"
      placeholder="Search?"
      value={value.value}
      onChange={value.onChange}
    />
  );
}
