import axios from 'axios';

export const GetCountryDetailsService = async (code: string) => {
  // Get main country data by cca3 code
  const fields = [
    'name',
    'population',
    'region',
    'subregion',
    'capital',
    'tld',
    'currencies',
    'languages',
    'borders',
    'flags',
    'cca3',
  ].join(',');

  const { data } = await axios.get(`https://restcountries.com/v3.1/alpha/${code}?fields=${fields}`);
  const country = Array.isArray(data) ? data[0] : data;

  // Resolve border country names if present
  let borderCountries: { code: string; name: string }[] = [];
  if (country?.borders?.length) {
    const borderCodes = country.borders.join(',');
    const { data: bordersData } = await axios.get(
      `https://restcountries.com/v3.1/alpha?codes=${borderCodes}&fields=name,cca3`
    );
    borderCountries = bordersData.map((c: any) => ({ code: c.cca3, name: c.name.common }));
  }

  return { ...country, borderCountries };
};
