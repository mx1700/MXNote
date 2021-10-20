export interface Page {
  id: string;
  title: string;
  content: string;
  children: Page[];
  showChildren?: boolean;
}
