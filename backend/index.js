// const express = require("express");
// const cors = require("cors");

// const app = express();
// app.use(express.json());
// app.use(cors({ origin: true }));
// app.post("/authenticate", async (req, res) => {
//     const { username } = req.body;
  
//     try {
//       const r = await axios.put(
//         'https://api.chatengine.io/users/',
//           {username: username, secret: username, first_name: username},
//           {headers: {"private-key": "0daec970-8a94-45f6-a0fb-54f14e829d2c"}}
//       );
//       console.log(r); // add this line to log the response object
//       return res.status(r.status).json(r.data);
  
//     } catch (e) {
//       console.log(e); // add this line to log the error object
//       return res.status(e.response.status).json(e.response.data);
  
//     }
  
  
//   });
  



const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(express.json());
app.use(cors({ origin: true }));

const CHAT_ENGINE_PROJECT_ID = "";
const CHAT_ENGINE_PRIVATE_KEY = "";

app.post("/authenticate", async (req, res) => {
  const { username} = req.body;

  // Store a user-copy on Chat Engine!
  // Docs at rest.chatengine.io
  try {
    const r = await axios.post(
      "https://api.chatengine.io/users/",
      { username:username, secret:username, first_name:username },
      { headers: { "Private-Key": "0daec970-8a94-45f6-a0fb-54f14e829d2c"} }
    );
    return res.status(r.status).json(r.data);
  } catch (e) {
    return res.status(e.response.status).json(e.response.data);
  }
});

app.post("/login", async (req, res) => {
  const { username, secret } = req.body;

  // Fetch this user from Chat Engine in this project!
  // Docs at rest.chatengine.io
  try {
    const r = await axios.get("https://api.chatengine.io/users/me/", {
      headers: {
        "Project-ID": CHAT_ENGINE_PROJECT_ID,
        "User-Name": username,
        "User-Secret": secret,
      },
    });
    return res.status(r.status).json(r.data);
  } catch (e) {
    return res.status(e.response.status).json(e.response.data);
  }
});

// vvv On port 3001!
app.listen(3001);