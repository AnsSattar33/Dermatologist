import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Link } from 'react-router-dom'

const Navbar = () => {
    return (
        <nav className="bg-gray-800 text-white px-4 py-4 shadow-md">
            <div className="max-w-7xl mx-auto flex justify-between items-center">
                {/* Logo Section */}
                <div className="text-2xl font-bold">
                    <h1>DermaXpert</h1>
                </div>

                {/* Navigation Links */}
                <div>
                    <ul className="flex gap-6 text-lg">
                        <li><Link to="/" className="hover:text-blue-400 transition">Home</Link></li>
                        <li><Link to="/products" className="hover:text-blue-400 transition">Products</Link></li>
                        <li><Link to="/upload" className="hover:text-blue-400 transition">Skin Prediction</Link></li>
                    </ul>
                </div>

                {/* Avatar Section */}
                <div>
                    <Avatar>
                        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                </div>
            </div>
        </nav>
    )
}

export default Navbar
