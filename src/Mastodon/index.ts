const BASE_URL = 'https://mastodon.social/api/v1';

const getHeaders = (token: string) => ({ Authorization: `Bearer ${token}` });

const getTimeLine = async (token: string) => {
	const FINAL_URL = `${BASE_URL}/timelines/home?limit=1`;
	const response = await fetch(FINAL_URL, { headers: getHeaders(token) });
	return await response.json();
};

const postStatus = async (token: string, media_ids: string) => {
	const FINAL_URL = `${BASE_URL}/statuses`;
	const formData = new FormData();
	formData.append('media_ids[]', media_ids);
	const response = await fetch(FINAL_URL, { headers: getHeaders(token), body: formData, method: 'POST' });
	return await response.json();
};

const uploadMedia = async (token: string, media: Blob, description: string) => {
	const FINAL_URL = `${BASE_URL}/media`;
	const formData = new FormData();
	formData.append('file', media, 'wednesday.jpg');
	formData.append('description', description);
	const response = await fetch(FINAL_URL, { headers: getHeaders(token), body: formData, method: 'POST' });
	return await response.json();
};

export { getTimeLine, postStatus, uploadMedia };
