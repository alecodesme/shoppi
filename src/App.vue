<template>
  <div class="page">
    <!-- Mitad izquierda: Grilla de productos -->
    <div class="products-container">
      <div class="search-bar">
        <input v-model="searchQuery" type="text" placeholder="Buscar producto..." />
      </div>
      <div class="alert" v-if="viewSelection == 'sell-product' || viewSelection == 'add-stock-to-product'">
        <p>Puedes seleccionar las tarjetas!</p>
      </div>
      <div class="product-grid">
        <div v-for="product in filteredProducts" :key="product.id" class="product-item">
          <ProductCard 
            :product="product" 
            :isSelected="selectedProducts.map(pr => pr.id).includes(product.id)"  
            @edit="handleEdit" 
            @delete="handleDelete" 
            @increaseStock="handleIncreaseStock"
            @decreaseStock="handleDecreaseStock"
            @toggleSelection="toggleSelection"
            :canSelect="viewSelection == 'sell-product' || viewSelection == 'add-stock-to-product'"
          />
        </div>
      </div>
    </div>

    <!-- Mitad derecha: Lista de productos seleccionados -->
    <div class="selected-products-container">
      
      <Menu v-if="viewSelection=='menu-view'" @select-menu-option="(view) => setView(view)"/>
      <div v-if="viewSelection=='add-product'">
        <ProductForm 
          :productToEdit="productToEdit" 
          @save="handleSave"
        />
        <button @click="() => setView('menu-view')">regresar</button>
      </div>
      <div v-if="viewSelection=='sell-product'">
        <ul>
          <li v-for="product in selectedProducts">
            {{ product.name }} - {{ product.stock }}
            <button @click="increaseStock(product.id)">+</button>
            <button @click="decreaseStock(product.id)" :disabled="product.stock <= 0">-</button>
          </li>
        </ul>
        
        <button @click="() => sellProducts()">Vender</button>
        <button @click="() => setView('menu-view')">regresar</button>
      </div>
      <div v-if="viewSelection=='add-stock-to-product'">
        <ul>
          <li v-for="product in selectedProducts">
            {{ product.name }} - {{ product.stock }}
            <button @click="increaseStock(product.id)">+</button>
            <button @click="decreaseStock(product.id)" :disabled="product.stock <= 0">-</button>
          </li>
        </ul>
        <button @click="() => saveStock()">Guardar</button>
        <button @click="() => setView('menu-view')">regresar</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, reactive } from 'vue';
import type { Product } from './interfaces/Product';
import { productStore } from './store/store';
import ProductCard from './components/product-card.vue';
import ProductForm from './components/product-form.vue';
import Menu from './components/menu.vue';

type ViewSelection = 'menu-view' | 'add-product' | 'sell-product' | 'add-stock-to-product';

const searchQuery = ref<string>('');
const selectedProducts = reactive<Product[]>([]);
const productToEdit = ref<Product | null>(null);
const viewSelection = ref<ViewSelection>('menu-view');

const handleSave = (product: Product) => {
  if (product.id) {
    productStore.updateProduct(product);  
    setView('menu-view')
  } else {
    product.id = Date.now().toString();  
    productStore.addProduct(product); 
    setView('menu-view')
  }
};

const setView = (view: ViewSelection) => {
  viewSelection.value = view;
};

const handleEdit = (product: Product) => {
  setView('add-product')
  productToEdit.value = { ...product };
};

const handleDelete = (id: string) => {
  productStore.deleteProduct(id);
};
const saveStock = () => {
  productStore.addStockToProducts(selectedProducts)
  selectedProducts.length = 0
  setView('menu-view')
}
const sellProducts = () => {
  productStore.sellProducts(selectedProducts)
  selectedProducts.length = 0
  setView('menu-view')
}
const handleIncreaseStock = (id: string) => {
  productStore.increaseStock(id);
};

const handleDecreaseStock = (id: string) => {
  productStore.decreaseStock(id);
};

const increaseStock = (id: string) => {
  const product = selectedProducts.find(p => p.id === id);
  if (product) product.stock++;
};

const decreaseStock = (id: string) => {
  const product = selectedProducts.find(p => p.id === id);
  if (product && product.stock > 0) product.stock--;
};

const toggleSelection = (product: Product) => {
  const index = selectedProducts.findIndex(p => p.id === product.id);
  if (index === -1) {
    selectedProducts.push({...product, stock: 0});
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
.alert {
  background-color: #c8f7c5;
  border-color: #27ae60;
  color: green;
  padding-left: 10px;
  padding-top: 5px;
  padding-right: 10px;
  padding-bottom: 5px;
  border-radius: 10px;
  margin-top: 10px;
  font-weight: 700;
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
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
