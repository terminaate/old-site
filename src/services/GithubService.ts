import req, { Response } from '../utils/req';

export type GithubUserProps = {
	avatar_url: string;
	name: string;
	login: string;
	bio: string;
	followers: number;
	location: string;
	blog: string;
}

export type GithubRepoProps = {
	svn_url: string;
	owner: { avatar_url: string };
	full_name: string;
	language: string;
	description: string;
	updated_at: string;
}


class GithubService {
	public static getMe(): Promise<Response<GithubUserProps>> {
		return req('https://api.github.com/users/terminaate');
	}

	public static getMyRepos(): Promise<Response<GithubRepoProps>> {
		return req('https://api.github.com/users/terminaate/repos');
	}
}

export default GithubService;