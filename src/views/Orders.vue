<template>
  <div class="bodyContainer">
  <b-row>
    <b-col md="7">
      <b-card class="card">
        <div v-if="addedItems.length">
          <div v-for="(item, index) in addedItems" :key="item.id" class="item-container">
            <b-row class="item-row">
              <b-col cols="3">
                <img :src="item.item_url" alt="Item Image" class="item-image" />
                <br />
                <b-button
                  class="delete-button"
                  @click="removeItem(item.id)"
                >
                  <font-awesome-icon icon="fa-solid fa-trash" /> Remove from cart
                </b-button>
              </b-col>
              <b-col cols="6">
                <div class="item-name">{{ item.item_name }}</div>
                <div class="item-details" style="text-align: left;">{{ item.details }}</div>

                <img src="@/assets/logo.jpg" class="logo" />

              </b-col>
              <b-col cols="3">
                <b-card-text class="item-price">Price Per Unit <br>Ksh. {{ item.price }}</b-card-text>
                <b-row class="btn-container">
                  <h5 style="color:coral; font-size:7px;">Number of units</h5>
                  <b-col cols="1">
                    <b-button size="sm" class="btn-minus" @click="decrementItemQuantity(item.id)">
                      <font-awesome-icon icon="fa-solid fa-minus" />
                    </b-button>
                  </b-col>
                  <b-col cols="4">
                    <span class="quantity-display" style="color:blue; font-size: 15px ; margin-left: 15px;">{{ item.quantity }}</span>
                      </b-col>
                      <b-col cols="1">
                    <b-button size="sm" class="btn-plus" @click="incrementItemQuantity(item.id)">
                      <font-awesome-icon icon="fa-solid fa-plus" />
                    </b-button>
                  </b-col>
                </b-row>
              </b-col>
            </b-row>
            <hr v-if="index < addedItems.length - 1" />
          </div>
        </div>
      </b-card>
    </b-col>
    <b-col md="5">
      <b-card class="summaryContainer" style="margin-right: 5px;  margin-top: 20px;">
        
        <h5 class="cart">Cart Summary</h5>
        <div class="total-price" >
        Total Price  Ksh:  {{ totalPrice }}
      </div>
      <b-form @submit.prevent="placeOrder">
        <b-form-group label="Customer Name" class="label">
          <b-form-input type="text" v-model="customerName" placeholder="Enter your name" pattern="[A-Za-z\s]+" required></b-form-input>
        </b-form-group>
        <b-form-group label="Phone Number" class="label">
          <b-form-input type="tel" v-model="phoneNumber" placeholder="Enter phone number"
           style="border: 2x solid #530664;" pattern="\d*" required></b-form-input>
        </b-form-group>
        <b-form-group label="Delivery Address" class="label">
        <b-form-select v-model="deliveryAddress">
          <option value="">Select address</option>
          <option value="kahawa_building">Kahawa Building</option>
          <option value="annex_plaza">Annex Plaza</option>
          <option value="emirates_complex">Emirates Complex</option>
        </b-form-select>
      </b-form-group>

      <b-form-group label="Payment Method" class="label">
        <b-form-select v-model="paymentMethod">
          <option value="">Select method</option>
          <option value="mpesa">M-Pesa</option>
          <option value="cod">Cash on Delivery</option>
          <option value="debit_card">Debit Card</option>
        </b-form-select>
      </b-form-group>


        <b-button type="submit" variant="primary" style="margin-bottom: 30px;" class="place-order-button">
          Place Order
        </b-button> <br>
        <a href="/" class="link">>> Continue shopping</a>
      </b-form>
      </b-card>
    </b-col>
  </b-row>
  
</div>
</template>

<script>
import { useAddedItemStore } from '@/stores/addedItemsStore'; // Assuming store location
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faTrash, faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';



import axios from 'axios'

library.add(faTrash, faPlus, faMinus);



