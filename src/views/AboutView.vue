<template>
  <div class="my-component">
    <b-row>
      <b-col md="3" v-for="item in items" :key="item.id">
        <b-card class="card">
          <b-card-title class="title">{{ item.item_name }}</b-card-title>
          <img :src="item.item_url" alt="Item Image" class="item-image" />
        
          <b-card-text class="details">{{ item.details }}</b-card-text>
          <b-card-text style="margin-bottom: 3px; color: crimson;">Price Ksh.    {{ item.price }}</b-card-text>
          <div class="icon_btn">
          <i class="fas fa-shopping-cart"></i>
          <b-button class="btn" @click="addToCart(item)">Add to Cart</b-button>
        </div>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import axios from 'axios';
import { useAddedItemStore } from '@/stores/addedItemsStore';

export default {
  name: 'MyComponent',
  data() {
    return {
      items: [],
    };
  },
  computed: {
    cartItemsCount() {
      const store = useAddedItemStore();
      return store.addedItems.length;
    }
  },
  mounted() {
    this.fetchData();
      //retreiving data from the local storage
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      const store = useAddedItemStore();
      store.addedItems = JSON.parse(savedCart); 
    }
  },
  methods: {
    async fetchData() {
      try {
        const response = await axios.get('api/items', this.formData)

        

        this.items = response.data.data;
        console.log('Fetched data:', this.items);

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    },
    addToCart(item) {
  const store = useAddedItemStore();

  // Check if the item is already in the cart
  const existingItem = store.addedItems.find(existing => existing.id === item.id);
  if (existingItem) {
   
    alert('Item already exists in the cart');
  } else {
   
    store.addedItems.push({ ...item, quantity: 1 });
  }
  // Save the entire cart to LocalStorage
  localStorage.setItem('cart', JSON.stringify(store.addedItems));


  // Emit an event to notify other components about the updated cart
  this.$emit('cart-updated');

}


  },
};
</script>

<style scoped>
.my-component {
  font-family:'Times New Roman', Times, serif;
  background-image: url('https://i.pinimg.com/474x/2f/f3/05/2ff3059a3f2b6bd1669dd8169ba61a7e.jpg');
  
  padding: 20px;
}
.full-page {
  height: 100vh; /* Set the height to 100% of the viewport height */
  width: 100%; /* Set the width to 100% */
  /* Add any other styling you need for your component */
}


.details{
  font-size: small;
  margin-bottom: 4px;
}
.card {
  background-color: white;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 4px 8px 0 rgba(0, 0, 0, 0.19);
  width: 100%;
  height: 450px;
  margin-bottom: 20px;
}

.item-image {
  width: 100%;
  height: 250px;
}

.icon_btn {
  display: flex;
  align-items: center;  /* Aligns content vertically */
  margin-bottom: 0px;
}
.icon_btn i{
  margin-right: 30px;
  font-size: 25px; 
  color: rgb(255, 0, 183);
}
.btn{
  background-color:rgb(5, 83, 68);

}
.title{
  color:rgb(117, 6, 61);
  font-size:20px;
}

</style>
