// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import fs from "fs";
import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

type Data = {
  name: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const file = fs.readFileSync(
    "/Users/kelvinmitaki/Downloads/docxexample.docx"
  );

  const formData = new FormData();

  const blob = new Blob([file]);

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

  console.log(data);

  res.status(200).json({ name: "John Doe" });
}
