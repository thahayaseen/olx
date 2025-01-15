import { Router } from "express";
import { signup,login } from '../controller/auth'
import {addproduct} from '../controller/addpriduct'
import { home } from "../controller/pages";
import getproduct from '../controller/getproduct'
import uploda from '../config/multer'
const router = Router()
router.get('/getProduct',home)
router.get('/product/:id',getproduct)
router.post('/signup', signup)
router.post('/login', login)
router.post('/addproduct',uploda.single("image"), addproduct)

export default router