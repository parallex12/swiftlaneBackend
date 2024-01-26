import { google } from "googleapis";

const API_KEY = "AIzaSyB7uHq3-va_B4riiRC80EIX6PinnrX49d0";

const searchChannel = async (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      google.youtube("v3").search.list(
        {
          part: "id,snippet",
          key: API_KEY,
          channelId: id,
          maxResults: 5,
          type: "channel",
        },
        function (err, response) {
          if (err) {
            reject(err?.message);
          }
          var channel = response?.data?.items;
          if (channel?.length == 0 || channel === undefined) {
            // res.send({ msg: "No Channel Found", data: null });
            reject({ msg: "null", channel: null });
          } else {
            resolve({ msg: "success", data: channel });
          }
        }
      );
    } catch (e) {
      console.log(e.message);
      reject(e?.message);
      res.end();
    }
  });
};

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

  path = path.split("?")[0];
  console.log(path);
  try {
    google.youtube("v3").channels.list(
      {
        part: [
          "snippet,contentDetails,statistics,topicDetails,status,id,brandingSettings",
        ],
        forUsername: path,
        key: API_KEY,
      },
      async function (err, response) {
        if (err) {
          res.status(500).send({ error: err?.message });
          return;
        }
        var channels = response?.data?.items;
        console.log(channels);
        if (channels?.length == 0 || channels === undefined) {
          // console.log(searchChannel(path));
          searchChannel(path)
            .then((result) => {
              res?.send(result);
            })
            .catch((e) => {
              res.send({ msg: "No Channel Found", data: null });
            });
        } else {
          res.send({
            msg: "success",
            data: {
              id: channels[0]?.id,
              title: channels[0]?.snippet?.title,
              totalViews: channels[0]?.statistics?.viewCount,
              subscribers: channels[0]?.statistics?.subscriberCount,
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

export const getTopVideosOfChannel = async (req, res) => {
  let channelId = req?.params?.id;
  try {
    google.youtube("v3").search.list(
      {
        part: "id",
        key: API_KEY,
        channelId: channelId,
        maxResults: 5,
        order: "viewCount",
      },
      function (err, response) {
        if (err) {
          res.status(500).send({ error: err });
          return;
        }
        var videos = response?.data?.items;
        if (videos?.length == 0 || videos === undefined) {
          res.send({ msg: "No Video Found", data: null });
        } else {
          let arr = [];
          videos.map((item) => {
            try {
              google.youtube("v3").videos.list(
                {
                  part: "snippet,id,statistics",
                  key: API_KEY,
                  id: item?.id?.videoId,
                },
                function (err, response) {
                  if (err) {
                    res.status(500).send({ error: err });
                    return;
                  }
                  var video = response?.data?.items;

                  if (video?.length == 0 || video === undefined) {
                    res.send({ msg: "No Video Found", data: null });
                  } else {
                    arr.push(video[0]);
                    if (videos.length === arr.length) {
                      res.send({ msg: "success", data: arr });
                      return;
                    }
                    // res.send(videos);
                    // res.send({
                    //   msg: "success",
                    //   // data: {
                    //   //   id: videos[0]?.id,
                    //   //   title: videos[0]?.snippet?.title,
                    //   //   totalViews: videos[0]?.statistics?.viewCount,
                    //   // },
                    //   data: videos,
                    // });
                  }
                }
              );
            } catch (e) {
              res.sendStatus(500);
              res.end();
            }
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

export const getLatestVideosOfChannel = async (req, res) => {
  let channelId = req?.params?.id;
  try {
    google.youtube("v3").search.list(
      {
        part: "id",
        key: API_KEY,
        channelId: channelId,
        maxResults: 5,
        order: "date",
      },
      function (err, response) {
        if (err) {
          res.status(500).send({ error: err });
          return;
        }
        var videos = response?.data?.items;
        if (videos?.length == 0 || videos === undefined) {
          res.send({ msg: "No Video Found", data: null });
        } else {
          let arr = [];
          videos.map((item) => {
            try {
              google.youtube("v3").videos.list(
                {
                  part: "snippet,id,statistics",
                  key: API_KEY,
                  id: item?.id?.videoId,
                },
                function (err, response) {
                  if (err) {
                    res.status(500).send({ error: err });
                    return;
                  }
                  var video = response?.data?.items;

                  if (video?.length == 0 || video === undefined) {
                    res.send({ msg: "No Video Found", data: null });
                  } else {
                    arr.push(video[0]);
                    if (videos.length === arr.length) {
                      res.send({ msg: "success", data: arr });
                      return;
                    }
                    // res.send(videos);
                    // res.send({
                    //   msg: "success",
                    //   // data: {
                    //   //   id: videos[0]?.id,
                    //   //   title: videos[0]?.snippet?.title,
                    //   //   totalViews: videos[0]?.statistics?.viewCount,
                    //   // },
                    //   data: videos,
                    // });
                  }
                }
              );
            } catch (e) {
              res.sendStatus(500);
              res.end();
            }
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

export const getVideoDetails = async (req, res) => {
  let videoId = req?.params?.id;
  try {
    google.youtube("v3").videos.list(
      {
        part: "snippet,id,statistics",
        key: API_KEY,
        id: videoId,
      },
      function (err, response) {
        if (err) {
          res.status(500).send({ error: err });
          return;
        }
        var videos = response?.data?.items;
        if (videos?.length == 0 || videos === undefined) {
          res.send({ msg: "No Video Found", data: null });
        } else {
          res.send({
            msg: "success",
            // data: {
            //   id: videos[0]?.id,
            //   title: videos[0]?.snippet?.title,
            //   totalViews: videos[0]?.statistics?.viewCount,
            // },
            data: videos,
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
