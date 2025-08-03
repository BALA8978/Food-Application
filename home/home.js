const dishes = [
  // VEG
  { name: "Palak Paneer", category: "veg", img: "photos/paneer.jpg", rating: 4.5, review: "Creamy and delicious!" },
  { name: "Chole Bhature", category: "veg", img: "photos/chole_bathur.jpeg", rating: 4.7, review: "Perfect blend of spices." },
  { name: "Masala Dosa", category: "veg", img: "photos/dosa.jpg", rating: 4.6, review: "Crispy and flavorful!" },
  { name: "Dal Makhani", category: "veg", img: "photos/makhani.jpg", rating: 4.3, review: "Rich and comforting." },
  { name: "Vegetable Biryani", category: "veg", img: "photos/veg_biryani.jpg", rating: 4.4, review: "Aromatic and well-cooked." },
  { name: "Paneer Tikka", category: "veg", img: "photos/paneer_ tikka.jpg", rating: 4.8, review: "Tandoori delight!" },
  { name: "Aloo Gobi", category: "veg", img: "photos/aloo_gubbi.jpg", rating: 4.2, review: "Classic and satisfying." },
  { name: "Pasta Primavera", category: "veg", img: "photos/pasta.jpeg", rating: 4.3, review: "Fresh and vibrant veggies." },
  { name: "Margherita Pizza", category: "veg", img: "photos/margherita_pizza.jpeg", rating: 4.6, review: "Cheesy and crispy crust." },
  { name: "Falafel Wrap", category: "veg", img: "photos/falafel.jpg", rating: 4.1, review: "Great for a light lunch." },
  { name: "Vegetable Korma", category: "veg", img: "photos/veg_kurma.jpg", rating: 4.4, review: "Creamy with a spicy touch." },
  { name: "Baingan Bharta", category: "veg", img: "photos/baingan_bharta.jpg", rating: 4.2, review: "Smoky and rich flavor." },

  // NON-VEG
  { name: "Hyderabadi Chicken Biryani", category: "nonveg", img: "photos/chicken_biryani.jpg", rating: 4.9, review: "Authentic and spicy!" },
  { name: "Butter Chicken", category: "nonveg", img: "photos/butter_chicken.avif", rating: 4.8, review: "Rich butter flavor!" },
  { name: "Rogan Josh", category: "nonveg", img: "photos/rogan-josh.jpg", rating: 4.5, review: "Soft lamb with bold spices." },
  { name: "Goan Fish Curry", category: "nonveg", img: "photos/goan_fish.avif", rating: 4.3, review: "Tangy coconut curry." },
  { name: "Tandoori Chicken", category: "nonveg", img: "photos/tandoori-chicken.jpg", rating: 4.6, review: "Perfectly grilled!" },
  { name: "Seekh Kebab", category: "nonveg", img: "photos/seekh_kabeb.jpg", rating: 4.5, review: "Juicy and smoky taste." },
  { name: "Chicken Tikka Masala", category: "nonveg", img: "photos/chickentikkamasala.jpg", rating: 4.7, review: "Spicy tomato base!" },
  { name: "Grilled Steak", category: "nonveg", img: "photos/grilled_steak.jpg", rating: 4.4, review: "Tender and juicy cut." },
  { name: "Spaghetti Bolognese", category: "nonveg", img: "photos/spaghetti-bolognese.jpeg", rating: 4.3, review: "Meaty and filling." },
  { name: "Sushi", category: "nonveg", img: "photos/sushi.jpeg", rating: 4.5, review: "Fresh and well-rolled!" },
  { name: "Fish and Chips", category: "nonveg", img: "photos/fish_and_chips.jpg", rating: 4.2, review: "Crispy and satisfying." },
  { name: "BBQ Ribs", category: "nonveg", img: "photos/BBQ RIBS.jpeg", rating: 4.7, review: "Fall-off-the-bone good!" },

  // DESSERTS
  { name: "Gulab Jamun", category: "dessert", img: "photos/gulab jamun.jpeg", rating: 4.9, review: "Sweet and soft delight." },
  { name: "Gajar ka Halwa", category: "dessert", img: "photos/gajar-ka-halwa.jpg", rating: 4.8, review: "Warm and tasty!" },
  { name: "Ras Malai", category: "dessert", img: "photos/rasmalai.jpg", rating: 4.7, review: "Creamy and juicy." },
  { name: "Jalebi", category: "dessert", img: "photos/jalebi.jpg", rating: 4.6, review: "Crispy sugar treat!" },
  { name: "Kulfi", category: "dessert", img: "photos/kulfi.webp", rating: 4.5, review: "Cool and traditional." },
  { name: "Cheesecake", category: "dessert", img: "photos/cheesecake.jpg", rating: 4.8, review: "Smooth and rich." },
  { name: "Tiramisu", category: "dessert", img: "photos/tiramisu.jpg", rating: 4.9, review: "Perfect coffee flavor." },
  { name: "Chocolate Lava Cake", category: "dessert", img: "photos/chocolate lava cake.jpeg", rating: 5.0, review: "Molten and heavenly!" },

  // SNACKS
  { name: "Samosa", category: "snack", img: "photos/samosa.jpeg", rating: 4.6, review: "Crunchy and spicy filling." },
  { name: "Pani Puri", category: "snack", img: "photos/pani puri.jpeg", rating: 4.8, review: "Burst of flavors!" },
  { name: "Vada Pav", category: "snack", img: "photos/vada pav.jpeg", rating: 4.3, review: "Mumbai’s favorite." },
  { name: "Pakora", category: "snack", img: "photos/pakora.webp", rating: 4.4, review: "Crispy and hot!" },
  { name: "French Fries", category: "snack", img: "photos/french fries.jpeg", rating: 4.2, review: "Golden and salty." },
  { name: "Nachos", category: "snack", img: "photos/nachos.jpeg", rating: 4.1, review: "Cheesy goodness!" },
  { name: "Spring Rolls", category: "snack", img: "photos/spring rolls.jpeg", rating: 4.3, review: "Crisp and packed." },
  { name: "Dhokla", category: "snack", img: "photos/dhokla.jpeg", rating: 4.5, review: "Soft and tangy." }
];

const container = document.getElementById("menu-container");


function renderDishes(filter = "all") {
  container.innerHTML = "";

  const filtered = filter === "all" ? dishes : dishes.filter(d => d.category === filter);

  filtered.forEach(dish => {
    container.innerHTML += `
      <div class="card">
        <img src="${dish.img}" alt="${dish.name}" onerror="this.src='photos/default.jpg'">
        <div class="card-body">
          <h3>${dish.name}</h3>
          <p class="category">${dish.category.toUpperCase()}</p>
          <p class="rating">⭐ ${dish.rating} / 5</p>
          <p class="review">"${dish.review}"</p>
          <button class="add-to-cart" onclick="addToCart('${dish.name}')">Add to Cart</button>
        </div>
      </div>
    `;
  });
}



function filterDishes(category) {
  renderDishes(category);
}

window.onload = () => renderDishes();

// Example cart logic (can be expanded later)
function addToCart(dishName) {
  alert(`"${dishName}" added to cart!`);
}

