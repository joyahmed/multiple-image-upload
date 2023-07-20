import fs from "fs/promises"; // Import the File System API from Node.js
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const formData = await req.formData();
  const formDataEntryValues = Array.from(formData.values());
  for (const formDataEntryValue of formDataEntryValues) {
    if (typeof formDataEntryValue === "object" && "arrayBuffer" in formDataEntryValue) {
      const file = formDataEntryValue as unknown as Blob;
      const buffer = Buffer.from(await file.arrayBuffer());
      try {
        // Use the folderName in the file path to save the files in the correct folder
        const folderName = "images"; // You can also dynamically get the folder name from the request if needed
        await fs.writeFile(`public/${folderName}/${file.name}`, buffer);
        console.log(`File ${file.name} uploaded successfully.`);
      } catch (error) {
        console.error(`Error writing file: ${error}`);
      }
    }
  }
  return NextResponse.json({ success: true });
}
