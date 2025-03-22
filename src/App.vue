<template>
  <div>
    <ProductForm :productToEdit="productToEdit" @save="handleSave" />
    
    <div v-for="product in productStore.products" :key="product.id">
      <ProductCard 
        :product="product" 
        @edit="handleEdit" 
        @delete="handleDelete" 
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
    productStore.updateProduct(product);  // Update existing product
  } else {
    product.id = Date.now().toString();  // Generate a new ID for the product
    productStore.addProduct(product);          // Add new product
  }
};

const handleEdit = (product: Product) => {
  productToEdit.value = { ...product };
};

const handleDelete = (id: string) => {
  productStore.deleteProduct(id);
};
</script>

<style>
/* Estilos globales aquí */
</style>