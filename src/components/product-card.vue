<template>
  <div class="product-card">
    <h2>{{ product.name }}</h2>
    <p>Stock: {{ product.stock }}</p>
    
    <div class="actions">
      <button @click="decreaseStock" :disabled="product.stock === 0">-</button>
      <button @click="increaseStock">+</button>
    </div>

    <p v-if="product.stock === 0" class="warning">⚠️ Stock is empty!</p>
  </div>
</template>

<script setup lang="ts">
import type { Product } from '@/interfaces/Product';
import { defineProps, defineEmits } from 'vue';

const props = defineProps<{ product: Product }>();
const emit = defineEmits(['increaseStock', 'decreaseStock']);

const increaseStock = () => {

  emit('increaseStock', props.product.id);
};

const decreaseStock = () => {
  if (props.product.stock > 0) {
    emit('decreaseStock', props.product.id);
  }
};
</script>

<style scoped>
.product-card {
  border: 1px solid #ddd;
  padding: 16px;
  border-radius: 8px;
  text-align: center;
  width: 200px;
}

.actions {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-top: 10px;
}

button {
  padding: 6px 12px;
  font-size: 16px;
}

.warning {
  color: red;
  font-weight: bold;
}
</style>
