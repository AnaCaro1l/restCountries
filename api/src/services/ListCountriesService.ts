import axios from 'axios';

interface Request {
    name?: string;
    capital?: string;
    region?: string;

}
export const ListCountriesService = async ({ name, capital, region }: Request) => {
  const response = await axios.get(
    'https://restcountries.com/v3.1/independent?status=true&fields=name,capital,population,region,flags,cca3'
  );
;
  const nameQ = name.toLowerCase();
  const capitalQ = capital.toLowerCase();
  const regionQ = region.toLowerCase();

  return response.data.filter((country: any) => {
    const countryName = country?.name?.common.toLowerCase();
    const countryRegion = country?.region.toLowerCase();
    const countryCapitals: string[] = Array.isArray(country?.capital) ? country.capital : [];
    const capitalMatch = capitalQ
      ? countryCapitals.some((c) => c.toLowerCase().includes(capitalQ))
      : true;
    return (
      (nameQ ? countryName.includes(nameQ) : true) &&
      capitalMatch &&
      (regionQ ? countryRegion.includes(regionQ) : true)
    );
  });

};