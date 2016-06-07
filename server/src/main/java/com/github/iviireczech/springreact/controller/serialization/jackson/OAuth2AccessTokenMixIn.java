package com.github.iviireczech.springreact.controller.serialization.jackson;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;

@JsonSerialize(using = OAuth2AccessTokenJackson2Serializer.class)
public abstract class OAuth2AccessTokenMixIn {

}
