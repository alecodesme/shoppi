<template>
    <div class="menu-grid">
      <div class="menu-option">
        <button @click="handleAddProduct">Agregar producto</button>
      </div>
      <div class="menu-option">
        <button @click="handleSellProduct">Vender producto</button>
      </div>
      <div class="menu-option">
        <button @click="handleAddStock">Añadir stock</button>
      </div>
      <div class="menu-option empty"></div>
    </div>
  </template>
  
  <script setup lang="ts">
  const emit = defineEmits(['select-menu-option']);
  const handleAddProduct = () => {
    console.log("Agregar producto");
    emit('select-menu-option', 'add-product')
  };
  
  const handleSellProduct = () => {
    console.log("Vender producto");
    emit('select-menu-option', 'sell-product')
  };
  
  const handleAddStock = () => {
    console.log("Añadir stock");
    emit('select-menu-option', 'add-stock-to-product')
  };
  </script>
  
  <style scoped>
  .menu-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 10px;
    padding: 20px;
    height: 50px;
  }
  
  .menu-option {
    background: #f3f3f3;
    padding: 20px;
    text-align: center;
    border-radius: 10px;
    box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.1);
  }
  
  .menu-option button {
    background: #007bff;
    color: white;
    border: none;
    padding: 10px;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;
  }
  
  .menu-option button:hover {
    background: #0056b3;
  }
  
  .empty {
    background: transparent;
    box-shadow: none;
  }
  </style>