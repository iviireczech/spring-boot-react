package com.github.iviireczech.springreact.model.response;

public class Response<T> {

    private final ResponseStatus status;
    private final T data;
    private final String message;

    public Response(final ResponseStatus status, final T data, final String message) {
        this.status = status;
        this.data = data;
        this.message = message;
    }

    public ResponseStatus getStatus() {
        return status;
    }

    public T getData() {
        return data;
    }

    public String getMessage() {
        return message;
    }

}
