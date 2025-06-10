import { Button } from '@/components/ui/button'

const doctors = [
    {
        id: 1,
        name: "Dr. Sarah Johnson",
        specialty: "Dermatologist",
        address: "123 Medical Center Drive, Suite 100, New York, NY 10001",
        photo: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=300&h=300&auto=format&fit=crop",
        experience: "15+ years experience"
    },
    {
        id: 2,
        name: "Dr. Michael Chen",
        specialty: "Dermatologist",
        address: "456 Health Parkway, Building B, New York, NY 10002",
        photo: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=300&h=300&auto=format&fit=crop",
        experience: "12+ years experience"
    },
    {
        id: 3,
        name: "Dr. Emily Rodriguez",
        specialty: "Dermatologist",
        address: "789 Wellness Avenue, Unit 200, New York, NY 10003",
        photo: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?q=80&w=300&h=300&auto=format&fit=crop",
        experience: "10+ years experience"
    }
];

export default function DoctorPage() {
    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">
                        Our Specialist Dermatologists
                    </h1>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Schedule a consultation with one of our experienced dermatologists for personalized skin care advice.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {doctors.map((doctor) => (
                        <div
                            key={doctor.id}
                            className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform hover:scale-105 duration-300"
                        >
                            <div className="aspect-w-1 aspect-h-1">
                                <img
                                    src={doctor.photo}
                                    alt={doctor.name}
                                    className="w-full h-64 object-cover object-top"
                                />
                            </div>
                            <div className="p-6">
                                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                                    {doctor.name}
                                </h3>
                                <p className="text-primary font-medium mb-2">
                                    {doctor.specialty}
                                </p>
                                <p className="text-gray-600 text-sm mb-4">
                                    {doctor.experience}
                                </p>
                                <p className="text-gray-500 text-sm">
                                    {doctor.address}
                                </p>
                                <Button className="mt-4 w-full bg-primary text-white py-2 px-4 rounded-md hover:bg-primary/90 transition-colors">
                                    Book Appointment
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
} 