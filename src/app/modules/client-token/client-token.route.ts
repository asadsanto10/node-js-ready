import express from 'express';
import { getClientTokenFromBt } from './client-token.controller';

const router = express.Router();

router.get('/', getClientTokenFromBt);

export const clientTokenRoute = router;
