const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();

app.use(cors());

let response = null;
let info = null;
new Promise(async (resolve, reject) => {
  try {
    response = await axios.get(
      "https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest",
      {
        headers: {
          "X-CMC_PRO_API_KEY": "13fb332a-a0ce-49ba-8b8d-234dde93f9d8",
        },
      }
    );
  } catch (ex) {
    response = null;
    // error
    console.log(ex);
    reject(ex);
  }
});

app.get("/crypto", (req, res) => {
  res.send(response.data);
});

app.get("/crypto/info/:id", (req, res) => {
  let id = req.params.id;
  new Promise(async (resolve, reject) => {
    try {
      info = await axios.get(
        `https://pro-api.coinmarketcap.com/v1/cryptocurrency/info?id=${id}`,
        {
          headers: {
            "X-CMC_PRO_API_KEY": "13fb332a-a0ce-49ba-8b8d-234dde93f9d8",
          },
        }
      );
      res.send(info.data);
    } catch (ex) {
      info = null;
      // error
      console.log(ex);
      reject(ex);
    }
  });
});

app.listen(process.env.PORT || 3000, () =>
  console.log("API server running...")
);
