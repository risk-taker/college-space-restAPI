import express from 'express';
const router = express.Router();
import { registerController, loginController, userController, refreshController } from '../controllers';

import { fileController } from '../controllers';

import auth from '../middlewares/auth';

router.post('/register', registerController.register);
router.post('/login', loginController.login);
router.get('/me', auth, userController.me);
router.post('/refresh', refreshController.refresh);
router.post('/logout', auth, loginController.logout);

router.post('/file', fileController.file);
router.get('/files/:id', fileController.getfile);
router.get('/files', fileController.getfiles);




export default router;