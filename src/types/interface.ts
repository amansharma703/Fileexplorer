export interface Explorer {
  id: string;
  name: string;
  isFolder: boolean;
  items: Explorer[];
}
