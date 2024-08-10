<script setup>
import { ref, watchEffect } from "vue";
import dialogueMenu from "./dialogMenu.vue";
const toggleEvent = ref(false);
const name = ref("");
const surname = ref("");
const middleName = ref("");
const number = ref("");
const age = ref("");
const gender = ref("");
const dateOfBirth = ref();
const dateOfDeath = ref();

const addClient = () => {
  const personInfo = {
    name: name.value,
    surname: surname.value,
    middle_name: middleName.value,
    number: number.value,
    age: age.value,
    gender: gender.value,
    date_od_birth: dateOfBirth.value,
    date_of_death: dateOfDeath.value,
    cemetery_name: "qorasuv",
  };
  console.log(personInfo);
  localStorage.setItem("personInfo", JSON.stringify(personInfo));
};

const convertDate = (dateParam) => {
  const date = new Date(dateParam);
  const year = date.getFullYear();
  return year;
};
watchEffect(() => {
  if (dateOfDeath.value) {
    age.value = convertDate(dateOfDeath.value) - convertDate(dateOfBirth.value);
  }
});
</script>

<template>
  <div class="container">
    <div class="flex-container" v-if="toggleEvent">
      <dialogueMenu @close="toggleEvent = false">
        <form class="form">
          <div class="title title-center">Mayit qo'shish</div>
          <div class="input-wrapper">
            <input
              type="text"
              name="name"
              id=""
              placeholder="Ismi"
              v-model="name"
            />
            <input
              type="text"
              name="surname"
              id=""
              placeholder="Familyasi"
              v-model="surname"
            />
            <input
              type="text"
              name="middle-name"
              id=""
              placeholder="Otasini ismi(Agar bo'lsa)"
              v-model="middleName"
            />
            <input
              type="text"
              name="number"
              id=""
              placeholder="Raqami"
              v-model="number"
            />

            <select name="choice" v-model="gender" id="gender" required>
              <option value="">Jinsi</option>
              <option value="man" selected>Erkak</option>
              <option value="woman">Ayol</option>
            </select>
            <input
              required=""
              type="text"
              class="form-control"
              placeholder="Tug'ilgan sana"
              onfocus="(this.type='date')"
              v-model="dateOfBirth"
            />
            <input
              required=""
              type="text"
              class="form-control"
              placeholder="Vafot etgan sana"
              onfocus="(this.type='date')"
              v-model="dateOfDeath"
            />
            <div>Yoshi: {{ age }}</div>

            <button type="button" class="submit" @click="addClient">
              Kiritish
            </button>
          </div>
        </form>
      </dialogueMenu>
    </div>

    <div class="wrapper">
      <button
        type="button"
        class="toggle-button"
        @click="toggleEvent = !toggleEvent"
      >
        <span
          class="material-symbols-outlined toggleUpDown"
          :class="{ rotate: toggleEvent }"
        >
          {{ toggleEvent ? "close" : "add" }}
        </span>
      </button>
    </div>
  </div>
</template>
<style scoped>
.title {
  font-size: 20px;
  font-weight: bold;
  text-align: center;
}
.wrapper {
  position: fixed;
  right: 20px;
  top: 87vh;
}
.input-wrapper {
  width: 90%;
  margin: 0 auto;
  height: auto;
  display: flex;
  flex-direction: column;
  gap: 20px;
}
.toggle-button {
  width: 50px;
  height: 50px;
  border: none;
  background-color: var(--vt-c-black-soft);
  color: #fff;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.toggleUpDown {
  transition: transform 0.3s ease-in-out !important;
}

.toggleUpDown.rotate {
  transform: rotate(180deg);
}
.flex-container {
  display: flex;
  justify-content: center;
  align-items: center;
}
.form {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin: 20px 0;
}
input,
#gender {
  height: 30px;
}
.submit {
  width: 100%;
  height: 30px;

  background-color: rgb(78, 78, 177);
  color: #fff;
  border: none;
  border-radius: 15px;
  transition: 0.2s;
}
.submit:active {
  background-color: rgb(99, 108, 238);
  border: 1px solid rgb(45, 31, 58);
}
</style>
