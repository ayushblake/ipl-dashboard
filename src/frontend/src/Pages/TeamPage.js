import { React, useEffect, useState } from 'react';
import { MatchDetailCard } from './../Components/MatchDetailCard';
import { MatchSmallCard } from './../Components/MatchSmallCard';
import { useParams, Link } from 'react-router-dom';
import { PieChart } from 'react-minimal-pie-chart';

import './TeamPage.scss';

export const TeamPage = () => {

    const [team, setTeam] = useState({ matches: [] })

    const { teamName } = useParams()

    useEffect(() => {
        const fetchTeam = async () => {
            const response = await fetch(`${process.env.REACT_APP_API_ROOT_URL}/team/${teamName}`)
            const data = await response.json()
            console.log(data)
            setTeam(data)
        }

        fetchTeam()
    }, [teamName])

    if (!team.teamName)
        return <h1>Team Not Found</h1>

    return (
        <div className="TeamPage">
            <div className="team-name-section">
                <h1 className="team-name">{team.teamName}</h1>
            </div>
            <div className="win-loss-section">
                <h2>Wins /Losses</h2>
                <PieChart
                    data={[
                        { title: 'Wins', value: team.totalWins, color: ' #4da375' },
                        { title: 'Losses', value: team.totalMatches - team.totalWins, color: '#a34d5d' }
                    ]}
                />
            </div>
            <div className="match-detail-section">
                <h2>Latest Matches</h2>
                <MatchDetailCard match={team.matches[0]} teamName={team.teamName} />
            </div>
            {team.matches.slice(1).map(match => <MatchSmallCard key={match.id} match={match} teamName={team.teamName} />)}
            <div className="more-link">
                <Link to={`/team/${teamName}/matches?year=${process.env.REACT_APP_DATA_END_YEAR}`}>More ></Link>
            </div>
        </div>
    );
}

