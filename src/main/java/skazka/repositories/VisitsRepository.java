package skazka.repositories;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

public interface VisitsRepository extends CrudRepository<Visits, Visits.Id> {

    @Query("select v from Visits v where clazzId = :clazzId and year = :year and month = :month")
    Iterable<Visits> searchByClazz(@Param("clazzId") Long clazzId, @Param("year") Integer year, @Param("month") Integer month);

}
