import { writeFileSync } from "fs";
import type { NextApiRequest, NextApiResponse } from "next";

const pdf = async (req: NextApiRequest, res: NextApiResponse) => {
  const { body } = req;

  const response = await fetch(
    "https://pdfgen.app/api/generate?templateId=e4514cc",
    {
      method: "POST",
      body: JSON.stringify({ data: JSON.parse(body) }),
      headers: {
        "Content-Type": "application/json",
        api_key: "oqO22WUBsqgc6Q1QVHzjV",
      },
    }
  );

  const blob = await response.blob();
  const arrayBuffer = await blob.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  writeFileSync("public/resume.pdf", buffer);

  res.status(200).json({ qwe: "asd" });
};

export default pdf;
