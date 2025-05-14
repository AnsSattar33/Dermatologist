import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu'
import { FileSignatureIcon, Home, List } from 'lucide-react'
import { Link } from 'react-router-dom'
const Navbar = () => {
    return (
        <nav className="bg-gray-900 text-white px-4 py-4 shadow-md">
            <div className="max-w-7xl mx-auto flex justify-between items-center">
                {/* Logo Section */}
                <div className="text-2xl font-bold">
                    <h1>DermaXpert</h1>
                </div>

                {/* Navigation Links */}
                <div>
                    <ul className="flex gap-6 text-lg">
                        <li><Link to="/" className="hover:text-blue-400 transition"><span className='flex gap-1 items-center justify-center'><Home />Home</span></Link></li>
                        <li><Link to="/products" className="hover:text-blue-400 transition"><span className='flex gap-1 items-center justify-center'><List />Products </span></Link></li>
                        <li><Link to="/upload" className="hover:text-blue-400 transition"><span className='flex gap-1 items-center justify-center'><FileSignatureIcon /> Skin Prediction</span></Link></li>
                    </ul>
                </div>

                {/* Avatar Section */}
                <div className=''>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Avatar>
                                <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                                <AvatarFallback>CN</AvatarFallback>
                            </Avatar>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className='w-56 flex flex-col justify-center items-start bg-gray-200 space-y-5 text-black rounded-xl'>
                            <DropdownMenuLabel className='hover:bg-gray-300 w-full p-4 font-medium text-xl cursor-pointer rounded-t-xl'>My Account</DropdownMenuLabel>
                            <Link className='w-full' to={"/login"}>
                                <DropdownMenuItem className='hover:bg-gray-300 p-4 font-medium text-xl cursor-pointer'>Login</DropdownMenuItem>
                            </Link>
                            <Link className='w-full' to={"/signup"}>
                                <DropdownMenuItem className='hover:bg-gray-300 p-4 font-medium text-xl cursor-pointer'>Signup</DropdownMenuItem>
                            </Link>

                            <Link className='w-full' to={'/products'}>
                                <DropdownMenuItem className='hover:bg-gray-300 w-full p-4 font-medium text-xl cursor-pointer'>Products</DropdownMenuItem>
                            </Link>
                            <Link className='w-full' to={'/upload'}>
                                <DropdownMenuItem className='hover:bg-gray-300 w-full p-4 font-medium text-xl cursor-pointer rounded-b-xl'>Skin Prediction</DropdownMenuItem>
                            </Link>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
        </nav>
    )
}

export default Navbar
