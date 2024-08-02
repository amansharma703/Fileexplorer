import React, { useState } from "react";
import "./styles.css";
import Folder from "./components/Explorer";
import { useExplorer } from "./context/ExplorerContext";

export default function App() {
  const { explorer, setSearchQuery, searchQuery, filteredExplorer } =
    useExplorer();

  const handleInputChange = (e: any) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className="App">
      <input type="text" value={searchQuery} onChange={handleInputChange} />
      <Folder explorer={searchQuery ? filteredExplorer : explorer} />
    </div>
  );
}
