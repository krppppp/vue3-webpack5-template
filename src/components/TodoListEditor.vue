<template>
    <section
        v-show="todoList.length"
        class="main">
        <ul class="todo-list">
            <li                    
                v-for="todo in todoList"
                :key="todo.id"
                class="todo">
                <div class="view">
                    <input
                        type="checkbox"
                        class="toggle">
                    <label v-text="todo.value" />
                    <button class="destroy" />
                </div>
            </li>
        </ul>
    </section>
</template>

<script setup>
const props = defineProps({
    todoList: {
        required: true,
        type: Array,
    },
});
</script>