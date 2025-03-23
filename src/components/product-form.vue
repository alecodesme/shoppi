<template>
  <form @submit.prevent="handleSubmit">
    <input v-model="form.name" placeholder="Product Name" required />
    <input v-model.number="form.price" type="number" placeholder="Price" required />
    <input v-model.number="form.stock" type="number" placeholder="Stock" required />
    <button type="submit">{{ form.id ? 'Update Product' : 'Add Product' }}</button>
    <button v-if="form.id" type="button" @click="resetForm">Cancel</button>
  </form>
</template>

<script setup lang="ts">
import { reactive, defineProps, defineEmits, watch } from 'vue';
import type { Product } from '@/interfaces/Product';

const props = defineProps<{ productToEdit: Product | null }>();
const emit = defineEmits(['save']);

const form = reactive<Product>({
  id: '',
  name: '',
  price: 0,
  stock: 0,
  available: false
});

watch(() => props.productToEdit, (newProduct) => {
  if (newProduct) {
    Object.assign(form, newProduct);
  } else {
    resetForm();
  }
});

const handleSubmit = () => {
  emit('save', { ...form });
  resetForm();
};

const resetForm = () => {
  form.id = '';
  form.name = '';
  form.price = 0;
  form.stock = 0;
};
</script>

<style scoped>
form {
  background: #f9f9f9;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  max-width: 400px;
  width: 400px;
  margin: auto;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

input {
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 16px;
  transition: border 0.3s;
}

input:focus {
  border-color: #007bff;
  outline: none;
}

button {
  padding: 10px;
  font-size: 16px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.3s;
}

button[type="submit"] {
  background: #007bff;
  color: white;
}

button[type="submit"]:hover {
  background: #0056b3;
}

button[type="button"] {
  background: #ddd;
  color: #333;
}

button[type="button"]:hover {
  background: #bbb;
}
</style>
