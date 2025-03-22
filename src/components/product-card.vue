<template>
  <div class="product-card">
    <h3>{{ product.name }}</h3>
    <p>Price: ${{ product.price }}</p>
    <p>Stock: {{ product.stock }}</p>
    <p v-if="product.stock === 0" class="out-of-stock">Out of Stock</p>
    <button @click="startEdit">Edit</button>
    <button @click="deleteProduct">Delete</button>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';
import type { Product } from '@/interfaces/Product';

const props = defineProps<{ product: Product }>();
const emit = defineEmits(['edit', 'delete']);

const startEdit = () => {
  emit('edit', props.product);
};

const deleteProduct = () => {
  emit('delete', props.product.id);
};
</script>

<style scoped>
.product-card { border: 1px solid #ddd; padding: 10px; margin: 5px; }
.out-of-stock { color: red; }
</style>