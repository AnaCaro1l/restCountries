import axios from 'axios';

interface Request {
    name?: string;
    capital?: string;
    region?: string;

}
export const ListCountriesService = async ({ name, capital, region }: Request) => {
  const response = await axios.get(
    'https://restcountries.com/v3.1/independent?status=true&fields=name,capital,population,region'
  );

  return response.data.filter((country: any) => {
    return (
      (name ? country.name.common.includes(name) : true) &&
      (capital ? country.capital.includes(capital) : true) &&
      (region ? country.region.includes(region) : true)
    );
  });

};