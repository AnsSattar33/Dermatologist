import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import React from 'react'

const Products = () => {

    const productValue = [
        {
            "id": "1",
            "name": "Hydrating Face Serum",
            "img": "/images/CeraVe-min.png",
            "description": "A lightweight serum with hyaluronic acid to deeply hydrate and plump skin.",
            "tags": ["hydrating", "serum", "hyaluronic acid", "dry skin"]
        },
        {
            "id": "2",
            "name": "Vitamin C Brightening Cream",
            "img": "/images/Vitamin_C Serum-min.png",
            "description": "Brightening face cream infused with Vitamin C and antioxidants for radiant skin.",
            "tags": ["brightening", "vitamin c", "cream", "dull skin"]
        },
        {
            "id": "3",
            "name": "Oil-Free Moisturizer",
            "img": "/images/Oil_Free_Moisturizer-min.png",
            "description": "A gentle, oil-free moisturizer suitable for oily and acne-prone skin types.",
            "tags": ["moisturizer", "oil-free", "acne-prone", "lightweight"]
        },
        {
            "id": "4",
            "name": "SPF 50+ Sunscreen Gel",
            "img": "/images/sunscreen_gel-min.png",
            "description": "Non-greasy, water-resistant sunscreen with SPF 50+ for long-lasting protection.",
            "tags": ["sunscreen", "SPF 50", "gel", "sun protection"]
        },
        {
            "id": "5",
            "name": "Soothing Aloe Vera Gel",
            "img": "/images/Aloe_Vera_gel-min.png",
            "description": "Cooling aloe vera gel to soothe irritated skin and reduce redness.",
            "tags": ["aloe vera", "soothing", "natural", "irritated skin"]
        }
    ]

    return (
        <div className='flex flex-col container mx-auto mt-10'>
            <h1 className='text-3xl font-bold mb-10 mx-10'>Recommended Products</h1>
            <div className='flex flex-wrap justify-start '>
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
                                <CardFooter className='flex flex-grow'>
                                    <CardTitle>Tags</CardTitle>
                                    <CardDescription>{product.tags.join(', ')}</CardDescription>
                                </CardFooter>
                            </Card>
                        </div>
                    ))
                }
            </div>

        </div>
    )
}

export default Products