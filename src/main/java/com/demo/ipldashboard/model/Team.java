package com.demo.ipldashboard.model;



import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.*;
import java.util.List;

@Entity
@Getter
@Setter
@ToString
@NoArgsConstructor
public class Team {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long Id;
    private String teamName;
    private Long totalMatches;
    private Long totalWins;

    @Transient
    List<Match> matches;

    public Team(String teamName, Long totalMatches){
        this.teamName = teamName;
        this.totalMatches =totalMatches;
    }
}


