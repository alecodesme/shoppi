<template>
  <div 
    class="product-card"
    :class="{ selected: selected }" 
    @click="toggleSelection"
  >
    <div class="header">
      <h2>{{ product.name }}</h2>
    </div>
    
    <div v-if="product.stock === 0">
      <span class="warning">⚠️ Stock is empty!</span>
    </div>
    <div v-else>
      <p>Stock: {{ product.stock }}</p>
    </div>
    
    <div class="actions">
      <button @click.stop="deleteProduct">Borrar</button>
      <button @click.stop="editProduct">Editarr</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, defineProps, defineEmits } from 'vue';
import type { Product } from '@/interfaces/Product';

const props = defineProps<{ product: Product, canSelect: boolean }>();
const emit = defineEmits(['increaseStock', 'decreaseStock', 'delete', 'toggleSelection', 'edit']);
const selected = ref(false);

const deleteProduct = () => {
  if (props.product.id) {
    emit('delete', props.product.id);
  }
};
const editProduct = () => {
  emit('edit', props.product);
}


const toggleSelection = () => {
  if(props.canSelect){
    selected.value = !selected.value;  
    emit('toggleSelection', props.product);
  }

};
</script>

<style scoped>
.product-card {
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
  width: 220px;
  transition: transform 0.2s, box-shadow 0.2s, background-color 0.3s;
  cursor: pointer;
}

.product-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
}

.header {
  display: flex;
  align-items: center;
  justify-content: center;
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

.selected {
  background-color: #c8f7c5;
  border-color: #27ae60; 
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
