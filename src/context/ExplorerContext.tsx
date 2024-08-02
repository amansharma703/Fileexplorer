import React, { createContext, useState, ReactNode, useContext } from "react";
import data from "../data/data";
import { Explorer } from "../types/interface";

interface ExplorerContextType {
  explorer: Explorer;
  updateExplorerName: (id: string, newName: string) => void;
  deleteExplorer: (id: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  filteredExplorer: Explorer;
}

const ExplorerContext = createContext<ExplorerContextType | undefined>(
  undefined
);

export const ExplorerProvider = ({ children }: { children: ReactNode }) => {
  const [explorer, setExplorer] = useState(data);
  const [searchQuery, setSearchQuery] = useState("");

  const updateExplorerName = (id: string, newName: string) => {
    const updateName = (explorer: Explorer): Explorer => {
      if (explorer.id === id) {
        return {
          ...explorer,
          name: newName,
        };
      }
      if (explorer.isFolder) {
        return { ...explorer, items: explorer.items.map(updateName) };
      }
      return explorer;
    };
    setExplorer(updateName(explorer));
  };

  const deleteExplorer = (id: string) => {
    const removeExplorer = (explorer: Explorer): Explorer | null => {
      if (explorer.id === id) {
        return null;
      }
      if (explorer.isFolder) {
        return {
          ...explorer,
          items: explorer.items
            .map(removeExplorer)
            .filter((item): item is Explorer => item !== null),
        };
      }
      return explorer;
    };
    const updatedExplorer = removeExplorer(explorer);
    if (updatedExplorer) {
      setExplorer(updatedExplorer);
    }
  };

  const filterExplorer = (
    explorer: Explorer,
    query: string
  ): Explorer | null => {
    if (explorer.name.toLowerCase().includes(query.toLowerCase()))
      return explorer;
    if (explorer.isFolder) {
      const filteredItems = explorer.items
        .map((item) => filterExplorer(item, query))
        .filter((item): item is Explorer => item !== null);

      if (filteredItems.length > 0) {
        return {
          ...explorer,
          items: filteredItems,
        };
      }
    }
    return null;
  };
  console.log(searchQuery);

  const filteredExplorer = filterExplorer(explorer, searchQuery) || {
    ...explorer,
    items: [],
  };

  return (
    <ExplorerContext.Provider
      value={{
        explorer,
        updateExplorerName,
        deleteExplorer,
        filteredExplorer,
        setSearchQuery,
        searchQuery,
      }}
    >
      {children}
    </ExplorerContext.Provider>
  );
};

export const useExplorer = () => {
  const context = useContext(ExplorerContext);
  if (!context) {
    throw new Error("Not foun");
  }
  return context;
};
