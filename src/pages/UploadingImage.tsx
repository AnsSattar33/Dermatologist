import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Upload } from 'lucide-react'
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

    return (
        <div className='flex flex-col items-center justify-center container mx-auto mt-10'>
            <h1 className='text-3xl font-bold mb-5'>Upload Your Skin Image</h1>
            <p className='text-lg mb-5'>Please upload an image of your skin for analysis.</p>

            <div className="mb-20 w-1/4">
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
                <button onClick={handleButtonClick} className='bg-blue-500 text-white px-4 py-2 rounded'>Submit</button>
            </div>
            {
                buttonIsPressed && (<div className='w-1/4 mb-4'>
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
                </div>)
            }
        </div>
    )
}

export default UploadingImage