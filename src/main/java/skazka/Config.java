package skazka;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurer;
import skazka.repositories.Clazz;
import skazka.repositories.Client;

@Configuration
public class Config {

    @Bean
    public RepositoryRestConfigurer repositoryRestConfigurer() {
        return RepositoryRestConfigurer.withConfig(config -> {
            config.exposeIdsFor(Client.class,
                    Clazz.class);
        });
    }

//    @Bean
//    public FreeMarkerViewResolver freemarkerViewResolver() {
//        FreeMarkerViewResolver resolver = new FreeMarkerViewResolver();
//        resolver.setCache(true);
//        resolver.setPrefix("");
//        resolver.setSuffix(".ftl");
//        resolver.setContentType("text/html;charset=UTF-8");
//        return resolver;
//    }
//
//
//    @Bean
//    public FreeMarkerConfigurer freemarkerConfig() {
//        FreeMarkerConfigurer f = new FreeMarkerConfigurer();
//     //   f.setTemplateLoaderPath("./src/main/resources/templates");
//        return f;
//    }
}
