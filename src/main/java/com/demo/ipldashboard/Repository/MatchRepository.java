package com.demo.ipldashboard.Repository;

import com.demo.ipldashboard.model.Match;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;


import java.time.LocalDate;
import java.util.List;

public interface MatchRepository extends CrudRepository<Match,Long> {

    public List<Match> findByTeam1OrTeam2OrderByDateDesc(String teamName1, String teamName2, Pageable pageable);

//    public List<Match> findByTeam1AndDateBetweenOrTeam2AndDateBetweenOrderByDateDesc(String teamName1, LocalDate date1, LocalDate date2, String teamName2, LocalDate date3, LocalDate date4);

    @Query("select m from Match m where(m.team1 = :teamName or m.team2 = :teamName) and m.date between :dateStart and :dateEnd order by date desc")
    public List<Match> getMatchesByTeamBetweenDates(@Param("teamName") String teamName, @Param("dateStart") LocalDate startDate, @Param("dateEnd") LocalDate endDate);

    default List<Match> findLatestMatchesByTime(String teamName, int pageSize){

        return findByTeam1OrTeam2OrderByDateDesc(teamName,teamName, PageRequest.of(0, pageSize));

    }
}
