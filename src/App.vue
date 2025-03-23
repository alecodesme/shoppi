<template>
  <div class="page">
    <!-- Mitad izquierda: Grilla de productos -->
    <div class="products-container">
      <div class="search-bar">
        <input v-model="searchQuery" type="text" placeholder="Buscar producto..." />
      </div>
      <div class="product-grid">
        <div v-for="product in filteredProducts" :key="product.id" class="product-item">
          <ProductCard 
            :product="product" 
            :isSelected="selectedProducts.includes(product)"  
            @edit="handleEdit" 
            @delete="handleDelete" 
            @increaseStock="handleIncreaseStock"
            @decreaseStock="handleDecreaseStock"
            @toggleSelection="toggleSelection"
          />
        </div>
      </div>
    </div>

    <!-- Mitad derecha: Lista de productos seleccionados -->
    <div class="selected-products-container">
      <ProductForm
        :productToEdit="productToEdit" 
        @save="handleSave"
      />
      <h3>Productos seleccionados {{ selectedProducts.length }}</h3>
      <ul>
        <li v-for="product in selectedProducts">
          {{ product.name }} - {{ product.stock }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, reactive } from 'vue';
import type { Product } from './interfaces/Product';
import { productStore } from './store/store';
import ProductCard from './components/product-card.vue';
import ProductForm from './components/product-form.vue';

const searchQuery = ref<string>('');
// Usamos reactive para manejar selectedProducts
const selectedProducts = reactive<Product[]>([]); // Aquí usamos reactive para el array de productos
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

// No usamos .value, ya que es un array reactivo directamente
const toggleSelection = (product: Product) => {
  const index = selectedProducts.findIndex(p => p.id === product.id);
  if (index === -1) {
    selectedProducts.push({...product}); // Crear una copia del producto
  } else {
    selectedProducts.splice(index, 1);
  }
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

.products-container, .selected-products-container {
  flex: 1;
  height: 100vh; 
  padding: 10px;
}

.product-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
  overflow-x: auto;
  padding: 10px;
}

.product-item {
  display: flex;
  align-items: center;
  gap: 10px;
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

.selected-products-container {
  background: #f9f9f9;
  padding: 20px;
}
</style>
