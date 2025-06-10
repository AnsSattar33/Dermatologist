import { useState } from 'react';

interface Doctor {
  id: number;
  name: string;
  address: string;
  photo: string;
  specialty: string;
}

const mockDoctors: Doctor[] = [
  {
    id: 1,
    name: "Dr. Sarah Johnson",
    specialty: "Dermatologist",
    address: "123 Medical Center Dr, Suite 100",
    photo: "/images/doctor1.jpg"
  },
  {
    id: 2,
    name: "Dr. Michael Chen",
    specialty: "Cardiologist",
    address: "456 Health Parkway, Building B",
    photo: "/images/doctor2.jpg"
  },
  {
    id: 3,
    name: "Dr. Emily Rodriguez",
    specialty: "Nutritionist",
    address: "789 Wellness Ave, Unit 200",
    photo: "/images/doctor3.jpg"
  }
];

export default function DoctorRecommendation() {
  const [doctors] = useState<Doctor[]>(mockDoctors);

  return (
    <div className="min-h-screen p-6 bg-background">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-foreground mb-8 text-center">
          Recommended Doctors
        </h1>
        <p className="text-muted-foreground text-center mb-12">
          Based on your product selections, we recommend these healthcare professionals
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {doctors.map((doctor) => (
            <div
              key={doctor.id}
              className="bg-card rounded-lg shadow-lg overflow-hidden transition-transform hover:scale-105"
            >
              <div className="aspect-w-16 aspect-h-9">
                <img
                  src={doctor.photo}
                  alt={doctor.name}
                  className="w-full h-48 object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  {doctor.name}
                </h3>
                <p className="text-primary font-medium mb-2">
                  {doctor.specialty}
                </p>
                <p className="text-muted-foreground text-sm">
                  {doctor.address}
                </p>
                <button className="mt-4 w-full px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors">
                  Book Appointment
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 