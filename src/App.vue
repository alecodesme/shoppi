<template>
  <div>
    <ProductForm :productToEdit="productToEdit" @save="handleSave" />
    
    <div v-for="product in productStore.products" :key="product.id">
      <ProductCard 
        :product="product" 
        @edit="handleEdit" 
        @delete="handleDelete" 
        @increaseStock="handleIncreaseStock"
        @decreaseStock="handleDecreaseStock"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { Product } from './interfaces/Product';
import { productStore } from './store/store';
import ProductCard from './components/product-card.vue';
import ProductForm from './components/product-form.vue';

const productToEdit = ref<Product | null>(null);

const handleSave = (product: Product) => {
  if (product.id) {
    productStore.updateProduct(product);  
  } else {
    product.id = Date.now().toString();  
    productStore.addProduct(product); 
  }
};


const handleEdit = (product: Product) => {
  productToEdit.value = { ...product };
};

const handleDelete = (id: string) => {
  productStore.deleteProduct(id);
};
const handleIncreaseStock = (id: string) => {
  productStore.increaseStock(id);
};

const handleDecreaseStock = (id: string) => {
  productStore.decreaseStock(id);
};
</script>

<style>
/* Estilos globales aquí */
</style>