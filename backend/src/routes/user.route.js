import {Router} from 'express'
import { deleteUser, getAllUsers, loginUser, registerUser, updateUserDetails } from '../controllers/user.auth.controller.js'


const router = Router()


router.route("/register").post(registerUser)
router.route("/login").post(loginUser)
router.route("/get").get(getAllUsers)
router.route("/edit/:id").put(updateUserDetails)
router.route("/delete/:id").delete(deleteUser)


export default router;