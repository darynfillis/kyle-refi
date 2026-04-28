// netlify/functions/config.js
// Fetches the Excel config from SharePoint and returns it as base64
// so the browser can parse it with SheetJS — no CORS issues.

const SHAREPOINT_URL =
  "https://bettermg-my.sharepoint.com/:x:/g/personal/dfillis_better_com/" +
  "IQCJNtzlnCW2ToaIna3Q2QSpAXqD4sZPDfrEkqHpeJZsfR8?e=K2oex6&download=1";

exports.handler = async function (event, context) {
  try {
    const res = await fetch(SHAREPOINT_URL, {
      redirect: "follow",
      headers: {
        "User-Agent": "Mozilla/5.0",
      },
    });

    if (!res.ok) {
      return {
        statusCode: res.status,
        body: JSON.stringify({ error: `SharePoint returned ${res.status}` }),
      };
    }

    const buffer = await res.arrayBuffer();
    const base64 = Buffer.from(buffer).toString("base64");

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Cache-Control": "no-cache",
      },
      body: JSON.stringify({ data: base64 }),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message }),
    };
  }
};
