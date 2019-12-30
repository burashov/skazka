package skazka;

import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

@RestController
public class Index {

    @RequestMapping("/")
    public ModelAndView home(ModelAndView modelAndView) {
        modelAndView.setViewName("index");
        return modelAndView;
    }

}