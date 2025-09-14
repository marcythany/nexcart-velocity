const fs = require('fs');

// Read the temp_products.json
const rawData = fs.readFileSync('temp_products.json', 'utf8');
const products = JSON.parse(rawData);

// Function to map category
function mapCategory(category) {
	const categoryMap = {
		"men's clothing": 'Clothing',
		"women's clothing": 'Clothing',
		jewelery: 'Home & Kitchen', // or create a new category, but for now map to existing
		electronics: 'Electronics',
	};
	return categoryMap[category] || 'Home & Kitchen'; // default
}

// Transform products
const transformedProducts = products.map((product) => ({
	id: product.id.toString(),
	name: product.title,
	price: product.price,
	originalPrice: undefined, // or set to price * 1.2 for some
	rating: product.rating.rate,
	reviewCount: product.rating.count,
	image: product.image,
	images: [product.image], // duplicate for now
	description: product.description,
	category: mapCategory(product.category),
	inStock: true,
	isNew: Math.random() > 0.7, // random for variety
	isOnSale: Math.random() > 0.8, // random
	variants: [],
	tags: [product.category.replace(/'/g, '').replace(/\s+/g, '-')], // simple tags
	createdAt: new Date(),
	updatedAt: new Date(),
}));

// Generate the export string
const exportString = `export const mockProducts: MockProduct[] = ${JSON.stringify(transformedProducts, null, 2)};`;

// Write to a new file
fs.writeFileSync('transformed-products.ts', exportString);

console.log('Transformed products saved to transformed-products.ts');
