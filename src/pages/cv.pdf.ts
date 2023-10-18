// Endpoint to serve my CV as an inline pdf
// This means that users can view the pdf in their browser easily.

import type { APIRoute } from 'astro';
// @ts-ignore
import fs from 'node:fs/promises';

// DIRTY HACK: fixes the URL being different during SSG.
let base_path = import.meta.url;
if (base_path.indexOf('dist/chunks') > -1) {
    base_path = base_path.split('dist/chunks')[0] + 'src/assets/';
}

const url = new URL('../assets/Zac Cleveland CV.pdf', base_path);
const contents = await fs.readFile(url);

export const GET: APIRoute = async () => {
    return new Response(
        contents,
        {
            headers: {
                'Content-Type': 'application/pdf',
                'Content-Disposition': 'inline; filename=\"Zac Cleveland CV.pdf\"'
            }
        }
    );
};