export default {
  components: {
    'font-awesome-icon': FontAwesomeIcon,
    
  },
  data() {
    return {
      customerName: '',
      phoneNumber: '',
      deliveryAddress: '',
      paymentMethod: '',
      paymentOptions: [
        { value: '', text: 'Select Payment Method' },
        { value: 'mpesa', text: 'M-Pesa' },
        { value: 'cod', text: 'Cash on Delivery' },
        { value: 'debit_card', text: 'Debit Card' },
      ],
      deliveryOptions: [
        { value: '', text: 'Select Delivery Address' },
        { value: 'kahawa_building', text: 'Kahawa Building' },
        { value: 'annex_plaza', text: 'Annex Plaza' },
        { value: 'emirates_complex', text: 'Emirates Complex' },
      ],
    };
  },
  computed: {
    addedItems() {
      const store = useAddedItemStore();
      return store.addedItems;
      },
      totalPrice() {
      const store = useAddedItemStore();
      return store.getTotalPrice; // This will call the getter from the store
    },
  },
  methods: {
    removeItem(itemId) {
      const store = useAddedItemStore();
      store.removeItem(itemId);
    },
    decrementItemQuantity(itemId) {
      const store = useAddedItemStore();
      store.decreaseItemQuantity(itemId);
    },
    incrementItemQuantity(itemId) {
      const store = useAddedItemStore();
      store.increaseItemQuantity(itemId); // Use the store's action directly
    },
    async placeOrder(event) {
    
        if (!this.customerName || !this.phoneNumber || !this.deliveryAddress || !this.paymentMethod) {
          alert('Please fill in all the fields.');
          return;
        }

       const orderData = {
        customerName: this.customerName,
        phoneNumber: this.phoneNumber,
        deliveryAddress: this.deliveryAddress,
        paymentMethod: this.paymentMethod,
        items: this.addedItems.map((item) => ({
          itemId: item.id,
          quantity: item.quantity,
        })),
        totalPrice: this.totalPrice,
      };
      console.log('Order data to be sent:', orderData);

      try {
        const response = await axios.post('/api/orders', orderData);
        console.log('Order placed successfully:', response.data);
            // Clear cart
          const store = useAddedItemStore();
          store.clearCart();
    
          this.customerName = '';
          this.phoneNumber = '';
          this.deliveryAddress = '';
          this.paymentMethod = '';
          //notify
          this.$notify({
          group: 'foo',
          type: 'success',
          title: 'Order Success',
          text: 'Your order has been placed successfully!'
        });
          
        
      } catch (error) {
        console.error('Error placing order:', error);
        // Handle errors (display error message to user)
      }
    },
      
    },
    continueShop() {
  this.$router.push('/');
},   
  };

</script>

<style scoped>
.bodyContainer{
  background-image: url('https://i.pinimg.com/474x/52/18/93/521893c5eb2758acec2a88beb5ff0fa9.jpg');
  font-family: 'Times New Roman', Times, serif;
}
.card {
  margin-top: 20px;
  margin-left: 5px;
  
}

.item-image {
  margin-top: 5px;
  width: 90%;
  height: 110px;
}
.item-row {
  margin-bottom: 10px;
  height:150px;
}
.item-name {
  font-weight: bold;
}
.item-details {
  margin-top: 5px;
}
.item-price {
  margin-top: 15px;
  color: crimson;
}
.delete-button {
  margin-top: 5px;
  font-size: 10px;
  color:rgb(241, 10, 245);
  background-color: rgb(5, 75, 9);
}
hr {
  border: none;
  height: 2px;
  background-color: #0b74b4c8; /* or any color you prefer */
  margin-top: 10px;
  margin-bottom: 10px;
}
.btn-container{
  margin-top: 40px;
  margin-left: 25px ;
}

.btn-minus{
  background-color: rgb(16, 108, 4);
}
.btn-plus{
  background-color: rgb(16, 108, 4);
}

.logo {
  width: 50px; 
  height: auto;
  margin-left: 3px;
  margin-top: 5px;
  border: 1px solid #cd84ea;
  border-radius: 5px;
}

.summaryContainer{
  background-color: #e8efed;
}

.cart{
  font-family: 'Times New Roman', Times, serif;
  font-weight: bold;
  color:#e7042a;
  font-size: 30px;
  font-style: italic;
}
.total-price {
    font-weight: bold;
    color: rgb(4, 172, 105);
    margin-bottom: 30px;
     margin-left: 5px;
      margin-top: 20px;
  }
  .label {
  display: block;
  margin-left: 10px;
  font-weight: bold; 
  color: #d00bbc; 
  text-align: left;
  margin-right: 0;
}
.form-input:focus {
  border-color: #008cff;
  border-width:2px; /* Replace with your desired color */
  /* You can also adjust other properties like border-width, border-style, etc. */
}


.form-group {
  display: flex;
  align-items: center;
  justify-content: flex-start; 
  margin-bottom: 10px;
}
.form-group label {
  margin-right: 5px; 
  white-space: nowrap; 
}


.form-group input[type="text"],
.form-group input[type="tel"],
.form-group select {
  flex-grow: 1; 
  margin-left: 5px; 
  width: 200px; 
  margin-right: 30px;
  color:rgb(7, 118, 133);
  border: 2x solid #530664; 
  padding: 5px; 
  transition: border-color 0.3s; 
  font-family: 'Times New Roman', Times, serif;
  font-size: 14px;  
}
.form-group input[type="text"]:focus,
.form-group input[type="tel"]:focus,
.form-group select:focus {
  border-color: #007bff; 
  outline: none; 
}
.place-order-button {
  background-color: #4CAF50; 
  color: white; 
  font-family:'Times New Roman', Times, serif;
  font-size: 16px; 
  font-weight: bold;
  font-style: italic;
  padding: 10px 20px; 
  border: none; 
  cursor: pointer; 
  transition: background-color 0.3s; 
  margin-top: 8px;
}

.place-order-button:hover {
  background-color: #2229b6; 
}
.link {
  display: block; 
  margin-top: 5px; 
  margin-right: 5px; 
  margin-bottom: 10px;
  color: crimson; 
  text-decoration: underline; 
  text-align: right; 
}


</style>
