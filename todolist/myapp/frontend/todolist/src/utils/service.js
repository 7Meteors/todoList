import axios from 'axios';

export function getList(index, ordering) {
    let url = 'http://localhost:8000/list/?';
    if (index) {
        url = url + 'page=' + index;
    }
    if (ordering) {
        if (index) {
            url += '&';
        }
        url = url + 'ordering=' + ordering + ',-id';
    } else {
        if (index) {
            url += '&';
        }
        url = url + 'ordering=-id';
    }


    return axios.get(url)
        .then(function (response) {
            return response;
        })
        .catch(function (error) {
            console.log(error);
        })
}

export function addTodo(params) {
    params.status = false;
    params.owner = "zzh";
    return axios.post('http://localhost:8000/list/', params)
        .then(function (response) {
            return response;
        })
        .catch(function (error) {
            console.log(error);
        })
}

export function patchTodo(params) {
    return axios.patch('http://localhost:8000/list/' + params.id + '/', params)
        .then(function (response) {
            return response;
        })
        .catch(function (error) {
            console.log(error);
        })
}

export function deleteTodo(params) {
    return axios.delete('http://localhost:8000/list/' + params.id + '/')
        .then(function (response) {
            return response;
        })
        .catch(function (error) {
            console.log(error);
        })
}