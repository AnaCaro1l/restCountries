import { ListCountriesService } from "../services/ListCountriesService";
import { Request, Response } from 'express';
import { GetCountryDetailsService } from "../services/GetCountryDetailsService";

export const listCountries = async (req: Request, res: Response) => {
  try {
    const { name, capital, region } = req.query as {
      name?: string;
      capital?: string;
      region?: string;
    };

    const pageParam = (req.query.page as string) || '1';
    const pageSizeParam = (req.query.pageSize as string) || '12';

    const countries = await ListCountriesService({ name, capital, region });

    const p = Math.max(parseInt(pageParam, 10) || 1, 1);
    const ps = Math.max(parseInt(pageSizeParam, 10) || 12, 1);
    const start = (p - 1) * ps;
    const end = start + ps;
    const total = countries.length;

    res.setHeader('X-Total-Count', String(total));
    return res.json(countries.slice(start, end));
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: (error as Error).message });
  }
};

export const getCountryDetails = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const country = await GetCountryDetailsService(id);
    return res.json(country);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: (error as Error).message });
  }
};
