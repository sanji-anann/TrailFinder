// Maps each country in the dataset to its continent. Trails only store
// `country` and `region`, so continent is derived from this table.
// Add new countries here as the dataset grows.
export const COUNTRY_TO_CONTINENT = {
  Australia: 'Oceania',
  'New Zealand': 'Oceania',
  Japan: 'Asia',
  'South Korea': 'Asia',
  Malaysia: 'Asia',
  Thailand: 'Asia',
  Taiwan: 'Asia',
  Iceland: 'Europe',
}

// Fall back to 'Other' so an unmapped country still filters sensibly
// instead of disappearing from the continent list.
export function continentForCountry(country) {
  return COUNTRY_TO_CONTINENT[country] ?? 'Other'
}

// Builds the cascading option lists (continents, countries, regions) from the
// trail list, respecting the currently selected continent/country so each
// dropdown only offers choices that lead to results.
export function buildGeographyOptions(trails, { continent, country } = {}) {
  const continents = [...new Set(trails.map((t) => continentForCountry(t.country)))].sort()

  const countries = [
    ...new Set(
      trails
        .filter((t) => !continent || continentForCountry(t.country) === continent)
        .map((t) => t.country),
    ),
  ].sort()

  const regions = [
    ...new Set(
      trails
        .filter((t) => {
          if (country) return t.country === country
          if (continent) return continentForCountry(t.country) === continent
          return true
        })
        .map((t) => t.region),
    ),
  ].sort()

  return { continents, countries, regions }
}

// Region names are unique across countries in this dataset, so a region maps
// unambiguously back to its country — used to auto-fill parent selects.
export function countryForRegion(trails, region) {
  return trails.find((t) => t.region === region)?.country ?? ''
}
