import { Explorer } from "../types/interface";

const explorer: Explorer = {
  id: "1",
  name: "Collection",
  isFolder: true,
  items: [
    {
      id: "2",
      name: "New folder",
      isFolder: true,
      items: [
        {
          id: "3",
          name: "Child folder",
          isFolder: true,
          items: [
            {
              id: "4",
              name: "child 3",
              isFolder: false,
              items: [],
            },
          ],
        },
        {
          id: "5",
          name: "child 1",
          isFolder: false,
          items: [],
        },
        {
          id: "6",
          name: "child 3",
          isFolder: true,
          items: [
            {
              id: "8",
              name: "child 3 -1 ",
              isFolder: false,
              items: [],
            },
            {
              id: "9",
              name: "child 3 - 2",
              isFolder: false,
              items: [],
            },
            {
              id: "10",
              name: "child 3 - 3",
              isFolder: false,
              items: [],
            },
          ],
        },
      ],
    },
    {
      id: "7",
      name: "file 1",
      isFolder: false,
      items: [],
    },
  ],
};
export default explorer;
