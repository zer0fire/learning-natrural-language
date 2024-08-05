import fs from "fs-extra";
import path from "path";

export async function GET() {
  const data = await fs.readJSON(path.join(process.cwd(), "/public/word.json"));
  return Response.json(data);
}
