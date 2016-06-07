package com.github.iviireczech.springreact.controller.serialization.jackson;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.databind.SerializerProvider;
import com.fasterxml.jackson.databind.ser.std.StdSerializer;
import com.github.iviireczech.springreact.model.response.ResponseStatus;
import org.springframework.security.oauth2.common.exceptions.OAuth2Exception;

import java.io.IOException;

public class OAuth2ExceptionJackson2Serializer extends StdSerializer<OAuth2Exception> {

    public OAuth2ExceptionJackson2Serializer() {
        super(OAuth2Exception.class);
    }

    @Override
    public void serialize(OAuth2Exception value, JsonGenerator jgen, SerializerProvider provider) throws IOException {
        jgen.writeStartObject();
        jgen.writeStringField("status", ResponseStatus.error.name());
        jgen.writeObjectFieldStart("data");
        jgen.writeStringField("code", value.getOAuth2ErrorCode());
        jgen.writeEndObject();
        jgen.writeStringField("message", value.getMessage());
        jgen.writeEndObject();
    }

}
