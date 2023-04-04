<script setup>
import { ref, onMounted, computed, watch } from "vue";

const todos = ref([]);
const name = ref("");
const input_content = ref("");
const input_category = ref(null);

const todos_asc = computed(() =>
  todos.value.sort((a, b) => {
    return b.createdAt - a.createdAt;
  })
);

const addTodo = () => {
  if (input_content.value.trim() === "" || input_category.value === null) {
    return;
  }
  todos.value.push({
    content: input_content.value,
    category: input_category.value,
    done: false,
    createdAt: new Date().getTime(),
  });

  input_content.value = "";
  input_category.value = null;
};

const removeTodo = (todo) => {
  todos.value = todos.value.filter((t) => t !== todo);
};
console.log("vue 렌더링");
watch(
  todos,
  (newVal) => {
    localStorage.setItem("todos", JSON.stringify(newVal));
  },
  { deep: true } //배열 감지
);
watch(name, (newVal) => {
  console.log("watch 렌더링");
  //변수 입력시 행동
  localStorage.setItem("name", newVal);
});

onMounted(() => {
  name.value = localStorage.getItem("name") || "";
  todos.value = JSON.parse(localStorage.getItem("todos")) || [];
});
</script>

<template>
  <main class="app">
    <section class="greeting">
      <h2 class="title">
        무슨 일을 할거에요?,

        <input type="text" placeholder="이름을 입력해주세요" v-model="name" />
      </h2>
    </section>
    <section class="create-todo">
      <h3>TODO 만들기</h3>
      <form @submit.prevent="addTodo">
        <h4>무슨 일을 할거니?</h4>
        <input
          type="text"
          placeholder="할일을 입력하세요"
          v-model="input_content"
        />
        <h4>목록을 골라줘</h4>
        <div class="options">
          <label>
            <input
              type="radio"
              name="category"
              value="business"
              v-model="input_category"
            />
            <span class="bubble business"></span>
            <div>사적인 일</div>
          </label>

          <label>
            <input
              type="radio"
              name="category"
              value="personal"
              v-model="input_category"
            />
            <span class="bubble personal"></span>
            <div>공적인 일</div>
          </label>
        </div>
        <input type="submit" value="입력" />
      </form>
    </section>

    <section class="todo-list">
      <h3>TODO LIST</h3>
      <div class="list">
        <div
          v-for="todo in todos_asc"
          :class="`todo-item ${todo.done && 'done'}`"
          :key="todo.createdAt"
        >
          <label>
            <input type="checkbox" v-model="todo.done" />
            <span :class="`bubble ${todo.category}`"></span>
          </label>

          <div class="todo-content">
            <input type="text" v-model="todo.content" />
          </div>

          <div class="actions">
            <button class="delete" @click="removeTodo(todo)">삭제</button>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>
