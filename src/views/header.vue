<template>
  <div class="head">

   
    <b-navbar toggleable="lg" type="dark" class="bg-img">
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav class="text-center">

          <b-navbar-nav>

          <img src="@/assets/logo.jpg" class="logo" />

     
          <b-nav-item to="/" class="home">Home</b-nav-item>
        </b-navbar-nav>
       
          <label class="title">Heltz Online Shopping Hub</label>
        </b-navbar-nav>
     

        <b-navbar-nav class="ml-auto">
          <b-nav-item to="/orders" class="side" style="margin-right:20px; color:white">View Cart ({{ cartItemCount }})</b-nav-item>
          
          <b-nav-item to="/login" class="side">Admin</b-nav-item>
         
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
import { useAddedItemStore } from '@/stores/addedItemsStore';
export default {
  data() {
    return {
      username: null
    };
  },
  computed: {
    cartItemCount() {
      return useAddedItemStore().getTotalItems;
    },
  },

}
</script>

<style scoped>
.bg-img {
  background-image: url("https://th.bing.com/th/id/OIP.PnSZs4XgeXCCuIokWHEdNAHaAb");
  min-height: 30px;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  position: relative;
}
.title {
  color: #dbf1ee;
  font-size: 20px;
  font-weight: bold;
  text-align: center;
  font-family: 'Times New Roman', Times, serif;
  margin-left: 300px;
  margin-right: 150px;
}
.home{
  text-align:center;
  margin-top: 10px;
  margin-left:15px;
}
.logo {
  width: 60px; 
  height: auto;
  margin-right: 10px; 
  margin-left: 5px;
  margin-top:0;
}
</style>
