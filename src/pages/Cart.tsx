import React, { useEffect, useState } from 'react';
import { useAppSelector } from '@/hooks/useAppSelector';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { removeFromCart, clearCart } from '@/lib/redux/features/cartSlice';
import { Button } from '@/components/ui/button';
import { saveCartItems } from '@/lib/appwrite/account';
import { account } from '@/lib/appwrite/config';
import { toast } from 'sonner';

const Cart = () => {
    const items = useAppSelector((state) => state.cart.items);
    const reduxUser = useAppSelector((state) => state.auth.user);
    const [userId, setUserId] = useState<string | null>(null);
    const dispatch = useAppDispatch();

    useEffect(() => {
        // Try to get userId from Redux, otherwise fetch from Appwrite
        if (reduxUser && (reduxUser as any).$id) {
            setUserId((reduxUser as any).$id);
        } else {
            account.get().then(user => setUserId(user.$id)).catch(() => setUserId(null));
        }
    }, [reduxUser]);

    const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

    const handleBuy = async () => {
        if (!userId) {
            toast.error('You must be logged in to buy products.', { position: 'top-right' });
            return;
        }
        console.log(userId, items);
        try {
            await saveCartItems(userId, items);
            toast.success('Purchase successful!', { position: 'top-right' });
            dispatch(clearCart());
        } catch (err) {
            toast.error('Failed to save purchase.', { position: 'top-right' });
        }
    };

    const handleClearCart = () => {
        dispatch(clearCart());
        toast.success('Cart cleared!', { position: 'top-right' });
    };

    return (
        <div className="container mx-auto p-8">
            <h1 className="text-3xl font-bold mb-6">Your Cart</h1>
            {items.length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                <div>
                    <ul className="mb-6">
                        {items.map((item) => (
                            <li key={item.id} className="flex items-center justify-between border-b py-4">
                                <div className="flex items-center gap-4">
                                    <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded" />
                                    <div>
                                        <div className="font-semibold">{item.name}</div>
                                        <div>Price: ${item.price}</div>
                                        <div>Quantity: {item.quantity}</div>
                                    </div>
                                </div>
                                <Button variant="destructive" onClick={() => dispatch(removeFromCart(item.id))}>
                                    Remove
                                </Button>
                            </li>
                        ))}
                    </ul>
                    <div className="flex justify-between items-center mb-4">
                        <div className="text-xl font-bold">Total: ${total}</div>
                        <Button className="bg-green-600 text-white hover:bg-green-700" onClick={handleBuy}>
                            Buy
                        </Button>
                        <Button variant="outline" onClick={handleClearCart}>
                            Clear Cart
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Cart; 