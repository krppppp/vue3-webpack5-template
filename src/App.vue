<template>
    <section class="todoapp">
        <header class="header">
            <h1>todos</h1>
            <input
                v-model="newTodo"
                v-focus
                class="new-todo"
                placeholder="What needs to be done?"
                @keydown.enter="addTodo">
        </header>
        <TodoListEditor
            :todo-list="todoList"
            @remove:todo="removeTodo" />
    </section>
    <footer class="info">
        <p>Double-click to edit a todo</p>
        <!-- eslint-disable-next-line vue/max-attributes-per-line -->
        <p>This <a href="https://todomvc.com/examples/vue/" target="_blank">TodoMVC</a> application was originally created by <a href="http://evanyou.me" target="_blank">Evan You</a>. I rewrite it with Vue3+sfc.</p>
    </footer>
</template>

<script setup>
import { ref, unref } from 'vue';
import TodoListEditor from 'components/TodoListEditor.vue';

const newTodo = ref(undefined);
const todoList = ref([]);
const vFocus = {
    mounted: el => el.focus(),
};

function addTodo() {
    const item = {
        id: Date.now(),
        value: newTodo.value,
    };

    todoList.value.push(item);
    newTodo.value = undefined;
}

function removeTodo(removeId) {
    const todoListValue = unref(todoList);
    const idx = todoListValue.findIndex(({id}) => removeId == id);

    todoListValue.splice(idx, 1);
    todoList.value = todoListValue;
}
</script>
