export const exportToPDF = async () => {
  const data = await fetch("/api/trpc/allInfo.getAll").then((res) =>
    res.json()
  );

  const response = await fetch(
    "https://pdfgen.app/api/generate?templateId=e4514cc",
    {
      method: "POST",
      body: JSON.stringify({ data }),
      headers: {
        api_key: "oqO22WUBsqgc6Q1QVHzjV",
      },
    }
  );
  const blob = await response.blob();
  const arrayBuffer = await blob.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  console.log(buffer);

  // writeFileSync("pdfs/myfile.pdf", buffer);
};
