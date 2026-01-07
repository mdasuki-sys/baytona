import React, { useState, useEffect, useMemo, useRef } from 'react';
import { ShoppingBag, Search, Plus, Minus, X, MapPin, Clock, ChevronRight, Star, Info, MessageCircle, Truck, ShoppingCart, Loader2 } from 'lucide-react';
import { MENU_ITEMS, CATEGORIES } from './data';
import { MenuItem, CartItem, OrderType, UserDetails, Variant, WeekDay } from './types';
import { formatCurrency, generateWhatsAppLink, getDayName, generateFoodImage, getCachedImage, getMemoryCachedImage } from './utils';

// --- Sub-Components ---

const CATEGORY_PLACEHOLDERS: Record<string, string> = {
  'Daily Dishes': 'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&q=80&w=600',
  'BBQ Sandwiches': 'https://images.unsplash.com/photo-1626700051175-6818013e1d4f?auto=format&fit=crop&q=80&w=600',
  'Main Dishes': 'https://images.unsplash.com/photo-1544025162-d76690b67f66?auto=format&fit=crop&q=80&w=600',
  'Cold Mezza': 'https://images.unsplash.com/photo-1630403756306-383173d12224?auto=format&fit=crop&q=80&w=600',
  'Hot Mezza': 'https://images.unsplash.com/photo-1541518763669-27fef04b14ea?auto=format&fit=crop&q=80&w=600',
  'Salads': 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=600',
  'Beverages': 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&q=80&w=600',
  'default': 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&q=80&w=600'
};

// Special Async Image Component for GenAI or Static URL
const GenAIImage = ({ query, imageUrl, alt, className, priority = false, category }: { query: string, imageUrl?: string, alt: string, className?: string, priority?: boolean, category?: string }) => {
  // If static URL is provided, prefer it immediately.
  const initialSrc = imageUrl || getMemoryCachedImage(query);
  const [src, setSrc] = useState<string | null>(initialSrc);
  const [loading, setLoading] = useState(!initialSrc);
  const [error, setError] = useState(false);

  useEffect(() => {
    // If we have a hardcoded URL, no need to fetch or check cache.
    if (imageUrl) {
        setSrc(imageUrl);
        setLoading(false);
        return;
    }

    // If we already have the image from initial state (memory cache), do nothing unless query changed
    if (src && getMemoryCachedImage(query) === src) return;

    let active = true;

    const fetchImage = async () => {
      try {
        setLoading(true);
        // generateFoodImage checks memory -> IDB -> Queue
        const generatedUrl = await generateFoodImage(query);
        
        if (active) {
          if (generatedUrl) {
            setSrc(generatedUrl);
          } else {
            // Use fallback if generation returns null (error or no key)
            const fallback = (category && CATEGORY_PLACEHOLDERS[category]) || CATEGORY_PLACEHOLDERS['default'];
            setSrc(fallback);
          }
        }
      } catch (e) {
        if (active) {
          // Use fallback on catastrophic error
          const fallback = (category && CATEGORY_PLACEHOLDERS[category]) || CATEGORY_PLACEHOLDERS['default'];
          setSrc(fallback);
        }
      } finally {
        if (active) setLoading(false);
      }
    };

    fetchImage();

    return () => { active = false; };
  }, [query, category, imageUrl]); 

  if (loading) {
    return (
      <div className={`bg-stone-200 animate-pulse flex items-center justify-center ${className}`}>
        <div className="bg-stone-300 w-full h-full opacity-50"></div>
      </div>
    );
  }

  // Fallback check if for some reason src is still missing after loading
  const displaySrc = src || (category && CATEGORY_PLACEHOLDERS[category]) || CATEGORY_PLACEHOLDERS['default'];

  return (
    <img 
      src={displaySrc} 
      alt={alt} 
      className={`${className} transition-opacity duration-700 ease-in-out ${loading ? 'opacity-0' : 'opacity-100'}`}
      loading="lazy"
    />
  );
};

