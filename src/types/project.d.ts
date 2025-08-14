import { programLangProps } from "./programLang";

export type projectProps = {
  title: string;
  description: string;
  programLang: programLangProps;
  position: string[];
  demoUri?: string;
  score?: number | string;
};
