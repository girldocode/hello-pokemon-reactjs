import React, { useMemo, useState } from "react";
import { useQuery } from "react-query";
import { BeatLoader } from "react-spinners";
import pokeImg from "../assets/klipartz.com.png";
import loadingImg from "../assets/loading.png";
import { CardList, Header, Pagination, PokemonTypes } from "../components";
import { HomeLayout } from "../layouts";
import { ApiGetPokemon } from "../services/pokemon.service";

function Home() {
  const [currentPage, setCurrentPage] = useState(1);
  const [type, setType] = useState();
  const cardsPerPage = 6;

  const PokemonList = async () => {
    try {
      const res = await ApiGetPokemon({
        offset: (currentPage - 1) * cardsPerPage,
        limit: cardsPerPage,
      });
      return Promise.resolve(res);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const {
    data: pokemonData,
    isLoading,
    isError,
  } = useQuery(["PokemonList", currentPage], PokemonList, {
    refetchOnWindowFocus: false,
  });

  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

  const computedPokemons = useMemo(() => {
    if (!pokemonData) return [];

    return pokemonData.pokemons.filter((pokemon) =>
      type ? pokemon.types?.includes(type) : true
    );
  }, [pokemonData, type]);

  return (
    <>
      <Header />
      <HomeLayout>
        <PokemonTypes setType={setType} />
        {isLoading ? (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              marginTop: "15rem",
              marginBottom: "15rem",
            }}
          >
            <img
              src={loadingImg}
              alt="loading"
              style={{ width: "70px", marginBottom: "0.50rem" }}
            />
            <BeatLoader color="#2D70B7" loading={isLoading} size={15} />
          </div>
        ) : (
          <>
            {computedPokemons.length === 0 ? (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "column",
                  marginTop: "10rem",
                  marginBottom: "10rem",
                }}
              >
                <img
                  src={pokeImg}
                  style={{
                    width: "50px",
                    marginBottom: "0.50rem",
                  }}
                />
                <p
                  style={{
                    textAlign: "center",
                    color: "#621F0E",
                    fontSize: "13px",
                    marginTop: "10px",
                  }}
                >
                  The type you seek isn't here on this page
                </p>
              </div>
            ) : (
              <CardList pokemons={computedPokemons} />
            )}
            <Pagination
              currentPage={currentPage}
              totalPages={Math.ceil(pokemonData?.count / cardsPerPage)}
              onPageChange={handlePageChange}
            />
          </>
        )}
      </HomeLayout>
      {isError && <p>Error fetching data</p>}
    </>
  );
}

export default Home;
