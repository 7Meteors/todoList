import {observable, action, flow} from "mobx";
import {getList, addTodo, patchTodo, deleteTodo} from '../utils/service'

class TodoList {
    @observable list;
    @observable prev;
    @observable next;
    @observable current;
    @observable ordering;

    constructor() {
        this.list = [];
        this.prev = null;
        this.next = null;
        this.current = 1;
        this.ordering = null;
    }

    fetchList = flow(function* (index, ordering) {
        try {
            let page = this.current;
            let order = this.ordering;
            if (index) {
                page = index;
                this.current = page;
            }
            if (ordering) {
                if (ordering == this.ordering) {
                    if (ordering[0] == '-') {
                        order = ordering.substring(1);
                    } else {
                        order = '-' + ordering;
                    }
                } else {
                    order = ordering;
                }
                this.ordering = order;
            }

            const result = yield getList(page, order);
            console.log(result);
            this.list = result.data.results;
            if (result.data.previous) {
                this.prev = this.current - 1;
            } else {
                this.prev = null;
            }
            if (result.data.next) {
                this.next = this.current + 1;
            } else {
                this.next = null;
            }
        } catch (error) {
            this.state = "error";
        }
    })

    addNewTodo = flow(function* (params, call) {
        try {
            const result = yield addTodo(params);
            this.fetchList();
            call && call();
        } catch (error) {
            this.state = "error";
        }
    })

    patchTodoItem = flow(function* (params, call) {
        try {
            const result = yield patchTodo(params);
            this.fetchList();
            call && call();
        } catch (error) {
            this.state = "error";
        }
    })

    deleteTodoItem = flow(function* (params, call) {
        try {
            const result = yield deleteTodo(params);
            this.fetchList();
            call && call();
        } catch (error) {
            this.state = "error";
        }
    })
}

const todolist = new TodoList();
export default todolist;