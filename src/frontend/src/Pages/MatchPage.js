import { React, useEffect, useState } from 'react';
import { MatchDetailCard } from './../Components/MatchDetailCard';
import { useParams, useLocation } from 'react-router-dom';
import './MatchPage.scss'
import { YearSelector } from '../Components/YearSelector';

export const MatchPage = () => {

    const [matches, setMatches] = useState([]);

    // const params = new URLSearchParams(window.location.search)
    // const year = params.get('year');
    const search = useLocation().search;
    const year = new URLSearchParams(search).get('year')
    const { teamName } = useParams()

    useEffect(() => {
        const fetchMatches = async () => {
            const response = await fetch(`${process.env.REACT_APP_API_ROOT_URL}/team/${teamName}/matches?year=${year}`)
            const data = await response.json()
            console.log(data)
            setMatches(data)
        }

        fetchMatches()
    }, [teamName, year])



    return (
        <div className="MatchPage">
            <div className="year-selector">
                <h3>Select Year</h3>
                <YearSelector teamName={teamName} />
            </div>
            <div>
                {
                    matches.map(match => <MatchDetailCard key={match.id} match={match} teamName={teamName} />)
                }
            </div>
        </div>
    );
}

