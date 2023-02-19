import { Router } from "express";
import token from "../middleware/token.js"
import userController from "../controllers/UserController.js";
import marvelController from "../controllers/MarvelController.js";

const router = Router();

router.get("/get/all/comics", marvelController.get_all_comics);
router.get("/get/all/characters", marvelController.get_all_characters);
router.get("/get/character/info/:id", marvelController.get_character_info)
router.get("/get/favorites", token, userController.get_favorites)
router.get("/get/hero/info/:id", marvelController.get_hero_info)
router.get("/get/favorites/comics", token, userController.get_favorites_comics)
router.get("/get/comics/info/:id", marvelController.get_comics_info)
router.post("/search/character", marvelController.search_character)
router.post("/search/comics", marvelController.search_comics)
router.post("/registration", userController.registration);
router.post("/authorization", userController.login);
router.post("/favorites/comics/add/:id", token, userController.add_favorites_comics)
router.post("/favorites/add/:id", token, userController.add_favorites);
router.post("/favorites/delete/all", token, userController.delete_all_from_favorites);
router.delete("/favorites/comics/delete/:id", token, userController.delete_favorites_comics)
router.delete("/favorites/delete/:id", token, userController.delete_favorites);

export default router;