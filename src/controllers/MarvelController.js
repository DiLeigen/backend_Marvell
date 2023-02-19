import axios from "axios";
import dotenv from "dotenv"

dotenv.config()

class marvelController {
    async get_all_comics(req, res) {
        const response = await axios.get(`https://lereacteur-marvel-api.herokuapp.com/comics?apiKey=${process.env.TOKEN}`,
            {
                headers: {
                    "Content-Type": "application/json"
                }
            });
        return res.json(response.data)
    };

    async get_all_characters(req, res) {
        const response = await axios.get(`https://lereacteur-marvel-api.herokuapp.com/characters?apiKey=${process.env.TOKEN}`, {
            headers: {
                "Content-Type": "application/json"
            }
        });

        return res.json(response.data)
    };

    async get_character_info(req, res) {
        const response = await axios.get(`https://lereacteur-marvel-api.herokuapp.com/character/${req.params.id}?apiKey=${process.env.TOKEN}`, {
            headers: {
                "Content-Type": "application/json"
            }
        });
        return res.json(response.data)
    };

    async get_hero_info(req, res) {
        try {
            const response = await axios.get(`https://lereacteur-marvel-api.herokuapp.com/comics/${req.params.id}?apiKey=${process.env.TOKEN}`, {
                headers: {
                    "Content-Type": "application/json"
                }
            });
            return res.json(response.data)
        } catch (e) {
            console.error(e);
            return res.json({"Error": "Something went wrong!"});
        }
    }

    async search_character(req, res) {
        const character_name  = req.body.data.character_name;

        const response = await axios.get(`https://lereacteur-marvel-api.herokuapp.com/characters?apiKey=${process.env.TOKEN}`, {
            headers: {
                "Content-Type": "application/json"
            }
        });

        if (character_name) {
            const search = (arr, str) => {
                const chars = str.split('');
                return arr.filter(
                    item => chars.every(char => item.name.includes(char)));
            }
            return res.json({"results": search(response.data.results, character_name)});

        } else {
            return res.json(response.data);
        }
    }

    async search_comics(req, res) {
        const comics_name = req.body.data.name;

        try {
            const response = await axios.get(`https://lereacteur-marvel-api.herokuapp.com/comics?apiKey=${process.env.TOKEN}`,
                {
                    headers: {
                        "Content-Type": "application/json"
                    }
                });

            console.log(comics_name)

            if (comics_name) {
                const search = (arr, str) => {
                    const chars = str.split('');
                    return arr.filter(
                        item => chars.every(char => item.title.includes(char)));
                }
                return res.json({"results": search(response.data.results, comics_name)});
            } else {
                return res.json(response.data)
            }

        } catch (e) {
            console.error(e);
            return res.json({"Error": "Something went wrong!"});
        }

    }

    async get_comics_info(req, res) {
        const response = await axios.get(`https://lereacteur-marvel-api.herokuapp.com/comic/${req.params.id}?apiKey=${process.env.TOKEN}`, {
            headers: {
                "Content-Type": "application/json"
            }
        });
        return res.json(response.data)
    }
}

export default new marvelController();