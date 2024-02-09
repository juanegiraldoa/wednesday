import Masto from "mastodon";
import fs from "fs";
import path from "path";
import moment from "moment";

const ROUTE_WEDNESDAY = (path.dirname(new URL(import.meta.url).pathname) + "/images/wednesdaydudes.jpg").substring(1);
const DATE_FORMAT = "YYYY-MM-DD";

export const postWednesday = () => {
  const isWednesday = moment().day() === 3;
  if (isWednesday) {
    const client = new Masto({ access_token: process.env.MASTODON_ACCESS_KEY });
    client.get("timelines/home", { limit: 1 }, (_, data) => {
      const lastPostDate = moment(data[0].created_at).format(DATE_FORMAT);
      if (lastPostDate !== moment().format(DATE_FORMAT)) {
        client
          .post("media", {
            file: fs.createReadStream(ROUTE_WEDNESDAY),
            description: "It is wednesdat, my dudes. Big fat frog.",
          })
          .then((response) => {
            const { id } = response.data;
            client.post("statuses", { media_ids: [id] });
            return console.log("It's Wednesday My Dudes");
          });
      } else console.log("Already Posted My Dude");
    });
  } else return "It's Not Wednesday My Dudes";
};
