package skazka.repositories;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;

public interface ClazzRepository extends PagingAndSortingRepository<Clazz, Long> {


    @Query("select c from Clazz c where lower(name) like %:name%")
    Iterable<Clazz> findByName(@Param("name") String name);
}
