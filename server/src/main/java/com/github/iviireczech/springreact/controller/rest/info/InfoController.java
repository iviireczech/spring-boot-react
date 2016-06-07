package com.github.iviireczech.springreact.controller.rest.info;

import com.github.iviireczech.springreact.controller.rest.AbstractRestController;
import com.github.iviireczech.springreact.model.response.Response;
import org.springframework.context.ApplicationContext;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.concurrent.Callable;

@RestController
@RequestMapping("/api")
public class InfoController extends AbstractRestController {

    @RequestMapping(value = "/info", method = RequestMethod.GET)
    public Response<String> test() {
        return getSuccessResponse(getInfo());
    }

    private String getInfo() {
        return "Server running with Spring Boot" + getVersion(getClass()) + ", Spring" + getVersion(ApplicationContext.class);
    }

    private String getVersion(final Class<?> source) {
        return getValue(" v", () -> source.getPackage().getImplementationVersion(), "");
    }

    private String getValue(String prefix, Callable<Object> call, String defaultValue) {
        try {
            Object value = call.call();
            if (value != null && StringUtils.hasLength(value.toString())) {
                return prefix + value;
            }
        }
        catch (Exception ex) {
            // Swallow and continue
        }
        return defaultValue;
    }

}
