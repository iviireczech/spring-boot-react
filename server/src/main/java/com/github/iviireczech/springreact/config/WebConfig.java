package com.github.iviireczech.springreact.config;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.github.iviireczech.springreact.controller.serialization.jackson.OAuth2AccessTokenMixIn;
import com.github.iviireczech.springreact.controller.serialization.jackson.OAuth2ExceptionMixIn;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.converter.ByteArrayHttpMessageConverter;
import org.springframework.http.converter.HttpMessageConverter;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.security.oauth2.common.OAuth2AccessToken;
import org.springframework.security.oauth2.common.exceptions.OAuth2Exception;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;

import java.util.List;

@Configuration
public class WebConfig {

    @Bean
    public WebMvcConfigurerAdapter webMvcConfigurerAdapter() {

        return new WebMvcConfigurerAdapter() {

            @Bean
            public MappingJackson2HttpMessageConverter jsonConverter() {
                MappingJackson2HttpMessageConverter jsonConverter = new MappingJackson2HttpMessageConverter();
                jsonConverter.setObjectMapper(extendedObjectMapper());
                return jsonConverter;
            }

            @Override
            public void configureMessageConverters(List<HttpMessageConverter<?>> converters) {
                converters.add(new ByteArrayHttpMessageConverter());
                converters.add(jsonConverter());
                super.configureMessageConverters(converters);
            }

            private ObjectMapper extendedObjectMapper() {
                final ObjectMapper objectMapper = new ObjectMapper();
                objectMapper.addMixIn(OAuth2Exception.class, OAuth2ExceptionMixIn.class);
                objectMapper.addMixIn(OAuth2AccessToken.class, OAuth2AccessTokenMixIn.class);
                return objectMapper;
            }

        };

    }

}
