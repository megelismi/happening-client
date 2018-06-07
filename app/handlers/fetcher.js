import 'whatwg-fetch';

export const REQUEST_METHOD_GET    = 'GET';
export const REQUEST_METHOD_POST   = 'POST';
export const REQUEST_METHOD_PUT    = 'PUT';
export const REQUEST_METHOD_PATCH  = 'PATCH';
export const REQUEST_METHOD_DELETE = 'DELETE';

class Fetcher {
    get(path) {
        return this.send(path, REQUEST_METHOD_GET);
    }

    post(path, data) {
        return this.send(path, REQUEST_METHOD_POST, data);
    }

    put(path, data) {
        return this.send(path, REQUEST_METHOD_PUT, data);
    }

    patch(path, data) {
        return this.send(path, REQUEST_METHOD_PATCH, data);
    }

    del(path) {
        return this.send(path, REQUEST_METHOD_DELETE);
    }

    send(path, method, data) {
        return fetch(path, this._buildParams(method, data))
            .then(response => {
                if (response.ok) {
                    return response.json();
                }

                if (401 === response.status) {
                    throw new RequestAuthException();
                }

                if (409 === response.status) {
                    throw new RequestConflictException( response.json() );
                }

                if (422 === response.status) {
                    throw new RequestValidationException( response.json() );
                }

                throw new RequestErrorException(response);
            })
        ;
    }

    _buildParams(method, data) {
        let params = {
            method:      method,
            credentials: 'same-origin',
            headers:     {
                'Accept':       'application/json',
                'Content-Type': 'application/json'
            }
        };

        if ('undefined' !== typeof data) {
            params.body = JSON.stringify(data);
        }

        return params;
    }
}

export function RequestAuthException() {}

export function RequestConflictException(data) {
    this.resolve = () => data;
}

export function RequestErrorException(response) {
    this.errorCode = response.status;
    this.errorText = response.statusText;
}

export function RequestValidationException(errors) {
    this.resolve = () => errors;
}

export default new Fetcher();