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

  const toLower = (v?: string) => (v || '').toLowerCase();
  const nameQ = toLower(name);
  const capitalQ = toLower(capital);
  const regionQ = toLower(region);

  return response.data.filter((country: any) => {
    const countryName = toLower(country?.name?.common);
    const countryRegion = toLower(country?.region);
    const countryCapitals: string[] = Array.isArray(country?.capital) ? country.capital : [];
    const capitalMatch = capitalQ
      ? countryCapitals.some((c) => toLower(c).includes(capitalQ))
      : true;
    return (
      (nameQ ? countryName.includes(nameQ) : true) &&
      capitalMatch &&
      (regionQ ? countryRegion.includes(regionQ) : true)
    );
  });

};