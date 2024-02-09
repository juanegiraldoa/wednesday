import Masto from "mastodon";
import fs from "fs";
import path from "path";
import moment from "moment";

const ROUTE_WEDNESDAY = (path.dirname(new URL(import.meta.url).pathname) + "/images/wednesdaydudes.jpg").substring(1);
const DATE_FORMAT = "YYYY-MM-DD";

export const postWednesday = async () => {
  if (moment().day() === 3) {
    const client = new Masto({ access_token: process.env.MASTODON_ACCESS_KEY });
    const { data } = await client.get("timelines/home", { limit: 1 });
    const lastPostDate = moment(data[0].created_at).format(DATE_FORMAT);
    if (lastPostDate !== moment().format(DATE_FORMAT)) {
      const media = {
        file: fs.createReadStream(ROUTE_WEDNESDAY),
        description: "It is wednesdat, my dudes. Big fat frog.",
      };
      const response = await client.post("media", media);
      client.post("statuses", { media_ids: [response.data.id] });
      return "It's Wednesday My Dudes";
    } else return "Already Posted My Dude";
  } else return "It's Not Wednesday My Dudes";
};
