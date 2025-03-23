<template>
  <div class="product-card">
    <h2>{{ product.name }}</h2>
    <div v-if="product.stock === 0">
      <span class="warning">⚠️ Stock is empty!</span>
    </div>
    <div v-else>
      <p>Stock: {{ product.stock }}</p>
    </div>
    
    <div class="actions">
      <button @click="decreaseStock" :disabled="product.stock === 0">-</button>
      <button @click="increaseStock">+</button>
    </div>

    <button @click="deleteProduct">borrar</button>
  </div>
</template>

<script setup lang="ts">
import type { Product } from '@/interfaces/Product';
import { defineProps, defineEmits } from 'vue';

const props = defineProps<{ product: Product }>();
const emit = defineEmits(['increaseStock', 'decreaseStock','delete']);

const increaseStock = () => {

  emit('increaseStock', props.product.id);
};

const decreaseStock = () => {
  if (props.product.stock > 0) {
    emit('decreaseStock', props.product.id);
  }
};
const deleteProduct = () => {
  if(props.product.id) {
    emit('delete', props.product.id)
  }
}
</script>

<style scoped>
.product-card {
  background: #fff;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
  width: 220px;
  transition: transform 0.2s, box-shadow 0.2s;
}

.product-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
}

h2 {
  font-size: 18px;
  color: #333;
  margin-bottom: 10px;
}

p {
  font-size: 16px;
  color: #666;
}

.warning {
  color: red;
  font-weight: bold;
}

.actions {
  display: flex;
  justify-content: center;
  gap: 12px;
  margin-top: 10px;
}

button {
  padding: 8px 14px;
  font-size: 16px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background 0.3s, transform 0.2s;
}

button:disabled {
  background: #ccc;
  cursor: not-allowed;
}

button:not(:disabled):hover {
  transform: scale(1.1);
}

button:first-child {
  background: #ff4d4d;
  color: white;
}

button:first-child:hover {
  background: #cc0000;
}

button:last-child {
  background: #4caf50;
  color: white;
}

button:last-child:hover {
  background: #388e3c;
}
</style>
