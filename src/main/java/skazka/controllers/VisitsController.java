package skazka.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.webmvc.RepositoryRestController;
import org.springframework.hateoas.CollectionModel;
import org.springframework.hateoas.EntityModel;
import org.springframework.hateoas.Link;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import skazka.repositories.*;

import java.util.LinkedList;
import java.util.List;
import java.util.Optional;

import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.linkTo;
import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.methodOn;
import static org.springframework.web.bind.annotation.RequestMethod.GET;

@Controller
public class VisitsController {

    @Autowired
    private VisitsRepository visitsRepository;

    // TODO
    @RequestMapping(method = GET, value = "/api/visits/search/{clazz}/{year}/{month}")
    public @ResponseBody ResponseEntity<?> getVisits(@PathVariable("clazz") Long clazz, @PathVariable("year") Integer year, @PathVariable("month") Integer month) {

        Iterable<Visits> visits = visitsRepository.searchByClazz(clazz, year, month);


        //Link link = linkTo(methodOn(ClientsController.class).getWithClasses(id)).withSelfRel();


        CollectionModel<Visits> model = new CollectionModel<>(visits);

        return ResponseEntity.ok(model);

    }
}
