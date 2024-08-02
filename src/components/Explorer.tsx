import React, { useState } from "react";
import { useExplorer } from "../context/ExplorerContext";
import { Explorer } from "../types/interface";

interface props {
  explorer: Explorer;
}

const Folder = ({ explorer }: props) => {
  const { updateExplorerName, deleteExplorer } = useExplorer();

  const [isEditingTurnOn, setisEditingTurnOn] = useState(false);
  const [expand, setExpand] = useState(false);
  const [editedValue, setEditedValue] = useState("");

  const handleExpland = () => {
    setExpand(!expand);
  };

  const handleExplorerEdit = () => {
    updateExplorerName(explorer.id, editedValue);
    setisEditingTurnOn(false);
  };

  const handleDeleteExplorer = () => {
    deleteExplorer(explorer.id);
  };

  const handleEditToggle = () => {
    setisEditingTurnOn(true);
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditedValue(e.target.value);
  };

  if (explorer.isFolder) {
    return (
      <div
        style={{
          marginTop: "10px",
        }}
      >
        <div className="folder">
          <span onClick={handleExpland}>📁 {explorer.name}</span>
        </div>
        <div
          style={{
            display: expand ? "block" : "none",
            paddingLeft: 50,
          }}
        >
          {explorer.items.map((item) => {
            return <Folder key={explorer.id} explorer={item} />;
          })}
        </div>
      </div>
    );
  } else {
    return (
      <div className="file">
        {isEditingTurnOn ? (
          <div
            style={{
              display: "flex",
              gap: "5px",
            }}
          >
            <input
              type="text"
              value={editedValue}
              onChange={handleNameChange}
            />
            <span
              style={{
                cursor: "pointer",
              }}
              onClick={handleExplorerEdit}
            >
              ✅
            </span>
          </div>
        ) : (
          <div style={{ display: "flex", gap: "3px" }}>
            <div onClick={handleEditToggle}>📄 {explorer.name}</div>
            <span style={{ cursor: "pointer" }} onClick={handleDeleteExplorer}>
              ❌
            </span>
          </div>
        )}
      </div>
    );
  }
};

export default Folder;
