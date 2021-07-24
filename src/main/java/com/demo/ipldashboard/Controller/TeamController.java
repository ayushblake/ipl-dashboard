package com.demo.ipldashboard.Controller;

import com.demo.ipldashboard.Repository.MatchRepository;
import com.demo.ipldashboard.Repository.TeamRepository;
import com.demo.ipldashboard.model.Match;
import com.demo.ipldashboard.model.Team;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;


@CrossOrigin
@RestController
public class TeamController {

    @Autowired
    TeamRepository teamRepository;

    @Autowired
    MatchRepository matchRepository;

    @GetMapping("/team")
    public Iterable<Team> getAllTeams()
    {
        return teamRepository.findAll();
    }


    @GetMapping("/team/{teamName}")
    public Team getTeam(@PathVariable String teamName)
    {
        Team team = teamRepository.findByTeamName(teamName);


        team.setMatches(matchRepository.findLatestMatchesByTime(teamName,4));
        System.out.println(team);
        return team;
    }

    @GetMapping("/team/{teamName}/matches")
    public List<Match> getMatchesForTeam(@PathVariable String teamName, @RequestParam Integer year)
    {
        LocalDate startDate = LocalDate.of(year,1,1);
        LocalDate endDate = LocalDate.of(year+1,1,1);

        return this.matchRepository.getMatchesByTeamBetweenDates(teamName, startDate, endDate);
    }

}
