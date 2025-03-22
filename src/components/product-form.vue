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
form { margin: 10px; }
input { margin: 5px; }
button { margin: 5px; }
</style>