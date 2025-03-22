// src/store/productStore.ts
import { reactive, watch } from 'vue';
import type { Product } from '@/interfaces/Product';

export const productStore = reactive({
    products: [] as Product[],

    // Inicializa los productos desde localStorage
    init() {
        const storedProducts = JSON.parse(localStorage.getItem('products') || '[]') as Product[];
        this.products = storedProducts;
    },

    addProduct(product: Product) {
        this.products.push(product);
        this.saveToLocalStorage();
    },

    updateProduct(updatedProduct: Product) {
        const index = this.products.findIndex(p => p.id === updatedProduct.id);
        if (index !== -1) {
            this.products[index] = updatedProduct;
            this.saveToLocalStorage();
        }
    },

    deleteProduct(id: string) {
        this.products = this.products.filter(product => product.id !== id);
        this.saveToLocalStorage();
    },

    saveToLocalStorage() {
        localStorage.setItem('products', JSON.stringify(this.products));
    }
});

// Inicializar productos al cargar la página
productStore.init();

// Sincroniza los cambios en products con localStorage
watch(() => productStore.products, () => productStore.saveToLocalStorage(), { deep: true });
