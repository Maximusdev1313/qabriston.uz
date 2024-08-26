<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import registerPerson from "../../components/registerPerson.vue";
import axios from "axios";
import Map from "../../components/map.vue";
import { useMainStore } from "@/stores/mainStore";
const store = useMainStore();
const person = ref([]);

const cellInfo = ref([]);
const Index = ref(0);

const updateFromLocalStorage = () => {
  const personInfo = JSON.parse(localStorage.getItem("personInfo")) || [];
  const storedCellInfo = JSON.parse(localStorage.getItem("cellInfo")) || [];
  const storedIndex = JSON.parse(localStorage.getItem("index")) || 0;
  person.value = personInfo;
  cellInfo.value = storedCellInfo;
  Index.value = storedIndex;
};
onMounted(() => {
  updateFromLocalStorage();
  window.addEventListener("storage", updateFromLocalStorage);
});

onUnmounted(() => {
  window.removeEventListener("storage", updateFromLocalStorage);
});

const add_to_storage = async () => {
  const personInfo = Object.assign(person.value, cellInfo.value);
  console.log(personInfo);
  try {
    const res = axios.post(`${store.api}persons`, personInfo);
    alert("Muvofaqiyatli bajarildi!");
    // location.reload();
  } catch (error) {
    alert("Xatolik");
    console.log(error);
  }
};
</script>

<template>
  <div>
    <div class="person-info">
      <div class="subtitle">Kiritilgan malumotlar</div>
      <div class="info">
        <div>
          <div class="person-name">Ism: {{ person.name }}</div>
          <div class="person-name">Familyasi: {{ person.surname }}</div>
          <div class="person-name">Otasini ismi: {{ person.middle_name }}</div>
          <div class="person-name">
            Jinsi: {{ person.gender == "male" ? "Erkak" : "Ayol" }}
          </div>
          <div class="person-name">Maxsus raqam: {{ person.number }}</div>
          <div class="person-name">
            Tug'ilgan sana: {{ person.date_of_birth }}
          </div>
          <div class="person-name">
            Vafot etgan sana: {{ person.date_of_death }}
          </div>
        </div>
        <div>
          <div class="age">Yoshi: {{ person.age }}</div>
          <div class="index">Block raqami: {{ Index }}</div>
          <div class="cell-info">Ustun bo'yicha: {{ cellInfo.rows }}</div>
          <div class="cell-info">Kenglik bo'yicha: {{ cellInfo.columns }}</div>
          <button type="button" @click="add_to_storage">Kiritish</button>
        </div>
      </div>
    </div>
    <div class="title title-center">Iltimos dafn qilingan joyni belgilang</div>
    <register-person />
    <Suspense>
      <Map />
    </Suspense>
  </div>
</template>

<style scoped>
.title {
  text-align: center;
  font-weight: bold;
  font-size: large;
  margin: 10px 0;
}
.person-info {
  border: 1px solid #f1f1f1;
}
.subtitle {
  text-align: center;
  font-weight: bolder;
}
.info {
  width: 90%;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
}
button {
  width: 100%;
  height: 30px;
  margin: 15px 0;
  background-color: rgb(78, 78, 177);
  color: #fff;
  border: none;
  border-radius: 15px;
  transition: 0.2s;
}
button:active {
  background-color: rgb(99, 108, 238);
  border: 1px solid rgb(45, 31, 58);
}
</style>
