import { GetCountryQuery, GetCountryQueryVariables } from "@/graphql/schema";
import { gql, useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import React from "react";

const GET_COUNTRY = gql`
  query getCountry($code: String!) {
    country(code: $code) {
      code
      continent {
        id
        name
      }
      id
      emoji
      name
    }
  }
`;

function Country() {
  const router = useRouter();
  console.log("router", router.query);
  const code = router.query.name as string;

  const { data, loading, error } = useQuery<
    GetCountryQuery,
    GetCountryQueryVariables
  >(GET_COUNTRY, { variables: { code } });

  return (
    <div className="flex flex-col justify-center items-center">
      {loading && <p className="text-xl">Loading...</p>}
      {error && <p className="text-xl">Error</p>}
      {data && (
        <div className="flex flex-col justify-center items-center gap-8 mt-16">
          <p className="text-8xl">{data.country.emoji}</p>
          <h1 className="text-3xl mt-8">
            Name: {data.country.name} ({data.country.code})
          </h1>
          <p className="text-3xl">Continent: {data.country.continent?.name}</p>
        </div>
      )}
    </div>
  );
}

export default Country;