const Hero = ({ orderType, setOrderType, onSearch }: { 
  orderType: OrderType; 
  setOrderType: (t: OrderType) => void;
  onSearch: (q: string) => void;
}) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="relative w-full text-white overflow-hidden rounded-b-3xl shadow-lg z-10 bg-stone-900 min-h-[300px]">
      <div className="absolute inset-0 z-0">
         {/* Using user provided image */}
        <img 
          src="https://i.ibb.co/JwBB2BDj/1000578035.png" 
          className="w-full h-full object-cover opacity-60"
          alt="Baytouna Hero"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-900/90 via-stone-900/40 to-stone-900/20" />
      </div>

      <div className="relative z-10 pt-12 pb-8 px-6 flex flex-col items-center">
        <h1 className="font-display text-4xl md:text-5xl tracking-wide mb-2 text-center text-cream">
          Baytouna
        </h1>
        <p className="text-stone-300 font-sans text-sm tracking-widest uppercase mb-8 opacity-90">
          Resto & Express
        </p>

        {/* Search Bar - transitions to sticky in parent but visual here */}
        <div className={`w-full max-w-md relative transition-all duration-300 ${scrolled ? 'scale-95 opacity-0 h-0 overflow-hidden' : 'scale-100 opacity-100 h-12 mb-8'}`}>
          <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-stone-400" />
          </div>
          <input
            type="text"
            placeholder="Search for hummus, tawook..."
            onChange={(e) => onSearch(e.target.value)}
            className="w-full h-full pl-12 pr-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-white placeholder-stone-300 focus:outline-none focus:bg-white/20 transition-all font-sans"
          />
        </div>

        {/* Toggles */}
        <div className="flex p-1 bg-white/10 backdrop-blur-md rounded-full border border-white/10 relative">
          <div className={`absolute top-1 bottom-1 w-[calc(50%-4px)] bg-primary rounded-full transition-all duration-300 shadow-md ${orderType === 'Pickup' ? 'translate-x-[calc(100%+4px)]' : 'left-1'}`} />
          <button 
            onClick={() => setOrderType('Delivery')}
            className={`relative z-10 px-6 py-2 rounded-full text-sm font-medium transition-colors duration-200 flex items-center gap-2 ${orderType === 'Delivery' ? 'text-white' : 'text-stone-300 hover:text-white'}`}
          >
            <Truck size={16} /> Delivery
          </button>
          <button 
            onClick={() => setOrderType('Pickup')}
            className={`relative z-10 px-6 py-2 rounded-full text-sm font-medium transition-colors duration-200 flex items-center gap-2 ${orderType === 'Pickup' ? 'text-white' : 'text-stone-300 hover:text-white'}`}
          >
            <ShoppingBag size={16} /> Pickup
          </button>
        </div>
      </div>
    </div>
  );
};

const CategoryNav = ({ activeCategory, onSelect }: { activeCategory: string; onSelect: (c: string) => void }) => {
  return (
    <div className="sticky top-0 z-40 bg-[#F9F8F4]/95 backdrop-blur-md py-4 border-b border-stone-200/50 shadow-sm overflow-x-auto no-scrollbar">
      <div className="flex px-6 space-x-3 min-w-max">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => onSelect(cat)}
            className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
              activeCategory === cat 
                ? 'bg-black text-white shadow-md transform scale-105' 
                : 'bg-white text-stone-700 border border-stone-200 hover:border-black/30 hover:bg-black/5'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>
    </div>
  );
};

