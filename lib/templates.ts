import groups from "@/data/qa-templates.json";

export interface TableContent {
  kind: "table";
  context?: string;
  columns: string[];
  rows: string[][];
  note?: string;
}

export interface TextContent {
  kind: "text";
  body: string;
}

export type TemplateContent = TableContent | TextContent;

export interface QATemplate {
  slug: string;
  title: string;
  whenToUse: string;
  content: TemplateContent;
  aiPrompt?: string;
}

export interface TemplateGroup {
  slug: string;
  title: string;
  emoji: string;
  description: string;
  templates: QATemplate[];
}

// Data nằm ở data/qa-templates.json (dùng chung với scripts/gen-templates.py
// để sinh file Excel tải về). Sửa nội dung ở JSON, không sửa ở đây.
export const templateGroups = groups as TemplateGroup[];
