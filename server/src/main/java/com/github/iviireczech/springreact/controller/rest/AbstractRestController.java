package com.github.iviireczech.springreact.controller.rest;

import com.github.iviireczech.springreact.model.response.Response;
import com.github.iviireczech.springreact.model.response.ResponseStatus;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.Collection;

public abstract class AbstractRestController {

    protected <T> Response<T[]> getSuccessResponse(final Collection<T> collection) {
        @SuppressWarnings("unchecked")
        final T[] data = (T[]) (collection.toArray());
        return new Response<>(ResponseStatus.success, data, null);
    }

    protected <T> Response<T> getSuccessResponse(final T element) {
        return new Response<>(ResponseStatus.success, element, null);
    }

    @ExceptionHandler(Throwable.class)
    @ResponseBody
    public HttpEntity generalExceptionHandler(final Throwable throwable) {

        final HttpStatus status;
        if (throwable instanceof AccessDeniedException) {
            status = HttpStatus.FORBIDDEN;
        } else {
            status = HttpStatus.BAD_REQUEST;
        }

        final Response<String> response = new Response<>(ResponseStatus.error, null, throwable.getMessage());

        return new ResponseEntity<>(response, status);
    }

}
