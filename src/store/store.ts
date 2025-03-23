import { reactive, watch } from 'vue';
import type { Product } from '@/interfaces/Product';

export const productStore = reactive({
    products: [] as Product[],

    init() {
        const storedProducts = JSON.parse(localStorage.getItem('products') || '[]') as Product[];
        this.products = storedProducts.map(product => ({
            ...product,
            available: product.stock > 0,
        }));
    },

    addProduct(product: Product) {
        product.available = product.stock > 0;
        this.products.push(product);
        this.saveToLocalStorage();
    },

    updateProduct(updatedProduct: Product) {
        const index = this.products.findIndex(p => p.id === updatedProduct.id);
        if (index !== -1) {
            updatedProduct.available = updatedProduct.stock > 0;
            this.products[index] = updatedProduct;
            this.saveToLocalStorage();
        }
    },

    increaseStock(id: string) {
        const product = this.products.find(p => p.id === id);
        if (product) {
            product.stock++;
            product.available = true;
            this.saveToLocalStorage();
        }
    },

    addStockToProducts(products: Product[]) {
        products.forEach(newProduct => {
            const product = this.products.find(p => p.id === newProduct.id);
            if (product) {
                product.stock += newProduct.stock;
                product.available = product.stock > 0;
            }
        });
        this.saveToLocalStorage();
    },

    sellProducts(products: Product[]) {
        products.forEach(soldProduct => {
            const product = this.products.find(p => p.id === soldProduct.id);
            if (product && product.stock >= soldProduct.stock) {
                product.stock -= soldProduct.stock;
                product.available = product.stock > 0;
            }
        });
        this.saveToLocalStorage();
    },

    decreaseStock(id: string) {
        const product = this.products.find(p => p.id === id);
        if (product && product.stock > 0) {
            product.stock--;
            product.available = product.stock > 0;
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

productStore.init();

watch(
    () => productStore.products,
    () => {
        productStore.products.forEach(product => {
            product.available = product.stock > 0;
        });
        productStore.saveToLocalStorage();
    },
    { deep: true }
);
