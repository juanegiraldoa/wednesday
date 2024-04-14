import moment from 'moment';
import { getTimeLine, postStatus } from '../Mastodon';

const DATE_FORMAT = 'YYYY-MM-DD';

const postOnWednesday = async (token: string, media_ids: string) => {
	if (moment().day() === 3) {
		const [lastPost]: any = await getTimeLine(token);
		const lastPostDate = moment(lastPost.created_at).format(DATE_FORMAT);
		if (lastPostDate !== moment().format(DATE_FORMAT)) {
			await postStatus(token, media_ids);
			return "It's Wednesday My Dudes";
		} else return 'Already Posted My Dude';
	} else return "It's Not Wednesday My Dudes";
};

export { postOnWednesday };
