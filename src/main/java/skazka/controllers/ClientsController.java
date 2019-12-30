package skazka.controllers;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.webmvc.RepositoryRestController;
import org.springframework.hateoas.CollectionModel;
import org.springframework.hateoas.EntityModel;
import org.springframework.hateoas.Link;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import skazka.repositories.*;

import javax.swing.text.html.parser.Entity;
import java.util.*;

import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.linkTo;
import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.methodOn;
import static org.springframework.web.bind.annotation.RequestMethod.GET;
import static org.springframework.web.bind.annotation.RequestMethod.POST;

@RepositoryRestController
public class ClientsController {



    @Autowired
    private ClazzRepository clazzRepository;

    @Autowired
    private ClientRepository clientRepository;

    @RequestMapping(method = GET, value = "/clazzes/search/findByName")
    public @ResponseBody ResponseEntity<?> findByName(@Param("name") String name) {

        name = name == null ? "" : name;

        Iterable<Clazz> clazz = clazzRepository.findByName(name.toLowerCase());

        Link link = linkTo(methodOn(ClientsController.class).findByName(name)).withSelfRel();

        CollectionModel<Clazz> model = new CollectionModel<Clazz>(clazz, link);

        return ResponseEntity.ok(model);
    }

    @RequestMapping(method = GET, value = "/clients/{id}/withClasses")
    public @ResponseBody ResponseEntity<?> getWithClasses(@PathVariable("id") Long id) {

        Optional<Client> client = clientRepository.findById(id);

        if(!client.isPresent()) {
            return ResponseEntity.notFound().build();
        }

        Link link = linkTo(methodOn(ClientsController.class).getWithClasses(id)).withSelfRel();

        Client c = client.get();

        Iterable<Clazz> clazzes = clazzRepository.findAll(Sort.by("name"));

        List<ClientWithClazzes.HasClazz> hasClazzList = new LinkedList<>();

        for(Clazz clazz : clazzes) {

            boolean hasClazz = c.hasClazz(clazz);
            hasClazzList.add(new ClientWithClazzes.HasClazz(clazz, hasClazz));

        }

        ClientWithClazzes result = new ClientWithClazzes();
        result.setClient(c);
        result.setClazzes(hasClazzList);

        EntityModel<ClientWithClazzes> model = new EntityModel<>(result, link);

        return ResponseEntity.ok(model);

    }

    @RequestMapping(method = POST, value = "clients/withClazzes")
    public @ResponseBody ResponseEntity<?> saveClientWithClasses(@RequestBody ClientWithClazzes data) {

        Client client = data.getClient();

        List<Clazz> clazzes = new LinkedList<>();

        for(ClientWithClazzes.HasClazz hasClazz : data.getClazzes()) {

            if(hasClazz.isHasClazz()) {
                Clazz c = new Clazz();
                c.setId(hasClazz.getClazz().getId());
                clazzes.add(c);
            }

        }

        client.setClazzes(clazzes);

        clientRepository.save(client);

        return ResponseEntity.ok("");
    }
}
