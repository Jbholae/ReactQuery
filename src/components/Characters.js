import React, { useState } from 'react'
import { useQuery } from "react-query"
import Character from './Character';

export default function Characters() {

    const [page, setPage] = useState(41);

    const fetchCharacters = async ({ queryKey }) => {
        const response = await fetch('https://rickandmortyapi.com/api/character?page=&{queryKey[1]}');
        return response.json();
    };

    const { data, status, isPreviousData } = useQuery(["characters", page], fetchCharacters, {
        keepPreviousData: true
    });

    if (status === "loading") {
        return <div>Loading ...</div>
    }

    if (status === "error") {
        return <div>Error</div>
    }

    return (
        <div className='characters'>
            {data.results.map(characters => (
                <Character character={characters} />
            ))}
            <div>
                <button disabled={page === 1}
                    onClick={() => {
                        setPage((oldPage) => oldPage - 1)
                    }}>Previous</button>
                <button disabled={isPreviousData && !data.info.next}
                    onClick={() => {
                        setPage((oldPage) => oldPage + 1)
                    }}>Next</button>
            </div>
        </div>
    )
}
