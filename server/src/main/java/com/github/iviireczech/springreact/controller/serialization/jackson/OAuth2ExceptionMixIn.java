package com.github.iviireczech.springreact.controller.serialization.jackson;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;

@JsonSerialize(using = OAuth2ExceptionJackson2Serializer.class)
public abstract class OAuth2ExceptionMixIn {

}
