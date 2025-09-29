import { ListCountriesService } from "../services/ListCountriesService";
import { Request, Response } from 'express'

export const listCountries = async (req: Request, res: Response) => {
  try {
    const { name, capital, region } = req.query;
    const countries = await ListCountriesService({
      name,
      capital,
      region,
    });
    return res.json(countries);
  } catch (error) {
    console.log(error)
    return res.status(500).json({ error: error.message });
  }
}
