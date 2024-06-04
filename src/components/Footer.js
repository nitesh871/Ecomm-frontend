import React from 'react'
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import PinterestIcon from '@mui/icons-material/Pinterest';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CallIcon from '@mui/icons-material/Call';
import MailIcon from '@mui/icons-material/Mail';
import ms from '../images/ms.png'
import pp from '../images/pp.png'
import visa from '../images/visa.png'

const Footer = () => {
  return (
    <div className='grid grid-cols-3  '>
        <div className='md:col-span-1 col-span-3 p-4 md:m-4 m-2'>
            <h2 className='text-3xl md:text-6xl font-bold mb-3'>N.k</h2>
            <p className='text-md md:text-xl '>
            N.k provides top-quality products and services to meet all your needs. Dedicated to excellence and customer satisfaction. 
            </p>
            <div className='flex mt-3 gap-4'>
                <FacebookIcon className='text-blue-600'/>
                <InstagramIcon className='text-pink-600'/>
                <TwitterIcon  className='text-blue-400'/>
                <PinterestIcon  className='text-red-600'/>
            </div>
        </div>
        <div className='col-span-1 hidden md:block mt-10'>
            <h3 className='font-bold text-2xl mb-4'>Usefull Links</h3>
            <ul className='grid grid-cols-2 gap-y-2 '>
                <li>Home</li>
                <li>Cart</li>
                <li>Man fashion</li>
                <li>Women fashion</li>
                <li>Accessories</li>
                <li>My Account</li>
                <li>OrderTracking</li>
                <li>Wishlist</li>
                <li>Wishlist</li>
                <li>Terms</li>
            </ul>
        </div>
        <div className='col-span-3  md:col-span-1 space-y-2 bg-slate-50 p-4 m-2 md:space-y-4 '>
            <h2 className='text-2xl font-bold mb-6 mt-2 md:mt-4'>Contact</h2>
            <h3 className='flex items-center space-x-2 '><LocationOnIcon/><span className='px-2'>622 Dixie path, South Toincheister 98278</span></h3>
            <h3 className='flex items-center space-x-2 '><CallIcon/><span className='px-2'>+2345678</span></h3>
            <h3 className='flex items-center space-x-2'><MailIcon/> <span className='px-2'>contact@N.k.dev</span></h3>
            <div className='flex w-[11%] rounded-md gap-1'>
                <img src={ms}></img>
                <img src={pp}></img>
                <img src={visa}></img>
            </div>
        </div>
    </div>
  )
}

export default Footer