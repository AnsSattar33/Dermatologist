import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const productValue = [
    {
        id: '1',
        name: 'Hydrating Face Serum',
        img: '/images/CeraVe-min.png',
        description: 'A lightweight serum with hyaluronic acid to deeply hydrate and plump skin.',
        tags: ['hydrating', 'serum', 'hyaluronic acid', 'dry skin']
    },
    {
        id: '2',
        name: 'Vitamin C Brightening Cream',
        img: '/images/Vitamin_C Serum-min.png',
        description: 'Brightening face cream infused with Vitamin C and antioxidants for radiant skin.',
        tags: ['brightening', 'vitamin c', 'cream', 'dull skin']
    },
    {
        id: '3',
        name: 'Oil-Free Moisturizer',
        img: '/images/Oil_Free_Moisturizer-min.png',
        description: 'A gentle, oil-free moisturizer suitable for oily and acne-prone skin types.',
        tags: ['moisturizer', 'oil-free', 'acne-prone', 'lightweight']
    },
    {
        id: '4',
        name: 'SPF 50+ Sunscreen Gel',
        img: '/images/sunscreen_gel-min.png',
        description: 'Non-greasy, water-resistant sunscreen with SPF 50+ for long-lasting protection.',
        tags: ['sunscreen', 'SPF 50', 'gel', 'sun protection']
    },
    {
        id: '5',
        name: 'Soothing Aloe Vera Gel',
        img: '/images/Aloe_Vera_gel-min.png',
        description: 'Cooling aloe vera gel to soothe irritated skin and reduce redness.',
        tags: ['aloe vera', 'soothing', 'natural', 'irritated skin']
    },
];

const ProductDetails = () => {
    const { id } = useParams();
    const product = productValue.find((p) => p.id === id);

    if (!product) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen">
                <h2 className="text-2xl font-bold mb-4">Product Not Found</h2>
                <Link to="/products">
                    <Button>Back to Products</Button>
                </Link>
            </div>
        );
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-8">
            <div className="flex flex-col md:flex-row bg-white rounded-lg shadow-lg p-8 max-w-3xl w-full gap-8">
                <div className="flex-shrink-0 flex justify-center items-center md:w-1/2 w-full mb-6 md:mb-0">
                    <img src={product.img} alt={product.name} className="w-full max-w-xs h-auto rounded" />
                </div>
                <div className="flex flex-col justify-center md:w-1/2 w-full">
                    <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
                    <p className="text-gray-700 mb-4">{product.description}</p>
                    <div className="mb-6">
                        <span className="font-semibold">Tags: </span>
                        <span>{product.tags.join(', ').toUpperCase()}</span>
                    </div>
                    <Link to="/products">
                        <Button className="bg-primary text-white px-6 py-2 font-semibold hover:bg-primary/90 transition-colors">
                            Back to Products
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails; 