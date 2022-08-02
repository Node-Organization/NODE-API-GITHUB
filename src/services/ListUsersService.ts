
import axios from 'axios';

export class ListUsersService {
    async execute(nameuser:string) {

        const user = await axios.get(`https://api.github.com/users/${nameuser}`)
        .then(function (res) {
            const response = res.data;
            return {
                "name":       response.name,
                "bio":        response.bio,
                "blog":       response.blog,
                "location":   response.location,
                "avatar_url": response.avatar_url
            };
        })
        .catch(function (error) {
            return error;
        });

        return user;
    }
}