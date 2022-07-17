<template>
    <section
        v-show="todoList.length"
        class="main">
        <ul class="todo-list">
            <li                    
                v-for="{id, value, completed}, idx in todoList"
                :key="id"
                :class="{completed, editing: idx == editIdx}"
                class="todo">
                <div class="view">
                    <input
                        type="checkbox"
                        class="toggle"
                        :checked="completed"
                        @input="updateCompleteStatus(idx, !completed)">
                    <label
                        @dblclick="setEditTodo(idx, value)"
                        v-text="value" />
                    <button
                        class="destroy"
                        @click="removeTodoItem(id)" />
                </div>
                <input
                    v-model="editTodo"
                    v-focus="idx == editIdx"
                    class="edit"
                    type="text"
                    @blur="saveTodoItem"
                    @keydown.enter="$event.target.blur()"
                    @keydown.esc="cancelEdit">
            </li>
        </ul>
    </section>
</template>

<script setup>
import { ref, unref } from 'vue';

const props = defineProps({
    todoList: {
        required: true,
        type: Array,
    },
});
const emit = defineEmits(['remove:todo', 'update:todo-list']);
const editTodo = ref(undefined);
const editIdx = ref(undefined);
const vFocus = (el, binding) => {
    if (binding.value) {
        el.focus();
    }
};

function removeTodoItem(id){
    emit('remove:todo', id);
}

function setEditTodo(idx, value) {
    editIdx.value = idx;
    editTodo.value = value;
}

function getUpdateTodoList(idx, value) {
    const todoList = props.todoList;
    const item = todoList[idx];

    todoList[idx] = {
        ...item,
        ...value,
    };

    return todoList;
}

function updateCompleteStatus(idx, completed) {
    emit('update:todo-list', getUpdateTodoList(idx, {completed}));
}

function saveTodoItem() {
    const idx = unref(editIdx);
    const value = unref(editTodo);

    if (idx === undefined || !value) {
        return;
    }

    emit('update:todo-list', getUpdateTodoList(idx, {value}));
    setEditTodo(undefined, undefined);
}

function cancelEdit() {
    setEditTodo(undefined, undefined);
}
</script>