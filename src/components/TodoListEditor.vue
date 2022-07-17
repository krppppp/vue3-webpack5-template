<template>
    <section
        v-show="todoList.length"
        class="main">
        <input
            id="toggle-all"
            v-model="isAllTodoCompleted"
            class="toggle-all"
            type="checkbox">
        <label for="toggle-all">
            Mark all as complete
        </label>
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
    <footer
        v-show="todoList.length"
        class="footer">
        <span class="todo-count">
            <strong v-text="remaining" />
            {{ pluralize('item', remaining) }} left
        </span>
        <button
            v-show="todoList.length > remaining"
            class="clear-completed"
            @click="removeCompletedTodo">
            Clear completed
        </button>
    </footer>
</template>

<script setup>
import { ref, unref, computed } from 'vue';

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
const isAllTodoCompleted = computed({
    get: () => {
        return props.todoList.every(({completed}) => completed);
    },
    set: value => {
        props.todoList.forEach((item, idx) => {
            updateCompleteStatus(idx, value);
        });
    },
});
const remaining = computed(() => props.todoList.filter(({completed}) => !completed).length);

function pluralize(word, count) {
    return word + (count <= 1 ? '' : 's');
}

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

function removeCompletedTodo() {
    const todoList = props.todoList;

    emit('update:todo-list', todoList.filter(({completed}) => !completed));
}
</script>