const MenuCard: React.FC<{ item: MenuItem; onClick: () => void }> = ({ item, onClick }) => {
  const displayPrice = item.variants && item.variants.length > 0 
    ? item.variants[0].price 
    : item.price;
  
  const hasVariants = item.variants && item.variants.length > 0;

  return (
    <div 
      onClick={onClick}
      className="group bg-white rounded-2xl p-0 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer transform hover:-translate-y-1 relative"
    >
      <div className="relative h-40 overflow-hidden bg-stone-100">
        <GenAIImage 
          query={item.imageQuery} 
          imageUrl={item.imageUrl}
          alt={item.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          category={item.category}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60" />
        <div className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-sm rounded-full p-2 shadow-lg hover:bg-primary hover:text-white transition-colors duration-300">
          <Plus size={18} />
        </div>
      </div>
      
      <div className="p-4">
        <div className="flex justify-between items-start mb-1">
          <h3 className="font-serif text-lg font-bold text-stone-800 leading-tight group-hover:text-primary transition-colors">
            {item.name}
          </h3>
        </div>
        {item.nameAr && <p className="text-xs text-stone-400 font-sans mb-2 text-right">{item.nameAr}</p>}
        <p className="text-xs text-stone-500 line-clamp-2 mb-3 h-8 leading-relaxed">
          {item.description}
        </p>
        <div className="flex items-center justify-between mt-auto">
          <span className="font-medium text-stone-900 font-sans">
            {hasVariants && <span className="text-xs text-stone-500 font-normal mr-1">from</span>}
            {formatCurrency(displayPrice)}
          </span>
        </div>
      </div>
    </div>
  );
};

const ItemModal = ({ item, isOpen, onClose, onAddToCart }: { 
  item: MenuItem | null; 
  isOpen: boolean; 
  onClose: () => void; 
  onAddToCart: (cartItem: CartItem) => void;
}) => {
  const [quantity, setQuantity] = useState(1);
  const [selectedVariant, setSelectedVariant] = useState<Variant | null>(null);
  const [notes, setNotes] = useState('');
  
  // Reset state when item opens
  useEffect(() => {
    if (isOpen && item) {
      setQuantity(1);
      setNotes('');
      if (item.variants && item.variants.length > 0) {
        setSelectedVariant(item.variants[0]);
      } else {
        setSelectedVariant(null);
      }
    }
  }, [isOpen, item]);

  if (!item || !isOpen) return null;

  const currentPrice = selectedVariant ? selectedVariant.price : item.price;
  const totalPrice = currentPrice * quantity;

  const handleAdd = () => {
    onAddToCart({
      cartId: `${item.id}-${selectedVariant?.name || 'base'}-${Date.now()}`,
      menuItem: item,
      variantName: selectedVariant?.name,
      price: currentPrice,
      quantity,
      notes
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center pointer-events-none">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm pointer-events-auto transition-opacity duration-300" onClick={onClose} />
      
      <div className="bg-[#F9F8F4] w-full max-w-lg md:rounded-2xl rounded-t-3xl shadow-2xl pointer-events-auto transform transition-transform duration-300 animate-slide-up max-h-[90vh] overflow-y-auto no-scrollbar">
        <div className="relative h-64 bg-stone-100">
          <GenAIImage 
            query={item.imageQuery} 
            imageUrl={item.imageUrl}
            alt={item.name}
            className="w-full h-full object-cover"
            priority={true}
            category={item.category}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#F9F8F4] to-transparent" />
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 bg-white/80 backdrop-blur rounded-full p-2 shadow-sm text-stone-800 hover:bg-white"
          >
            <X size={20} />
          </button>
        </div>

        <div className="px-6 pb-8 -mt-12 relative z-10">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="font-display text-3xl font-bold text-stone-800 mb-1">{item.name}</h2>
              {item.nameAr && <p className="text-lg text-primary font-serif">{item.nameAr}</p>}
            </div>
            <div className="text-xl font-bold font-sans bg-white px-3 py-1 rounded-lg shadow-sm text-primary">
              {formatCurrency(currentPrice)}
            </div>
          </div>
          
          <p className="text-stone-500 mt-4 leading-relaxed font-sans">
            {item.description}
          </p>

          {/* Variants */}
          {item.variants && item.variants.length > 0 && (
            <div className="mt-6">
              <h3 className="font-semibold text-stone-800 mb-3 text-sm uppercase tracking-wide">Size Option</h3>
              <div className="flex gap-3">
                {item.variants.map((v) => (
                  <button
                    key={v.name}
                    onClick={() => setSelectedVariant(v)}
                    className={`flex-1 py-3 px-4 rounded-xl text-sm font-medium transition-all border ${
                      selectedVariant?.name === v.name
                        ? 'bg-primary text-white border-primary shadow-md'
                        : 'bg-white text-stone-600 border-stone-200 hover:border-primary/50'
                    }`}
                  >
                    <div className="flex justify-between w-full">
                      <span>{v.name}</span>
                      <span>{formatCurrency(v.price)}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Notes */}
          <div className="mt-6">
            <h3 className="font-semibold text-stone-800 mb-2 text-sm uppercase tracking-wide flex items-center gap-2">
              Special Instructions <span className="text-stone-400 font-normal normal-case text-xs">(Optional)</span>
            </h3>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="e.g. No onions, extra garlic..."
              className="w-full bg-white border border-stone-200 rounded-xl p-3 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all resize-none"
              rows={2}
            />
          </div>

          {/* Quantity & Add */}
          <div className="mt-8 flex items-center gap-4">
            <div className="flex items-center bg-white border border-stone-200 rounded-full px-2 py-1 shadow-sm">
              <button 
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-10 h-10 flex items-center justify-center text-stone-600 hover:text-primary active:scale-90 transition-transform"
              >
                <Minus size={18} />
              </button>
              <span className="w-8 text-center font-bold text-lg text-stone-800">{quantity}</span>
              <button 
                onClick={() => setQuantity(quantity + 1)}
                className="w-10 h-10 flex items-center justify-center text-stone-600 hover:text-primary active:scale-90 transition-transform"
              >
                <Plus size={18} />
              </button>
            </div>
            
            <button 
              onClick={handleAdd}
              className="flex-1 bg-primary text-white py-4 rounded-full font-bold shadow-lg shadow-primary/30 hover:shadow-primary/50 active:scale-[0.98] transition-all flex justify-between px-6"
            >
              <span>Add to Order</span>
              <span>{formatCurrency(totalPrice)}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const CartDrawer = ({ 
  isOpen, 
  onClose, 
  cart, 
  onUpdateQuantity, 
  onRemove,
  onCheckout
}: { 
  isOpen: boolean; 
  onClose: () => void;
  cart: CartItem[];
  onUpdateQuantity: (id: string, q: number) => void;
  onRemove: (id: string) => void;
  onCheckout: () => void;
}) => {
  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity" onClick={onClose} />
      <div className="w-full max-w-md bg-[#F9F8F4] h-full shadow-2xl relative flex flex-col animate-slide-in-right">
        <div className="p-6 border-b border-stone-200 flex justify-between items-center bg-white">
          <h2 className="font-display text-2xl font-bold text-stone-800">Your Order</h2>
          <button onClick={onClose} className="p-2 hover:bg-stone-100 rounded-full transition-colors">
            <X size={24} className="text-stone-600" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {cart.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-stone-400">
              <ShoppingBag size={64} className="mb-4 opacity-20" />
              <p className="text-lg">Your cart is empty</p>
              <button onClick={onClose} className="mt-4 text-primary font-semibold">Start Browsing</button>
            </div>
          ) : (
            cart.map((item) => (
              <div key={item.cartId} className="flex gap-4 bg-white p-4 rounded-xl shadow-sm border border-stone-100">
                <div className="w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden bg-stone-100">
                   {/* Thumbnail in cart */}
                  <GenAIImage 
                    query={item.menuItem.imageQuery} 
                    imageUrl={item.menuItem.imageUrl}
                    alt={item.menuItem.name} 
                    className="w-full h-full object-cover"
                    category={item.menuItem.category}
                  />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-1">
                    <h4 className="font-serif font-bold text-stone-800">{item.menuItem.name}</h4>
                    <span className="font-medium text-stone-900">{formatCurrency(item.price * item.quantity)}</span>
                  </div>
                  {item.variantName && <p className="text-xs text-primary bg-primary/5 inline-block px-2 py-0.5 rounded mb-1">{item.variantName}</p>}
                  {item.notes && <p className="text-xs text-stone-500 italic mb-2">"{item.notes}"</p>}
                  
                  <div className="flex items-center justify-between mt-2">
                    <button 
                      onClick={() => onRemove(item.cartId)}
                      className="text-xs text-red-400 hover:text-red-600 underline"
                    >
                      Remove
                    </button>
                    <div className="flex items-center bg-stone-50 rounded-lg border border-stone-200">
                      <button 
                        onClick={() => onUpdateQuantity(item.cartId, Math.max(1, item.quantity - 1))}
                        className="px-2 py-1 text-stone-600 hover:text-primary"
                      >
                        <Minus size={14} />
                      </button>
                      <span className="text-sm font-medium w-6 text-center">{item.quantity}</span>
                      <button 
                        onClick={() => onUpdateQuantity(item.cartId, item.quantity + 1)}
                        className="px-2 py-1 text-stone-600 hover:text-primary"
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {cart.length > 0 && (
          <div className="p-6 bg-white border-t border-stone-200 shadow-[0_-4px_20px_rgba(0,0,0,0.05)]">
            <div className="flex justify-between mb-4 text-lg font-bold text-stone-800">
              <span>Subtotal</span>
              <span>{formatCurrency(total)}</span>
            </div>
            <button 
              onClick={onCheckout}
              className="w-full bg-primary text-white py-4 rounded-xl font-bold text-lg shadow-lg hover:bg-[#344d30] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
            >
              Checkout <ChevronRight size={20} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

const CheckoutModal = ({ 
  isOpen, 
  onClose, 
  cart,
  orderType
}: { 
  isOpen: boolean; 
  onClose: () => void; 
  cart: CartItem[];
  orderType: OrderType;
}) => {
  const [user, setUser] = useState<UserDetails>({
    name: '',
    phone: '',
    orderType,
    address: '',
    mapsLink: '',
    pickupTime: '',
    notes: ''
  });

  // Load user details from local storage
  useEffect(() => {
    const saved = localStorage.getItem('baytouna_user');
    if (saved) {
      const parsed = JSON.parse(saved);
      setUser(prev => ({ ...prev, ...parsed, orderType })); // keep current orderType
    }
  }, [orderType]);

  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const handleSubmit = () => {
    if (!user.name || !user.phone) {
      alert('Please fill in your Name and Phone Number.');
      return;
    }
    if (orderType === 'Delivery' && !user.address) {
      alert('Please provide a delivery address.');
      return;
    }

    // Save user details
    localStorage.setItem('baytouna_user', JSON.stringify(user));

    const link = generateWhatsAppLink(cart, user);
    window.open(link, '_blank');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center px-4">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
      <div className="bg-[#F9F8F4] w-full max-w-lg rounded-2xl shadow-2xl relative z-10 max-h-[90vh] overflow-y-auto no-scrollbar animate-slide-up">
        
        <div className="bg-primary px-6 py-6 rounded-t-2xl text-white">
          <div className="flex justify-between items-center mb-2">
            <h2 className="font-display text-2xl font-bold">Checkout</h2>
            <button onClick={onClose} className="text-white/80 hover:text-white"><X size={24} /></button>
          </div>
          <p className="text-primary/20 text-sm font-medium px-2 py-1 bg-white/20 inline-block rounded">
            {orderType} Order
          </p>
        </div>

        <div className="p-6 space-y-4">
          <div className="grid grid-cols-1 gap-4">
            <div>
              <label className="block text-xs font-bold text-stone-500 uppercase mb-1">Full Name *</label>
              <input 
                type="text" 
                value={user.name} 
                onChange={e => setUser({...user, name: e.target.value})}
                className="w-full p-3 rounded-lg border border-stone-200 bg-white focus:border-primary outline-none"
                placeholder="John Doe"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-stone-500 uppercase mb-1">Phone Number *</label>
              <input 
                type="tel" 
                value={user.phone} 
                onChange={e => setUser({...user, phone: e.target.value})}
                className="w-full p-3 rounded-lg border border-stone-200 bg-white focus:border-primary outline-none"
                placeholder="71 123 456"
              />
            </div>
          </div>

          {orderType === 'Delivery' ? (
            <div className="space-y-4 pt-2">
              <div className="flex items-center gap-2 text-primary font-medium border-b border-primary/10 pb-1">
                <Truck size={18} /> Delivery Details
              </div>
              <div>
                <label className="block text-xs font-bold text-stone-500 uppercase mb-1">Full Address *</label>
                <textarea 
                  value={user.address}
                  onChange={e => setUser({...user, address: e.target.value})}
                  className="w-full p-3 rounded-lg border border-stone-200 bg-white focus:border-primary outline-none resize-none"
                  rows={2}
                  placeholder="Building, Floor, Street..."
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-stone-500 uppercase mb-1 flex items-center gap-1">
                  <MapPin size={12} /> Google Maps Link (Optional)
                </label>
                <input 
                  type="url" 
                  value={user.mapsLink}
                  onChange={e => setUser({...user, mapsLink: e.target.value})}
                  className="w-full p-3 rounded-lg border border-stone-200 bg-white focus:border-primary outline-none text-sm"
                  placeholder="https://maps.google.com/..."
                />
              </div>
            </div>
          ) : (
            <div className="space-y-4 pt-2">
               <div className="flex items-center gap-2 text-primary font-medium border-b border-primary/10 pb-1">
                <Clock size={18} /> Pickup Details
              </div>
              <div>
                <label className="block text-xs font-bold text-stone-500 uppercase mb-1">Preferred Pickup Time</label>
                <input 
                  type="time" 
                  value={user.pickupTime}
                  onChange={e => setUser({...user, pickupTime: e.target.value})}
                  className="w-full p-3 rounded-lg border border-stone-200 bg-white focus:border-primary outline-none"
                />
              </div>
            </div>
          )}

          <div>
             <label className="block text-xs font-bold text-stone-500 uppercase mb-1">Order Notes (Optional)</label>
             <textarea 
                value={user.notes}
                onChange={e => setUser({...user, notes: e.target.value})}
                className="w-full p-3 rounded-lg border border-stone-200 bg-white focus:border-primary outline-none resize-none"
                rows={2}
                placeholder="Any special requests for the whole order..."
              />
          </div>

          <div className="bg-stone-50 p-4 rounded-xl border border-stone-100 flex justify-between items-center mt-4">
             <span className="font-bold text-stone-700">Total Amount</span>
             <span className="font-display text-2xl font-bold text-primary">{formatCurrency(total)}</span>
          </div>

          <button 
            onClick={handleSubmit}
            className="w-full bg-[#25D366] hover:bg-[#20b858] text-white py-4 rounded-xl font-bold text-lg shadow-lg flex items-center justify-center gap-3 transition-colors mt-2"
          >
            <MessageCircle size={24} fill="white" />
            Order on WhatsApp
          </button>
          <p className="text-center text-xs text-stone-400">By clicking above, you will be redirected to WhatsApp to send your order.</p>
        </div>
      </div>
    </div>
  );
};

// --- Main App Logic ---

function App() {
  const [orderType, setOrderType] = useState<OrderType>('Delivery');
  const [activeCategory, setActiveCategory] = useState<string>('Popular');
  const [searchQuery, setSearchQuery] = useState('');
  
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  // Load cart
  useEffect(() => {
    const savedCart = localStorage.getItem('baytouna_cart');
    if (savedCart) setCart(JSON.parse(savedCart));
  }, []);

  // Save cart
  useEffect(() => {
    localStorage.setItem('baytouna_cart', JSON.stringify(cart));
  }, [cart]);

  // Derived Data: Filtered Items
  const filteredItems = useMemo(() => {
    const today = getDayName(new Date()) as WeekDay;
    
    // Search Mode
    if (searchQuery.trim()) {
      return MENU_ITEMS.filter(item => 
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        item.description?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Category Mode
    if (activeCategory === 'Popular') {
      return MENU_ITEMS.filter(item => item.isPopular).slice(0, 6);
    }

    if (activeCategory === 'Today’s Specials') {
      return MENU_ITEMS.filter(item => item.category === 'Daily Dishes' && (item.availability?.includes('Daily') || item.availability?.includes(today)));
    }

    return MENU_ITEMS.filter(item => {
      // Filter by category
      if (item.category !== activeCategory) return false;
      
      // Filter by availability for Daily Dishes category specifically
      if (activeCategory === 'Daily Dishes' && item.availability) {
        return item.availability.includes('Daily') || item.availability.includes(today);
      }
      
      return true;
    });
  }, [activeCategory, searchQuery]);

  const addToCart = (item: CartItem) => {
    setCart(prev => [...prev, item]);
    setSelectedItem(null); // Close modal
    // Optional: Toast notification here
  };

  const updateQuantity = (cartId: string, q: number) => {
    setCart(prev => prev.map(item => item.cartId === cartId ? { ...item, quantity: q } : item));
  };

  const removeFromCart = (cartId: string) => {
    setCart(prev => prev.filter(item => item.cartId !== cartId));
  };

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const cartTotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  return (
    <div className="min-h-screen pb-24 font-sans text-stone-800 bg-[#F9F8F4]">
      {/* Search Overlay Helper (if query exists) */}
      {searchQuery && (
        <div className="fixed top-24 left-0 right-0 z-30 bg-[#F9F8F4] p-2 text-center text-sm text-stone-500 border-b">
           Showing results for "{searchQuery}" <button onClick={() => setSearchQuery('')} className="text-primary font-bold underline ml-2">Clear</button>
        </div>
      )}

      <Hero orderType={orderType} setOrderType={setOrderType} onSearch={setSearchQuery} />
      
      {/* Only show categories if not searching */}
      {!searchQuery && <CategoryNav activeCategory={activeCategory} onSelect={setActiveCategory} />}

      <main className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex items-center gap-2 mb-6">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-stone-800">
            {searchQuery ? 'Search Results' : activeCategory}
          </h2>
          {!searchQuery && activeCategory === 'Today’s Specials' && (
             <span className="px-3 py-1 bg-secondary/10 text-secondary text-xs font-bold rounded-full uppercase tracking-wider">
               {getDayName(new Date())}
             </span>
          )}
        </div>

        {filteredItems.length === 0 ? (
           <div className="text-center py-20 opacity-50">
             <Info className="mx-auto mb-2 h-10 w-10" />
             <p>No items found available for this selection.</p>
           </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {filteredItems.map(item => (
              <MenuCard 
                key={item.id} 
                item={item} 
                onClick={() => setSelectedItem(item)} 
              />
            ))}
          </div>
        )}
      </main>

      {/* Floating Cart Bar (Mobile/Desktop sticky footer) */}
      {cartCount > 0 && (
        <div className="fixed bottom-6 left-4 right-4 md:left-auto md:right-8 md:w-96 z-40">
           <button 
             onClick={() => setIsCartOpen(true)}
             className="w-full bg-stone-900 text-cream p-4 rounded-2xl shadow-xl flex justify-between items-center hover:scale-[1.02] transition-transform animate-slide-up"
           >
             <div className="flex items-center gap-3">
               <div className="bg-primary text-white w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm">
                 {cartCount}
               </div>
               <span className="font-medium">View Order</span>
             </div>
             <div className="font-display font-bold text-xl">
               {formatCurrency(cartTotal)}
             </div>
           </button>
        </div>
      )}

      {/* Modals */}
      <ItemModal 
        item={selectedItem} 
        isOpen={!!selectedItem} 
        onClose={() => setSelectedItem(null)} 
        onAddToCart={addToCart} 
      />

      <CartDrawer 
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onUpdateQuantity={updateQuantity}
        onRemove={removeFromCart}
        onCheckout={() => {
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
        }}
      />

      <CheckoutModal 
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cart={cart}
        orderType={orderType}
      />
    </div>
  );
}

export default App;
