// Endpoint to serve my CV as an inline pdf
// This means that users can view the pdf in their browser easily.

import type { APIRoute } from "astro";
// @ts-ignore
import fs from "node:fs/promises";
import path from "node:path";

const pdfPath = path.resolve("./src/assets/files/Zac Cleveland CV.pdf");
const contents = await fs.readFile(pdfPath);

export const GET: APIRoute = async () => {
  return new Response(contents, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": 'inline; filename=\"Zac Cleveland CV.pdf\"',
    },
  });
};
