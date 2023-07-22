package com.codestates.server.movie.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class MovieActors {
    private String actor;
    private String role;

    public static List<MovieActors> movieActors(Movie movie) {
        List<MovieActors> movieActors = new ArrayList<>();

        Iterator<Movie.Actors.Actor> iterator = movie.getActors().getActor().iterator();

        First : while (iterator.hasNext()) {
            boolean isActorFound = false;
            String actor = iterator.next().getActorNm();
            for (Movie.Staffs.Staff staff : movie.getStaffs().getStaff()) {
                if (staff.getStaffNm().equals(actor) && staff.getStaffRole() != "") {
                    movieActors.add(new MovieActors(actor, staff.getStaffRole()));
                    isActorFound = true;
                    continue First;
                }
            }
            if (!isActorFound) {
                movieActors.add(new MovieActors(actor, "출연"));
            }
        }
        return movieActors;
    }
}
