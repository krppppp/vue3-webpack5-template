<template>
    <section class="todoapp">
        <header class="header">
			<h1>todos</h1>
			<input
                class="new-todo"
                placeholder="What needs to be done?">
		</header>
    </section>
    <footer class="info">
        <p>Double-click to edit a todo</p>
        <p>This <a href="https://todomvc.com/examples/vue/" target="_blank">TodoMVC</a> application was originally created by <a href="http://evanyou.me" target="_blank">Evan You</a>. I rewrite it with Vue3+sfc.</p>
    </footer>
</template>

<style scoped>
@import 'todomvc-app-css/index.css';
@import 'todomvc-common/base.css';
</style>
