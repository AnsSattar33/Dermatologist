import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Link, useNavigate } from 'react-router-dom'
import React from 'react'
import { useAppDispatch } from '@/hooks/useAppDispatch'
import { addToCart } from '@/lib/redux/features/cartSlice'
import { toast } from 'sonner'

const Products = () => {

    const dispatch = useAppDispatch();

    const productValue = [
        {
            "id": "1",
            "name": "Hydrating Face Serum",
            "img": "/images/CeraVe-min.png",
            "description": "A lightweight serum with hyaluronic acid to deeply hydrate and plump skin.",
            "tags": ["hydrating", "serum", "hyaluronic acid", "dry skin"],
            "price": 20
        },
        {
            "id": "2",
            "name": "Vitamin C Brightening Cream",
            "img": "/images/Vitamin_C Serum-min.png",
            "description": "Brightening face cream infused with Vitamin C and antioxidants for radiant skin.",
            "tags": ["brightening", "vitamin c", "cream", "dull skin"],
            "price": 25
        },
        {
            "id": "3",
            "name": "Oil-Free Moisturizer",
            "img": "/images/Oil_Free_Moisturizer-min.png",
            "description": "A gentle, oil-free moisturizer suitable for oily and acne-prone skin types.",
            "tags": ["moisturizer", "oil-free", "acne-prone", "lightweight"],
            "price": 18
        },
        {
            "id": "4",
            "name": "SPF 50+ Sunscreen Gel",
            "img": "/images/sunscreen_gel-min.png",
            "description": "Non-greasy, water-resistant sunscreen with SPF 50+ for long-lasting protection.",
            "tags": ["sunscreen", "SPF 50", "gel", "sun protection"],
            "price": 22
        },
        {
            "id": "5",
            "name": "Soothing Aloe Vera Gel",
            "img": "/images/Aloe_Vera_gel-min.png",
            "description": "Cooling aloe vera gel to soothe irritated skin and reduce redness.",
            "tags": ["aloe vera", "soothing", "natural", "irritated skin"],
            "price": 15
        },
        {
            "id": "6",
            "name": "Hydrating Face Serum",
            "img": "/images/CeraVe-min.png",
            "description": "A lightweight serum with hyaluronic acid to deeply hydrate and plump skin.",
            "tags": ["hydrating", "serum", "hyaluronic acid", "dry skin"],
            "price": 20
        },
        {
            "id": "7",
            "name": "Vitamin C Brightening Cream",
            "img": "/images/Vitamin_C Serum-min.png",
            "description": "Brightening face cream infused with Vitamin C and antioxidants for radiant skin.",
            "tags": ["brightening", "vitamin c", "cream", "dull skin"],
            "price": 25
        },
        {
            "id": "8",
            "name": "Oil-Free Moisturizer",
            "img": "/images/Oil_Free_Moisturizer-min.png",
            "description": "A gentle, oil-free moisturizer suitable for oily and acne-prone skin types.",
            "tags": ["moisturizer", "oil-free", "acne-prone", "lightweight"],
            "price": 18
        },
        {
            "id": "9",
            "name": "SPF 50+ Sunscreen Gel",
            "img": "/images/sunscreen_gel-min.png",
            "description": "Non-greasy, water-resistant sunscreen with SPF 50+ for long-lasting protection.",
            "tags": ["sunscreen", "SPF 50", "gel", "sun protection"],
            "price": 22
        },
        {
            "id": "10",
            "name": "Soothing Aloe Vera Gel",
            "img": "/images/Aloe_Vera_gel-min.png",
            "description": "Cooling aloe vera gel to soothe irritated skin and reduce redness.",
            "tags": ["aloe vera", "soothing", "natural", "irritated skin"],
            "price": 15
        },
    ]

    return (
        <div className='bg-gray-100 min-h-screen p-10'>
            <div className='flex flex-col container mx-auto'>
                <h1 className='text-3xl font-bold mb-10 mx-10'>Recommended Products</h1>
                <div className='flex flex-wrap justify-start'>
                    {
                        productValue?.map((product) => (
                            <div key={product.id} className='w-2/8 mb-10 flex flex-wrap justify-start mx-10'>
                                <Card>
                                    <CardHeader>
                                        <img src={product.img} alt={product.name} className="w-full h-auto mb-4" />
                                    </CardHeader>
                                    <CardContent>
                                        <h2 className='text-xl font-semibold'>{product.name}</h2>
                                        <p className='text-gray-600'>{product.description}</p>
                                    </CardContent>
                                    <CardFooter className='flex gap-2'>
                                        <CardTitle className='self-start'>Tags</CardTitle> {' '}
                                        <CardDescription>{product.tags.join(', ').toUpperCase()}</CardDescription>
                                    </CardFooter>
                                    <div className="flex justify-end p-4 gap-2">
                                        <Link to={`/products/${product.id}`}>
                                            <Button className="bg-blue-600 text-white hover:bg-blue-700 transition-colors">
                                                View Details
                                            </Button>
                                        </Link>
                                        <Button
                                            className="bg-green-600 text-white hover:bg-green-700 transition-colors"
                                            onClick={() => {
                                                dispatch(addToCart({
                                                    id: product.id,
                                                    name: product.name,
                                                    price: product.price ?? 0,
                                                    image: product.img,
                                                    quantity: 1
                                                }));
                                                toast.success('Added to cart!', { position: 'top-right' });
                                            }}
                                        >
                                            Add to Cart
                                        </Button>
                                    </div>
                                </Card>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default Products