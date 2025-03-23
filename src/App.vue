<template>
  <div class="page">
    <!-- Mitad izquierda: Grilla de productos -->
    <div class="products-container">
      <div class="search-bar">
        <input v-model="searchQuery" type="text" placeholder="Buscar producto..." />
      </div>
      <div class="product-grid">
        <ProductCard 
          v-for="product in filteredProducts" 
          :key="product.id"
          :product="product" 
          @edit="handleEdit" 
          @delete="handleDelete" 
          @increaseStock="handleIncreaseStock"
          @decreaseStock="handleDecreaseStock"
        />
      </div>
    </div>

    <!-- Mitad derecha: Formulario -->
    <div class="form-container">
      <ProductForm :productToEdit="productToEdit" @save="handleSave" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import type { Product } from './interfaces/Product';
import { productStore } from './store/store';
import ProductCard from './components/product-card.vue';
import ProductForm from './components/product-form.vue';

const productToEdit = ref<Product | null>(null);
const searchQuery = ref<string>('');

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

const filteredProducts = computed(() => {
  return productStore.products.filter(product => 
    product.name.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});
</script>

<style scoped>
.page {
  display: flex;
  flex-direction: row;
  height: 100vh;
}

.products-container, .form-container {
  flex: 1;
  height: 100vh; 
}
.product-grid{
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(3, auto);  
  gap: 10px; 
  overflow-x: auto;
  width: 100%;
  max-width: 100vw; 
  padding: 10px;
  white-space: nowrap;
}
.search-bar {
  padding: 10px;
  background: #f1f1f1;
  display: flex;
  justify-content: center;
}

.search-bar input {
  width: 90%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
}
.form-container {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
