package com.github.iviireczech.springreact.config.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.Ordered;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.oauth2.config.annotation.configurers.ClientDetailsServiceConfigurer;
import org.springframework.security.oauth2.config.annotation.web.configuration.AuthorizationServerConfigurerAdapter;
import org.springframework.security.oauth2.config.annotation.web.configuration.EnableAuthorizationServer;
import org.springframework.security.oauth2.config.annotation.web.configuration.EnableResourceServer;
import org.springframework.security.oauth2.config.annotation.web.configuration.ResourceServerConfigurerAdapter;
import org.springframework.security.oauth2.config.annotation.web.configurers.AuthorizationServerEndpointsConfigurer;
import org.springframework.security.oauth2.config.annotation.web.configurers.ResourceServerSecurityConfigurer;
import org.springframework.security.oauth2.provider.token.TokenStore;
import org.springframework.security.oauth2.provider.token.store.JwtAccessTokenConverter;
import org.springframework.security.oauth2.provider.token.store.JwtTokenStore;

@Configuration
public class OAuth2Config {

    private static final String RESOURCE_ID = "spring-react";

    @Value("${jwt.signing-key}")
    private String signingKey;

    @Bean
    public JwtAccessTokenConverter accessTokenConverter() {
        final JwtAccessTokenConverter converter = new JwtAccessTokenConverter();
        converter.setSigningKey(signingKey);
        return converter;
    }

    @Bean
    public TokenStore tokenStore() {
        return new JwtTokenStore(accessTokenConverter());
    }

    @Configuration
    @EnableAuthorizationServer
    protected static class AuthorizationServerConfig extends AuthorizationServerConfigurerAdapter {

        @Autowired
        @Qualifier("authenticationManagerBean")
        private AuthenticationManager authenticationManager;

        @Autowired
        private TokenStore tokenStore;

        @Override
        public void configure(final ClientDetailsServiceConfigurer clients) throws Exception {
            clients
                    .inMemory()
                    .withClient("web")
                    .secret("6b7b5d6028865dc2901f0b0db64cb291")
                    .authorizedGrantTypes("password", "refresh_token")
                    .authorities("ROLE_WEB")
                    .scopes("read", "write")
                    .resourceIds(RESOURCE_ID);
        }

        @Override
        public void configure(final AuthorizationServerEndpointsConfigurer endpoints) throws Exception {
            endpoints
                    .authenticationManager(authenticationManager)
                    .tokenStore(tokenStore)
                    .getFrameworkEndpointHandlerMapping().setOrder(Ordered.HIGHEST_PRECEDENCE);

        }

    }

    @Configuration
    @EnableResourceServer
    protected static class ResourceServerConfig extends ResourceServerConfigurerAdapter {

        @Autowired
        private TokenStore tokenStore;

        @Override
        public void configure(final ResourceServerSecurityConfigurer resources) throws Exception {
            resources
                    .resourceId(RESOURCE_ID)
                    .tokenStore(tokenStore);
        }

        @Override
        public void configure(final HttpSecurity http) throws Exception {
            http.authorizeRequests()
                    .antMatchers(HttpMethod.GET, "/api/**").access("#oauth2.hasScope('read')")
                    .antMatchers(HttpMethod.POST, "/api/**").access("#oauth2.hasScope('write')")
                    .antMatchers(HttpMethod.PUT, "/api/**").access("#oauth2.hasScope('write')")
                    .antMatchers(HttpMethod.DELETE, "/api/**").access("#oauth2.hasScope('write')");
        }

    }

}