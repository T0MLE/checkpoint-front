import {
  AddCountryMutation,
  AddCountryMutationVariables,
  GetCountriesAndContinentsQuery,
} from "@/graphql/schema";
import { gql, useMutation, useQuery } from "@apollo/client";
import Link from "next/link";
import { useEffect, useState } from "react";

const GET_COUNTRIES_AND_CONTINENTS = gql`
  query GetCountriesAndContinents {
    continents {
      id
      name
    }
    countries {
      code
      continent {
        name
        id
      }
      emoji
      id
      name
    }
  }
`;

const ADD_COUNTRY = gql`
  mutation AddCountry($data: NewCountryInput!) {
    addCountry(data: $data) {
      code
      continent {
        id
        name
      }
      emoji
      id
      name
    }
  }
`;

export default function Home() {
  const [formData, setFormData] = useState<AddCountryMutationVariables>({
    data: {
      code: "",
      emoji: "",
      name: "",
      continent: {
        id: 0,
      },
    },
  });

  const [createCountryMutation, { loading, error }] = useMutation<
    AddCountryMutation,
    AddCountryMutationVariables
  >(ADD_COUNTRY);

  const { data, refetch } = useQuery<GetCountriesAndContinentsQuery>(
    GET_COUNTRIES_AND_CONTINENTS
  );

  const createCountry = async () => {
    try {
      await createCountryMutation({ variables: formData });
      refetch();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="mt-16 pb-8 flex flex-wrap">
      <div className="p-4 flex gap-4 justify-center flex-wrap w-full lg:w-4/6">
        {loading && <p className="text-xl">Loading...</p>}
        {data?.countries.map((country) => (
          <Link
            key={country.id}
            href={`/countries/${country.code}`}
            className="flex flex-col justify-center items-center gap-4 w-32 border border-gray-300 p-4 bg-rose-100 hover:bg-rose-200"
          >
            <p>{country.emoji}</p>
            <p className="text-center">{country.name}</p>
          </Link>
        ))}
      </div>
      <div className="w-full lg:w-2/6 max-xl:mt-16 mx-auto p-8 gap-8 flex flex-col items-center justify-center">
        <p className="text-xl text-rose-500">ADD NEW COUNTRY</p>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            createCountry();
          }}
          className="gap-4 flex flex-col items-center justify-center"
        >
          <input
            type="text"
            placeholder="Code"
            value={formData.data.code}
            onChange={(e) =>
              setFormData({
                ...formData,
                data: { ...formData.data, code: e.target.value },
              })
            }
            className="w-full py-2 px-4 border border-rose-300 focus:border-2 focus:border-rose-600 outline-none"
          />
          <input
            type="text"
            placeholder="Name"
            value={formData.data.name}
            onChange={(e) =>
              setFormData({
                ...formData,
                data: { ...formData.data, name: e.target.value },
              })
            }
            className="w-full py-2 px-4 border border-rose-300 focus:border-2 focus:border-rose-600 outline-none"
          />
          <input
            type="text"
            placeholder="Emoji"
            value={formData.data.emoji}
            onChange={(e) =>
              setFormData({
                ...formData,
                data: { ...formData.data, emoji: e.target.value },
              })
            }
            className="w-full py-2 px-4 border border-rose-300 focus:border-2 focus:border-rose-600 outline-none"
          />
          <select
            onChange={(e) =>
              setFormData({
                ...formData,
                data: {
                  ...formData.data,
                  continent: { id: parseInt(e.target.value) },
                },
              })
            }
            className="py-2 px-4 border border-rose-300 focus:border-2 focus:border-rose-600 outline-none"
          >
            <option>--- Choose a continent ---</option>
            {data?.continents.map((continent) => {
              return (
                <option key={continent.id} value={continent.id}>
                  {continent.name}
                </option>
              );
            })}
          </select>
          <button className="bg-rose-500 py-2 px-4 text-white hover:bg-rose-600">
            Add country
          </button>
        </form>
        {error && <p className="text-red-500">{error.message}</p>}
      </div>
    </div>
  );
}
