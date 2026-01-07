import { MenuItem } from './types';

// Helper to create IDs
const id = (prefix: string, idx: number) => `${prefix}-${idx}`;

export const MENU_ITEMS: MenuItem[] = [
  // --- Daily Dishes ---
  {
    id: 'dd-1',
    name: 'Chicken Curry',
    nameAr: 'دجاج بالكاري',
    description: 'Tender chicken breast simmered in rich coconut curry sauce with aromatic spices, served with fluffy white rice.',
    price: 10.00,
    category: 'Daily Dishes',
    availability: ['Daily'],
    imageQuery: 'chicken curry rice',
    imageUrl: 'https://www.foodandwine.com/thmb/8YAIANQTZnGpVWj2XgY0dYH1V4I=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/spicy-chicken-curry-FT-RECIPE0321-58f84fdf7b484e7f86894203eb7834e7.jpg',
    isPopular: true
  },
  {
    id: 'dd-2',
    name: 'Chicken Mushroom',
    nameAr: '',
    description: 'Sautéed chicken breast in a creamy mushroom velouté sauce with herbs, served with your choice of side.',
    price: 14.00,
    category: 'Daily Dishes',
    availability: ['Daily'],
    imageQuery: 'chicken mushroom cream sauce',
    imageUrl: 'https://www.foodandwine.com/thmb/ARyf7B8Y4R_QLIDqGq8es0R_b5o=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/chicken-and-mushroom-fricassee-FT-RECIPE0925-5835860950be432d9c354518e96427ce.jpg'
  },
  {
    id: 'dd-3',
    name: 'Chicken Cashew',
    nameAr: 'دجاج بالكاجو',
    description: 'Stir-fried tender chicken strips with crunchy roasted cashews, bell peppers, and onions in a savory soy-ginger glaze.',
    price: 10.00,
    category: 'Daily Dishes',
    availability: ['Daily'],
    imageQuery: 'chicken cashew nut stir fry',
    imageUrl: 'https://img.freepik.com/premium-photo/intestine-hot-wok_3155-47.jpg?semt=ais_hybrid&w=740&q=80'
  },
  {
    id: 'dd-4',
    name: 'Chicken Stroganoff',
    nameAr: 'ستروغونوف دجاج',
    description: 'Sliced chicken breast cooked in a creamy mustard and sour cream sauce with mushrooms and pickles.',
    price: 10.00,
    category: 'Daily Dishes',
    availability: ['Daily'],
    imageQuery: 'chicken stroganoff',
    imageUrl: 'https://media.hellofresh.com/f_auto,fl_lossy,q_auto,w_1200/hellofresh_s3/image/chicken-stroganoff-014309d0.jpg'
  },
  {
    id: 'dd-5',
    name: 'Meat Lasagna',
    nameAr: 'لازانيا لحمة',
    description: 'Layers of al dente pasta, rich bolognese meat sauce, creamy béchamel, and melted mozzarella cheese.',
    price: 8.00,
    category: 'Daily Dishes',
    availability: ['Daily'],
    imageQuery: 'meat lasagna',
    imageUrl: 'https://www.thespruceeats.com/thmb/s11oj7aiRC0zcjIXuu80NmT-L4o=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/SES-basic-meat-lasagna-recipe-2097886-hero-01-cdd28f5b4aa940faa193e39a1629f89a.jpg'
  },
  {
    id: 'dd-6',
    name: 'Chicken Mansaf',
    nameAr: 'منسف دجاج',
    description: 'Traditional spiced rice with shredded chicken, garnished with toasted nuts and served with yogurt sauce.',
    price: 10.00,
    category: 'Daily Dishes',
    availability: ['Monday'],
    imageQuery: 'chicken mansaf rice yoghurt'
  },
  {
    id: 'dd-7',
    name: 'Meat Mansaf',
    nameAr: 'منسف لحمة',
    description: 'Spiced rice topped with tender lamb, toasted almonds and pine nuts, served with jameed yogurt sauce.',
    price: 13.00,
    category: 'Daily Dishes',
    availability: ['Monday'],
    imageQuery: 'meat mansaf rice'
  },
  {
    id: 'dd-8',
    name: 'Koussa Laban',
    nameAr: 'كوسا باللبن',
    description: 'Fresh zucchini stuffed with seasoned minced meat and rice, simmered in a warm, garlic-infused yogurt sauce.',
    price: 10.00,
    category: 'Daily Dishes',
    availability: ['Tuesday'],
    imageQuery: 'koussa bil laban zucchini yogurt'
  },
  {
    id: 'dd-9',
    name: 'Koussa Banadoura',
    nameAr: 'كوسا بالبندورة',
    description: 'Fresh zucchini stuffed with seasoned minced meat and rice, slow-cooked in a rich tomato broth.',
    price: 8.00,
    category: 'Daily Dishes',
    availability: ['Tuesday'],
    imageQuery: 'stuffed zucchini tomato sauce'
  },
  {
    id: 'dd-10',
    name: 'Chicken Biryani',
    nameAr: 'رز برياني بالدجاج',
    description: 'Aromatic basmati rice layered with spiced chicken, saffron, caramelized onions, and fresh herbs.',
    price: 10.00,
    category: 'Daily Dishes',
    availability: ['Wednesday'],
    imageQuery: 'chicken biryani',
    imageUrl: 'https://c.ndtvimg.com/2019-10/7g6mck6g_biryani-badshah_625x300_25_October_19.jpg'
  },
  {
    id: 'dd-11',
    name: 'Meat Biryani',
    nameAr: 'رز برياني باللحمة',
    description: 'Aromatic basmati rice layered with tender spiced meat chunks, saffron, nuts, and caramelized onions.',
    price: 12.00,
    category: 'Daily Dishes',
    availability: ['Wednesday'],
    imageQuery: 'meat biryani',
    imageUrl: 'https://img.freepik.com/free-photo/top-view-rice-with-carrot-cooked-with-lamb-served-with-yogurt-salad_141793-2449.jpg?semt=ais_hybrid&w=740&q=80'
  },
  {
    id: 'dd-12',
    name: 'Kebbeh Labnieh',
    nameAr: 'كبة لبنية مع أرز',
    description: 'Hand-crafted kebbeh balls simmered in a smooth, warm yogurt sauce with garlic and dried mint, served with rice.',
    price: 9.00,
    category: 'Daily Dishes',
    availability: ['Thursday'],
    imageQuery: 'kibbeh labanieh yogurt'
  },
  {
    id: 'dd-13',
    name: 'Kafta Bil Siniyeh',
    nameAr: 'كفتة بالصينية مع رز',
    description: 'Seasoned minced meat patties baked with potatoes and tomatoes in a rich tomato sauce, served with vermicelli rice.',
    price: 9.00,
    category: 'Daily Dishes',
    availability: ['Thursday'],
    imageQuery: 'kafta bil sanieh tomato'
  },
  {
    id: 'dd-14',
    name: 'Sayadiyeh Fish',
    nameAr: 'صيادية سمك مع طاجن',
    description: 'Flaky white fish fillet served over caramelized onion rice, topped with roasted nuts and tajen sauce.',
    price: 13.00,
    category: 'Daily Dishes',
    availability: ['Friday'],
    imageQuery: 'sayadieh fish rice'
  },
  {
    id: 'dd-15',
    name: 'Chicken Molokhia',
    nameAr: 'ملوخية بالدجاج',
    description: 'Traditional jute leaf stew with tender chicken and coriander-garlic taklia, served with vermicelli rice and lemon.',
    price: 9.00,
    category: 'Daily Dishes',
    availability: ['Saturday'],
    imageQuery: 'molokhia chicken rice'
  },
  {
    id: 'dd-16',
    name: 'Daoud Bacha',
    nameAr: 'داوود باشا مع رز',
    description: 'Juicy meat balls braised in a rich tomato and onion sauce with pine nuts, served with vermicelli rice.',
    price: 9.00,
    category: 'Daily Dishes',
    availability: ['Saturday'],
    imageQuery: 'daoud basha meatballs'
  },
  {
    id: 'dd-17',
    name: 'Grape Leaves with Lamb',
    nameAr: 'ورق عنب باللحمة الغنم',
    description: 'Tender vine leaves stuffed with rice and seasoned lamb, slow-cooked in lemon broth with lamb chops.',
    price: 15.00,
    category: 'Daily Dishes',
    availability: ['Sunday'],
    imageQuery: 'stuffed grape leaves lamb',
    imageUrl: 'https://img.freepik.com/free-photo/side-view-dolma-grape-leaves-stuffed-with-meat-rice-with-sour-cream-sauce-dark-wooden-table-eastern-european-asian-traditional-cuisine_176474-2488.jpg?semt=ais_hybrid&w=740&q=80',
    isPopular: true
  },

  // --- BBQ Sandwiches ---
  {
    id: 'bbq-1',
    name: 'Msahab Arnous',
    nameAr: 'Chicken Breast',
    category: 'BBQ Sandwiches',
    description: 'Marinated grilled chicken breast, garlic paste, pickles, and coleslaw wrapped in toasted bread.',
    price: 4.67,
    variants: [
      { name: 'Small', price: 4.67 },
      { name: 'Large', price: 5.18 }
    ],
    imageQuery: 'chicken breast sandwich grilled',
    imageUrl: 'https://img.freepik.com/premium-photo/close-up-meal-served-slate_1048944-30217899.jpg?semt=ais_hybrid&w=740&q=80',
    isPopular: true
  },
  {
    id: 'bbq-2',
    name: 'Cheese Tawook',
    nameAr: '',
    category: 'BBQ Sandwiches',
    description: 'Marinated chicken tawook skewers grilled with melted cheese, garlic paste, and pickles.',
    price: 4.51,
    imageQuery: 'tawook sandwich cheese',
    imageUrl: 'https://img.freepik.com/premium-photo/spicy-sriracha-chicken-sandwich-with-fresh-coleslaw_762785-361252.jpg?semt=ais_hybrid&w=740&q=80'
  },
  {
    id: 'bbq-3',
    name: 'Tawook Abyad',
    nameAr: 'White',
    category: 'BBQ Sandwiches',
    description: 'Classic marinated white chicken cubes grilled to perfection with garlic paste and pickles.',
    price: 4.00,
    variants: [
      { name: 'Small', price: 4.00 },
      { name: 'Large', price: 4.51 }
    ],
    imageQuery: 'tawook chicken sandwich garlic',
    imageUrl: 'https://img.freepik.com/free-photo/big-sandwich-with-chicken-kebab-lettuce_2829-16604.jpg?semt=ais_hybrid&w=740&q=80',
    isPopular: true
  },
  {
    id: 'bbq-4',
    name: 'Fakhed Meshwi',
    nameAr: 'Grilled Thigh',
    category: 'BBQ Sandwiches',
    description: 'Succulent grilled chicken thigh marinated in traditional spices, served with garlic and pickles.',
    price: 3.75,
    variants: [
      { name: 'Small', price: 3.75 },
      { name: 'Large', price: 4.76 }
    ],
    imageQuery: 'grilled chicken thigh sandwich',
    imageUrl: 'https://img.freepik.com/free-photo/grilled-beef-burger-ciabatta-bun-homemade-generated-by-ai_188544-21445.jpg?semt=ais_hybrid&w=740&q=80'
  },
  {
    id: 'bbq-5',
    name: 'Sawda Djej Meshwiye',
    nameAr: 'Grilled Chicken Liver',
    category: 'BBQ Sandwiches',
    description: 'Grilled chicken liver seasoned with pomegranate molasses and spices, served with garlic and pickles.',
    price: 3.51,
    variants: [
      { name: 'Small', price: 3.51 },
      { name: 'Large', price: 4.01 }
    ],
    imageQuery: 'grilled chicken liver sandwich',
    imageUrl: 'https://img.freepik.com/premium-photo/tantuni-traditional-turkish-kebap-with-meat_693630-5593.jpg?semt=ais_hybrid&w=740&q=80'
  },
  {
    id: 'bbq-6',
    name: 'Habra Nayyeh',
    nameAr: 'Raw Meat Sandwich',
    category: 'BBQ Sandwiches',
    description: 'Fresh raw meat selection served with garlic paste, mint, olive oil and fresh bread.',
    price: 4.56,
    variants: [
      { name: 'Small', price: 4.56 },
      { name: 'Large', price: 5.01 }
    ],
    imageQuery: 'raw meat sandwich lebanese',
    imageUrl: 'https://img.freepik.com/free-photo/big-sandwich-with-raw-smoked-meat-wooden-surface_2829-8298.jpg?semt=ais_hybrid&w=740&q=80'
  },

  // --- Main Dishes ---
  {
    id: 'main-1',
    name: 'Abawat with Fatteh',
    nameAr: 'صحن قبوات مع فتة',
    description: 'Traditional stuffed intestines served with a yogurt, chickpea, and toasted bread crumble.',
    price: 12.00,
    category: 'Main Dishes',
    imageQuery: 'lebanese stuffed intestines',
    imageUrl: 'https://baytna-express.com/wp-content/uploads/2024/06/1706437230.png'
  },
  {
    id: 'main-2',
    name: 'BBQ Chicken',
    nameAr: 'دجاج بالباربكيو',
    description: 'Half chicken marinated in smoky BBQ spices, grilled over charcoal, served with garlic and pickles.',
    price: 9.00,
    category: 'Main Dishes',
    imageQuery: 'grilled chicken platter bbq',
    imageUrl: 'https://img.freepik.com/free-photo/grilled-chicken-breasts-with-vegetables_23-2148189864.jpg?semt=ais_hybrid&w=740&q=80'
  },
  {
    id: 'main-3',
    name: 'Chinese Chicken with Rice',
    nameAr: 'دجاج صيني مع رز',
    description: 'Chicken strips stir-fried with mixed vegetables in a savory soy sauce, served over steamed rice.',
    price: 7.00,
    category: 'Main Dishes',
    imageQuery: 'chinese chicken rice',
    imageUrl: 'https://img.freepik.com/free-photo/high-angle-traditional-asian-meal-with-chopsticks_23-2148694371.jpg?semt=ais_hybrid&w=740&q=80'
  },
  {
    id: 'main-4',
    name: 'Roast Meat',
    nameAr: 'روستو لحمة',
    description: 'Slow-roasted beef slices served with rich brown gravy and roasted vegetables.',
    price: 8.00,
    category: 'Main Dishes',
    imageQuery: 'roast beef slices gravy',
    imageUrl: 'https://img.freepik.com/premium-photo/bowl-with-slices-baked-tuna-with-broccoli-tomatoes-fusili-pasta_73989-76050.jpg?semt=ais_hybrid&w=740&q=80'
  },
  {
    id: 'main-5',
    name: 'Makmoura with Bulgur',
    nameAr: 'مكمورة مع برغل',
    description: 'Traditional layered dish with seasoned chicken and coarse bulgur wheat cooked in olive oil and onions.',
    price: 3.00,
    category: 'Main Dishes',
    imageQuery: 'bulgur pilaf',
    imageUrl: 'https://kitchen.sayidaty.net/uploads/small/c8/c811c8114731cc5fca8145bb17533068_w750_h500.jpg'
  },
  {
    id: 'main-6',
    name: 'Seven Countries',
    nameAr: 'سبع دول',
    description: 'A hearty mixed vegetable stew with tender meat chunks, simmered in a rich tomato base.',
    price: 3.00,
    category: 'Main Dishes',
    imageQuery: 'vegetable stew',
    imageUrl: 'https://www.thedailymeal.com/img/gallery/the-14-most-popular-salads-in-different-countries-around-the-world/l-intro-1680785631.jpg'
  },

  // --- Cold Mezza ---
  {
    id: 'cold-1',
    name: 'Mouhamara with Walnut',
    nameAr: 'محمرة بالجوز',
    description: 'Roasted red pepper and walnut dip with pomegranate molasses, olive oil, and breadcrumbs.',
    price: 3.50,
    category: 'Cold Mezza',
    imageQuery: 'muhammara dip walnuts',
    imageUrl: 'https://img.freepik.com/free-photo/overhead-shot-hummus-wooden-bowl-with-wooden-spoon-garlic-pieces-black-table_181624-52674.jpg?semt=ais_hybrid&w=740&q=80',
    isPopular: true
  },
  {
    id: 'cold-2',
    name: 'Mouhamara',
    nameAr: '',
    description: 'Spicy roasted red pepper dip with olive oil, cumin, and breadcrumbs.',
    price: 3.00,
    category: 'Cold Mezza',
    imageQuery: 'muhammara dip',
    imageUrl: 'https://hips.hearstapps.com/hmg-prod/images/muhammara-dip-index-651496657c484.jpg?crop=0.893xw:1.00xh;0.0545xw,0'
  },
  {
    id: 'cold-3',
    name: 'Tajen',
    nameAr: 'طاجن',
    description: 'Baked fish fillet with tahini sauce, caramelized onions, pine nuts, and citrus juice.',
    price: 3.50,
    category: 'Cold Mezza',
    imageQuery: 'lebanese tajen fish tahini',
    imageUrl: 'https://www.mindfood.com/wp-content/uploads/2018/09/11.27.17_JewelledTable_D3_Tajen_0121000.jpg'
  },
  {
    id: 'cold-4',
    name: 'Tarator',
    nameAr: 'طرطور',
    description: 'Creamy tahini sauce with lemon juice, garlic, and parsley.',
    price: 3.00,
    category: 'Cold Mezza',
    imageQuery: 'tarator sauce tahini',
    imageUrl: 'https://cdn.tasteatlas.com/images/dishes/7cc9413cc3c048dca52f498fea84743c.jpg'
  },
  {
    id: 'cold-5',
    name: 'Grape Leaves in Oil',
    nameAr: 'ورق عنب بالزيت',
    description: 'Vine leaves stuffed with rice, tomatoes, parsley, and onions, cooked in olive oil and lemon.',
    price: 3.00,
    category: 'Cold Mezza',
    imageQuery: 'stuffed grape leaves oil',
    imageUrl: 'https://dietcenterleb.com/cdn/shop/files/DietShop-068copy_1200x1200.jpg?v=1692872962'
  },
  {
    id: 'cold-6',
    name: 'Pickles Box',
    nameAr: 'علبة كبيس',
    description: 'Assortment of homemade pickled cucumbers, turnips, and olives.',
    price: 1.50,
    category: 'Cold Mezza',
    imageQuery: 'lebanese pickles',
    imageUrl: 'https://img.freepik.com/premium-photo/canned-cherry-tomatoes-cucumbers-peppers-round-black-plate-dark-background-closeup_236765-781.jpg?semt=ais_hybrid&w=740&q=80'
  },

  // --- Hot Mezza ---
  {
    id: 'hot-1',
    name: 'Ras Asfour Lamb',
    nameAr: 'راس عاصفور غنم',
    description: 'Tender diced lamb sautéed with pomegranate molasses, pine nuts, and lemon juice.',
    price: 9.00,
    category: 'Hot Mezza',
    imageQuery: 'ras asfour meat pomegranate',
    imageUrl: 'https://img.freepik.com/free-photo/side-view-shish-kebab-skewers-with-tomato-onion-ayran-white-plate_176474-3219.jpg?semt=ais_hybrid&w=740&q=80',
    isPopular: true
  },
  {
    id: 'hot-2',
    name: 'Fatteh Eggplant with Minced Meat',
    nameAr: 'فتة باتنجان مع لحمة',
    description: 'Fried eggplant layered with yogurt, chickpeas, toasted bread, pine nuts, and seasoned minced meat.',
    price: 8.00,
    category: 'Hot Mezza',
    imageQuery: 'eggplant fatteh yogurt',
    imageUrl: 'https://falasteenifoodie.com/wp-content/uploads/2022/11/Fattet-Betenjan.jpeg'
  },
  {
    id: 'hot-3',
    name: 'Mini Shawarma Meat',
    nameAr: '',
    description: 'Bite-sized beef shawarma wraps with tahini sauce, parsley, onions, and sumac.',
    price: 2.00,
    category: 'Hot Mezza',
    imageQuery: 'mini beef shawarma',
    imageUrl: 'https://img.sndimg.com/food/image/upload/f_auto,c_thumb,q_55,w_iw/v1/img/recipes/53/53/19/MxCKdDyScW0Q2h2KoaIA_GK-NLE-Instant-Pot-Beef-Shawarma_16x9-2.jpg'
  },
  {
    id: 'hot-4',
    name: 'Potato Wedges',
    nameAr: '',
    description: 'Crispy seasoned potato wedges served with dipping sauce.',
    price: 3.75,
    category: 'Hot Mezza',
    imageQuery: 'potato wedges',
    imageUrl: 'https://www.allrecipes.com/thmb/0O4GxNOklojmyihtKDEDu8LMwXc=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/199575-oven-fresh-seasoned-potato-wedges-beauty-2x1-013506441468-bba124206b3c481cb5681370c8a83137.jpg'
  },
  {
    id: 'hot-5',
    name: 'Lebanese Potato',
    nameAr: '',
    description: 'Hand-cut homemade french fries, fried to golden perfection.',
    price: 3.00,
    category: 'Hot Mezza',
    imageQuery: 'french fries homemade',
    imageUrl: 'https://www.paintthekitchenred.com/wp-content/uploads/2023/02/Batata-Harra-L1-Paint-the-Kitchen-Red-scaled.jpg'
  },
  {
    id: 'hot-6',
    name: 'Potato Chips',
    nameAr: '',
    description: 'Thinly sliced, crispy homemade potato chips seasoned with sea salt.',
    price: 3.00,
    category: 'Hot Mezza',
    imageQuery: 'potato chips',
    imageUrl: 'https://img.freepik.com/premium-photo/high-angle-view-french-fries-with-aioli-dip-bowl-plate-table_1048944-15068027.jpg?semt=ais_hybrid&w=740&q=80'
  },

  // --- Salads ---
  {
    id: 'salad-1',
    name: 'Crabsticks Salad',
    nameAr: '',
    description: 'Shredded crab sticks mixed with corn, cucumber, and lettuce in a creamy mayo dressing.',
    price: 7.00,
    category: 'Salads',
    imageQuery: 'crab salad creamy',
    imageUrl: 'https://media.istockphoto.com/id/2053195084/photo/japanese-kani-salad-with-fresh-vegetables-and-crab-sticks.jpg?s=612x612&w=0&k=20&c=t1K3wwXn_ZmxJTnntuxUQ7YymMv6h746Me_IbGSKpkA='
  },
  {
    id: 'salad-2',
    name: 'Caesar Salad',
    nameAr: '',
    description: 'Crisp romaine lettuce, parmesan cheese, and croutons tossed in creamy caesar dressing.',
    price: 4.00,
    category: 'Salads',
    imageQuery: 'caesar salad chicken',
    imageUrl: 'https://img.freepik.com/premium-photo/chicken-caesar-salad-black-background_123827-29280.jpg'
  },
  {
    id: 'salad-3',
    name: 'Pasta Salad',
    nameAr: '',
    description: 'Fusilli pasta tossed with fresh vegetables, olives, and a light herb vinaigrette.',
    price: 4.00,
    category: 'Salads',
    imageQuery: 'pasta salad vegetables',
    imageUrl: 'https://hips.hearstapps.com/hmg-prod/images/pasta-salad-recipes-685c1e9c8084c.jpg?crop=1.00xw:1.00xh;0,0&resize=1200:*'
  },
  {
    id: 'salad-4',
    name: 'Raheb Salad',
    nameAr: 'سلطة راهب',
    description: 'Roasted eggplant mash mixed with diced tomatoes, onions, bell peppers, parsley, lemon, and olive oil.',
    price: 3.50,
    category: 'Salads',
    imageQuery: 'raheb salad eggplant',
    imageUrl: 'https://themediterraneanlifestyle.com/wp-content/uploads/2023/01/IMG_0968.jpg'
  },
  {
    id: 'salad-5',
    name: 'Mixed Salad',
    nameAr: 'سلطة مشكلة',
    description: 'Fresh seasonal vegetables including lettuce, tomatoes, and cucumbers with a lemon-oil dressing.',
    price: 3.25,
    category: 'Salads',
    imageQuery: 'fresh garden salad',
    imageUrl: 'https://www.twopeasandtheirpod.com/wp-content/uploads/2019/06/Easy-Green-Salad-4-500x375.jpg'
  },
  {
    id: 'salad-6',
    name: 'Beetroot Salad',
    nameAr: 'سلطة شمندر',
    description: 'Diced boiled beetroot with parsley, onions, and a lemon-garlic vinaigrette.',
    price: 3.00,
    category: 'Salads',
    imageQuery: 'beetroot salad',
    imageUrl: 'https://img.taste.com.au/KYx9DWLA/w1200-h675-cfill-q80/taste/2011/06/beetroot-salad-1-215100-2.jpg'
  },

  // --- Beverages ---
  {
    id: 'bev-1',
    name: 'Perrier',
    nameAr: '',
    price: 1.50,
    category: 'Beverages',
    imageQuery: 'perrier sparkling water bottle',
    imageUrl: 'https://umart.store/cdn/shop/products/Perrier_Lemon_b8c47b7d-06d6-4684-9d52-b388165f4040_1200x.png?v=1644315646'
  },
  {
    id: 'bev-2',
    name: 'Large Water',
    nameAr: '',
    price: 0.60,
    category: 'Beverages',
    imageQuery: 'mineral water bottle',
    imageUrl: 'https://goodmockups.com/wp-content/uploads/2022/06/Free-1-Liter-Water-Bottle-Mockup-PSD.jpg'
  },
  {
    id: 'bev-3',
    name: 'Small Water',
    nameAr: '',
    price: 0.30,
    category: 'Beverages',
    imageQuery: 'small water bottle',
    imageUrl: 'https://mockuphunt.co/cdn/shop/products/500ml-fresh-water-bottle-mockup-psd_607a314207553_600x.jpg?v=1647971056'
  },
  {
    id: 'bev-4',
    name: 'Small Ayran',
    nameAr: 'Yogurt Drink',
    price: 0.75,
    category: 'Beverages',
    imageQuery: 'ayran yogurt drink glass',
    imageUrl: 'https://shop.taanayel-lesfermes.com/wp-content/uploads/2020/08/ayran-1L.jpg'
  }
];

export const CATEGORIES = [
  'Today’s Specials',
  'Popular',
  'Daily Dishes',
  'BBQ Sandwiches',
  'Main Dishes',
  'Cold Mezza',
  'Hot Mezza',
  'Salads',
  'Beverages'
];