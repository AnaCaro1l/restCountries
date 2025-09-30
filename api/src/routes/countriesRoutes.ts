import express from 'express';
import { listCountries, getCountryDetails } from '../controllers/countriesController';

const router = express.Router();

router.get('/countries', listCountries);
router.get('/countries/:id', getCountryDetails);

export default router;
