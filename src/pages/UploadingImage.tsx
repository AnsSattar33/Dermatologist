import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Upload } from 'lucide-react'
import { Link } from 'react-router-dom'
import React from 'react'

const UploadingImage = () => {

    const [image, setImage] = React.useState<File | null>(null)
    const [buttonIsPressed, setButtonIsPressed] = React.useState<Boolean>(false)
    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]
        if (file) {
            setImage(file)
        }
    }

    const handleButtonClick = () => {
        if (image) {
            setButtonIsPressed(true)
        } else {
            alert('Please upload an image first.')
        }
    }

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

    const randomThree = productValue
        .sort(() => Math.random() - 0.5)
        .slice(0, 3);

    return (
        <div className='bg-gray-100 p-10'>
            <div className='flex flex-col items-center justify-center container mx-auto'>
                <h1 className='text-3xl font-bold mb-5'>Upload Your Skin Image</h1>
                <p className='text-lg mb-5'>Please upload an image of your skin for analysis.</p>

                <div className="mb-10 w-1/4">
                    {image ? (
                        <img src={URL.createObjectURL(image)} alt="Uploaded" className="w-full h-auto mb-4" />
                    ) : (<div className="w-full h-40 relative border border-gray-300 rounded-md overflow-hidden">
                        <Input
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        />

                        <div className="absolute inset-0 w-full h-full flex flex-col items-center justify-center pointer-events-none">
                            <Upload size={40} className="text-gray-600" />
                            <span className="text-gray-700 mt-2">Click to upload</span>
                        </div>
                    </div>)}
                </div>
                <div className='w-1/4 mb-4'>
                    <Label className='mb-2'>Enter Skin Category</Label>
                    <Input type="text" placeholder="Enter skin category" className="" />
                </div>
                <div className='w-1/4 mb-4'>
                    <Button onClick={handleButtonClick} className='w-full'>Submit</Button>
                </div>

                {buttonIsPressed && (
                    <>
                        <div className="flex justify-center mt-8">
                            <Link to="/doctor">
                                <Button className="bg-primary text-white px-8 py-4 text-lg font-semibold hover:bg-primary/90 transition-colors">
                                    Consult with doctor
                                </Button>
                            </Link>
                        </div>
                        <div className='flex mt-20'>
                            {randomThree?.map((product) => (
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
                                    </Card>
                                </div>
                            ))}
                        </div>

                        {/* <div className='w-1/4 mb-4'>
                            <h1 className='text-2xl font-bold mb-5'>Skin Predictions</h1>
                            <p className='text-lg mb-5 font-semibold'>Predictions based on your uploaded image:</p>
                            <div className='flex flex-col items-start'>
                                <p className='text-lg mb-2'><span className='font-bold'>Skin Type:</span> {buttonIsPressed ? 'Oily' : 'N/A'}</p>
                                <p className='text-lg mb-2'><span className='font-bold'>Skin Condition:</span> {buttonIsPressed ? 'Acne' : 'N/A'}</p>
                                <p className='text-lg mb-2'><span className='font-bold'>Recommended Products:</span> {buttonIsPressed ? 'Moisturizer, Sunscreen' : 'N/A'}</p>
                                <p className='text-lg mb-2'><span className='font-bold'>Recommended Treatments:</span> {buttonIsPressed ? 'Salicylic Acid, Benzoyl Peroxide' : 'N/A'}</p>
                                <p className='text-lg mb-2'><span className='font-bold'>Recommended Lifestyle Changes:</span> {buttonIsPressed ? 'Drink more water, Eat healthy' : 'N/A'}</p>
                                <p className='text-lg mb-2'><span className='font-bold'>Recommended Diet:</span> {buttonIsPressed ? 'Low Glycemic Index' : 'N/A'}</p>
                                <p className='text-lg mb-2'><span className='font-bold'>Recommended Supplements:</span> {buttonIsPressed ? 'Zinc, Omega-3' : 'N/A'}</p>
                                <p className='text-lg mb-2'><span className='font-bold'>Recommended Skincare Routine:</span> {buttonIsPressed ? 'Cleanser, Moisturizer' : 'N/A'}</p>
                            </div>
                        </div> */}
                    </>
                )}
            </div>
        </div>
    )
}

export default UploadingImage