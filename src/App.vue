<template>
    <section class="todoapp">
        <header class="header">
            <h1 style="font-size: 20px;top: -50px;">Vue3 + VueCliServer + Webpack5 </h1>
            <input
                v-model="newTodo"
                v-focus
                class="new-todo"
                placeholder="What needs to be done?"
                @keydown.enter="addTodo">
        </header>
        <TodoListEditor
            :todo-list="todoList"
            @remove:todo="removeTodo"
            @update:todo="updateTodo" />
    </section>
</template>

<script setup>
import { ref, unref, computed } from 'vue';
import TodoListEditor from '@/components/TodoListEditor';

const newTodo = ref(undefined);
const todoList = ref(JSON.parse(localStorage.getItem('todo')) || []);
const vFocus = {
    mounted: el => el.focus(),
};
const todoIndexMap = computed(() => (
    unref(todoList).reduce((carry, {id}, idx) => {
        carry[id] = idx;

        return carry;
    }, {})
));

function addTodo() {
    const newTodoValue = unref(newTodo);
    
    if (!newTodoValue) {
        return;
    }

    const item = {
        id: Date.now(),
        value: newTodoValue,
        completed: false,
    };

    todoList.value.push(item);
    newTodo.value = undefined;
    saveToLocalStorage(todoList);
}

function removeTodo(id) {
    const todoListValue = unref(todoList);

    todoListValue.splice(unref(todoIndexMap)[id], 1);
    saveToLocalStorage(todoList);
}

function updateTodo(id, obj) {
    const todoListValue = unref(todoList);
    const idx = unref(todoIndexMap)[id];

    todoListValue[idx] = Object.assign(todoListValue[idx], obj);
    saveToLocalStorage(todoList);
}

function saveToLocalStorage(data) {
    localStorage.setItem('todo', JSON.stringify(unref(data)));
}
</script>
