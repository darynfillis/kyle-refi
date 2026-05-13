// netlify/functions/load-config.js
const { getStore } = require("@netlify/blobs");

exports.handler = async function () {
  try {
    const store = getStore("kyle-refi-config");
    const data = await store.get("config");
    if (!data) {
      return {
        statusCode: 200,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Cache-Control": "no-cache",
        },
        body: JSON.stringify({ ok: false, reason: "no config saved yet" }),
      };
    }
    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Cache-Control": "no-cache",
      },
      body: JSON.stringify({ ok: true, config: JSON.parse(data) }),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message }),
    };
  }
};
