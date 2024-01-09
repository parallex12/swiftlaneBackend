import { google } from "googleapis";

const API_KEY = "AIzaSyB7uHq3-va_B4riiRC80EIX6PinnrX49d0";

export const addChannel = async (req, res) => {
  let channelUrl = req?.body?.url;
  var path = channelUrl.split("/");
  path = path[path.length - 1];
  if (!path) {
    res.status(500).send({ msg: "Please Enter Correct URL" });
    return;
  }
  if (path.indexOf("@") === 0) {
    path = path.slice(1);
  }
  try {
    google.youtube("v3").channels.list(
      {
        part: ["snippet,contentDetails,statistics"],
        forUsername: path,
        key: API_KEY,
      },
      function (err, response) {
        if (err) {
          res.status(500).send({ error: err });
          return;
        }
        var channels = response?.data?.items;
        if (channels?.length == 0 || channels === undefined) {
          console.log("No channel found.");
          res.send({ msg: "No Channel Found", data: null });
        } else {
          console.log(channels[0]?.snippet?.title);
          res.send({
            msg: "success",
            data: {
              id: channels[0]?.id,
              title: channels[0]?.snippet?.title,
              totalViews: channels[0]?.statistics?.viewCount,
            },
          });
        }
      }
    );
  } catch (e) {
    console.log(e.message);
    res.sendStatus(500);
    res.end();
  }
};
