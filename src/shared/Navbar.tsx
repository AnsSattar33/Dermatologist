import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu'
import { FileSignatureIcon, Home, List, User } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import type { RootState } from '@/lib/redux/store'
import { logout } from '@/lib/redux/authSlice'
import { account } from '@/lib/appwrite/config'

const Navbar = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { isAuthenticated, user } = useSelector((state: RootState) => state.auth)

    const handleLogout = async () => {
        try {
            await account.deleteSession('current')
            dispatch(logout())
            navigate('/login')
        } catch (error) {
            console.error('Logout failed:', error)
        }
    }

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
                            <Avatar className="cursor-pointer">
                                <AvatarImage src="https://github.com/shadcn.png" alt="User" />
                                <AvatarFallback>
                                    {user?.username?.charAt(0)?.toUpperCase() || 'U'}
                                </AvatarFallback>
                            </Avatar>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className='w-56 flex flex-col justify-center items-start bg-gray-200 space-y-2 text-black rounded-xl p-2'>
                            {isAuthenticated ? (
                                <>
                                    <Link className='w-full' to="/profile">
                                        <DropdownMenuItem className='hover:bg-gray-300 p-3 font-medium text-lg cursor-pointer rounded-lg flex items-center gap-2'>
                                            <User size={18} />
                                            My Profile
                                        </DropdownMenuItem>
                                    </Link>
                                    <DropdownMenuItem 
                                        className='hover:bg-gray-300 p-3 font-medium text-lg cursor-pointer rounded-lg w-full text-red-600'
                                        onClick={handleLogout}
                                    >
                                        Logout
                                    </DropdownMenuItem>
                                </>
                            ) : (
                                <>
                                    <Link className='w-full' to="/login">
                                        <DropdownMenuItem className='hover:bg-gray-300 p-3 font-medium text-lg cursor-pointer rounded-lg'>
                                            Login
                                        </DropdownMenuItem>
                                    </Link>
                                    <Link className='w-full' to="/signup">
                                        <DropdownMenuItem className='hover:bg-gray-300 p-3 font-medium text-lg cursor-pointer rounded-lg'>
                                            Signup
                                        </DropdownMenuItem>
                                    </Link>
                                </>
                            )}
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
        </nav>
    )
}

export default Navbar
