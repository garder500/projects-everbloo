import "dotenv/config";
import { downloadDocumentFile, getDocumentFileUrl, docReadUrl } from "../src/providers/amadeus/api.js";
import { AmadeusClient } from "../src/providers/amadeus/client.js";
import { writeFile } from "node:fs/promises";

const client = await AmadeusClient.create();
await client.login();

for (const documentId of [98296, 98301]) {
  const url = docReadUrl(5, documentId, "5.1");
  const fileUrl = await getDocumentFileUrl(client, documentId, 5, "5.1");
  const downloaded = await downloadDocumentFile(client, fileUrl.resourcePath, url);
  console.log(documentId, downloaded.fileFormat, "bytes", Buffer.isBuffer(downloaded.content) ? downloaded.content.length : downloaded.content.length);
  if (downloaded.fileFormat === "PDF") {
    await writeFile(`docs/amadeus/test-${documentId}.pdf`, downloaded.content as Buffer);
  }
}
