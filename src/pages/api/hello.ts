// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

const base64ToBlob = (base64String: string): Blob => {
  const binaryString = atob(base64String);
  const bytes = new Uint8Array(binaryString.length);

  for (let i = 0; i < binaryString.length; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }

  return new Blob([bytes]);
};

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "4mb",
    },
  },
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "POST":
      try {
        const formData = new FormData();
        const blob = base64ToBlob(req.body.file);

        formData.append("1", blob, "docxexample.docx");

        formData.append(
          "ConversionOptions",
          JSON.stringify({
            MinimizeTheNumberOfWorksheets: "false",
            UseOcr: "false",
            Locale: "en",
            Password: null,
          })
        );

        const { data } = await axios.post(
          "https://api.products.aspose.app/words/conversion/api/convert?outputType=PDF",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        const url = `https://api.products.aspose.app/words/conversion/api/Download?id=${data.id}`;

        const { data: arrayBuffer } = await axios.get(url, {
          responseType: "arraybuffer",
        });

        const base64Data = Buffer.from(arrayBuffer).toString("base64");

        return res.json({ data: base64Data });
      } catch (error) {
        console.log(error);
        return res.json({ data: "failed to convert file " });
      }
      break;
    case "GET":
      return res.status(200).json({ data: "John Doe" });
  }
}
