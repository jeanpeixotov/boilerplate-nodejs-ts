import * as axios from 'axios';

export const getFollowerCount = async (login: string) => {
  try {
    const request = axios.default;
    const { data } = await request.get(`https://api.github.com/users/${login}`);
    return { followers: data.followers };
  } catch (error) {
    if (error.response) return { error: 'Error' };

    const { status, data } = error.response;
    if (status === 404) return { error: data };
    else return { error: 'Error' };
  }
};