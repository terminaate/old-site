import useFetch from '../hooks/useFetch';

class GithubService {
	getMe() {
		return useFetch("https://api.github.com/users/terminaate")
	}

	getMyRepos() {
		return useFetch("https://api.github.com/users/terminaate/repos")
	}
}

export default new GithubService()