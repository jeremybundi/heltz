<template>
  <div class="hd">
    <!-- Input fields and button for searching orders -->
    <div class="search-container">
    <!-- Order Number Field -->
    <div class="search-field">
      <label for="order-number-input" class="search-label">Order Number:</label>
      <input id="order-number-input" v-model="searchOrderNumber" placeholder="Enter order number" type="text" class="search-input">
    </div>

    <!-- Date Field -->
    <div class="search-field">
      <label for="date-input" class="search-label">Date:</label>
      <input id="date-input" v-model="searchDate" type="date" class="search-input">
    </div>

    <!-- Search Button -->
    <b-button @click="fetchOrders" class="search-btn">Search Orders</b-button>
  </div>



    <!-- Existing code for displaying orders -->
    <b-row>
      <b-col md="12">
        <b-card style="color:black;">
          <div v-for="(order) in orders" :key="order.id" class="diso" style="color:black;">
            <b-row>
              <b-col cols="3" class="left-aligned">
                <h2 class="label"><strong>Order ID:</strong>  {{ order.id }}</h2>
                <label class="label"><strong>Name:</strong>  {{ order.customerName }}</label> <br>
                <label class="label"><strong>Phone Number: </strong> {{ order.phoneNumber }}</label> <br>
                <label class="label"><strong>Delivery Address: </strong>{{ order.deliveryAddress }}</label>
              </b-col>
              <b-col cols="6" class="left-aligned" style="padding: 0; margin-bottom: 0;">
                <ul>
                  <li v-for="item in order.items" :key="item.item_url" class="mid">
                    <b-row>
                      <b-col cols="7">
                        <label class="label"><strong>Item Name: </strong>{{ item.item_name }}</label> <br>
                        <label class="label"><strong>Description: </strong>{{ item.details }}</label> <br>
                        <label class="label"><strong>Quantity: </strong>{{ item.quantity }}</label>
                      </b-col>
                      <b-col cols="5">
                        <img :src="item.item_url" alt="Item image" class="img"/>
                      </b-col>
                    </b-row>
                    <!-- Add this line below to insert a horizontal line after each item -->
                    <hr class="item-divider"/>
                  </li>
                </ul>
              </b-col>
              <b-col cols="3" class="left-aligned">
                <label class="label"><strong>Total Price <br> Ksh:</strong> {{ order.totalPrice }}</label> <br>
                <label class="label"><strong>Payment Method</strong> <br> {{ order.paymentMethod }}</label> <br>
                <label class="label"> <strong>Order Date </strong><br> {{ order.createdAt }}</label>
              </b-col>
            </b-row>
          </div>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'OrdersList',
  data() {
    return {
      orders: [],
      searchOrderNumber: '', // Data property for order number
      searchDate: '' // Data property for date
    };
  },
  mounted() {
    this.fetchOrders();
  },
  methods: {
    fetchOrders() {
      // Construct the query parameters based on user input
      const params = new URLSearchParams();
      if (this.searchOrderNumber) params.append('orderNumber', this.searchOrderNumber);
      if (this.searchDate) params.append('startDate', this.searchDate);

      // Make the API call with the query parameters
      axios.get('/api/orders/get', { params })
        .then(response => {
          this.orders = response.data;
        })
        .catch(error => {
          console.error('There was an error fetching the orders:', error);
        });
    }
  }
};
</script>

<style scoped>
.hd{
  background-color:white;
  margin-top:5px;
  margin-left:5px;
  margin-right: 5px;
  margin-bottom: 0;

}
.search-container {
  display: flex;
  align-items: center;
  justify-content: flex-start;
}

.search-field {
  display: flex;
  align-items: center;
  margin-right: 0.5rem; 
}

.search-label {
  margin-right: 50px; 
  margin-left:30px;

}

.search-input {
  margin-right: 0.5rem; 
  width:150px;
}

.search-btn {
  margin-left: 50px;
}

/* Adjustments for smaller screens */
@media (max-width: 768px) {
  .search-container {
    flex-direction: column;
    align-items: flex-start;
  }

  .search-field,
  .search-btn {
    width: 100%;
    margin-bottom: 0.5rem;
  }

  .search-input {
    width: auto; /* Adjust the width as needed */
  }
}
.diso {
  border: 1px solid #ddd;
  padding: 20px;
  color: black;
}

.img {
  width: 110px;
  height: 70%;
}

.mid {
  margin-bottom: 0;
  padding: 0;
}

.left-aligned {
  text-align: left;
}

.label {
  font-size: small;
  margin-bottom: 1px;
}

.item-divider {
  margin-bottom: 1px;
  padding: 0;
}

.b-row,
.b-col {
  margin: 0;
  padding: 0;
}
.input-width {
  width: 10%; /* Adjust the width as needed */
}

</style>