
module.exports = {
  // Configure the development server
  devServer: {
    proxy: {
      // Proxy all requests starting with /api to your backend
      '/api': {
        target: 'http://0.0.0.0:8000', // The backend API is running on localhost:8000
        changeOrigin: true, // Necessary for virtual hosted sites
        pathRewrite: { '^/api': '' }, // Remove the /api prefix before sending to the backend
      },
    },
  },
  // Other configurations can be added here as needed
}; 
